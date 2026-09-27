import AboutPreview from '../components/AboutPreview';
import { usePageMeta } from '../utils/usePageTitle';
import { aboutTitle, aboutDescription } from '../data/publicCatalogue';

// /about renders the same component the prerenderer bakes into
// dist/about/index.html. Unlike /install — whose page has a tab picker the
// static version cannot have — there is nothing interactive here, so the page
// and its no-JS face are the same markup rather than two things that have to be
// kept saying the same thing.
//
// usePageMeta, not usePageTitle: the title is used verbatim and the canonical
// has to point at /about after a client-side navigation, or the SPA hands
// Google the home page's canonical for this URL.
export default function About() {
  usePageMeta(aboutTitle(), aboutDescription(), '/about');
  return <AboutPreview />;
}
