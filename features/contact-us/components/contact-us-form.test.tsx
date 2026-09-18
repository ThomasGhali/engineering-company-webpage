import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';
import ContactUsForm from '@/features/contact-us/components/contact-us-form';
import { submitContactForm } from '@/features/contact-us/actions';
import { contactFormSchema } from '@/features/contact-us/types';
import { ABOUT_OPTIONS } from '@/features/contact-us/constants';
import { z } from 'zod';

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

  const validFormInput: z.infer<typeof contactFormSchema> = {
    firstName: 'Thomas',
    lastName: 'Ghali',
    email: 'valid@gmail.com',
    phone: '+1234567890',
    country: 'Egypt',
    about: 'Other',
    message: 'This is a test message for validation purposes.',
  };

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

  const fillValidForm = async (user: UserEvent) => {
    const { firstName, lastName, email, phone, country, about, message } =
      getFormInputElements();

    await user.type(firstName, validFormInput.firstName);
    await user.type(lastName, validFormInput.lastName);
    await user.type(email, validFormInput.email);
    await user.type(phone, validFormInput.phone!);
    await user.selectOptions(country, validFormInput.country!);
    await user.selectOptions(about, validFormInput.about);
    await user.type(message, 'This is a test message for validation purposes.');
  };

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

    test('invalid validations show appropriate error messages', async () => {
      render(<ContactUsForm />);
      const user = userEvent.setup();
      const { firstName, lastName, about, message, submitButton } =
        getFormInputElements();

      await user.type(firstName, 'a');
      await user.type(lastName, 'a');
      await user.selectOptions(about, '');
      await user.type(message, 'a');
      await user.click(submitButton);

      expect(
        await screen.findByText(
          'First Name must contain at least 2 characters.',
        ),
      ).toBeInTheDocument();
      expect(
        await screen.findByText(
          'Last Name must contain at least 2 characters.',
        ),
      ).toBeInTheDocument();
      expect(about.checkValidity()).toBeFalsy();
      expect(
        await screen.findByText('Message is at least 10 characters.'),
      ).toBeInTheDocument();

      expect(submitContactForm).not.toHaveBeenCalled();
    });
  });

  describe('Happy path', () => {
    test('valid inputs submits form', async () => {
      vi.mocked(submitContactForm).mockResolvedValue({
        success: true,
        error: null,
        fieldErrors: undefined,
        message: null,
      });

      render(<ContactUsForm />);
      const user = userEvent.setup();

      const submitButton = screen.getByRole('button', {
        name: /submit/i,
      });

      await fillValidForm(user);
      await user.click(submitButton);

      expect(submitContactForm).toHaveBeenCalledOnce();
    });
  });

  test('Reset Button works as expected', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({
      success: true,
      error: null,
      fieldErrors: undefined,
      message: null,
    });

    render(<ContactUsForm />);
    const user = userEvent.setup();
    const { firstName, lastName, about, message, email, phone, country } =
      getFormInputElements();

    const resetButton = screen.getByRole('button', {
      name: /reset/i,
    });

    await fillValidForm(user);
    await user.click(resetButton);

    const confirmResetButton = screen.getByRole('button', {
      name: /reset/i,
    });

    await user.click(confirmResetButton);

    expect(firstName).toHaveTextContent('');
    expect(lastName).toHaveTextContent('');
    expect(email).toHaveTextContent('');
    expect(phone).toHaveTextContent('');
    expect(country).toHaveDisplayValue('Select a Country');
    expect(about).toHaveDisplayValue('Select an Option');
    expect(message).toHaveTextContent('');
  });
});
