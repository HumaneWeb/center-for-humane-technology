import Link from 'next/link';
import type { ReactNode } from 'react';
import { ResultOf } from '@/lib/cms/graphql';
import { GlobalLinkFragment } from '@/lib/cms/query';

type Props = ResultOf<typeof GlobalLinkFragment> & {
  children: ReactNode;
  extraClass?: string;
};

export default function CustomLink({ extraClass, children, externalUrl, content }: Props) {
  const finalUrl = externalUrl ?? '';
  return (
    <Link href={finalUrl} target={externalUrl ? '_blank' : undefined} className={extraClass}>
      {children}
    </Link>
  );
}
