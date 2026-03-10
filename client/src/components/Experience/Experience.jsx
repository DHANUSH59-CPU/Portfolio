import { motion } from 'framer-motion';
import './Experience.css';

const Experience = ({ data = [] }) => {
  const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// Experience</span>
          <h2 className="section-title">Where I've Worked</h2>
        </motion.div>

        <div className="timeline">
          {sorted.map((exp, index) => (
            <motion.div
              key={exp._id || index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-duration">{exp.duration}</div>
                <h3 className="timeline-role">{exp.role}</h3>
                <p className="timeline-company">{exp.company}</p>
                {exp.description && (
                  <p className="timeline-description">{exp.description}</p>
                )}
                {exp.techStack?.length > 0 && (
                  <div className="timeline-tech">
                    {exp.techStack.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {data.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 40 }}>
            No experience added yet. Add entries from the admin panel.
          </p>
        )}
      </div>
    </section>
  );
};

export default Experience;
