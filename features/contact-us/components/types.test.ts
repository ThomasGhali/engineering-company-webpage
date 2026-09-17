import { contactFormSchema } from '@/features/contact-us/types';
import { describe, expect, test } from 'vitest';

describe.each([
  { field: 'firstName', label: 'First Name' },
  { field: 'lastName', label: 'Last Name' },
] as const)('$label Field', ({ field, label }) => {
  test.each([
    {
      length: 1,
      input: 'a',
      expected: `${label} must contain at least 2 characters.`,
    },
    {
      length: 51,
      input: 'a'.repeat(51),
      expected: `${label} must be at most 50 characters.`,
    },
  ])(
    'rejects input with $length character(s) with message: $expected',
    ({ input, expected }) => {
      const result = contactFormSchema.shape[field].safeParse(input);
      expect(result.success).toBeFalsy();
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(expected);
      }
    },
  );
});

describe('Email Address Field', () => {
  test.each(['invalid', 'invalid@invalid', 'invalid@invalid.a'])(
    'rejects invalid input: %s',
    (invalidEmail) => {
      const result = contactFormSchema.shape.email.safeParse(invalidEmail);

      expect(result.success).toBeFalsy();
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address.');
      }
    },
  );
});

describe('Phone Field', () => {
  test.each([
    'abc',
    '123-456-7890',
    '0123456789',
    '1',
    '+12345678901234567',
    '+',
  ])('rejects invalid input: %s', (invalidPhone) => {
    const result = contactFormSchema.shape.phone.safeParse(invalidPhone);

    expect(result.success).toBeFalsy();
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid phone number.');
    }
  });
});

describe('Country Select Field', () => {
  test('rejects invalid country name', () => {
    const input = 'Invalid Country';
    const result = contactFormSchema.shape.country.safeParse(input);

    expect(result.success).toBeFalsy();
  });
});

describe('About Select Field', () => {
  test('rejects invalid option', () => {
    const input = 'Invalid Option';
    const result = contactFormSchema.shape.about.safeParse(input);

    expect(result.success).toBeFalsy();
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Select what your message is about.',
      );
    }
  });
});

describe('Message Field', () => {
  test.each([
    {
      length: 9,
      input: 'a'.repeat(9),
      expected: `Message is at least 10 characters.`,
    },
    {
      length: 251,
      input: 'a'.repeat(251),
      expected: `Message is at most 250 characters.`,
    },
  ])(
    'rejects input with $length characters with message: $expected',
    ({ input, expected }) => {
      const result = contactFormSchema.shape.message.safeParse(input);

      expect(result.success).toBeFalsy();
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(expected);
      }
    },
  );
});
