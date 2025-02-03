import React from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/Services';
import Work from '@/components/Work/Work';
import About from '@/components/About/About';
import Team from '@/components/Team/Team';
import Contact from '@/components/Contact/Contact';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';
import Clients from '@/components/Clients/Clients';

export default function Home() {
  return (
    <>
      <Head>
        <title>Company Name - Modern Solutions for Modern Problems</title>
        <meta name="description" content="We create innovative digital solutions that help businesses grow and succeed in the modern world." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Services />
      <Work />
      <WhyChooseUs />
      <Clients />
      <About />
      <Team />
      <Contact />
    </>
  );
}
