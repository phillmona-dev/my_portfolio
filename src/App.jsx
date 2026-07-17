import { useState, useEffect } from 'react';
import './App.css';

import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import About    from './components/About';
import TechStack from './components/TechStack';
import Projects      from './components/Projects';
import OdooProjects from './components/OdooProjects';
import Interop       from './components/Interop';
import Contact   from './components/Contact';
import Footer    from './components/Footer';
import AiChat    from './components/AiChat';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });
  const [showTop, setShowTop] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <OdooProjects />
        <Interop />
        <Contact />
      </main>

      <Footer />

      {/* AI Chat Widget */}
      <AiChat />

      {/* Scroll-to-top button */}
      <button
        className={`scroll-top ${showTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        id="scroll-top-btn"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}
