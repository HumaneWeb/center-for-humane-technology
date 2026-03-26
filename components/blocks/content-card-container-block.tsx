import { cn } from '@/lib/utils/css.utils';
import type { ButtonBlockProps } from './button-block';

type ContentCard = {
  id: string;
  title: string;
  subtitle?: string | null;
  content?: string | null;
  button?: ButtonBlockProps | null;
};

type Props = {
  id: string;
  columns: number;
  cards: ContentCard[];
  /** When true, dark text on light surfaces (matches `ContentBlock` / landing `text-dark` variant). */
  isTextDark?: boolean;
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

export default function ContentCardContainerBlock({ columns, cards, isTextDark = false }: Props) {
  if (!cards?.length) {
    return null;
  }

  const gridClass = gridColsClass(columns);

  return (
    <section className="mb:mb-13.5 my-5">
      <div className="mx-auto max-w-7xl">
        <div className={cn('mb:gap-8 grid gap-6', gridClass)}>
          {cards.map((card) => {
            const hasBody = Boolean(card.content?.trim());
            if (!card.title && !hasBody && !card.button?.label) {
              return null;
            }
            return (
              <article
                key={card.id}
                className={cn(
                  'mb:p-10 flex flex-col rounded-lg border p-8 shadow-[0_4px_24px_rgba(11,16,35,0.06)]',
                  isTextDark && 'border-neutral-light-gray bg-neutral-white text-primary-navy',
                  !isTextDark &&
                    'bg-primary-blue text-neutral-white border-white/15 shadow-[0_4px_32px_rgba(0,0,0,0.25)]',
                )}
              >
                {card.subtitle && (
                  <p className="mb:mb-4 mb-3 font-sans text-xs font-semibold tracking-wider text-inherit uppercase opacity-70">
                    {card.subtitle}
                  </p>
                )}
                {card.title && (
                  <h3 className="mb:mb-5 mb:text-2xl mb-4 font-sans text-xl leading-120 font-semibold text-inherit">
                    {card.title}
                  </h3>
                )}
                {hasBody && (
                  <div
                    className={cn(
                      'mb:mb-8 mb-6 flex-1 font-sans text-base leading-140 [&>p]:mb-3 [&>p:last-child]:mb-0',
                      isTextDark && 'text-neutral-medium-gray',
                      !isTextDark && 'text-neutral-white/85',
                    )}
                    dangerouslySetInnerHTML={{ __html: card.content! }}
                  />
                )}
                {card.button?.link && card.button.label && (
                  <a
                    href={card.button.link}
                    className={cn(
                      'mt-auto inline-flex w-full items-center justify-center rounded-lg border px-5 py-3.5 text-center font-sans text-base font-semibold text-inherit transition-colors duration-200',
                      isTextDark && 'border-neutral-light-gray hover:bg-neutral-light-gray/50',
                      !isTextDark && 'border-white/35 hover:bg-white/10',
                    )}
                    {...(card.button.link.startsWith('http://') ||
                    card.button.link.startsWith('https://')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {card.button.label}
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
