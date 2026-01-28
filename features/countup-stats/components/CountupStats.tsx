'use client'

import CountUp from 'react-countup';
import { inriaSans } from '@/app/fonts';
import { motion } from 'motion/react';

interface StatCardProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const StatCard = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  label,
}: StatCardProps) => {
  return (
    <div className="flex flex-col items-center px-6 py-8 first:border-0 nth-[3]:border-0 nth-[3]:lg:border-l border-l border-primary-100 ">
      <div className="flex items-baseline">
        <span className="text-white font-mono text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
          <CountUp
            end={value}
            decimals={decimals}
            prefix={prefix}
            suffix={suffix}
            duration={3}
            enableScrollSpy={true}
            scrollSpyOnce={true}
          />
        </span>
      </div>
      <p
        className={`${inriaSans.className} mt-4 text-text-muted text-[10px] md:text-xs text-center font-bold uppercase tracking-[0.3em] leading-tight max-w-[150px]`}
      >
        {label}
      </p>
    </div>
  );
};

// --- MAIN COMPONENT: STATS SECTION ---
const CountupStats = () => {
  return (
    <section className="relative bg-charcoal-700 overflow-hidden border-t border-white/5">
      <div className="relative mx-auto max-w-7xl px-5 md:px-16 lg:px-24">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
            viewport={{ amount: 0.5, once: true }}
          >
            <StatCard
              value={98.2}
              decimals={1}
              suffix="%"
              label="On-Time Delivery"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeIn', delay: 0.2 }}
            viewport={{ amount: 0.5, once: true }}
          >
            <StatCard value={35} suffix="+" label="Years Global Experience" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeIn', delay: 0.4 }}
            viewport={{ amount: 0.5, once: true }}
          >
            <StatCard
              value={80}
              prefix="$"
              suffix="B+"
              label="Project Value Delivered"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeIn', delay: 0.6 }}
            viewport={{ amount: 0.5, once: true }}
          >
            <StatCard value={150} suffix="+" label="Government Partners" />
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Accent Line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary-100/40 to-transparent" />
    </section>
  );
};

export default CountupStats;
