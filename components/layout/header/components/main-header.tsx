import Image from 'next/image';

import { MobileMenuItemProps, DesktopMenuItemProps } from '../types';

import MobileMenu from './mobile-menu';
import DesktopNavMenuList from './desktop-nav-menu-list';
import HeaderVisibilityWrapper from './header-visibility-wrapper';
import SearchToggle from './search-toggle';

import { NavigationMenu } from '@/components/ui/navigation-menu';

import { getHeaderData } from '@/components/layout/header/queries';
import QualtecLogo from '@/components/ui/qualtec-logo';
import Link from 'next/link';

const MainHeader = async () => {
  const menuData = await getHeaderData();

  return (
    <>
      <HeaderVisibilityWrapper
        className="fixed inset-0 z-50 w-screen h-[68px] lg:h-22.5 
          flex items-center px-4 lg:pl-6 lg:pr-12 py-4 
          bg-charcoal-700 border-b border-white"
      >
        <div className="flex justify-between items-center w-full [&>*:not(:nth-child(3))]:cursor-pointer">
          <MobileMenu menuData={menuData as unknown as MobileMenuItemProps[]} />

          <Link href="/">
            <QualtecLogo width={120} height={30} className="max-md:w-20!" />
          </Link>

          {/* desktop */}
          <nav className="hidden lg:block">
            <NavigationMenu defaultValue="services">
              <DesktopNavMenuList
                menuData={menuData as unknown as DesktopMenuItemProps[]}
              />

              <Link href="/contact-us">
                <button className="contact-button text-[0.75rem] ml-10 ">
                  Contact Us
                </button>
              </Link>
            </NavigationMenu>
          </nav>

          <SearchToggle />
        </div>
      </HeaderVisibilityWrapper>
    </>
  );
};

export default MainHeader;
