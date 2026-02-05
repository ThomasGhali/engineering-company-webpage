'use client';

import { useActionState, startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Field, FieldGroup } from '@/components/ui/field';

import FormInput from '@/features/contact-us/components/form-input';
import FormSelect from '@/features/contact-us/components/form-select';
import FormTextarea from '@/features/contact-us/components/form-textarea';
import FormResetBtn from '@/features/contact-us/components/form-reset-btn';

import { contactFormSchema, FormState } from '@/features/contact-us/types';
import { ABOUT_OPTIONS, COUNTRIES } from '@/features/contact-us/constants';
import { submitContactForm } from '@/features/contact-us/actions';
import { inputFields } from '@/features/contact-us/components/data';

const ContactUsForm = () => {
  const router = useRouter();

  const { control, register, reset, handleSubmit } = useForm<
    z.infer<typeof contactFormSchema>
  >({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      about: '' as any,
      message: '',
    },
  });

  const initialState: FormState = {
    success: false,
    error: null,
    fieldErrors: undefined,
    message: null,
  };

  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  const serverSubmit = async (data: any, event?: React.BaseSyntheticEvent) => {
    const HTMLForm = event?.target as HTMLFormElement;

    const formData = new FormData(HTMLForm);

    try {
      startTransition(() => {
        formAction(formData);
      });
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  // toast appearance control
  useEffect(() => {
    if (isPending) {
      toast.loading('Submitting...', { id: 'form-status' });
    } else if (state?.error) {
      toast.error('Error', {
        description: state.error,
        id: 'form-status', // Replaces the loading toast
      });
    } else if (state?.success) {
      toast.success('Message sent successfully!', {
        id: 'form-status', // Replaces the loading toast
      });
      reset();
      router.push('/');
    }
  }, [state, isPending, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(serverSubmit)}
        className="my-15"
        id="contact-us-form"
      >
        <FieldGroup>
          {inputFields.map((field) => (
            <FormInput
              key={field.name}
              control={control}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
            />
          ))}

          <FormSelect
            label="Country"
            register={register}
            name="country"
            optionsArray={COUNTRIES}
            placeholder="Select a Country"
          />

          <FormSelect
            label="Enquiry is about"
            register={register}
            name="about"
            optionsArray={ABOUT_OPTIONS as unknown as string[]}
            placeholder="Select an Option"
            required
          />

          <FormTextarea
            control={control}
            name="message"
            label="Message"
            placeholder="Write your message here .."
            required
          />
        </FieldGroup>

        <Field className="mt-8 justify-center" orientation="horizontal">
          <FormResetBtn reset={reset} success={state.success} />

          {/* Submit button */}
          <Button
            type="submit"
            className="bg-primary-100 rounded-xs w-30 hover:bg-primary-hover/90 cursor-pointer"
            form="contact-us-form"
            disabled={isPending || state.success}
          >
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" />
                Submitting ..
              </>
            ) : state.success ? (
              'Submitted'
            ) : (
              'Submit'
            )}
          </Button>
        </Field>
      </form>
    </>
  );
};

export default ContactUsForm;
