import { z } from 'zod';

import { ABOUT_OPTIONS } from '@/features/contact-us/constants';
import {
  FieldValues,
  Path,
  Control,
  UseFormRegister,
  FieldError,
} from 'react-hook-form';

export interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  required?: boolean;
  placeholder?: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
}

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'must contain at least 2 characters')
    .max(50, 'Name must be at most 50 characters.'),
  lastName: z
    .string()
    .min(2, 'Name must contain at least 2 characters')
    .max(50, 'Name must be at most 50 characters.'),
  email: z.email(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,15}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  country: z.string().optional().or(z.literal('')),
  about: z.enum(ABOUT_OPTIONS, {
    error: () => ({ message: 'Select what your message is about.' }),
  }),
  message: z
    .string()
    .min(10, 'Message is at least 10 characters')
    .max(250, 'Message is at most 250 characters'),
});

export interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  placeholder?: string;
  optionsArray: string[];
  required?: boolean;
}

export interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
}

export type FormState = {
  success: boolean;
  error?: string | null;
  fieldErrors?: Partial<
    Record<keyof z.infer<typeof contactFormSchema>, string[]>
  >;
  message?: string | null;
};

export type InputField = {
  name: Path<z.infer<typeof contactFormSchema>>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
};
