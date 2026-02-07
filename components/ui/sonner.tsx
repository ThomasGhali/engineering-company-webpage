'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'group toast font-sans border-border bg-popover text-popover-foreground shadow-lg',
          description:
            'font-medium group-data-[type=error]:!text-destructive group-data-[type=success]:!text-green-600 dark:group-data-[type=success]:!text-green-400',
          actionButton:
            'group-data-[button]:bg-primary group-data-[button]:text-primary-foreground',
          cancelButton:
            'group-data-[button]:bg-muted group-data-[button]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
