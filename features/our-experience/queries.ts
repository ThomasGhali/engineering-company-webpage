import prisma from '@/lib/prisma';

import { unstable_cache } from 'next/cache';

export const getExperienceCardsData = unstable_cache(
  async () => {
    const data = await prisma.experienceCardData.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return data;
  },

  ['experience-cards-data'],
  { revalidate: 3600, tags: ['experience', 'global'] },
);
