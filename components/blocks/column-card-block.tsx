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

export default function ColumnCardBlock({ headline, introduction, backgroundColor, columns, cards }: Props) {
  if (!cards?.length) return null;

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
      </div>
    </section>
  );
}
