'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { getLinkCmsUrl } from '@/lib/utils/cms.utils';
import { cn } from '@/lib/utils/css.utils';
import { usePathname } from 'next/navigation';

export type CustomLinkProps = {
  id: string;
  internalTitle: string;
  externalUrl: string | null;
  content: {
    __typename: string;
    slug: string;
  };
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
  role,
  onClick,
  withActiveClass = false,
}: CustomLinkProps) {
  const pathname = usePathname();

  // @ts-expect-error
  const { path, external } = getLinkCmsUrl(content);

  return (
    <Link
      href={path}
      target={external ? '_blank' : undefined}
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
