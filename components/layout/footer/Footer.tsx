import Link from 'next/link';

import { JSX } from 'react';

import ContactsSection from '@/components/layout/footer/ContactsSection';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

import { getFooterData } from '@/components/layout/footer/queries';

import { FooterList } from '@/components/layout/footer/types';

const MobileFooterMenu = ({footerList}: {footerList:FooterList}): JSX.Element => {
  return (
    <div className="w-full xmd:hidden pt-10">
      <Accordion type="single" collapsible>
        {footerList.map((item, index) => (
          <AccordionItem value={'item-' + index} key={item.id}>
            <AccordionTrigger className="uppercase text-md">
              {item.header}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-y-2 pl-6 pt-3 justify-start">
                {item.items.map((item) => (
                  <li key={item.title}>
                    <Link className="underline-expand" href={item.href}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ContactsSection />
    </div>
  );
};

const DesktopFooterMenu = ({footerList}: {footerList:FooterList}): JSX.Element => {
  return (
    <div className="max-xmd:hidden flex flex-1 justify-between xmd:pl-8 xmd:pr-4 xmd:flex xmd:pt-17 xmd:gap-x-5 w-full max-w-[1200px]">
      <ContactsSection />
      {footerList.map((item, index) => (
        <div key={item.id}>
          <h1 className="uppercase text-lg font-medium tracking-wider mb-6">
            {item.header}
          </h1>
          <ul>
            {item.items.map((item, index) => (
              <li key={index} className="mb-2">
                <Link href={item.href} className="underline-expand">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// At the very bottom
const PoliciesMenu = ({ className }: { className?: string }): JSX.Element => {
  return (
    <ul
      className={`flex text-sm w-[90%] max-w-[315px] justify-between max-xmd:mx-auto ${className}`}
    >
      <li className="underline-expand">
        <Link href="/">Copyright & policy</Link>
      </li>
      <li className="underline-expand">
        <Link href="/">Portals</Link>
      </li>
      <li className="underline-expand">
        <Link href="/">Site Map</Link>
      </li>
    </ul>
  );
};

const Footer = async () => {
  const footerData = await getFooterData();

  return (
    <footer className="bg-charcoal-700 text-white xmd:flex xmd:flex-col xmd:items-center">
      <MobileFooterMenu footerList={footerData} />

      <DesktopFooterMenu footerList={footerData} />

      {/* Subtle Bottom Accent Line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary-100/40 to-transparent mb-5 mt-10 xmd:mt-14 xmd:mb-9" />

      <div className="xmd:flex xmd:justify-between xmd:items-center px-6 w-full max-w-[1200px]">
        <PoliciesMenu className="xmd:hidden" />

        {/* Copyright */}
        <div className="text-center text-sm mt-8 pb-6">
          {`© ${new Date().getFullYear()} Qualtech, All rights reserved`}
        </div>

        <PoliciesMenu className="max-xmd:hidden" />
      </div>
    </footer>
  );
};

export default Footer;
