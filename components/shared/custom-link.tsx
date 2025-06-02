import Link from 'next/link';
import type { ReactNode } from 'react';
import { ResultOf } from '@/lib/cms/graphql';
import { GlobalLinkFragment } from '@/lib/cms/query';
import type { Optional } from '@/lib/utils/types';
import { getLinkCmsUrl } from '@/lib/utils/cms.utils';

type Props = Optional<
  ResultOf<typeof GlobalLinkFragment> & {
    children: ReactNode;
    extraClass?: string;
    role?: string;
    onClick?: () => void;
  }
>;

export default function CustomLink({ extraClass, children, content, role, onClick }: Props) {
  // @ts-expect-error
  const { path, external } = getLinkCmsUrl(content);

  return (
    <Link
      href={path}
      target={external ? '_blank' : undefined}
      className={extraClass}
      role={role}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
