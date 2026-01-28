'use client';

import { JSX } from 'react';

import Image from 'next/image';

import useImageIndexloop from '@/features/image-carousel/hooks/useImageIndexloop';

import nextArrow from '@/public/nextArrow.svg';

import CarouselDescriptionCard from '@/features/image-carousel/components/CarouselDescriptionCard';

import { CarouselCardsData } from '@/features/image-carousel/types';

const CarouselImage = ({
  imageIndex,
  isPaused,
  carouselData,
}: {
  imageIndex: number;
  isPaused: boolean;
  carouselData: CarouselCardsData[];
}): JSX.Element => {
  return (
    <>
      {/* Carousel image wrapper */}
      <div className="relative h-[66vh] md:h-[90vh]  w-full overflow-hidden">
        {carouselData.map((item, index) => (
          <Image
            key={item.id}
            src={item.imgUrl}
            alt={item.imgAlt}
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === imageIndex
                ? `opacity-100 z-10 animate-[zoomIn_8s_ease-in-out] ${isPaused ? 'paused' : 'running'}`
                : 'opacity-0 z-0'
            }`}
            fill
            priority={true}
          />
        ))}
      </div>
    </>
  );
};

const DesktopCarouselControls = ({
  nextImage,
  pausePlay,
  imageIndex,
  imagesCount,
  isPaused,
}: {
  nextImage: () => void;
  pausePlay: () => void;
  imageIndex: number;
  imagesCount: number;
  isPaused: boolean;
}): JSX.Element => {
  return (
    <>
      {/* Carousel nav container */}
      <div className="text-xl absolute bottom-5 right-5 z-10 bg-white hidden md:flex w-50 h-16 items-center justify-between px-7">
        {/* Image index/count */}
        <div className="flex items-center">
          <span className="text-xl font-semibold mr-1">{imageIndex}</span>

          <span className="text-base">/ {imagesCount}</span>
        </div>

        {/* Pause/play button */}
        <button
          onClick={pausePlay}
          className="flex-center gap-x-1 cursor-pointer md:p-2"
        >
          {isPaused ? (
            <svg
              fill="currentColor"
              height="25px"
              width="25px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 490 490"
              xmlSpace="preserve"
              className="text-navy-100"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <g>
                  {' '}
                  <g>
                    {' '}
                    <path d="M15.541,490V0l458.917,245.009L15.541,490z"></path>{' '}
                  </g>{' '}
                  <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                  <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{' '}
                  <g> </g>{' '}
                </g>{' '}
              </g>
            </svg>
          ) : (
            <>
              <span className="h-5 md:h-7 w-1.5 bg-navy-100" />
              <span className="h-5 md:h-7 w-1.5 bg-navy-100" />
            </>
          )}
        </button>

        {/* Next button */}
        <button onClick={nextImage}>
          <Image
            src={nextArrow}
            alt="next-arrow"
            className="size-7 cursor-pointer"
          />
        </button>
      </div>
    </>
  );
};

export default function ImageCarouselClient({
  imageCarouselData,
}: {
  imageCarouselData: CarouselCardsData[];
}): JSX.Element {
  const imagesCount = imageCarouselData.length;

  const { imageIndex, progress, nextImage, pausePlay, isPaused } =
    useImageIndexloop(imagesCount, 8000);

  const imageIndexPlusOne = imageIndex + 1;
  return (
    <>
      {/* Hero section container */}
      <section className="w-full text-text-main md:relative">
        <CarouselImage
          imageIndex={imageIndex}
          isPaused={isPaused}
          carouselData={imageCarouselData}
        />

        <CarouselDescriptionCard
          progress={progress}
          imageIndex={imageIndexPlusOne}
          imagesCount={imagesCount}
          carouselData={imageCarouselData}
        />

        <DesktopCarouselControls
          imageIndex={imageIndexPlusOne}
          imagesCount={imagesCount}
          nextImage={nextImage}
          pausePlay={pausePlay}
          isPaused={isPaused}
        />
      </section>
    </>
  );
}
