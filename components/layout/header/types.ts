import { Link } from "@/types";

export interface MobileMenuCollapsibleProps {
  id: string;
  collapsible: true;
  order: number;
  title: string;
  links: Link[];
  content?: {
    genericLink: {
      href: string;
      title: string;
    };
  };
}

export interface MenuNormItemProps {
  id: string;
  collapsible: false;
  order: number;
  links: Link[];
}

export interface DesktopMenuCollapsibleProps {
  id: string;
  collapsible: true;
  order: number;
  title: string;
  content: {
    header: string;
    description: string;
    genericLink: {
      href: string;
      title: string;
    };
  };
  imagesHeader?: string;
  images?: {
    title: string;
    href: string;
    imgUrl: string;
    imgAlt: string;
  }[];
  links: Link[];
}

export type DescriptionSectionProps = {
  header: string;
  description: string;
  genericLink?: Link;
};


export type DesktopMenuItemProps =
  | DesktopMenuCollapsibleProps
  | MenuNormItemProps;

export type MobileMenuItemProps =
  | MobileMenuCollapsibleProps
  | MenuNormItemProps;
