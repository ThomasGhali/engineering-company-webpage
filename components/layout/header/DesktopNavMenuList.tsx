import Link from 'next/link';
import DesktopNavCollapsible from './DesktopNavCollapsible';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';


const NavMenuItemCollapsible = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="bg-bg-100! text-md py-11">
      {label}
    </NavigationMenuTrigger>
    <NavigationMenuContent>{children}</NavigationMenuContent>
  </NavigationMenuItem>
);

const NavMenuItemNorm = ({ title, href }: Link) => (
  <Link href={href} className="font-medium">
    {title}
  </Link>
);

export default function DesktopNavMenuList() {
  // change it to use the cache data instead of the constant - to be changed
  const menuData: MobileMenuItem[] = [
    {
      header: 'Services',
      description:
        'Something else .. i meant to write down some description in here bro but i was just lazy .. kinda .. anyways though, here is the description .. hopfully it takes the space well',
      genericLink: {
        href: '#',
        title: 'Something',
      },
      collapsible: true,
      title: 'services',
      links: [
        {
          title: 'Service 1',
          href: '#',
        },
        {
          title: 'Service 2',
          href: '#',
        },
        {
          title: 'Service 3',
          href: '#',
        },
      ],
    },
    {
      header: 'Locations',
      description:
        'Something else .. i meant to write down some description in here bro but i was just lazy .. kinda .. anyways though, here is the description .. hopfully it takes the space well',
      collapsible: true,
      title: 'locations',
      genericLink: {
        title: 'this is a link',
        href: '#',
      },
      links: [
        {
          title: 'Service 1',
          href: '#',
        },
        {
          title: 'Service 2',
          href: '#',
        },
        {
          title: 'Service 3',
          href: '#',
        },
        {
          title: 'Service 3',
          href: '#',
        },
        {
          title: 'Service 3',
          href: '#',
        },
        {
          title: 'Service 3',
          href: '#',
        },
        {
          title: 'Service 3',
          href: '#',
        },
        {
          title: 'Service 3',
          href: '#',
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
    <NavigationMenuList>
      {menuData.map((item, index) =>
        item.collapsible ? (
          <NavMenuItemCollapsible key={item.title} label={item.title}>
            <DesktopNavCollapsible {...item} />
          </NavMenuItemCollapsible>
        ) : (
          <NavMenuItemNorm
            key={item.link.title}
            title={item.link.title}
            href={item.link.href}
          />
        ),
      )}
    </NavigationMenuList>
  );
}
