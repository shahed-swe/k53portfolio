'use client';
import { useEffect, useState } from 'react';
import styles from './Team.module.scss';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { apiService, Employee } from '@/services/api';
import Image from 'next/image';

export default function Team() {
  const [team, setTeam] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await apiService.getEmployees();
        if (Array.isArray(response)) {
          setTeam(response);
        } else {
          console.error('Invalid response format:', response);
          setError('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching team:', error);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading team members...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section id="team" className={styles.team}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.sectionHeader}
        >
          <h2>Our Team</h2>
          <p>Meet our talented team of professionals</p>
        </motion.div>

        <div className={styles.teamGrid}>
          {team && team.length > 0 ? (
            team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.teamCard}
              >
                <div className={styles.imageWrapper}>
                  {member.image && (
                    <Image
                      src={`${member.image}`}
                      alt={member.name}
                      width={300}
                      height={300}
                      className={styles.memberImage}
                    />
                  )}
                  <div className={styles.socialLinks}>
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    )}
                    {member.twitter_url && (
                      <a href={member.twitter_url} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    )}
                    {member.github_url && (
                      <a href={member.github_url} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    )}
                  </div>
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.designation}>{member.designation}</p>
                  <p className={styles.bio}>{member.bio}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={styles.noTeam}>No team members available</div>
          )}
        </div>
      </div>
    </section>
  );
}
