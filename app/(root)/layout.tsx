import { Suspense } from 'react';
import Footer from '@/components/layout/footer/Footer';
import MainHeader from '@/components/layout/header/components/MainHeader';

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
    </>
  );
}
