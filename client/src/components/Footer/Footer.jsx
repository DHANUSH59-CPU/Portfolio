import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FiGithub, FiLinkedin, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

const Footer = ({ contact }) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-text">
            Designed & Built by <span className="highlight">Dhanush Kumar S R</span> © {new Date().getFullYear()}
          </p>
          <div className="footer-links">
            {contact?.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="footer-social">
                <FiGithub />
              </a>
            )}
            {contact?.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social">
                <FiLinkedin />
              </a>
            )}
          </div>
        </div>
      </footer>

      <ScrollLink to="hero" smooth duration={800} className={`back-to-top ${showTop ? 'visible' : ''}`}>
        <FiArrowUp />
      </ScrollLink>
    </>
  );
};

export default Footer;
