import Image from 'next/image';

import { MobileMenuItemProps, DesktopMenuItemProps } from '../types';

import MobileMenu from './MobileMenu';
import DesktopNavMenuList from './DesktopNavMenuList';
import HeaderVisibilityWrapper from './HeaderVisibilityWrapper';
import SearchToggle from './SearchToggle';

import { NavigationMenu } from '@/components/ui/navigation-menu';

import { getHeaderData } from '@/components/layout/header/queries';

const MainHeader = async () => {
  const menuData = await getHeaderData();

  return (
    <>
      <HeaderVisibilityWrapper
        className="fixed inset-0 z-50 w-screen h-[68px] lg:h-22.5 
          flex-center pl-6 pr-12 py-4 
          bg-charcoal-700 border-b border-white"
      >
        <div className="flex justify-between items-center w-full [&>*:not(:nth-child(3))]:cursor-pointer">
          {/* mobile */}
          <MobileMenu menuData={menuData as unknown as MobileMenuItemProps[]} />

          <Image
            src="/latest-logo2.png"
            alt="logo"
            width={105}
            height={28}
            className="w-[110px] lg:w-[130px]"
            priority
          />

          {/* desktop */}
          <nav className="hidden lg:block">
            <NavigationMenu defaultValue="services">
              <DesktopNavMenuList
                menuData={menuData as unknown as DesktopMenuItemProps[]}
              />

              <button className="contact-button text-[0.75rem] ml-10 ">
                Contact Us
              </button>
            </NavigationMenu>
          </nav>

          <SearchToggle />
        </div>
      </HeaderVisibilityWrapper>
    </>
  );
};

export default MainHeader;
