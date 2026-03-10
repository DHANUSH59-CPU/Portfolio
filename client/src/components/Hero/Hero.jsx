import { useEffect, useState, useMemo, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { TypeAnimation } from 'react-type-animation';
import { Link as ScrollLink } from 'react-scroll';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = ({ data }) => {
  const { theme } = useTheme();
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const particlesOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, width: 1920, height: 1080 } },
        color: { value: theme === 'dark' ? '#00D4FF' : '#0099CC' },
        links: {
          enable: true,
          color: theme === 'dark' ? '#00D4FF' : '#0099CC',
          distance: 150,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          outModes: 'bounce',
        },
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 1, max: 3 } },
        shape: { type: 'circle' },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.4 } },
          push: { quantity: 2 },
        },
      },
      detectRetina: true,
    }),
    [theme]
  );

  const particlesLoaded = useCallback((container) => {}, []);

  // Build typing sequence from titles
  const typingSequence = data?.titles
    ? data.titles.flatMap((title) => [title, 2000])
    : ['AI Engineer', 2000, 'Full-Stack Developer', 2000];

  return (
    <section className="hero" id="hero">
      {engineReady && (
        <Particles
          className="hero-particles"
          id="hero-particles"
          options={particlesOptions}
          particlesLoaded={particlesLoaded}
        />
      )}

      <div className="hero-content visible">
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {data?.greeting || "Hello, I'm"}
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {data?.name || 'Dhanush Kumar S R'}
        </motion.h1>

        <motion.div
          className="hero-titles"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="hero-title-prefix">I'm a</span>
          <TypeAnimation
            sequence={typingSequence}
            speed={50}
            deletionSpeed={40}
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {data?.subtitle || 'Passionate about building intelligent systems and beautiful web experiences.'}
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <ScrollLink to="projects" smooth duration={800} offset={-70} className="btn-primary">
            View Projects <FiArrowRight />
          </ScrollLink>
          <a href="/api/contact/resume" download className="btn-secondary">
            <FiDownload /> Download Resume
          </a>
        </motion.div>
      </div>

      <ScrollLink to="about" smooth duration={800} offset={-70} className="hero-scroll-indicator">
        <div className="scroll-mouse" />
        <span>SCROLL</span>
      </ScrollLink>
    </section>
  );
};

export default Hero;
