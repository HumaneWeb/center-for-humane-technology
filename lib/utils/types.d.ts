export type Optional<T> = {
  [K in keyof T]?: T[K];
};

export type NavbarChildren = {
  id: string;
  label: string;
  asButton: boolean;
  children: {
    id: string;
    label: string;
    href: string;
  }[];
};

export type PageSlug = {
  params: Promise<{ slug: string }>;
};

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  pubDate: string;
  author?: string;
  guid?: string;
}

export interface RSSFeed {
  title?: string;
  description?: string;
  items: RSSItem[];
}
