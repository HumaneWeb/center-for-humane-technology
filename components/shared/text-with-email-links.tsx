'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/css.utils';

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const defaultLinkClass =
  'cursor-pointer text-primary-teal underline transition-all duration-200 ease-in underline-offset-[3px] hover:text-primary-navy focus-visible:ring-primary-teal rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

export type TextWithEmailLinksProps = {
  text: string;
  /** True when this text sits inside an `<a>` / Next `<Link>` so we must not nest another anchor. */
  nestedInAnchor?: boolean;
  linkClassName?: string;
};

/** Client Component — use as `<TextWithEmailLinks />` from Server Components instead of calling a render helper. */
export default function TextWithEmailLinks({
  text,
  nestedInAnchor = false,
  linkClassName,
}: TextWithEmailLinksProps) {
  const linkCls = cn(defaultLinkClass, linkClassName);

  if (!text || !text.includes('@')) {
    return text;
  }

  const nodes: ReactNode[] = [];
  let last = 0;
  const re = new RegExp(EMAIL_RE.source, 'g');
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(text.slice(last, m.index));
    }
    const email = m[0];
    const mailto = `mailto:${email}`;

    if (nestedInAnchor) {
      nodes.push(
        <span
          key={`mailto-${m.index}-${email}`}
          role="link"
          tabIndex={0}
          className={linkCls}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.assign(mailto);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              window.location.assign(mailto);
            }
          }}
        >
          {email}
        </span>,
      );
    } else {
      nodes.push(
        <a
          key={`mailto-${m.index}-${email}`}
          href={mailto}
          className={linkCls}
          onClick={(e) => e.stopPropagation()}
        >
          {email}
        </a>,
      );
    }
    last = m.index + email.length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes.length === 1 && typeof nodes[0] === 'string' ? nodes[0] : <>{nodes}</>;
}
