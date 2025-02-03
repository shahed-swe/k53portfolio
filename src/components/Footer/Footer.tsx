import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.company}>
            <div className={styles.logoContainer}>
              <Image
                src="/images/k53logo.png"
                alt="K53 Tech Logo"
                width={40}
                height={40}
                className={styles.logoImage}
              />
              <h3 className={styles.logo}>K53 Tech</h3>
            </div>
            <p className={styles.description}>
              Empowering businesses with innovative digital solutions and cutting-edge technology.
            </p>
            <div className={styles.social}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <Link href="#services">Services</Link>
            <Link href="#work">Our Work</Link>
            <Link href="#about">About Us</Link>
            <Link href="#contact">Contact</Link>
          </div>

          <div className={styles.links}>
            <h4>Services</h4>
            <Link href="#web-development">Web Development</Link>
            <Link href="#mobile-apps">Mobile Apps</Link>
            <Link href="#ui-design">UI/UX Design</Link>
            <Link href="#consulting">Consulting</Link>
          </div>

          <div className={styles.contact}>
            <h4>Contact Us</h4>
            <p>123 Business Street</p>
            <p>New York, NY 10001</p>
            <p>contact@k53tech.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} K53 Tech. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
