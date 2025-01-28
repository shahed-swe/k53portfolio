import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faRocket, faUsers, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './About.module.scss';

const About = () => {
  const values = [
    {
      icon: faLightbulb,
      title: 'Innovation',
      description: 'We stay ahead of the curve with cutting-edge solutions.',
    },
    {
      icon: faRocket,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do.',
    },
    {
      icon: faUsers,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership.',
    },
    {
      icon: faHeart,
      title: 'Passion',
      description: 'We are passionate about creating impactful solutions.',
    },
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>About Us</h2>
          <p className={styles.subtitle}>
            We're a team of passionate individuals dedicated to creating innovative
            digital solutions that help businesses thrive in the modern world.
          </p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.story}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Our Story</h3>
            <p>
              Founded in 2020, we started with a simple mission: to help businesses
              transform their digital presence. Since then, we've grown into a
              full-service digital agency, working with clients worldwide to create
              beautiful, functional, and impactful digital solutions.
            </p>
            <p>
              Our team brings together expertise in design, development, and
              strategy to deliver exceptional results for our clients. We believe in
              building long-term partnerships and helping our clients succeed in
              their digital journey.
            </p>
          </motion.div>

          <div className={styles.values}>
            <h3>Our Values</h3>
            <div className={styles.valueGrid}>
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                >
                  <div className={styles.iconWrapper}>
                    <FontAwesomeIcon icon={value.icon} />
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
