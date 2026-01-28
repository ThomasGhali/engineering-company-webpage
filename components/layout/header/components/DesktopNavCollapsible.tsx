import { inriaSerif, inter, poppins } from '@/app/fonts';

import { cn } from '@/lib/utils';

import { ExternalLink } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';

import { DesktopMenuCollapsibleProps, DescriptionSectionProps } from '../types';

import { Link as AppLink } from '@/types';

const DescriptionSection = ({
  header,
  description,
  genericLink,
}: DescriptionSectionProps) => {
  return (
    <div className="w-[30%]">
      <div className="w-[95%]">
        <h1
          className={cn(
            'text-[2.5rem] font-medium tracking-normal',
            inriaSerif.className,
          )}
        >
          {header}
        </h1>

        <div>
          <p className="text-sm text-black/60">{description}</p>
          {genericLink && (
            <Link
              href={genericLink.href}
              className="mt-5 flex gap-2 text-sm  font-bold uppercase group tracking-wider"
            >
              <span className="flex items-end">{genericLink.title}</span>
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

const LinksSection = ({ links }: { links: AppLink[] }) => (
  <div className="flex-1 pt-6 grid grid-cols-[repeat(3,1fr)] gap-x-7 gap-y-8 place-content-center place-items-center text-sm font-semibold">
    {links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className={cn('font-normal', poppins.className)}
      >
        {link.title}
      </Link>
    ))}
  </div>
);

const DesktopNavCollapsibleImages = ({
  header,
  images,
}: {
  header: string;
  images: {
    title: string;
    href: string;
    imgUrl: string;
  }[];
}) => (
  <div className="h-[270px] pt-14 mr-10 mb-6">
    <div className="flex items-end gap-x-2 h-[25px]">
      <h2
        className={cn(
          'text-black/75 font-extrabold text-[1.05rem] whitespace-nowrap',
          inriaSerif.className,
        )}
      >
        {header}
      </h2>

      <span className="w-full bg-text-muted/30 h-[0.8px] rounded-full mb-2" />
    </div>

    <div
      className="flex gap-x-9 mt-6 overflow-x-scroll pb-6 [&::-webkit-scrollbar]:h-1 
  [&::-webkit-scrollbar-button]:hidden 
  [&::-webkit-scrollbar-track]:bg-bg-400 
  [&::-webkit-scrollbar-thumb]:bg-text-muted/70 
  [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      {images.map((image, index) => (
        <Link
          key={image.title + index}
          href={image.href}
          className="w-[175px] group shrink-0 cursor-pointer"
        >
          <div className="h-[130px] w-full overflow-hidden mb-4">
            <Image
              src={image.imgUrl}
              alt={image.title}
              width={200}
              height={200}
              className="object-cover w-full h-full group-hover:scale-120 transition duration-400"
            />
          </div>

          <p
            className={cn('text-sm font-light text-black/70', inter.className)}
          >
            {image.title}
          </p>
        </Link>
      ))}
    </div>
  </div>
);

const DesktopNavCollapsible = ({
  links,
  content,
  images,
  imagesHeader,
}: DesktopMenuCollapsibleProps) => (
  <div className="bg-bg-400 min-h-[300px] w-screen pl-15 pr-12 pb-8 pt-12">
    <div className="flex items-start">
      <DescriptionSection
        description={content.description}
        header={content.header}
        genericLink={content.genericLink!}
      />
      <LinksSection links={links} />
    </div>

    {images && (
      <DesktopNavCollapsibleImages
        header={imagesHeader || ''}
        images={images}
      />
    )}
  </div>
);

export default DesktopNavCollapsible;
