import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import LogoutButton from '@/features/dashboard/components/logout-button';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/sign-in');
  }

  return (
    <>
      <LogoutButton />
      <p>Welcome, {session.user.name}</p>
    </>
  );
}
