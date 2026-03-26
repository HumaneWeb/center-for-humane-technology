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

export interface PodcastListPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export interface SidebarSubLink {
  id: string;
  headline: string;
}

export interface SidebarItem {
  id: string;
  headline: string;
  sublinks: SidebarSubLink[];
}

export type PathForwardCmsData = {
  title?: string | null;
  introduction?: string | null;
  introductionHighlight?: string | null;
  introductionLabel?: string | null;
  image?: { url?: string | null } | null;
  principles?: Array<{
    id: string;
    title?: string | null;
    introduction?: string | null;
    content?: string | null;
    imageVariant?: string | null;
    image?: { url?: string | null } | null;
    imageDetail?: { url?: string | null } | null;
  }> | null;
  report?: { url?: string | null } | null;
  downloadLabel?: string | null;
  formText?: string | null;
  signers?: Array<{
    name?: string | null;
    signerPosition?: string | null;
    image?: { url?: string | null } | null;
  }> | null;
  systemIntroduction?: string | null;
  systemIntroductionHighlight?: string | null;
  systemLabel?: string | null;
};
