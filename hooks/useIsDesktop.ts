import { useState, useEffect } from 'react';

export default function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const match = window.matchMedia('(min-width: 768px)');

    setIsDesktop(match.matches);

    const breakPointListener = (event: MediaQueryListEvent) =>
      setIsDesktop(event.matches);

    match.addEventListener('change', breakPointListener);

    return () => match.removeEventListener('change', breakPointListener);
  }, []);

  return isDesktop;
}
