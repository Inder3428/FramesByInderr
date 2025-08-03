import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import PortfolioCategory from './pages/PortfolioCategory';

const PageTitle = () => {
  const location = useLocation();
  const getTitle = () => {
    const path = location.pathname;
    const baseTitle = "Inderpreet Singh Photography";
    
    if (path === "/") return baseTitle;
    if (path.startsWith("/work/")) {
      const category = path.split("/").pop();
      return `${category?.charAt(0).toUpperCase()}${category?.slice(1)} Photography - ${baseTitle}`;
    }
    const page = path.slice(1);
    return `${page.charAt(0).toUpperCase()}${page.slice(1)} - ${baseTitle}`;
  };

  return (
    <Helmet>
      <title>{getTitle()}</title>
    </Helmet>
  );
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PageTitle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:category" element={<PortfolioCategory />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;