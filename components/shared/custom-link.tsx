'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { getLinkCmsUrl, LinkType } from '@/lib/utils/cms.utils';
import { cn } from '@/lib/utils/css.utils';
import { usePathname } from 'next/navigation';

/** Tailwind variants like hover:, sm:hover: — not group-hover / peer-hover */
const INTERACTIVE_PSEUDO_CLASS = /(^|:)(hover|active|focus|focus-visible):/;

function stripInteractiveVariants(className: string | undefined): string {
  if (!className) return '';
  return className
    .split(/\s+/)
    .filter((token) => token && !INTERACTIVE_PSEUDO_CLASS.test(token))
    .join(' ');
}

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

/** `content` accepts the same shapes as `getLinkCmsUrl`, a full `CustomLinkProps` from the CMS, or null when the link is omitted. */
type CustomLinkComponentProps = Omit<CustomLinkProps, 'content' | 'id'> & {
  id?: string;
  content: CustomLinkProps | LinkType | null;
};

export default function CustomLink({
  extraClass,
  children,
  content,
  externalUrl,
  role,
  onClick,
  withActiveClass = false,
}: CustomLinkComponentProps) {
  const pathname = usePathname();

  if (content == null) {
    return (
      <span
        className={cn(
          stripInteractiveVariants(extraClass),
          onClick ? 'cursor-pointer' : '',
        )}
        role={role}
        onClick={onClick}
      >
        {children}
      </span>
    );
  }

  const { path, external } = getLinkCmsUrl(content as LinkType);

  const href = (externalUrl?.trim() || String(path ?? '').trim()) || '';

  if (!href || href === 'undefined' || href === '/undefined' || href === '/undefined/') {
    return (
      <span
        className={cn(
          stripInteractiveVariants(extraClass),
          onClick ? 'cursor-pointer' : 'cursor-default',
        )}
        role={role}
        onClick={onClick}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
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
