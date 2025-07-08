'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { getLinkCmsUrl, LinkType } from '@/lib/utils/cms.utils';
import { cn } from '@/lib/utils/css.utils';
import { usePathname } from 'next/navigation';

export type CustomLinkProps = {
  id: string;
  externalUrl: string | null;
  content: LinkType;
  children: ReactNode;
  extraClass?: string;
  role?: string;
  onClick?: () => void;
  withActiveClass?: boolean;
};

export default function CustomLink({
  extraClass,
  children,
  content,
  externalUrl,
  role,
  onClick,
  withActiveClass = false,
}: CustomLinkProps) {
  const pathname = usePathname();

  const { path, external } = getLinkCmsUrl(content);

  return (
    <Link
      href={externalUrl ? externalUrl : path}
      target={external || externalUrl ? '_blank' : undefined}
      className={cn(
        withActiveClass &&
          pathname.replace('/', '') === path.replace('/', '') &&
          'active-link [&>*]:text-primary-teal',
        extraClass,
      )}
      role={role}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
