'use client';
import { useEffect, useState } from 'react';
import styles from './Services.module.scss';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, faMobileScreen, faPaintBrush, 
  faChartLine, faServer, faShieldHalved 
} from '@fortawesome/free-solid-svg-icons';
import { apiService, Service } from '@/services/api';

const iconMap: { [key: string]: any } = {
  faCode,
  faMobileScreen,
  faPaintBrush,
  faChartLine,
  faServer,
  faShieldHalved,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiService.getServices();
        if (Array.isArray(response)) {
          setServices(response);
        } else {
          console.error('Invalid response format:', response);
          setError('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading services...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.sectionHeader}
        >
          <h2>Our Services</h2>
          <p>Explore our comprehensive range of services designed to meet your business needs</p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.serviceCard}
              >
                <div className={styles.icon}>
                  <FontAwesomeIcon 
                    icon={iconMap[service.icon]} 
                    size="2x" 
                  />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))
          ) : (
            <div className={styles.noServices}>No services available</div>
          )}
        </div>
      </div>
    </section>
  );
}
