'use client';

import ReadMoreBtn from '@/components/ui/ReadMoreBtn';

import { inter, kodchasan } from '@/app/fonts';

import { motion } from 'motion/react';

import ExperienceCard from './ExperienceCard';

import { ExperienceCardsData } from '@/features/our-experience/types';

const OurExperienceClient = ({
  experienceCardsData,
}: {
  experienceCardsData: ExperienceCardsData[];
}) => {
  const leftColumnCardCount = Math.ceil(experienceCardsData.length / 2);

  return (
    <div>
      <section className="bg-charcoal-700 pt-16 pl-4 pr-2 flex flex-col lg:grid lg:grid-cols-[1fr_2fr] lg:gap-x-12 lg:-center">
        {/* Sticky Section */}
        <div className="lg:sticky top-28 mb-18 h-min">
          <motion.h2
            className="title-sm-text"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            viewport={{ amount: 1, once: true }}
          >
            Our Experience
          </motion.h2>

          <motion.h3
            className={inter.className + ' text-3xl text-white my-9'}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            viewport={{ amount: 1, once: true }}
          >
            Experience That Delivers
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            viewport={{ amount: 0.5, once: true }}
          >
            <p className={kodchasan.className + ' text-white text-lg'}>
              Qualtech is a leading engineering and construction firm dedicated
              to delivering high-performance infrastructure and building
              solutions through innovation, efficiency, and a collaborative
              approach.
            </p>
            <ReadMoreBtn btnStyles="mt-10" white content="Company" />
          </motion.div>
        </div>

        {/* Columns container */}
        <div className="flex gap-x-5 flex-col md:flex-row">
          {/* Left Column */}
          <div className="experience-col">
            {experienceCardsData.slice(0, leftColumnCardCount).map((card) => (
              <ExperienceCard
                key={card.id}
                title={card.title}
                header={card.header}
                description={card.description}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="experience-col md:mt-40">
            {experienceCardsData.slice(leftColumnCardCount).map((card) => (
              <ExperienceCard
                key={card.id}
                title={card.title}
                header={card.header}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurExperienceClient;
