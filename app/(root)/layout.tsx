import { Suspense } from 'react';

import { Toaster } from 'sonner';

import Footer from '@/components/layout/footer/footer';
import MainHeader from '@/components/layout/header/components/main-header';
import AIChat from '@/features/ai-chat/components/ai-chat';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <MainHeader />
      </Suspense>

      {children}

      <AIChat />

      <Suspense>
        <Footer />
      </Suspense>

      <Toaster position="top-center" duration={2000} />
    </>
  );
}
