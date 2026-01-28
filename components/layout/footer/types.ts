import { Link } from '@/types';

export type FooterList = {
  id: string;
  header: string;
  order: number;
  items: Link[];
}[];
