import { useState, useEffect } from 'react';
import { Link as ScrollLink, Events, scrollSpy } from 'react-scroll';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);
      setHidden(currentScroll > lastScroll && currentScroll > 200);
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollSpy.update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, [lastScroll]);

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
        <div className="navbar-inner">
          <ScrollLink to="hero" smooth duration={800} className="navbar-logo">
            <span className="logo-bracket">&lt;</span>
            DK
            <span className="logo-bracket"> /&gt;</span>
          </ScrollLink>

          <div className="navbar-links">
            {sections.slice(1).map((section) => (
              <ScrollLink
                key={section.id}
                to={section.id}
                spy
                smooth
                duration={800}
                offset={-70}
                className={`navbar-link ${activeSection === section.id ? 'active' : ''}`}
                onSetActive={handleSetActive}
              >
                {section.label}
              </ScrollLink>
            ))}
          </div>

          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
            <ScrollLink to="contact" smooth duration={800} offset={-70} className="navbar-cta">
              Let's Talk
            </ScrollLink>
            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {sections.map((section) => (
          <ScrollLink
            key={section.id}
            to={section.id}
            spy
            smooth
            duration={800}
            offset={-70}
            className="navbar-link"
            onClick={() => setMobileOpen(false)}
          >
            {section.label}
          </ScrollLink>
        ))}
      </div>

      {/* Side dots navigation */}
      <div className="side-dots">
        {sections.map((section) => (
          <ScrollLink
            key={section.id}
            to={section.id}
            spy
            smooth
            duration={800}
            offset={-70}
            className={`side-dot ${activeSection === section.id ? 'active' : ''}`}
            data-label={section.label}
            onSetActive={handleSetActive}
          />
        ))}
      </div>
    </>
  );
};

export default Navbar;
