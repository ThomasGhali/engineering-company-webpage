import { Suspense } from 'react';
import Footer from '@/components/layout/footer/footer';
import MainHeader from '@/components/layout/header/components/main-header';
import { Toaster } from 'sonner';

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

      <Suspense>
        <Footer />
      </Suspense>
      <Toaster position="top-center" duration={2000} />
    </>
  );
}
