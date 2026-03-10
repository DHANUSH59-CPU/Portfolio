import { motion } from 'framer-motion';
import './Skills.css';

const Skills = ({ data = [] }) => {
  const circumference = 2 * Math.PI * 28; // radius = 28

  return (
    <section className="skills section" id="skills">
      {/* SVG gradient definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// Skills</span>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-subtitle">Technologies and tools I use to bring ideas to life</p>
        </motion.div>

        <div className="skills-grid">
          {data.map((skill, index) => {
            const offset = circumference - (skill.proficiency / 100) * circumference;
            return (
              <motion.div
                key={skill._id || index}
                className="skill-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="skill-ring-wrapper">
                  <svg width="100%" height="100%" viewBox="0 0 64 64">
                    <circle className="skill-ring-bg" cx="32" cy="32" r="28" />
                    <motion.circle
                      className="skill-ring-progress"
                      cx="32"
                      cy="32"
                      r="28"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset: offset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + index * 0.06 }}
                    />
                  </svg>
                  <div className="skill-percentage">{skill.proficiency}%</div>
                </div>
                <div className="skill-name">{skill.name}</div>
                {skill.category && <div className="skill-category">{skill.category}</div>}
              </motion.div>
            );
          })}
        </div>

        {data.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 40 }}>
            No skills added yet. Add them from the admin panel.
          </p>
        )}
      </div>
    </section>
  );
};

export default Skills;
