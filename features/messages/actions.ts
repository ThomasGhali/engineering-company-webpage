'use server';

import prisma from '@/lib/prisma';
import resend from '@/lib/resend';

import { revalidatePath } from 'next/cache';

type ReplyState = {
  success?: boolean;
  error?: string | null;
};

export const replyMessage = async (
  prevState: ReplyState,
  formData: FormData,
): Promise<ReplyState> => {
  if (process.env.DEMO_MODE === 'true') {
    return { success: false, error: 'Demo mode is enabled' };
  }

  const id = formData.get('id') as string;
  const message = formData.get('message') as string;
  const sendToEmail = formData.get('sendToEmail') as string | undefined;
  const sendToAbout = formData.get('sendToAbout') as string;

  if (!id || !message || !sendToAbout) {
    return { success: false, error: 'Invalid data' };
  }

  try {
    if (sendToEmail) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: sendToEmail,
        subject: sendToAbout,
        html: `
      <p>${message}</p>
      `,
      });
    }

    await prisma.messages.update({
      where: {
        id: id,
      },
      data: {
        replied: true,
        replies: {
          create: {
            message: message,
          },
        },
      },
    });

    revalidatePath('/admin/dashboard/messages');

    return { success: true, error: undefined };
  } catch (error) {
    return { success: false, error: 'Failed to reply' };
  }
};

export const deleteMessage = async (
  id:string,
): Promise<ReplyState> => {
  if (process.env.DEMO_MODE === 'true') {
    return { success: false, error: 'Demo mode is enabled' };
  }

  if (!id) {
    return { success: false, error: 'Id missing' };
  }

  try {
    await prisma.messages.delete({
      where: {
        id: id,
      },
    });

    revalidatePath('/admin/dashboard/messages');

    return { success: true, error: undefined };
  } catch (error) {
    return { success: false, error: 'Failed to delete' };
  }
};
