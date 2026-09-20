import {
  checkArcjetProtection,
  submitContactForm,
} from '@/features/contact-us/actions';
import { aj } from '@/lib/arcjet';
import { FormState } from '@/features/contact-us/types';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import prisma from '@/lib/prisma';
import resend from '@/lib/resend';

vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

vi.mock('@/lib/arcjet', () => ({
  aj: {
    protect: vi.fn().mockResolvedValue({
      isDenied: vi.fn().mockReturnValue(false),
      reason: {
        isBot: vi.fn(),
        isRateLimit: vi.fn(),
      },
    }),
  },
}));

vi.mock('@/lib/resend', () => ({
  default: {
    emails: {
      send: vi.fn(),
    },
  },
}));

vi.mock('@/lib/prisma', () => ({
  default: {
    messages: {
      create: vi.fn(),
    },
  },
}));

const mockedPrismaCreate = vi.mocked(prisma.messages.create);

beforeEach(() => {
  vi.stubEnv('DEMO_MODE', 'false');
  vi.clearAllMocks();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

const mockedAjProtect = vi.mocked(aj.protect);

const mockArcjetDecision = ({
  isDenied = false,
  isRateLimit = false,
  isBot = false,
} = {}) => {
  mockedAjProtect.mockResolvedValueOnce({
    isDenied: () => isDenied,
    reason: {
      isRateLimit: () => isRateLimit,
      isBot: () => isBot,
    },
  } as Awaited<ReturnType<typeof aj.protect>>);
};

describe('Contact form submission', () => {
  describe('checkArcjetProtection', () => {
    describe('returns an error for', () => {
      test('rate limiting', async () => {
        mockArcjetDecision({ isDenied: true, isRateLimit: true });
        const acrjetProtection = await checkArcjetProtection();

        expect(acrjetProtection).toEqual({
          ok: false,
          error: 'Too many requests. Please Try again in an hour.',
        });
      });

      test('bot detection', async () => {
        mockArcjetDecision({ isDenied: true, isBot: true });

        const acrjetProtection = await checkArcjetProtection();

        expect(acrjetProtection).toEqual({
          ok: false,
          error: 'Bot activity detected',
        });
      });

      test('other reasons', async () => {
        mockArcjetDecision({ isDenied: true });

        const acrjetProtection = await checkArcjetProtection();

        expect(acrjetProtection).toEqual({
          ok: false,
          error: 'Request denied',
        });
      });
    });

    describe('accepts request when', () => {
      test('request is not denied', async () => {
        const acrjetProtection = await checkArcjetProtection();

        expect(acrjetProtection).toEqual({
          ok: true,
        });
      });
    });
  });

  describe('submitContactForm', () => {
    const formInitialState: FormState = {
      success: false,
      error: null,
      fieldErrors: undefined,
      message: null,
    };

    const validFormData = new FormData();
    validFormData.append('firstName', 'Thomas');
    validFormData.append('lastName', 'Ghali');
    validFormData.append('email', 'thomas@example.com');
    validFormData.append('about', 'Other');
    validFormData.append('message', 'This is a test message with 10+ chars');

    describe('returns an error if', () => {
      test('demo mode is enabled', async () => {
        vi.stubEnv('DEMO_MODE', 'true');

        const result = await submitContactForm(
          formInitialState,
          new FormData(),
        );

        expect(result).toEqual({
          success: false,
          error: 'Demo mode is enabled',
          message: null,
        });
      });

      test('Arcjet protection fails', async () => {
        mockArcjetDecision({ isDenied: true });

        const result = await submitContactForm(
          formInitialState,
          new FormData(),
        );

        expect(result).toEqual({
          success: false,
          error: 'Request denied',
          message: null,
        });
      });

      test('payload is not of type FormData', async () => {
        const result = await submitContactForm({} as FormState, {});

        expect(result).toEqual({
          success: false,
          error: 'Invalid form data',
          message: null,
        });
      });

      test('zod schema validation fails', async () => {
        const result = await submitContactForm(
          formInitialState,
          new FormData(),
        );

        expect(result.success).toBe(false);
        expect(result.error).toBe('Invalid form data');
      });

      test('database save fails', async () => {
        mockedPrismaCreate.mockRejectedValueOnce(new Error('Database Error'));
        const result = await submitContactForm(formInitialState, validFormData);

        expect(result).toEqual({
          success: false,
          error: 'Database error',
          fieldErrors: undefined,
          message: 'Failed to save message.',
        });
      });
    });

    describe('happy path', () => {
      test('successfully saves message and sends email', async () => {
        const result = await submitContactForm(formInitialState, validFormData);

        expect(result).toEqual({
          success: true,
          error: null,
          fieldErrors: undefined,
          message: 'Message sent successfully!',
        });
      });
    });
  });
});
