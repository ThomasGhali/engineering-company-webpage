'use server';
import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

import { AuthError } from 'next-auth';

export const adminSignIn = async (prevState: any, formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid credentials' };
      }
      return { error: 'Something went wrong' };
    }

    throw error;
  }

  redirect('/admin/dashboard');
};
