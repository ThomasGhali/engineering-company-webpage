import Link from 'next/link';
import DesktopNavCollapsible from './DesktopNavCollapsible';
import { Link as AppLink } from '@/types';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { DesktopMenuItemProps } from '../types';

// dello the value prop
const NavMenuItemCollapsible = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
  value?: string;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="bg-transparent! text-md py-11 text-white">
      {label}
    </NavigationMenuTrigger>
    <NavigationMenuContent>{children}</NavigationMenuContent>
  </NavigationMenuItem>
);

const NavMenuItemNorm = ({ title, href }: AppLink) => (
  <Link href={href} className="font-medium text-white underline-expand">
    {title}
  </Link>
);

export default async function DesktopNavMenuList({ menuData }: { menuData: DesktopMenuItemProps[] }) {
  return (
    <NavigationMenuList>
      {menuData.map((item) =>
        item.collapsible ? (
          <NavMenuItemCollapsible key={item.id} label={item.title!}>
            <DesktopNavCollapsible {...item} />
          </NavMenuItemCollapsible>
        ) : (
          <NavMenuItemNorm
            key={item.id}
            title={item.links[0].title}
            href={item.links[0].href}
          />
        ),
      )}
    </NavigationMenuList>
  );
}
