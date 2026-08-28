import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoursePreview from '../components/CoursePreview';
import CourseIndexPreview from '../components/CourseIndexPreview';
import {
  loadPublicCourses,
  courseTitle,
  courseDescription,
  indexTitle,
  indexDescription,
  groupByLevel,
} from '../data/publicCatalogue';
import { usePageMeta } from '../utils/usePageTitle';

// What a signed-out visitor sees at /courses and /courses/:slug. The same two
// components are rendered into static HTML at build time by
// scripts/prerender.mjs, so this page's job on the client is only to reproduce
// what the crawler already got — which is why it must not diverge from the
// prerendered output.
//
// Resolves against every authored catalogue rather than through useCatalogue:
// that hook keys off the signed-in student's profile department, and there is
// no profile here. A Data Science-only course would 404 for a visitor who has
// never signed in — exactly the visitor this page exists for.

export default function CoursePublic() {
  const { slug } = useParams();
  const [entries, setEntries] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    loadPublicCourses()
      .then((list) => { if (active) setEntries(list); })
      // A failed dynamic import (stale chunk after a deploy, offline) must not
      // leave the page on its skeleton forever.
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);

  const entry = slug && entries ? entries.find((e) => e.course.slug === slug) : null;

  // Must match what scripts/prerender.mjs baked into this page's head, or the
  // crawl and the render pass disagree about the title. Both read the strings
  // from publicCatalogue.js for that reason.
  usePageMeta(
    slug ? (entry ? courseTitle(entry.course) : null) : indexTitle(),
    slug ? (entry ? courseDescription(entry.course) : undefined) : indexDescription(entries?.length ?? 0),
    slug ? `/courses/${slug}` : '/courses',
  );

  if (failed) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-coffee-800 mb-6">Course data could not be loaded.</p>
        <button onClick={() => window.location.reload()} className="btn-primary text-sm">
          Reload page
        </button>
      </div>
    );
  }

  if (!entries) return <PreviewSkeleton />;

  if (slug) {
    if (!entry) return <CourseNotFound />;
    const siblings = entries
      .filter((e) => e.course.level === entry.course.level)
      .map((e) => e.course);
    return <CoursePreview course={entry.course} department={entry.department} siblings={siblings} />;
  }

  return <CourseIndexPreview groups={groupByLevel(entries)} />;
}

function CourseNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-coffee-500 mb-3">404</p>
      <h1 className="display-heading text-3xl text-ink mb-3">Course not found</h1>
      <p className="text-coffee-700 mb-8">
        No course on Areté uses that code. Browse the full outline instead.
      </p>
      <a href="/courses" className="btn-primary text-sm">All courses</a>
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-pulse" role="status" aria-label="Loading course">
      <div className="h-4 w-40 bg-coffee-100 rounded mb-6" />
      <div className="h-10 w-2/3 bg-coffee-100 rounded mb-4" />
      <div className="h-4 w-full bg-coffee-100 rounded mb-2" />
      <div className="h-4 w-5/6 bg-coffee-100 rounded mb-10" />
      <div className="h-40 bg-coffee-100 rounded-xl" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
