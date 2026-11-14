import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlueInvestigation from '../pages/BlueInvestigation';
import CareerReviews from '../pages/CareerReviews';
import { initialSimulation, learnerCase, blueCases } from '../../api/_lib/blueCases.js';
import { blueReportFields } from '../data/blueAssessment';

const mocks = vi.hoisted(() => ({ request: vi.fn() }));
vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ user: { id: 'owner' } }) }));
vi.mock('../utils/careerApi', () => ({ careerRequest: mocks.request }));
const VERSION = 'blue-case-a-v1';
function fixture() {
  return { attempt: { id: '11111111-1111-4111-8111-111111111111', case_version: VERSION, rubric_version: 'blue-investigation-v1', revision: 0, status: 'in_progress', deadline_at: '2030-01-01T00:00:00Z', simulation: initialSimulation(VERSION), draft: {} }, case: learnerCase(VERSION), submission: null, review: null };
}
beforeEach(() => { mocks.request.mockReset().mockResolvedValue(fixture()); });
function show(element = <BlueInvestigation />) { return render(<MemoryRouter>{element}</MemoryRouter>); }

describe('independent investigation and reviewer UI', () => {
  it('keeps uninvited learners in useful starter practice instead of opening a case', async () => {
    mocks.request.mockResolvedValue({ attempt: null, eligible: false }); show();
    expect(await screen.findByRole('heading', { name: 'Invited assessment pilot' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Start independent investigation' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continue blue-team starter practice' })).toHaveAttribute('href', '/career/practice/blue');
  });
  it('explains the unavailable pilot without displaying a fake running lab', async () => {
    mocks.request.mockRejectedValue(new Error('Independent investigations are being prepared.'));
    show();
    expect(await screen.findByRole('alert')).toHaveTextContent('being prepared');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
  it('saves an incomplete draft with owner/revision preconditions', async () => {
    show();
    fireEvent.change(await screen.findByLabelText('Executive summary'), { target: { value: 'A partial report to resume later.' } });
    mocks.request.mockResolvedValue({ attempt: { ...fixture().attempt, revision: 1 } });
    fireEvent.click(screen.getByRole('button', { name: 'Save report draft' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Report draft saved');
    expect(mocks.request).toHaveBeenCalledWith('assessmentDraft', expect.objectContaining({ revision: 0, report: expect.objectContaining({ summary: 'A partial report to resume later.' }) }), 'owner');
  });
  it('records verification as a simulator action without treating it as a pass', async () => {
    show();
    const operation = await screen.findByLabelText('Action');
    fireEvent.change(operation, { target: { value: 'verify' } });
    fireEvent.change(screen.getByLabelText('Rationale and expected effect'), { target: { value: 'Check current session and rule state against the expected controls.' } });
    mocks.request.mockResolvedValue({ attempt: { ...fixture().attempt, revision: 1 } });
    fireEvent.click(screen.getByRole('button', { name: 'Record simulated action' }));
    await screen.findByText(/does not itself establish correct containment/);
    expect(mocks.request).toHaveBeenCalledWith('assessmentAction', expect.objectContaining({ operation: 'verify', revision: 0 }), 'owner');
    expect(screen.queryByText(/Pass ·/)).not.toBeInTheDocument();
  });
  it('freezes a submitted report in the UI while a human review is pending', async () => {
    const data = fixture(); data.attempt.status = 'submitted'; data.submission = { attempt_id: data.attempt.id, submitted_at: '2026-11-09T10:00:00Z', report: {}, simulation: data.attempt.simulation };
    mocks.request.mockResolvedValue(data);
    show();
    expect(await screen.findByRole('heading', { name: /Report submitted · awaiting review/ })).toBeInTheDocument();
    expect(screen.queryByLabelText('Executive summary')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Download submission and result' })).toBeInTheDocument();
  });
  it('keeps an expired saved draft downloadable without allowing report edits', async () => {
    const data = fixture(); data.attempt.expired = true; data.remainingAttempts = 1;
    mocks.request.mockResolvedValue(data); show();
    expect(await screen.findByRole('button', { name: 'Download expired draft' })).toBeInTheDocument();
    expect(screen.queryByLabelText('Executive summary')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start remaining unseen case' })).toBeInTheDocument();
  });
  it('does not give an unassigned account a grading form', async () => {
    mocks.request.mockResolvedValue({ queue: [] }); show(<CareerReviews />);
    expect(await screen.findByText(/No submitted investigations are assigned/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Publish human review' })).not.toBeInTheDocument();
  });
  it('publishes a complete assigned review and displays the server result', async () => {
    const data = fixture();
    data.attempt.status = 'submitted';
    const item = { ...data, interpretation: blueCases[VERSION].key, submission: { simulation: data.attempt.simulation, report: { ...Object.fromEntries(blueReportFields.map(([id]) => [id, 'A learner explanation grounded in the supplied evidence.'])), citations: ['AUTH-02', 'MAIL-01'] } } };
    mocks.request.mockResolvedValue({ queue: [item] }); show(<CareerReviews />);
    await screen.findByRole('button', { name: 'Publish human review' });
    for (const select of screen.getAllByRole('combobox')) fireEvent.change(select, { target: { value: '3' } });
    for (const text of screen.getAllByRole('textbox')) fireEvent.change(text, { target: { value: 'This level is supported by the cited report and a clear statement of remaining uncertainty.' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /reviewed the complete evidence/ }));
    mocks.request.mockResolvedValue({ review: { result: { decision: 'pass', score: 75 } } });
    fireEvent.click(screen.getByRole('button', { name: 'Publish human review' }));
    expect(await screen.findByRole('status')).toHaveTextContent('pass · 75/100');
    const payload = mocks.request.mock.calls.find(([action]) => action === 'reviewSubmit')[1];
    expect(payload.levels).toEqual({ triage: 3, scope: 3, timeline: 3, evidence: 3, containment: 3, report: 3 });
    expect(payload).not.toHaveProperty('score');
  });
});
