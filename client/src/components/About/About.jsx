import { motion } from 'framer-motion';
import './About.css';

const About = ({ data }) => {
  return (
    <section className="about section" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// About Me</span>
          <h2 className="section-title">Who I Am</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about-image-frame">
              {data?.image ? (
                <img src={data.image} alt="Profile" />
              ) : (
                <div className="placeholder-avatar">DK</div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3>
              Building the future with <span className="gradient-text">AI & Code</span>
            </h3>
            <p className="about-description">
              {data?.description ||
                'I am an AI Engineer with a passion for building intelligent systems. Update this section from the admin panel with your own content.'}
            </p>

            {data?.highlights && data.highlights.length > 0 && (
              <div className="about-highlights">
                {data.highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    className="highlight-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="highlight-value">{item.value}</div>
                    <div className="highlight-label">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
