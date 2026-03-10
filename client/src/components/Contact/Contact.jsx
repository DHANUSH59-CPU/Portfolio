import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiDownload, FiCode } from 'react-icons/fi';
import './Contact.css';

const Contact = ({ data }) => {
  const socialLinks = [
    { icon: <FiGithub />, url: data?.github, label: 'GitHub' },
    { icon: <FiLinkedin />, url: data?.linkedin, label: 'LinkedIn' },
    { icon: <FiTwitter />, url: data?.twitter, label: 'Twitter' },
    { icon: <FiCode />, url: data?.leetcode, label: 'LeetCode' },
  ].filter((link) => link.url);

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// Contact</span>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <motion.div
          className="contact-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="contact-tagline">
            {data?.tagline || "Let's build something amazing together!"}
          </p>
          <p className="contact-description">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {data?.email && (
            <a href={`mailto:${data.email}`} className="contact-email">
              <FiMail /> {data.email}
            </a>
          )}

          <div className="contact-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                aria-label={link.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {data?.resume && (
            <motion.a
              href="/api/contact/resume"
              download
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiDownload /> Download Resume
            </motion.a>
          )}

          {data?.location && (
            <div className="contact-location">
              <FiMapPin /> {data.location}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
