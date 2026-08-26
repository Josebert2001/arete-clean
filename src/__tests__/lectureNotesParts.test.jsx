// Grouping the notes list by the parts a course's `noteMap` declares.
//
// Two things are being guarded, and they are different in kind:
//
//   1. The page is shorter. A course with twenty-odd topics rendered flat is a
//      wall — the collapsed parts are the whole point, so a regression that
//      quietly renders every topic again would look fine in a screenshot and
//      undo the feature. Hence the assertions that a closed part's topics are
//      absent from the DOM, not merely hidden.
//   2. The order is the map's, not the file's. CYB 224 prints its big data
//      life cycle last and its management half after twenty-two practicals;
//      the map puts both near the front. If grouping ever fell back to printed
//      order the page would still look grouped and would still teach the course
//      in the wrong sequence.
//
// A course with no map must keep the flat list it has always had — that path is
// covered by lectureNotesProgress.test.jsx, which passes no map, plus the
// explicit case at the bottom here.
//
// fireEvent, not user-event: user-event is not a dependency of this project.

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import LectureNotes from '../components/LectureNotes';
import { useReadingProgress } from '../components/useReadingProgress';

vi.mock('../utils/apiClient', async (importOriginal) => ({
  ...(await importOriginal()),
  useApiAvailability: () => 'unavailable',
}));

const section = (heading) => ({ type: 'bullets', heading, items: ['first', 'second'] });

// Printed order is 1, 2, 3, 4. The map's reading order is 1, 3 | 2, and leaves
// 4 unplaced — the three cases that matter, in one fixture.
const topics = [
  { number: '1', title: 'What big data is', sections: [section('Definition')] },
  { number: '2', title: 'Doing it in Python', sections: [section('Pandas')] },
  { number: '3', title: 'Where it comes from', sections: [section('Sources')] },
  { number: '4', title: 'Added after the map', sections: [section('Late')] },
];

// `topics: {}` deliberately: with no per-note entry the TopicLinks strip renders
// nothing, so the only "Topic N" buttons on the page are the accordion headers
// these tests count.
const map = {
  parts: [
    { id: 'A', title: 'Foundations', topics: ['1', '3'], blurb: 'The vocabulary.' },
    { id: 'B', title: 'Practicals', topics: ['2'], blurb: 'Doing it.' },
  ],
  topics: {},
};

function NotesHost({ map: m = map, topics: t = topics }) {
  const reading = useReadingProgress('cyb-224');
  return (
    <LectureNotes
      topics={t}
      map={m}
      reading={reading}
      context={{ courseCode: 'CYB 224', courseTitle: 'Information and Big Data Security' }}
    />
  );
}

const topicTitlesIn = (partName) =>
  within(screen.getByRole('region', { name: new RegExp(partName) }))
    .getAllByRole('button', { name: /^Topic \d/ })
    .map((b) => b.textContent);

beforeEach(() => {
  localStorage.clear();
});

describe('grouping the notes by part', () => {
  it('renders a header per part, with its own topic count', () => {
    render(<NotesHost />);
    expect(screen.getByRole('button', { name: /Part A.*Foundations/s })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Part B.*Practicals/s })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Part A.*2 topics/s })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Part B.*1 topic$|Part B.*1 topic[^s]/s })).toBeInTheDocument();
  });

  it('opens the first part only, so the page is not every topic at once', () => {
    render(<NotesHost />);
    // Part A is open — both its topics are on the page.
    expect(screen.getByRole('button', { name: /^Topic 1/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Topic 3/ })).toBeInTheDocument();
    // Part B is closed — its topic is absent, not merely hidden.
    expect(screen.queryByRole('button', { name: /^Topic 2/ })).not.toBeInTheDocument();
    expect(screen.queryByText('Doing it in Python')).not.toBeInTheDocument();
  });

  it('reveals a part’s topics when it is expanded', () => {
    render(<NotesHost />);
    fireEvent.click(screen.getByRole('button', { name: /Part B.*Practicals/s }));
    expect(screen.getByRole('button', { name: /^Topic 2/ })).toBeInTheDocument();
  });

  it('orders topics by the map, not by the order they are printed in', () => {
    render(<NotesHost />);
    // Topic 3 sits beside Topic 1 because the map says so, even though Topic 2
    // comes between them in the file.
    expect(topicTitlesIn('Foundations')).toEqual([
      expect.stringContaining('What big data is'),
      expect.stringContaining('Where it comes from'),
    ]);
  });

  it('keeps a topic the map has not placed rather than dropping it off the page', () => {
    render(<NotesHost />);
    const trailing = screen.getByRole('button', { name: /Also in this course/ });
    expect(trailing).toBeInTheDocument();
    fireEvent.click(trailing);
    expect(screen.getByRole('button', { name: /^Topic 4/ })).toBeInTheDocument();
  });

  it('counts reading progress per part as well as for the whole course', () => {
    render(<NotesHost />);
    expect(screen.getByText('0 of 4 topics read')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Part A.*0 of 2 read/s })).toBeInTheDocument();

    // The first topic of Part A is open by default, so there is one toggle.
    fireEvent.click(screen.getByRole('button', { name: 'Mark as read' }));

    expect(screen.getByText('1 of 4 topics read')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Part A.*1 of 2 read/s })).toBeInTheDocument();
    // Part B holds a different topic and must not have moved.
    expect(screen.getByRole('button', { name: /Part B.*0 of 1 read/s })).toBeInTheDocument();
  });

  it('expands every part when "Expand all" is used, or the topics would open unseen', () => {
    render(<NotesHost />);
    fireEvent.click(screen.getByRole('button', { name: 'Expand all' }));
    expect(screen.getByRole('button', { name: /^Topic 2/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Topic 4/ })).toBeInTheDocument();
  });

  it('drops empty parts rather than offering a box with nothing in it', () => {
    // A map that runs ahead of the transcription: part C's topics do not exist.
    const ahead = {
      ...map,
      parts: [...map.parts, { id: 'C', title: 'Not yet transcribed', topics: ['9'], blurb: '' }],
    };
    render(<NotesHost map={ahead} />);
    expect(screen.queryByRole('button', { name: /Not yet transcribed/ })).not.toBeInTheDocument();
  });
});

describe('a course with no reading map', () => {
  it('keeps the flat list, with no part chrome at all', () => {
    // null, not undefined — undefined would fall through to NotesHost's default.
    render(<NotesHost map={null} />);
    expect(screen.queryAllByText(/^Part /)).toHaveLength(0);
    // Every topic is on the page, since there is nothing to collapse them into.
    ['1', '2', '3', '4'].forEach((n) => {
      expect(screen.getByRole('button', { name: new RegExp(`^Topic ${n}`) })).toBeInTheDocument();
    });
  });
});
