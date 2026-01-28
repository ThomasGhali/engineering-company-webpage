import { useState, useRef, useEffect, useCallback } from 'react';

export default function useImageIndexloop(imagesCount: number, delay: number) {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const elapsedTimeRed = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());
  const animationFrameRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    if (isPaused) return;

    elapsedTimeRed.current = performance.now() - startTimeRef.current;
    const newProgress = (elapsedTimeRed.current / delay) * 100;

    setProgress(newProgress);

    if (elapsedTimeRed.current >= delay) {
      setImageIndex((prevIndex) => (prevIndex + 1) % imagesCount);
      startTimeRef.current = performance.now();
      setProgress(0);
    }

    animationFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const pausePlay = useCallback(() => {
    if (isPaused) {
      startTimeRef.current = performance.now() - elapsedTimeRed.current;
      setIsPaused(false);

      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);

      animationFrameRef.current = requestAnimationFrame(tick);
    } else {
      setIsPaused(true);

      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    }
  }, [isPaused]);

  const startAnimation = useCallback(() => {
    setIsPaused(false);
    startTimeRef.current = performance.now();
    setProgress(0);
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % imagesCount);
    startTimeRef.current = performance.now();
    setProgress(0);
  };

  useEffect(() => {
    startAnimation();

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [startAnimation]);

  return {
    imageIndex,
    progress,
    nextImage,
    isPaused,
    pausePlay,
  };
}
