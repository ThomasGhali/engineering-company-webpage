'use server';

import {
  contactFormSchema,
  ContactFormData,
  FormState,
} from '@/features/contact-us/types';

import prisma from '@/lib/prisma';

import { headers } from 'next/headers';

import { aj } from '@/lib/arcjet';
import resend from '@/lib/resend';

export async function submitContactForm(
  prevState: FormState,
  formData: unknown,
): Promise<FormState> {
  if (process.env.DEMO_MODE === 'true') {
    return {
      success: false,
      error: 'Demo mode is enabled',
      message: null,
    };
  }

  // Arcjet rate limiting and bots protection
  const protection = await checkArcjetProtection();
  if (!protection.ok) {
    return {
      success: false,
      error: protection.error,
      message: null,
    };
  }

  // Make sure formData is in right type (in runtime)
  if (!(formData instanceof FormData)) {
    return {
      success: false,
      error: 'Invalid form data',
      message: null,
    };
  }

  // Convert FormData data format to literal object
  const rawData = Object.fromEntries(formData.entries());
  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      error: 'Invalid form data',
      fieldErrors: result.error.flatten().fieldErrors,
      message: null,
    };
  }

  const validatedData = result.data;

  try {
    // Create Message in DB
    await prisma.messages.create({
      data: validatedData,
    });

    await sendEmailViaResend(validatedData);

    return {
      success: true,
      error: null,
      fieldErrors: undefined,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Database error',
      fieldErrors: undefined,
      message: 'Failed to save message.',
    };
  }
}

const checkArcjetProtection = async (): Promise<{
  ok: boolean;
  error?: string;
}> => {
  const req = new Request('https://localhost', {
    headers: await headers(),
  });

  // Validate request & consume 1 credit
  const decision = await aj.protect(req, {
    requested: 1,
  });

  // Rate limit reached (denied)
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return {
        ok: false,
        error: 'Too many requests. Please Try again in an hour.',
      };
    }

    // Bot is used to submit  the form (denied)
    if (decision.reason.isBot()) {
      return {
        ok: false,
        error: 'Bot activity detected',
      };
    }

    return {
      ok: false,
      error: 'Request denied',
    };
  }

  return {
    ok: true,
  };
};

const sendEmailViaResend = async (validatedData: ContactFormData) => {
  await resend.emails.send({
    // To be replaced with an actual domain
    from: 'onboarding@resend.dev',
    to: process.env.ADMIN_EMAIL!,
    subject: validatedData.about,
    html: `
      <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
      <p><strong>Email:</strong> ${validatedData.email}</p>
      <p><strong>Country:</strong> ${validatedData.country || 'Not Provided'}</p>
      <p><strong>Phone:</strong> ${validatedData.phone || 'Not Provided'}</p>
      <p><strong>Message:</strong> ${validatedData.message}</p>
      `,
  });
};
