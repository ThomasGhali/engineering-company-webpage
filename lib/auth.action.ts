import prisma from '@/lib/prisma';

export const getUserFromDb = async (username: string) => {
  return await prisma.admin.findUnique({
    where: {
      username: username,
    },
  });
};
