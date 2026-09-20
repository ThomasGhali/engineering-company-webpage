import { checkArcjetProtection } from '@/features/contact-us/actions';
import { aj } from '@/lib/arcjet';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

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

const mockedAjProtect = vi.mocked(aj.protect);

vi.mock('@/lib/resend', () => ({
  resend: vi.fn(),
}));

beforeEach(() => {
  vi.stubEnv('DEMO_MODE', 'false');
  vi.clearAllMocks();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

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

describe('Contact form submission action', () => {
  describe('ArcjetProtection', () => {
    describe('returns an error for', () => {
      test('rate limiting reason', async () => {
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
});
