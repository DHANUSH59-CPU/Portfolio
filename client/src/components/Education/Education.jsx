import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiAward } from 'react-icons/fi';
import './Education.css';

const Education = ({ data = [] }) => {
  const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section className="education section" id="education">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// Education</span>
          <h2 className="section-title">My Education</h2>
        </motion.div>

        <div className="education-grid">
          {sorted.map((edu, index) => (
            <motion.div
              key={edu._id || index}
              className="education-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="education-icon">
                <FiBookOpen />
              </div>
              <h3 className="education-degree">{edu.degree}</h3>
              {edu.field && <p className="education-field">{edu.field}</p>}
              <p className="education-institution">{edu.institution}</p>

              <div className="education-meta">
                <span className="education-meta-item">
                  <FiCalendar /> {edu.duration}
                </span>
                {edu.grade && (
                  <span className="education-grade">
                    <FiAward /> {edu.grade}
                  </span>
                )}
              </div>

              {edu.description && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.7 }}>
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {data.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 40 }}>
            No education added yet. Add entries from the admin panel.
          </p>
        )}
      </div>
    </section>
  );
};

export default Education;
