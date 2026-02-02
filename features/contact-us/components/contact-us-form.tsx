'use client';

import { useActionState, startTransition, useEffect } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

import { Field, FieldGroup } from '@/components/ui/field';

import { contactFormSchema, FormState } from '@/features/contact-us/types';
import { ABOUT_OPTIONS, COUNTRIES } from '@/features/contact-us/constants';

import FormInput from '@/features/contact-us/components/form-input';
import FormSelect from '@/features/contact-us/components/form-select';
import FormTextarea from '@/features/contact-us/components/form-textarea';
import FormResetBtn from '@/features/contact-us/components/form-reset-btn';

import { submitContactForm } from '@/features/contact-us/actions';

import { useRouter } from 'next/navigation';
import AnimatedLogo from '@/public/animated-logo';

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
    // Grab the native HTML Form element from the event
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
          {/* first name */}
          <FormInput
            control={control}
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            required
          />

          {/* last name */}
          <FormInput
            control={control}
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            required
          />

          {/* email */}
          <FormInput
            control={control}
            label="Email Address"
            name="email"
            placeholder="Enter email address"
            required
            type="email"
          />

          {/* phone */}
          <FormInput
            control={control}
            label="Phone Number"
            name="phone"
            placeholder="+1 234 567 8900"
            type="tel"
          />

          {/* country */}
          <FormSelect
            label="Country"
            register={register}
            name="country"
            optionsArray={COUNTRIES}
            placeholder="Select a Country"
          />

          {/* about */}
          <FormSelect
            label="Enquiry is about"
            register={register}
            name="about"
            optionsArray={ABOUT_OPTIONS as unknown as string[]}
            placeholder="Select an Option"
            required
          />

          {/* message */}
          <FormTextarea
            control={control}
            name="message"
            label="Message"
            placeholder="Write your message here .."
            required
          />
        </FieldGroup>

        {/* submit & reset */}
        <Field className="mt-8 justify-center" orientation="horizontal">
          {/* reset button */}
          <FormResetBtn reset={reset} success={state.success} />

          {/* submit button */}
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
          {/* dello animatedLogo with its asset if not used somewhere else */}
          <AnimatedLogo />
        </Field>
      </form>
    </>
  );
};

export default ContactUsForm;
