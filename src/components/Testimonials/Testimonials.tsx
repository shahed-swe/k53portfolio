import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/swiper.scss';
import styles from './Testimonials.module.scss';

const Testimonials = () => {
  const testimonials = [
    {
      content: "K53 has truly been a game-changer for me. They continually enhance their software to meet the evolving needs of businesses, which gives me confidence that I am investing in a future-proof solution.",
      author: "ARJUNA VIJAYANAYAGAM",
      position: "CEO - SQUAREBEAR",
      company: "squarebear",
      logo: "/images/clients/square-bear.png"
    },
    {
      content: "The services and support K53 have offered me have been nothing short of outstanding. I have had the pleasure of working with some of the most dedicated professionals in the industry and the K53 team is on-par; responsive, knowledgeable, and always ready to assist.",
      author: "FARUK AHMED SHOHAN",
      position: "DIRECTOR - NETTVERK",
      company: "nettverk",
      logo: "/images/clients/nettverk.png"
    },
    {
      content: "K53's level of customization and attention to detail set them apart from other companies in the industry. Our team experienced a noticeable increase in productivity and a reduction in downtime, which had a direct and positive impact on our bottom line.",
      author: "RAY FLEMING",
      position: "CEO - GIGIDY",
      company: "gigidy",
      logo: "/images/clients/gigidy.png"
    },
    {
      content: "I had the idea to create a custom accounting software and K53 made the dream possible. Their attention to detail, communication and deliverability were all first class.",
      author: "ABU SIDDIQUE",
      position: "CEO - AMBITION ACCOUNTING",
      company: "ambition",
      logo: "/images/clients/ambition.png"
    }
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Testimonials</h2>
          <p className={styles.subtitle}>What our clients say about us</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sliderContainer}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className={styles.testimonialCard}>
                  <div className={styles.content}>
                    <div className={styles.quote}>"</div>
                    <p className={styles.text}>{testimonial.content}</p>
                  </div>
                  <div className={styles.author}>
                    <div className={styles.authorInfo}>
                      <h4 className={styles.name}>{testimonial.author}</h4>
                      <p className={styles.position}>{testimonial.position}</p>
                    </div>
                    <div className={styles.companyLogo}>
                      <Image
                        src={testimonial.logo}
                        alt={`${testimonial.company} logo`}
                        width={40}
                        height={40}
                        className={styles.logo}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
