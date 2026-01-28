'use client'

import { JSX } from 'react';

import { motion } from 'motion/react';

import ReadMoreBtn from '@/components/ui/ReadMoreBtn';

import { inter } from '@/app/fonts';

const ExperienceCard = ({
  title,
  header,
  description,
}: {
  title: string;
  header: string;
  description: string;
}): JSX.Element => {
  return (
    <a href="#" className="group">
      <motion.div
        className="pl-6 pr-10 mb-5 pt-8 pb-6 md:h-[500px] w-full border bg-charcoal-900 flex flex-col justify-between items-start"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        viewport={{ amount: 0.3, once: true }}
      >
        <p className="title-sm-text mb-13">{title}</p>

        <h3 className={inter.className + ' text-2xl text-white mb-9'}>
          {header}
        </h3>

        <p className="text-white mb-3 md:mb-13">{description}</p>

        <ReadMoreBtn
          empty
          btnStyles="underline-expand justify-start group-hover:after:scale-x-100"
        />
      </motion.div>
    </a>
  );
};
export default ExperienceCard;
