'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';

import { SideBarCollapsibleWrapper } from '@/features/dashboard/components/sidebar-collapsible-item';
import { JSX } from 'react';

import { SideBarMenus } from '@/features/dashboard/types';
import { SideBarNormalItem } from '@/features/dashboard/components/sidebar-normal-item';
import { sideBarContent } from '@/features/dashboard/data';
import LogoutButton from '@/features/dashboard/components/logout-button';
import SidebarCustomHeader from '@/features/dashboard/components/sidebar-header';

const renderMenus = (menus: SideBarMenus): JSX.Element => {
  return (
    <>
      {menus.map((menu, index) => (
        <SidebarGroup key={menu.header + index}>
          <SidebarGroupLabel className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60">
            {menu.header}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {menu.items.map((item, index) => {
              const key = item.collapsible ? item.title : item.label;
              return (
                <SidebarMenu key={key + index}>
                  {item.collapsible ? (
                    <SideBarCollapsibleWrapper {...item} />
                  ) : (
                    <SideBarNormalItem {...item} />
                  )}
                </SidebarMenu>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

export default function DashboardSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="overflow-x-hidden border-r border-sidebar-border/50"
    >
      <SidebarCustomHeader open={open} />

      <SidebarContent className="px-2 py-4">
        {renderMenus(sideBarContent)}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <div
          className={`flex items-center ${open ? 'justify-between' : 'justify-center'}`}
        >
          {open && (
            <span className="text-xs text-sidebar-foreground/50">
              © 2026 Qualtech
            </span>
          )}

          <LogoutButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
