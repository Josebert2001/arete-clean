import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileForm from '../components/ProfileForm';

// Reg number became optional at signup — fresh students often don't have one
// yet, and it used to be a hard blocker in the form's required-fields check.
// The DB's format CHECK still applies whenever a value IS provided, so the
// component must keep validating non-empty input and must always send null
// (never '') for "no reg number yet".

const fillRequiredFields = ({ reg } = {}) => {
  fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'Ada Obi' } });
  if (reg !== undefined) {
    fireEvent.change(screen.getByLabelText(/Reg number/i), { target: { value: reg } });
  }
  fireEvent.click(screen.getByRole('button', { name: 'Cybersecurity' }));
  fireEvent.click(screen.getByRole('button', { name: '100L' }));
};

describe('ProfileForm — optional reg number', () => {
  it('submits reg_number as null when the field is left blank', async () => {
    const onSave = vi.fn(async () => undefined);
    render(<ProfileForm onSave={onSave} />);
    fillRequiredFields();

    fireEvent.click(screen.getByRole('button', { name: /Save/ }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ reg_number: null })
    );
  });

  it('does not submit and shows an error for an invalid non-empty reg number', async () => {
    const onSave = vi.fn(async () => undefined);
    render(<ProfileForm onSave={onSave} />);
    fillRequiredFields({ reg: 'abcd' }); // long enough, but letters only — no digit

    fireEvent.click(screen.getByRole('button', { name: /Save/ }));

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Enter a valid reg number — it should contain both letters and digits.'
      )
    );
    expect(onSave).not.toHaveBeenCalled();
  });

  it('trims and uppercases a valid reg number before submitting', async () => {
    const onSave = vi.fn(async () => undefined);
    render(<ProfileForm onSave={onSave} />);
    fillRequiredFields({ reg: ' cyb/21/1234 ' });

    fireEvent.click(screen.getByRole('button', { name: /Save/ }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ reg_number: 'CYB/21/1234' })
    );
  });

  it('the required-fields error no longer mentions reg number', async () => {
    const onSave = vi.fn(async () => undefined);
    const { container } = render(<ProfileForm onSave={onSave} />);
    // Leave everything blank — level and department are still required, so
    // this exercises the "Please fill in all fields" branch directly via the
    // form's submit handler (the submit button itself is disabled while the
    // form isn't ready, so a plain click wouldn't reach the handler).
    fireEvent.submit(container.querySelector('form'));

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.getByRole('alert')).toHaveTextContent('Please fill in all fields.');
    expect(screen.getByRole('alert').textContent.toLowerCase()).not.toContain('reg number');
    expect(onSave).not.toHaveBeenCalled();
  });

  it('does not require reg number for the submit button to become enabled', () => {
    render(<ProfileForm onSave={vi.fn()} />);
    fillRequiredFields(); // no reg passed — field stays blank
    expect(screen.getByRole('button', { name: /Save/ })).toBeEnabled();
  });
});
