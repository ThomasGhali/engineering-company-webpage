'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedUnderline({
  children,
  className = '',
  underlineClass = 'bg-primary-100',
  thickness = 3,
  duration = 0.8,
  onHover = false,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  underlineClass?: string;
  thickness?: number;
  duration?: number;
  onHover?: boolean;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const styleClasses = `absolute left-0 -bottom-0.5 w-full origin-left ${underlineClass}`;

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={onHover ? undefined : isInView ? { scaleX: 1 } : { scaleX: 0 }}
        whileHover={onHover ? { scaleX: 1 } : undefined}
        transition={{ duration, ease: 'easeInOut', delay }}
        style={{ height: thickness }}
        className={styleClasses}
      />
    </span>
  );
}
