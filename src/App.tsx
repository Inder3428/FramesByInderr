// src/App.tsx
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Keep Layout eager (it’s tiny + needed for all routes)
import Layout from './components/Layout';

// Code-split pages (smaller initial bundle)
const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PortfolioCategory = lazy(() => import('./pages/PortfolioCategory'));

// --------------------------------------------
// Utilities
// --------------------------------------------
const capitalize = (s: string | undefined | null) =>
  (s?.charAt(0).toUpperCase() || '') + (s?.slice(1) || '');

const friendlyCategory = (slug: string | undefined) => {
  if (!slug) return '';
  // Map slugs to nicer titles if needed
  const map: Record<string, string> = {
    portraits: 'Portraits',
    street: 'Street',
    wedding: 'Wedding',
    events: 'Events',
  };
  return map[slug] || capitalize(slug);
};

// --------------------------------------------
// ScrollToTop on route change
// --------------------------------------------
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // small delay allows layout to mount before jumping
    const id = window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}

// --------------------------------------------
// Dynamic <title> and helpful meta per route
// --------------------------------------------
function PageTitle() {
  const location = useLocation();
  const path = location.pathname;
  const base = 'Inderpreet Singh Photography';

  let title = base;
  let desc =
    'Explore the portfolio of Inderpreet Singh — portraits, street, events, and more. Professional photography in NYC with a cinematic touch.';

  if (path === '/') {
    title = base;
  } else if (path === '/work') {
    title = `Selected Work - ${base}`;
    desc = 'Selected works across portraits, street, and commercial projects.';
  } else if (path.startsWith('/work/')) {
    const category = friendlyCategory(path.split('/').pop());
    title = `${category} Photography - ${base}`;
    desc = `Browse ${category.toLowerCase()} photography by Inderpreet Singh: curated shots, cinematic edits, and authentic storytelling.`;
  } else if (path === '/about') {
    title = `About - ${base}`;
    desc = 'Meet Inderpreet Singh — NYC-based visual storyteller. Approach, gear, and philosophy.';
  } else if (path === '/contact') {
    title = `Contact - ${base}`;
    desc = 'Start a project, book a session, or say hi. Let’s build something cinematic together.';
  }

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={desc} />
      {/* Optional: keep canonical simple for SPA; customize if you have per-route canonical needs */}
      {/* <link rel="canonical" href={`https://inderpreet.com${path}`} /> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}

// --------------------------------------------
// Route-level Suspense fallback
// --------------------------------------------
function Fallback() {
  return (
    <div className="min-h-[40vh] grid place-items-center text-sm text-white/70">
      Loading…
    </div>
  );
}

// Optional 404
function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-center text-white px-6">
      <div>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide mb-4">404 — Not Found</h1>
        <p className="text-white/70">The page you’re looking for doesn’t exist.</p>
      </div>
    </div>
  );
}

// --------------------------------------------
// App
// --------------------------------------------
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <PageTitle />
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="work" element={<Work />} />
              <Route path="work/:category" element={<PortfolioCategory />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
