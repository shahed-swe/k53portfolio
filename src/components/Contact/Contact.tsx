import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Contact.module.scss';

const Contact = () => {
  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: 'Visit Us',
      content: '123 Business Street, New York, NY 10001',
    },
    {
      icon: faPhone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
    },
    {
      icon: faEnvelope,
      title: 'Email Us',
      content: 'contact@company.com',
    },
    {
      icon: faClock,
      title: 'Working Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Contact Us</h2>
          <p className={styles.subtitle}>
            Get in touch with us to discuss your project or any questions you may have.
          </p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.contactForm}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Send us a Message</h3>
            <form>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className={styles.formGroup}>
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className={styles.formGroup}>
                <input type="text" placeholder="Subject" required />
              </div>
              <div className={styles.formGroup}>
                <textarea placeholder="Your Message" rows={6} required></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Contact Information</h3>
            <div className={styles.infoGrid}>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className={styles.infoCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                >
                  <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={info.icon} />
                  </div>
                  <h4>{info.title}</h4>
                  <p>{info.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
