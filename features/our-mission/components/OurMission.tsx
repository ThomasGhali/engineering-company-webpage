'use client';

import { JSX } from 'react';

import ReadMoreBtn from '@/components/ui/ReadMoreBtn';

import AnimatedUnderline from '@/components/ui/AnimatedUnderline';

import { inriaSans, kodchasan, poppins } from '@/app/fonts';

import { motion } from 'motion/react';
import useIsDesktop from '@/hooks/useIsDesktop';

const OurMission = (): JSX.Element => {
  const isDesktop = useIsDesktop();
  const videoVariants = {
    hidden: {
      opacity: 0,
      x: isDesktop ? 40 : 0,
      scale: isDesktop ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: isDesktop ? 2 : 0.8 },
    },
  };

  return (
    <>
      {/* Section Header */}
      <motion.div
        className="pb-10 overflow-x-hidden bg-charcoal-700 transition-colors duration-1000"
        whileInView={{backgroundColor: 'white'}}
        viewport={{amount: isDesktop ? 0.2 : 0.1, once: true }}
      >
        <motion.h1
          initial={{ opacity: 0, y: '40%' }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          viewport={{ amount: 0.5, once: true }}
          className={
            inriaSans.className +
            ' text-text-muted md:text-[2.7rem] lg:text-[3.7rem] text-center text-[2rem] font-bold uppercase mb-5 pt-20 md:pt-30 tracking-widest'
          }
        >
          Our Mission
        </motion.h1>
        <section className="text-text-main grid grid-cols-1 items-center md:grid-cols-2 gap-10 md:gap-20 mx-5 mt-10 md:mt-20">
          {/* LEFT COLUMN: Description Container */}
          <div className="md:w-[72%] justify-self-end">
            <div className="leading-relaxed">
              {/* Description Header */}
              <motion.h2
                className={
                  poppins.className +
                  ' text-text-main md:text-[2.7rem] lg:text-6xl lg:min-w-[360px] text-[2rem] md:min-w-[245px] font-normal lg:mb-10 mb-5'
                }
                initial={{ y: '40%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                viewport={{ amount: 0.3, once: true }}
              >
                Engineering the Future
              </motion.h2>

              {/* Description Text */}
              <motion.div
                className={kodchasan.className + ' text-text-muted text-[1rem]'}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                viewport={{ amount: 0.6, once: true }}
              >
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeIn', delay: 0.3 }}
                  viewport={{ amount: 0.5, once: true }}
                >
                  We design and build infrastructure that balances{' '}
                  <AnimatedUnderline delay={0.3}>
                    structural excellence
                  </AnimatedUnderline>{' '}
                  with{' '}
                  <AnimatedUnderline delay={0.45}>
                    environmental responsibility
                  </AnimatedUnderline>
                  .
                </motion.p>
                <motion.p
                  className="my-4.5"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeIn', delay: 0.45 }}
                  viewport={{ amount: 0.5, once: true }}
                >
                  From civil energy projects to high-speed transit networks, we
                  partner with governments to solve the world's{' '}
                  <AnimatedUnderline delay={0.45}>
                    most complex challenges
                  </AnimatedUnderline>
                  .
                </motion.p>
                <motion.p
                  className="my-4.5"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeIn', delay: 0.5 }}
                  viewport={{ amount: 0.5, once: true }}
                >
                  Reliable engineering, and infrastructure that delivers{' '}
                  <AnimatedUnderline delay={0.55}>
                    lasting value
                  </AnimatedUnderline>
                  .
                </motion.p>
              </motion.div>
              <div className="mt-9">
                <ReadMoreBtn filled={true} />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Video */}
          <motion.video
            variants={videoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            src="/our-mission.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full md:max-h-[85vh] rounded-sm aspect-square"
          />
        </section>
      </motion.div>
    </>
  );
};

export default OurMission;
