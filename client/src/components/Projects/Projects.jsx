import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import './Projects.css';

const Projects = ({ data = [] }) => {
  const cardRefs = useRef([]);

  useEffect(() => {
    // Apply vanilla-tilt manually if available
    const loadTilt = async () => {
      try {
        const VanillaTilt = (await import('vanilla-tilt')).default;
        cardRefs.current.forEach((el) => {
          if (el) {
            VanillaTilt.init(el, {
              max: 8,
              speed: 400,
              glare: true,
              'max-glare': 0.15,
              perspective: 1000,
            });
          }
        });
      } catch {
        // vanilla-tilt not installed, skip 3D tilt
      }
    };
    loadTilt();
  }, [data]);

  const sorted = [...data].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.order || 0) - (b.order || 0);
  });

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// Projects</span>
          <h2 className="section-title">What I've Built</h2>
          <p className="section-subtitle">A showcase of my recent work and side projects</p>
        </motion.div>

        <div className="projects-grid">
          {sorted.map((project, index) => (
            <motion.div
              key={project._id || index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="placeholder">{project.title?.slice(0, 2)?.toUpperCase() || '📁'}</div>
                )}
                {project.featured && <span className="featured-badge">Featured</span>}
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {project.techStack?.length > 0 && (
                  <div className="project-tech">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                )}

                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FiGithub /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FiExternalLink /> Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {data.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 40 }}>
            No projects added yet. Add them from the admin panel.
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;
