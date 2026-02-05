import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import LogoutButton from '@/features/dashboard/components/logout-button';

export default async function Dashboard() {
  redirect('/admin/dashboard/messages');
}
