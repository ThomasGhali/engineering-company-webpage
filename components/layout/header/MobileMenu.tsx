'use client';

// to be changed: no need to make it a client component
// but instead just grab the cache and use it (instead of useState)
import { JSX, useState } from 'react';

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

function MobileMenuNormItem({ link }: MenuNormItemProps) {
  return (
    <div className="mobile-menu-item p-4.5 bottom-border">
      <Link key={link.href} href={link.href} className="w-full inline-block">
        <span className="hover:underline hover:decoration-text-main hover:underline-offset-2">
          {link.title}
        </span>
      </Link>
    </div>
  );
}

function MobileMenuCollapsible({
  title,
  links,
  genericLink,
}: MobileMenuCollapsibleProps): JSX.Element {
  return (
    <Accordion type="single" collapsible className="bottom-border px-5">
      <AccordionItem value="item-1">
        <AccordionTrigger className="mobile-menu-item cursor-pointer">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          {genericLink && (
            <Link
              href={genericLink?.href}
              className="text-base font-bold flex gap-2 group mt-3 mb-5"
            >
              <span>{genericLink?.title}</span>
              <MoveRight
                width={15}
                className="transition duration-200 group-hover:translate-x-1"
              />
            </Link>
          )}

          {links.map((link) => (
            <div key={link.href} className="my-7 text-base font-semibold">
              <Link href={link.href}>{link.title}</Link>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function MobileMenuItems() {
  // use cached data instead for admin data control        to be changed
  const menuData: MobileMenuItem[] = [
    {
      header: 'Services',
      description: 'Something',
      genericLink: {
        href: '#',
        title: 'Something',
      },
      collapsible: true,
      title: 'Services',
      links: [
        {
          title: 'Service 1',
          href: '1',
        },
        {
          title: 'Service 2',
          href: '2',
        },
        {
          title: 'Service 3',
          href: '3',
        },
      ],
    },
    {
      header: 'Locations',
      description: 'Something else',
      collapsible: true,
      title: 'Locations',
      links: [
        {
          title: 'Service 1',
          href: '4',
        },
        {
          title: 'Service 2',
          href: '5',
        },
        {
          title: 'Service 3',
          href: '6',
        },
      ],
    },
    {
      collapsible: false,
      link: {
        href: '#',
        title: 'Something',
      },
    },
  ];

  return (
    <div>
      {menuData.map((item) =>
        item.collapsible ? (
          <MobileMenuCollapsible key={item.title} {...item} />
        ) : (
          <MobileMenuNormItem key={item.link.title} {...item} />
        ),
      )}
    </div>
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const menuExpandBtnStyle = open ? 'rotate-45' : 'rotate-0';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative w-6 h-6 lg:hidden cursor-pointer">
          <Menu className={`menu-expand-btn ${menuExpandBtnStyle}`} />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-text-main text-xl font-medium">
            MENU
          </SheetTitle>
          <SheetDescription className="text-text-muted">
            Navigation menu
          </SheetDescription>
        </SheetHeader>

        <MobileMenuItems />

        <SheetFooter>
          <button className="uppercase border-2 border-primary-100  font-semibold rounded-full px-6 py-3 cursor-pointer hover:bg-primary-hover hover:border-primary-hover hover:text-white transition-colors duration-200  text-md mb-2">
            Contact Us
          </button>
          <SheetClose className="close-button">Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
