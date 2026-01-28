import { JSX } from 'react';

import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { MoveRight, Menu } from 'lucide-react';
import {
  MobileMenuItemProps,
  MobileMenuCollapsibleProps,
  MenuNormItemProps,
} from '../types';

function MobileMenuNormItem({ links }: MenuNormItemProps) {
  return (
    <div className="mobile-menu-item py-4.5 pl-2 mx-3 bottom-border border-white/50">
      <Link
        key={links[0].href}
        href={links[0].href}
        className="w-full inline-block"
      >
        <span className="hover:underline hover:decoration-white hover:underline-offset-2">
          {links[0].title}
        </span>
      </Link>
    </div>
  );
}

function MobileMenuCollapsible({
  title,
  links,
  content,
}: MobileMenuCollapsibleProps): JSX.Element {
  return (
    <Accordion type="single" collapsible className="px-3">
      <AccordionItem value="item-1">
        <AccordionTrigger className="mobile-menu-item cursor-pointer">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          {content?.genericLink && (
            <Link
              href={content.genericLink?.href}
              className="text-[1.1rem] font-semibold flex gap-2 group mt-3 mb-5"
            >
              <span className="text-md">{content.genericLink?.title}</span>
              <MoveRight
                width={15}
                className="transition duration-200 pt-1 group-hover:translate-x-1"
              />
            </Link>
          )}

          {links.map((link, index) => (
            <div key={link.href + index} className="my-7 text-base font-medium">
              <Link href={link.href}>{link.title}</Link>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function MobileMenuItems({ menuData }: { menuData: MobileMenuItemProps[] }) {
  return (
    <div className="text-white">
      {menuData.map((item) =>
        item.collapsible ? (
          <MobileMenuCollapsible key={item.id} {...item} />
        ) : (
          <MobileMenuNormItem key={item.id} {...item} />
        ),
      )}
    </div>
  );
}

export default function MobileMenu({
  menuData,
}: {
  menuData: MobileMenuItemProps[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative w-6 h-6 lg:hidden cursor-pointer">
          <Menu className="menu-expand-btn" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-charcoal-700 ">
        <SheetHeader>
          <SheetTitle className="text-white text-xl font-medium">
            MENU
          </SheetTitle>
          <SheetDescription className="text-white/70">
            Navigation menu
          </SheetDescription>
        </SheetHeader>

          <MobileMenuItems menuData={menuData} />

        <SheetFooter>
          <button className="uppercase border-2 border-primary-100  font-semibold rounded-full px-6 py-3 cursor-pointer hover:bg-primary-hover hover:border-primary-hover text-white transition-colors duration-200  text-md mb-2">
            Contact Us
          </button>
          <SheetClose className="cursor-pointer border border-white py-2 rounded-full text-white hover:bg-text-muted hover:border-transparent hover:text-white text-base font-semibold">
            Close
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
