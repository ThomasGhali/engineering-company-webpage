import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { SideBarNormalItemprops } from '@/features/dashboard/types';
import Link from 'next/link';
import { JSX } from 'react';

export const SideBarNormalItem = ({
  label,
  icon: Icon,
  href,
}: SideBarNormalItemprops): JSX.Element => {
  const { open } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={label}>
        <Link href={href!}>
          <Icon className={`h-5 w-5 ${open ? '' : '-ml-2'}`} />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
