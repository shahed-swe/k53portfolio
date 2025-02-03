import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faComments, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import styles from './WhyChooseUs.module.scss';

const WhyChooseUs = () => {
  const features = [
    {
      icon: faCoins,
      title: 'Cost Transparency',
      description: 'Detailed budgets that account for all expenses and provide clear cost breakdowns.'
    },
    {
      icon: faComments,
      title: 'Unmatched Communication',
      description: 'Onshore & Virtual assistance. Talk to us about any concerns, 24/7.'
    },
    {
      icon: faShieldHalved,
      title: 'Flawless Security',
      description: 'Up-to-date data privacy compliance and secure data sharing methods.'
    }
  ];

  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why K53?</h2>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={feature.icon} className={styles.icon} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
