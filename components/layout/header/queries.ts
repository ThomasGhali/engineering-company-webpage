import prisma from '@/lib/prisma';

export const getHeaderData = async () => {
  const headerData = await prisma.headerMenuItem.findMany({
    orderBy: { order: 'asc' },
    include: {
      links: true,
      images: true,
    },
  });
  return headerData;
};
