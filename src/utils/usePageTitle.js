import { useEffect } from 'react';

const DEFAULT_TITLE = 'Areté — Excellence, Engineered.';
const DEFAULT_DESCRIPTION =
  'Academic companion for University of Uyo students — every course from 100L to 400L, interactive Java, Python & C tracks, and an AI tutor that knows the curriculum.';
const SITE_URL = 'https://www.aretecyb.tech';

// Sets the document title for the current page and restores the default on
// unmount so the SPA's tab label always matches what's on screen.
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Areté` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// Title plus the two head tags that actually differ per page in a search
// result: the meta description and the canonical URL.
//
// A single static index.html would otherwise give every client-navigated route
// the landing page's description and a canonical pointing at "/", which tells
// Google that /courses/cyb-224 is a duplicate of the home page. The prerendered
// files already carry the right values in their bytes — this keeps them right
// after a client-side navigation, and for routes that are not prerendered.
//
// Unlike usePageTitle, `title` is used VERBATIM — no " · Areté" suffix. These
// are the prerendered pages, and scripts/prerender.mjs writes the same string
// into the served bytes; appending a suffix here would have Google's crawl
// see one title and its render pass see another.
export function usePageMeta(title, description, path) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `${SITE_URL}${path || '/'}`;

    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', title || DEFAULT_TITLE);
    setMeta('meta[name="twitter:title"]', 'content', title || DEFAULT_TITLE);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('meta[name="description"]', 'content', DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:description"]', 'content', DEFAULT_DESCRIPTION);
      setMeta('meta[name="twitter:description"]', 'content', DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:title"]', 'content', DEFAULT_TITLE);
      setMeta('meta[name="twitter:title"]', 'content', DEFAULT_TITLE);
      setMeta('meta[property="og:url"]', 'content', `${SITE_URL}/`);
      setMeta('link[rel="canonical"]', 'href', `${SITE_URL}/`);
    };
  }, [title, description, path]);
}
