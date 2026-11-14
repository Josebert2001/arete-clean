import { webcrypto, createHash } from 'node:crypto';
import { TextEncoder } from 'node:util';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlagChallenge from '../components/FlagChallenge';
import { getSecurityModuleById } from '../data/securityModules';

// Solutions are derived from the displayed evidence, never the hidden hash or
// post-solve writeup. These exercise the same case-sensitive Web Crypto path
// as a learner's browser, without network requests or an external lab.
const solutions = [
  ['sec-web-xss', challenge => {
    const code = challenge.material[0].content;
    const letter = code.match(/\/\/ Renderer ([A-Z])\s+preview\.innerHTML = comment/)[1];
    return `ARETE{renderer_${letter.toLowerCase()}}`;
  }],
  ['sec-access-control', challenge => {
    const transcript = challenge.material[1].content;
    const caller = transcript.match(/Verified session: (\S+)/)[1];
    const responses = [...transcript.matchAll(/GET \/api\/invoices\/\d+ -> (\d+) (\{[^\n]+\})/g)];
    const leaks = responses.filter(match => match[1] === '200')
      .map(match => JSON.parse(match[2])).filter(invoice => invoice.ownerId !== caller);
    expect(leaks).toHaveLength(1);
    return `ARETE{invoice_${leaks[0].id}}`;
  }],
  ['sec-log-analysis', challenge => {
    const failures = new Map();
    const candidates = [];
    for (const [, , source, account, result] of challenge.material[0].rows) {
      if (account !== 'ada') continue;
      if (result === 'FAIL') failures.set(source, (failures.get(source) || 0) + 1);
      else if (result === 'OK' && failures.get(source) >= 3) candidates.push(source);
    }
    expect(candidates).toHaveLength(1);
    return `ARETE{${candidates[0]}}`;
  }],
  ['sec-password-storage', challenge => {
    const matches = challenge.material[0].rows.filter(([, algorithm, salts, check]) =>
      algorithm === 'Argon2id' && salts.includes('fresh random salt per stored password') && check === 'Library verifier');
    expect(matches).toHaveLength(1);
    return `ARETE{scheme_${matches[0][0].toLowerCase()}}`;
  }],
  ['sec-packet-reading', challenge => {
    const stream = challenge.material[0].rows.find(row => row[3] === 'GET /lab-note HTTP/1.1')[0];
    const segments = challenge.material[1].rows.filter(row => row[1] === stream && row[2] === 'server->client');
    const bytes = new Map();
    for (const [, , , sequence, length, payload] of segments) {
      expect(payload.length).toBe(Number(length));
      [...payload].forEach((char, offset) => {
        const position = Number(sequence) + offset;
        if (bytes.has(position)) expect(bytes.get(position)).toBe(char);
        bytes.set(position, char);
      });
    }
    const ordered = [...bytes].sort(([a], [b]) => a - b);
    ordered.forEach(([position], index) => expect(position).toBe(101 + index));
    return ordered.map(([, char]) => char).join('');
  }],
  ['sec-incident-response', challenge => {
    const instructions = challenge.material[0].content;
    expect(instructions).toMatch(/1\. Stop this endpoint's upload first/);
    expect(instructions).toMatch(/2\. Next capture volatile session details/);
    expect(instructions).toMatch(/3\. Then revoke the exposed token/);
    const actions = challenge.material[1].rows;
    const order = ['Block endpoint traffic', 'Capture volatile session details', 'Invalidate the exposed token']
      .map(description => actions.find(([, action]) => action.startsWith(description))[0]);
    return `ARETE{${order.join('_')}}`;
  }],
];

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('crypto', webcrypto);
  vi.stubGlobal('TextEncoder', TextEncoder);
});
afterEach(() => vi.unstubAllGlobals());

describe('Security rooms 13–18', () => {
  it.each(solutions)('%s is solvable from its supplied evidence and accepted by the browser flag checker', async (id, solve) => {
    const room = getSecurityModuleById(id);
    const answer = solve(room.challenge);
    expect(createHash('sha256').update(answer).digest('hex')).toBe(room.challenge.flagHash);
    const onSolve = vi.fn();
    render(<MemoryRouter><FlagChallenge challenge={room.challenge} moduleId={id} onSolve={onSolve} /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Submit the flag'), { target: { value: `  ${answer}  ` } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit', exact: true }));
    expect(await screen.findByText('Flag captured!')).toBeInTheDocument();
    expect(onSolve).toHaveBeenCalledTimes(1);
    expect(JSON.parse(localStorage.getItem('arete-solved-flags-v1'))).toContain(id);
  });

  it('rejects a plausible wrong renderer and displays markup without executing it', async () => {
    const room = getSecurityModuleById('sec-web-xss');
    const onSolve = vi.fn();
    const { container } = render(<MemoryRouter><FlagChallenge challenge={room.challenge} moduleId={room.id} onSolve={onSolve} /></MemoryRouter>);
    expect(container.querySelector('img')).toBeNull();
    fireEvent.change(screen.getByLabelText('Submit the flag'), { target: { value: 'ARETE{renderer_b}' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit', exact: true }));
    expect(await screen.findByText(/Not the right flag/)).toBeInTheDocument();
    expect(onSolve).not.toHaveBeenCalled();
  });
});
