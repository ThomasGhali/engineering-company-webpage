import { ScrollRevealArgs, ScrollRevealReturn } from '@/types';
import { useScroll, useSpring, useTransform } from 'motion/react';

export default function useScrollReveal({
  ref,
  offset = ['start end', 'start center'],
  range,
}: ScrollRevealArgs): ScrollRevealReturn {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], range);
  const y = useSpring(yRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return {
    opacity,
    y,
  };
}
