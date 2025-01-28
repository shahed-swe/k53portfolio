'use client';
import { useEffect, useState } from 'react';
import styles from './Work.module.scss';
import { motion } from 'framer-motion';
import { apiService, Project } from '@/services/api';
import Image from 'next/image';

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiService.getProjects();
        if (Array.isArray(response)) {
          setProjects(response);
          setFilteredProjects(response);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(response.map(project => project.category))
          );
          setCategories(['all', ...uniqueCategories]);
        } else {
          console.error('Invalid response format:', response);
          setError('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filterProjects = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading projects...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section id="work" className={styles.work}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.sectionHeader}
        >
          <h2>Our Work</h2>
          <p>Explore our latest projects and achievements</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.categories}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => filterProjects(category)}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.active : ''
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        <div className={styles.projectsGrid}>
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.projectCard}
              >
                <div className={styles.imageWrapper}>
                  {project.image && (
                    <Image
                      src={`${project.image}`}
                      alt={project.title}
                      width={400}
                      height={300}
                      className={styles.projectImage}
                    />
                  )}
                  <div className={styles.overlay}>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      View Project
                    </a>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p className={styles.category}>{project.category}</p>
                  <p className={styles.description}>{project.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={styles.noProjects}>No projects available</div>
          )}
        </div>
      </div>
    </section>
  );
}
