import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Timetable from '../pages/Timetable';
import {
  DAYS, TIMETABLE_SLOTS, canSeeTimetable, formatTime, slotsForDay,
} from '../data/timetable';
import { courses } from '../data/courses';

const mocks = vi.hoisted(() => ({ profile: null }));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ profile: mocks.profile, authLoading: false }),
}));

describe('100 Level timetable data', () => {
  const firstSemester = courses.filter(c => c.level === 100 && c.semester === 1);

  it('only names 100 Level first-semester catalogue courses, with matching slug and title', () => {
    for (const s of TIMETABLE_SLOTS) {
      const course = firstSemester.find(c => c.code === s.course);
      expect(course, `${s.course} is not a 100L semester-1 course`).toBeTruthy();
      expect(course.slug).toBe(s.slug);
      expect(course.title.startsWith(s.title.slice(0, 15))).toBe(true);
    }
  });

  it('covers every Cybersecurity 100L first-semester course', () => {
    const scheduled = new Set(TIMETABLE_SLOTS.map(s => s.course));
    for (const c of firstSemester) expect(scheduled.has(c.code), `${c.code} missing`).toBe(true);
  });

  it('has valid days, ordered times, and no overlaps within a day', () => {
    for (const day of DAYS) {
      const slots = slotsForDay(day);
      slots.forEach((s, i) => {
        expect(s.start < s.end).toBe(true);
        if (i > 0) expect(slots[i - 1].end <= s.start, `${day} ${s.course} overlaps`).toBe(true);
      });
    }
    for (const s of TIMETABLE_SLOTS) expect(DAYS).toContain(s.day);
  });

  it('formats times for display', () => {
    expect(formatTime('08:00')).toBe('8 AM');
    expect(formatTime('13:00')).toBe('1 PM');
    expect(formatTime('14:30')).toBe('2:30 PM');
  });
});

describe('who can see it', () => {
  it('allows only Cybersecurity 100 Level, and tolerates a null level', () => {
    expect(canSeeTimetable({ department: 'cybersecurity', level: 100 })).toBe(true);
    expect(canSeeTimetable({ department: 'cybersecurity', level: '100' })).toBe(true);
    expect(canSeeTimetable({ department: 'cybersecurity', level: 200 })).toBe(false);
    expect(canSeeTimetable({ department: 'general', level: 100 })).toBe(false);
    expect(canSeeTimetable({ department: 'general', level: null })).toBe(false);
    expect(canSeeTimetable(null)).toBe(false);
  });
});

describe('Timetable page', () => {
  const renderPage = () =>
    render(<MemoryRouter><Timetable /></MemoryRouter>);

  it('shows the week to a 100L Cybersecurity student', () => {
    mocks.profile = { department: 'cybersecurity', level: 100 };
    renderPage();
    expect(screen.getByRole('heading', { name: 'Your timetable' })).toBeTruthy();
    expect(screen.getAllByText('MTH 111').length).toBe(2);
    expect(screen.getByText(/Before you rely on this/)).toBeTruthy();
  });

  it('shows a polite message to anyone else', () => {
    mocks.profile = { department: 'cybersecurity', level: 300 };
    renderPage();
    expect(screen.queryByRole('heading', { name: 'Your timetable' })).toBeNull();
    expect(screen.getByText(/100 Level Cybersecurity students/)).toBeTruthy();
  });
});
