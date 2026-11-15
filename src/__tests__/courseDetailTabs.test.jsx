import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mocks = vi.hoisted(() => ({ course: null, notes: [] }));

vi.mock('../data/useCatalogue', () => ({
  useCatalogue: () => ({
    status: 'ready',
    department: { slug: 'cybersecurity' },
    catalogue: { courses: [mocks.course], getCourseBySlug: () => mocks.course },
  }),
}));
vi.mock('../components/useLectureNotes', () => ({
  useLectureNotes: () => ({ status: 'ready', notes: mocks.notes, hasNotes: mocks.notes.length > 0 }),
}));
vi.mock('../data/lectureNotes/index.js', () => ({ noteTopicCount: () => mocks.notes.length }));
vi.mock('../components/useReadingProgress', () => ({ useReadingProgress: () => ({ isRead: () => false }) }));
vi.mock('../components/useExplanations', () => ({ useExplanations: () => null }));
vi.mock('../utils/apiClient', () => ({ useApiAvailability: () => 'unavailable' }));
vi.mock('../components/LectureNotes', () => ({ default: () => <div>NOTES BODY</div> }));
vi.mock('../components/CodeWalkthrough', () => ({ default: () => <div>WALKTHROUGH BODY</div> }));
vi.mock('../components/CourseQuiz', () => ({ default: () => <div>QUIZ BODY</div> }));
vi.mock('../components/CourseExamPrep', () => ({ default: () => <div>EXAM BODY</div> }));
vi.mock('../components/CourseMaterials', () => ({ default: () => <div>MATERIALS BODY</div> }));
vi.mock('../components/CourseAIChat', () => ({ default: () => null }));
vi.mock('../components/ExplainSelection', () => ({ default: ({ children }) => children }));

import CourseDetail from '../pages/CourseDetail';

const baseCourse = {
  slug: 'tst-101', code: 'TST 101', title: 'Testing', level: 100, semester: 1, units: 2,
  subject: 'cs', description: 'A course.', topics: ['One'], textbooks: [], searchTerms: [], studyTips: [],
};
const LISTING = [
  'public class Hello {',
  '    public static void main(String[] args) {',
  '        int total = 0;',
  '        for (int i = 1; i <= 5; i++) {',
  '            total += i;',
  '        }',
  '        System.out.println("Total: " + total);',
  '    }',
  '}',
].join('\n');
const codeTopic = { number: 1, title: 'Practical', sections: [{ type: 'code', language: 'java', code: LISTING }] };

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/courses/tst-101']}>
      <Routes><Route path="/courses/:slug" element={<CourseDetail />} /></Routes>
    </MemoryRouter>,
  );
}

describe('course page tabs', () => {
  beforeEach(() => {
    localStorage.clear();
    mocks.notes = [];
    mocks.course = { ...baseCourse };
  });

  it('groups everything under Learn, Practice and About this course', () => {
    mocks.notes = [codeTopic];
    mocks.course = { ...baseCourse, quiz: [{}, {}], examPrep: [{}] };
    renderPage();
    const tabs = ['Learn', 'Practice', 'About this course'];
    for (const name of tabs) expect(screen.getByRole('button', { name: new RegExp(`^${name}`) })).toBeInTheDocument();
    for (const gone of ['Practice Quiz', 'Written Exam Prep', 'Code Walkthrough', 'Materials', 'Study Resources']) {
      expect(screen.queryByRole('button', { name: new RegExp(gone) })).not.toBeInTheDocument();
    }
  });

  it('opens a course with notes on the notes, with a practicals-only switch', () => {
    mocks.notes = [codeTopic];
    renderPage();
    expect(screen.getByText('NOTES BODY')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Practicals only/ }));
    expect(screen.getByText('WALKTHROUGH BODY')).toBeInTheDocument();
    expect(screen.queryByText('NOTES BODY')).not.toBeInTheDocument();
  });

  it('puts both question formats inside Practice', () => {
    mocks.notes = [codeTopic];
    mocks.course = { ...baseCourse, quiz: [{}, {}], examPrep: [{}] };
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /^Practice/ }));
    expect(screen.getByText('QUIZ BODY')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Written · 1/ }));
    expect(screen.getByText('EXAM BODY')).toBeInTheDocument();
  });

  it('shows uploaded materials under About this course', () => {
    mocks.notes = [codeTopic];
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: /^About this course/ }));
    expect(screen.getByText('MATERIALS BODY')).toBeInTheDocument();
  });

  it('shows no tab bar for a course with only an outline', () => {
    renderPage();
    expect(screen.queryByRole('button', { name: /^About this course/ })).not.toBeInTheDocument();
    expect(screen.getByText('MATERIALS BODY')).toBeInTheDocument();
  });

  it('honours a tab remembered under the old six-tab layout', () => {
    mocks.notes = [codeTopic];
    mocks.course = { ...baseCourse, quiz: [{}], examPrep: [{}] };
    localStorage.setItem('arete-course-tab', JSON.stringify({ 'tst-101': 'exam' }));
    renderPage();
    expect(screen.getByText('EXAM BODY')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Practice/ })).toHaveAttribute('aria-pressed', 'true');
  });
});
