import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Premium from '../pages/Premium';
import { planComparison, PREMIUM_PASS } from '../data/plans';

const mocks = vi.hoisted(() => ({
  plan: null, user: null, authLoading: false,
  checkout: vi.fn(), verify: vi.fn(), refresh: vi.fn(), assign: vi.fn(),
}));
vi.mock('../context/PlanContext', () => ({ usePlan: () => mocks.plan }));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: mocks.user, authLoading: mocks.authLoading }),
}));
vi.mock('../utils/billingApi', async (importOriginal) => ({
  ...await importOriginal(), startCheckout: mocks.checkout, verifyPayment: mocks.verify,
}));

const REFERENCE = `arete_${'a'.repeat(32)}`;
const UNTIL = '2027-05-07T12:00:00Z';
const endDate = () => new Date(UNTIL).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

function LocationProbe() {
  const location = useLocation();
  return <p data-testid="location">{location.pathname}{location.search}</p>;
}

function renderPage(entry = '/premium') {
  return render(<MemoryRouter initialEntries={[entry]}>
    <Routes>
      <Route path="/premium" element={<Premium />} />
      <Route path="/signin" element={<h1>Sign in</h1>} />
    </Routes>
    <LocationProbe />
  </MemoryRouter>);
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.user = { id: 'student' };
  mocks.authLoading = false;
  mocks.plan = {
    status: 'ready', enabled: true, isPremium: false,
    premiumUntil: null, pass: PREMIUM_PASS, refresh: mocks.refresh,
  };
  mocks.checkout.mockResolvedValue({ error: 'Checkout unavailable' });
  mocks.verify.mockResolvedValue({ status: 'granted', premiumUntil: UNTIL });
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('Premium page', () => {
  it.each([true, false])('keeps checkout off while billing is off (signed in: %s)', (signedIn) => {
    mocks.plan.enabled = false;
    if (!signedIn) mocks.user = null;
    renderPage();
    expect(screen.getByText(/Payments aren't switched on yet, so every feature is free and unlimited/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Premium|Add another/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Sign in to get Premium/ })).not.toBeInTheDocument();
    expect(mocks.checkout).not.toHaveBeenCalled();
  });

  it('takes a signed-out visitor to sign-in', () => {
    mocks.user = null;
    renderPage();
    fireEvent.click(screen.getByRole('link', { name: 'Sign in to get Premium' }));
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/signin');
    expect(mocks.checkout).not.toHaveBeenCalled();
  });

  it('starts checkout and redirects to the returned authorization URL', async () => {
    // jsdom's own location.assign is read-only. Override just that lookup;
    // every other window property still comes from the real DOM window.
    vi.stubGlobal('window', new Proxy(window, {
      get: (target, key) => key === 'location' ? { assign: mocks.assign } : Reflect.get(target, key, target),
    }));
    mocks.checkout.mockResolvedValue({ authorizationUrl: 'https://checkout.paystack.com/semester' });
    renderPage();
    const button = screen.getByRole('button', { name: 'Get Premium · ₦2,500' });
    fireEvent.click(button);
    await waitFor(() => expect(mocks.assign).toHaveBeenCalledWith('https://checkout.paystack.com/semester'));
    expect(mocks.checkout).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();
  });

  it('shows a checkout error and allows another attempt', async () => {
    renderPage();
    const button = screen.getByRole('button', { name: 'Get Premium · ₦2,500' });
    fireEvent.click(button);
    expect(await screen.findByRole('alert')).toHaveTextContent('Checkout unavailable');
    expect(button).toBeEnabled();
  });

  it('shows a Premium student their end date and offers a stacked renewal', () => {
    mocks.plan.isPremium = true;
    mocks.plan.premiumUntil = UNTIL;
    renderPage();
    expect(screen.getByText(`Premium until ${endDate()}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add another 6 months · ₦2,500' })).toBeInTheDocument();
    expect(screen.getByText(/Buying again adds 6 months after your current pass ends/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Get Premium/ })).not.toBeInTheDocument();
  });

  it('verifies the returned reference, refreshes the plan and strips the query', async () => {
    renderPage(`/premium?reference=${REFERENCE}&trxref=${REFERENCE}`);
    expect(await screen.findByText(`Payment confirmed — you're Premium until ${endDate()}.`)).toBeInTheDocument();
    expect(mocks.verify).toHaveBeenCalledExactlyOnceWith(REFERENCE);
    expect(mocks.refresh).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByTestId('location').textContent).toBe('/premium'));
  });

  it('retries a pending verification before confirming and stripping the query', async () => {
    vi.useFakeTimers();
    mocks.verify.mockResolvedValueOnce({ status: 'pending' });
    renderPage(`/premium?reference=${REFERENCE}`);
    await act(async () => {});
    expect(mocks.verify).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Confirming your payment with Paystack…')).toBeInTheDocument();
    expect(screen.getByTestId('location').textContent).toContain('?reference=');
    await act(async () => { await vi.advanceTimersByTimeAsync(1999); });
    expect(mocks.verify).toHaveBeenCalledTimes(1);
    await act(async () => { await vi.advanceTimersByTimeAsync(1); });
    expect(mocks.verify).toHaveBeenCalledTimes(2);
    expect(screen.getByText(`Payment confirmed — you're Premium until ${endDate()}.`)).toBeInTheDocument();
    expect(screen.getByTestId('location').textContent).toBe('/premium');
    expect(mocks.refresh).toHaveBeenCalledTimes(1);
  });

  it('stops retrying a payment that stays pending and preserves its reference in the result', async () => {
    vi.useFakeTimers();
    mocks.verify.mockResolvedValue({ status: 'pending' });
    renderPage(`/premium?reference=${REFERENCE}`);
    await act(async () => {});
    for (const delay of [2000, 4000, 8000]) {
      await act(async () => { await vi.advanceTimersByTimeAsync(delay); });
    }
    expect(mocks.verify).toHaveBeenCalledTimes(4);
    expect(screen.getByRole('alert')).toHaveTextContent("Paystack hasn't confirmed this payment yet");
    expect(screen.getByRole('alert')).toHaveTextContent(`Reference: ${REFERENCE}`);
    expect(screen.getByTestId('location').textContent).toBe('/premium');
    expect(mocks.refresh).not.toHaveBeenCalled();
  });

  it('waits for sign-in before verifying a reference', () => {
    mocks.user = null;
    renderPage(`/premium?reference=${REFERENCE}`);
    expect(screen.getByRole('alert')).toHaveTextContent('Sign in with the account you paid from');
    expect(mocks.verify).not.toHaveBeenCalled();
  });

  it('renders the comparison rows from the shared plan data', () => {
    renderPage();
    const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    const comparison = planComparison();
    expect(rows).toHaveLength(comparison.length);
    comparison.forEach((expected, index) => {
      expect(within(rows[index]).getAllByRole('cell').map(cell => cell.textContent))
        .toEqual([expected.feature, expected.free, expected.premium]);
    });
  });
});
