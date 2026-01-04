import { inriaSerif } from '@/app/fonts';

import { cn } from '@/lib/utils';

import { ExternalLink } from 'lucide-react';

import Link from 'next/link';

type DescriptionSectionProps = {
  header: string;
  description: string;
  genericLink?: Link;
};

const DescriptionSection = ({
  header,
  description,
  genericLink,
}: DescriptionSectionProps) => {
  return (
    <div className="w-[40%] bg-text-muted py-17 pl-8 text-white flex items-center justify-center">
      <div className="w-[95%]">
        <h1
          className={cn(
            'text-5xl mb-10 font-light tracking-tight',
            inriaSerif.className,
          )}
        >
          {header}
        </h1>

        <div className="px-6 shadow-[inset_2.5px_0_0_0_white]">
          <p className="text-md text-white/75">{description}</p>
          {genericLink && (
            <Link
              href={genericLink.href}
              className="mt-7 flex gap-2 text-lg font-semibold uppercase group tracking-wider"
            >
              <span>{genericLink.title}</span>
              <ExternalLink
                width={18}
                strokeWidth={2}
                color="var(--color-primary-100)"
                className="transition duration-200 group-hover:translate-x-1 ml-1 mt-0.5 "
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const LinksSection = ({ links }: { links: Link[] }) => (
  <div className="flex-1 grid grid-cols-[repeat(3,1fr)] gap-x-7 gap-y-8 place-content-center place-items-center text-sm font-semibold">
    {links.map((link, index) => (
      <Link key={index} href={link.href}>
        {link.title}
      </Link>
    ))}
  </div>
);

const DesktopNavCollapsible = ({
  description,
  header,
  links,
  genericLink,
}: MobileMenuCollapsibleProps) => (
  <div className="flex min-h-[300px] w-screen">
    <DescriptionSection
      description={description}
      header={header}
      genericLink={genericLink!}
    />
    <LinksSection links={links} />
  </div>
);

export default DesktopNavCollapsible;
