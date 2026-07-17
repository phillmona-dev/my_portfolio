import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const navItems = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Tech Stack', to: 'tech' },
  { label: 'Projects', to: 'projects' },
  { label: 'Odoo ERP', to: 'odoo' },
  { label: 'Interop', to: 'interop' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="nav-logo">
            Philly<span>.</span>dev
          </div>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={600}
                  offset={-70}
                  activeClass="active"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              id="theme-toggle-btn"
            >
              <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`} />
            </button>
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              id="hamburger-btn"
            >
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`} />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              duration={600}
              offset={-70}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
