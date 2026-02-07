import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import DashboardSidebar from '@/features/dashboard/components/dashboard-sidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect('/admin/sign-in');
  }

  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-50 backdrop-blur-md flex h-12 md:h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b mx-1">
            <SidebarTrigger className="-ml-1" />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>

      <Toaster position="top-center" duration={2000} />
    </>
  );
}
