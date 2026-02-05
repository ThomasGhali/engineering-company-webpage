import SignInForm from '@/features/sign-in/components/sign-in-form';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect('/admin/dashboard');
  }

  return (
    <>
      <SignInForm />
    </>
  );
}
