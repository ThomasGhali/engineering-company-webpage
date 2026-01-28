'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

interface HeaderVisibilityWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Client-side wrapper:
 * Handles scroll-based header visibility.
 * Children passed to this component remain Server Components.
 */
const HeaderVisibilityWrapper = ({
  children,
  className = '',
}: HeaderVisibilityWrapperProps) => {
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const [entryAnimationComplete, setEntryAnimationComplete] =
    useState<boolean>(false);

  // Entry animation timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntryAnimationComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollY } = useScroll();

  // Check if enough scroll happened to hide the header
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;

    if (latest < 50 && isHeaderHidden) {
      setIsHeaderHidden(false);
      return;
    }

    if (delta > 15 && !isHeaderHidden) {
      setIsHeaderHidden(true);
      return;
    }

    if (delta < -15 && isHeaderHidden) {
      setIsHeaderHidden(false);
      return;
    }
  });

  const headerStyle = isHeaderHidden ? '-translate-y-full' : 'translate-y-[0%]';

  return (
    <header
      className={`
        ${className}
        ${
          entryAnimationComplete
            ? `transition-transform duration-100 ${headerStyle}`
            : 'animate-[headerSlideDown_2s_ease-in-out_1s_backwards]'
        }
      `}
    >
      {children}
    </header>
  );
};

export default HeaderVisibilityWrapper;
