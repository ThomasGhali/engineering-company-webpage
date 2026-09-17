import { beforeAll, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ContactUsForm from '@/features/contact-us/components/contact-us-form';
import { submitContactForm } from '@/features/contact-us/actions';
import { contactFormSchema } from '@/features/contact-us/types';

interface FormElements {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  phone: HTMLInputElement;
  country: HTMLSelectElement;
  about: HTMLSelectElement;
  message: HTMLTextAreaElement;
  submitButton: HTMLButtonElement;
}

vi.mock('.././actions', () => ({
  submitContactForm: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('ContactUsForm', () => {
  beforeAll(() => {
    vi.clearAllMocks();
  });

  const getFormInputElements: () => FormElements = () => ({
    firstName: screen.getByLabelText(/First Name/),
    lastName: screen.getByLabelText(/Last Name/),
    email: screen.getByLabelText(/Email/),
    phone: screen.getByLabelText(/Phone/),
    country: screen.getByLabelText(/Country/),
    about: screen.getByLabelText(/Enquiry is about/),
    message: screen.getByLabelText(/Message/),
    submitButton: screen.getByRole('button', { name: /Submit/ }),
  });

  describe('Initial render', () => {
    test('renders all form inputs and submit button', () => {
      render(<ContactUsForm />);

      const formInputElementsArray = Object.values(getFormInputElements());

      formInputElementsArray.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('Validation & errors', () => {
    test("required field errors show on empty state inputs and form action doesn't trigger", async () => {
      render(<ContactUsForm />);
      const user = userEvent.setup();
      const { submitButton, firstName, lastName, about, message } =
        getFormInputElements();

      await user.click(submitButton);

      expect(firstName.checkValidity()).toBeFalsy();
      expect(lastName.checkValidity()).toBeFalsy();
      expect(about.checkValidity()).toBeFalsy();
      expect(message.checkValidity()).toBeFalsy();

      expect(submitContactForm).not.toHaveBeenCalled();
    });

    describe.each([
      { field: 'firstName', label: 'First Name' },
      { field: 'lastName', label: 'Last Name' },
    ] as const)('$label Field', ({ field, label }) => {
      test.each([
        {
          input: 'a',
          expected: `${label} must contain at least 2 characters.`,
        },
        {
          input: 'a'.repeat(51),
          expected: `${label} must be at most 50 characters.`,
        },
      ])(
        'input $input fails with message: $expected',
        ({ input, expected }) => {
          const result = contactFormSchema.shape[field].safeParse(input);
          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.error.issues[0].message).toBe(expected);
          }
        },
      );
    });
  });
});
