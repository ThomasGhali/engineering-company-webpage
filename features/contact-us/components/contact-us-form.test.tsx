import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ContactUsForm from '@/features/contact-us/components/contact-us-form';
import { submitContactForm } from '@/features/contact-us/actions';
import { contactFormSchema } from '@/features/contact-us/types';
import { ABOUT_OPTIONS } from '@/features/contact-us/constants';

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
  beforeEach(() => {
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
    test('fails validation on empty required fields and does not submit form', async () => {
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
  });
});
