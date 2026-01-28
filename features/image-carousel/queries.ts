import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const getImageCarouselData = unstable_cache(
  async () => {
    const data = await prisma.carouselCardData.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return data;
  },
  ['carousel-data'],
  {
    tags: ['carousel', 'global'],
    revalidate: 3600,
  },
);
