import Link from 'next/link';
import type { ReactNode } from 'react';
import { ResultOf } from '@/lib/cms/graphql';
import { GlobalLinkFragment } from '@/lib/cms/query';
import type { Optional } from '@/lib/utils/types';

type Props = Optional<
  ResultOf<typeof GlobalLinkFragment> & {
    children: ReactNode;
    extraClass?: string;
    role?: string;
    onClick?: () => void;
  }
>;

export default function CustomLink({
  extraClass,
  children,
  externalUrl,
  content,
  role,
  onClick,
}: Props) {
  const finalUrl = externalUrl ?? '';
  return (
    <Link
      href={finalUrl}
      target={externalUrl ? '_blank' : undefined}
      className={extraClass}
      role={role}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
