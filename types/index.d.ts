import { MotionValue } from 'motion';

export type Link = {
  href: string;
  title: string;
};

interface ScrollRevealArgs {
  ref: React.RefObject<HTMLElement | null>;
  offset?: ScrollOffset;
  range: [number, number];
}

interface ScrollRevealReturn {
  y: MotionValue<number>;
  opacity: MotionValue<number>;
}

