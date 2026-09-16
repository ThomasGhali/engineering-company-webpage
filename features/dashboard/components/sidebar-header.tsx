import QualtecLogo from '@/components/ui/qualtec-logo';
import { SidebarHeader } from '@/components/ui/sidebar';
import { Cpu } from 'lucide-react';

export default function SidebarCustomHeader({ open }: { open: boolean }) {
  return (
    <SidebarHeader className="border-b border-sidebar-border/50 px-4 py-5 group-data-[collapsible=icon]:px-0">
      <div className="flex items-center gap-3 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
        <QualtecLogo
          height={35}
          width={90}
          className="p-[2px] bg-charcoal-700 rounded-sm group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:rounded-full"
        />
        <div
          className={`flex flex-col transition-all duration-200 ${
            open
              ? 'translate-x-0 opacity-100'
              : 'pointer-events-none -translate-x-2 opacity-0 w-0'
          }`}
        >
          <span className="whitespace-nowrap text-sm font-bold tracking-tight text-sidebar-foreground">
            Qualtech
          </span>
          <span className="whitespace-nowrap text-xs font-medium text-sidebar-foreground/60">
            Engineering
          </span>
        </div>
      </div>
    </SidebarHeader>
  );
}
