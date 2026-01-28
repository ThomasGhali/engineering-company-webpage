import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const getFooterData = unstable_cache(
  async () => {
    const footerData = await prisma.footerColumn.findMany({
      orderBy: { order: 'asc' },
      include: {
        items: true,
      },
    });

    return footerData;
  },
  ['footer-data'],
  {
    tags: ['footer', 'global'],
    revalidate: 3600,
  },
);
