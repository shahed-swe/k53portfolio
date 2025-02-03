import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Clients.module.scss';

const Clients = () => {
  const clients = [
    { name: 'Square Bear', logo: '/images/clients/square-bear.png' },
    { name: 'Reliance', logo: '/images/clients/reliance.png' },
    { name: 'Allianz', logo: '/images/clients/allianz.png' },
    { name: 'Ambition', logo: '/images/clients/ambition.png' },
    { name: 'Ziksu', logo: '/images/clients/ziksu.png' },
    { name: 'Stropro', logo: '/images/clients/stropro.png' },
    { name: 'Study Space', logo: '/images/clients/study-space.png' },
    { name: 'Mr Inky', logo: '/images/clients/mr-inky.png' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className={styles.clients}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Trusted by Industry Leaders</h2>
          <p className={styles.subtitle}>
            We're proud to work with companies that are shaping the future
          </p>
        </motion.div>

        <motion.div
          className={styles.logoGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className={styles.logoWrapper}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.logoInner}>
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={120}
                  height={120}
                  className={styles.logo}
                />
                <div className={styles.overlay}>
                  <span className={styles.clientName}>{client.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.partner}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.partnerContent}>
            <span className={styles.partnerText}>Strategic Partner</span>
            <Image
              src="/images/clients/realtime-logo.png"
              alt="Real Time logo"
              width={120}
              height={30}
              className={styles.realtimeLogo}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
