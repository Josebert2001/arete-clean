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
  it('lets an independent learner save with only a name and no academic identity', async () => {
    const onSave = vi.fn(async () => undefined);
    render(<ProfileForm defaultMode="independent" onSave={onSave} />);
    expect(screen.queryByLabelText(/Reg number/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '100L' })).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: ' Ada Obi ' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));
    await waitFor(() => expect(onSave).toHaveBeenCalledWith({
      full_name: 'Ada Obi', learning_mode: 'independent', reg_number: null,
      level: null, department: 'general', department_other: null,
    }));
  });

  it('clears academic metadata when an existing university learner switches mode', async () => {
    const onSave = vi.fn(async () => undefined);
    render(<ProfileForm initial={{ full_name: 'Ada', level: '200L', department: 'cybersecurity', reg_number: 'CYB/22/1234' }} onSave={onSave} />);
    fireEvent.click(screen.getByRole('radio', { name: /Learn cybersecurity and coding/ }));
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));
    await waitFor(() => expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ learning_mode: 'independent', level: null, reg_number: null, department_other: null })));
  });

  it('requires academic context again when switching from independent to university mode', () => {
    render(<ProfileForm initial={{ full_name: 'Ada', learning_mode: 'independent', department: 'general', level: null }} onSave={vi.fn()} />);
    fireEvent.click(screen.getByRole('radio', { name: /Study a UniUyo curriculum/ }));
    expect(screen.getByRole('button', { name: /Save/ })).toBeDisabled();
    fillRequiredFields();
    expect(screen.getByRole('button', { name: /Save/ })).toBeEnabled();
  });

  it('hides independent mode and omits learning_mode when the schema lacks it', async () => {
    const onSave = vi.fn(async () => undefined);
    render(<ProfileForm defaultMode="independent" allowIndependent={false} onSave={onSave} />);
    expect(screen.queryByRole('radio', { name: /Learn cybersecurity and coding/ })).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Reg number/i)).toBeInTheDocument();
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));
    await waitFor(() => expect(onSave).toHaveBeenCalled());
    expect(onSave.mock.calls[0][0]).not.toHaveProperty('learning_mode');
  });

  it('lets a learner retry when saving throws', async () => {
    render(<ProfileForm defaultMode="independent" onSave={vi.fn().mockRejectedValue(new Error('offline'))} />);
    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'Ada' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/ }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not save your profile');
    expect(screen.getByRole('button', { name: /Save/ })).toBeEnabled();
  });
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
