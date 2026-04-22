import { cn } from '@/lib/utils/css.utils';

type CardItem = {
  id: string;
  headline: string;
  copy?: string | null;
  icon?: { url: string; alt?: string | null; width?: number | null; height?: number | null } | null;
};

type Props = {
  headline?: string | null;
  introduction?: string | null;
  backgroundColor?: { hex: string } | null;
  columns: number;
  cards: CardItem[];
  showCtaBox?: boolean | null;
  ctaContent?: string | null;
  ctaButtonLabel?: string | null;
  ctaButtonUrl?: string | null;
  footerContent?: string | null;
};

function gridColsClass(n: number): string {
  const c = Math.min(Math.max(Math.floor(n) || 1, 1), 6);
  const map: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };
  return map[c] ?? map[2];
}

function autolinkEmails(html: string): string {
  // Wrap bare email addresses (not already inside an href) with mailto links
  return html.replace(
    /(?<!href=["']mailto:[^"']*)(?<!href=["'][^"']*?)([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,
    (match, email, offset) => {
      const before = html.slice(0, offset);
      // Skip if already inside an <a> tag
      const lastOpen = before.lastIndexOf('<a ');
      const lastClose = before.lastIndexOf('</a>');
      if (lastOpen > lastClose) return match;
      return `<a href="mailto:${email}">${email}</a>`;
    },
  );
}

export default function ColumnCardBlock({
  headline,
  introduction,
  backgroundColor,
  columns,
  cards,
  showCtaBox,
  ctaContent,
  ctaButtonLabel,
  ctaButtonUrl,
  footerContent,
}: Props) {
  if (!cards?.length) return null;

  const isExternalUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://');

  return (
    <section
      className={cn('mb:my-11 my-8', backgroundColor?.hex ? 'py-12 mb:py-20' : 'py-1')}
      style={backgroundColor?.hex ? { backgroundColor: backgroundColor.hex } : undefined}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(headline || introduction) && (
          <div className="mb-10">
            {headline && (
              <h2 className="text-primary-navy tracking-049 mb:text-[39px] mb:leading-110 mb-4 font-sans text-[29px] leading-120 font-semibold">
                {headline}
              </h2>
            )}
            {introduction && (
              <div
                className="text-primary-navy mb:text-xl font-sans text-base leading-140 [&>p]:mb-4 [&>p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>
        )}
        <div className={cn('grid gap-6 mb:gap-8', gridColsClass(columns))}>
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col bg-neutral-white p-8 mb:p-10 shadow-[0_4px_24px_rgba(11,16,35,0.06)]"
            >
              {card.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.icon.url}
                  alt={card.icon.alt ?? ''}
                  width={card.icon.width ?? 48}
                  height={card.icon.height ?? 48}
                  className="mb-5 h-12 w-12 object-contain"
                />
              )}
              <h3 className="text-primary-navy mb:text-2xl mb-4 mb:mb-5 font-sans text-xl leading-120 font-semibold">
                {card.headline}
              </h3>
              {card.copy && (
                <div
                  className="text-neutral-medium-gray flex-1 font-sans text-base leading-140 [&>p]:mb-3 [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: card.copy }}
                />
              )}
            </article>
          ))}
        </div>

        {showCtaBox && (ctaContent || (ctaButtonLabel && ctaButtonUrl)) && (
          <div className="mt-8 mb:mt-10 flex flex-col items-start justify-between gap-24 rounded-xl bg-primary-teal px-8 py-7 sm:flex-row sm:items-center mb:px-10 mb:py-8">
            {ctaContent && (
              <div
                className="flex-1 font-sans text-xl font-semibold leading-140 text-neutral-white [&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: ctaContent }}
              />
            )}
            {ctaButtonLabel && ctaButtonUrl && (
              <a
                href={ctaButtonUrl}
                className="shrink-0 inline-flex items-center justify-center rounded-lg bg-secondary-light-teal px-6 py-3 font-sans text-base font-semibold text-primary-navy transition-colors duration-200 hover:bg-secondary-light-teal/80"
                {...(isExternalUrl(ctaButtonUrl)
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {ctaButtonLabel}
              </a>
            )}
          </div>
        )}

        {footerContent && (
          <div
            className="mt-10 text-center text-xl font-sans font-semibold leading-140 text-primary-navy [&>p]:mb-0 [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: autolinkEmails(footerContent) }}
          />
        )}
      </div>
    </section>
  );
}
