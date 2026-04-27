'use client';
import { cn } from '@/lib/utils/css.utils';
import Image from 'next/image';
import { useState } from 'react';

type Icon = {
  url: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type ListItem = {
  id: string;
  title?: string | null;
  content?: string | null;
  icon?: Icon | null;
};

function listItemHasContent(item: ListItem) {
  return Boolean(item.title?.trim() || item.content?.trim());
}

type Props = {
  id: string;
  title?: string | null;
  intro?: string | null;
  backgroundColor?: { hex: string } | null;
  listItems: ListItem[];
  accordionMode?: boolean;
  isTextDark?: boolean;
};

export default function NumberedListBlock({
  title,
  intro,
  backgroundColor,
  listItems,
  accordionMode = false,
  isTextDark = false,
}: Props) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (!listItems?.length) {
    return null;
  }

  const hasTitle = Boolean(title?.trim());
  const hasIntro = Boolean(intro?.trim());

  return (
    <section
      className={cn('mb:mb-13.5 mb-5 mt-20', backgroundColor?.hex ? 'py-10 mb:py-20' : 'py-1')}
      style={backgroundColor?.hex ? { backgroundColor: backgroundColor.hex } : undefined}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(hasTitle || hasIntro) && (
          <div className="mb-8">
            {hasTitle && (
              <h2
                className={cn(
                  'font-sans text-2xl leading-130 font-semibold mb:text-3xl',
                  isTextDark ? 'text-primary-navy' : 'text-neutral-white',
                  hasIntro && 'mb-3',
                )}
              >
                {title}
              </h2>
            )}
            {hasIntro && (
              <div
                className={cn(
                  'font-sans text-lg leading-140 [&>p]:mb-3 [&>p:last-child]:mb-0',
                  isTextDark
                    ? 'text-primary-navy [&_p]:text-primary-navy [&_a]:text-primary-teal'
                    : 'text-neutral-white/85 [&_p]:text-neutral-white/85 [&_a]:text-secondary-light-teal [&_a]:underline',
                )}
                dangerouslySetInnerHTML={{ __html: intro! }}
              />
            )}
          </div>
        )}
        <ul
          className={cn(
            'numbered-list-block list-none divide-y',
            isTextDark && 'divide-neutral-light-gray',
            !isTextDark && 'divide-white/15',
          )}
        >
          {listItems.filter(listItemHasContent).map((item) => {
            const hasBody = Boolean(item.content?.trim());
            const hasTitle = Boolean(item.title?.trim());
            const hasIcon = Boolean(item.icon?.url);
            const isExpanded = openItems.has(item.id);
            const isInteractive = accordionMode && hasTitle && hasBody;

            return (
              <li
                key={item.id}
                className={cn(
                  'numbered-list-block__item mb:gap-8 mb:py-10 flex gap-5 py-8 first:pt-0 last:pb-0',
                  /* ::before counter inherits `color` from the li — body default was leaving it navy */
                  !isTextDark && 'text-white/50',
                  isTextDark && 'text-primary-navy',
                  hasIcon && 'numbered-list-block__item--has-icon',
                )}
              >
                <div className="numbered-list-block__stack min-w-0 flex-1">
                  {(hasTitle || hasIcon) && (
                    <div className="mb:gap-8 flex items-center gap-5">
                      {hasIcon && (
                        <div className="numbered-list-block__icon shrink-0">
                          <Image
                            src={item.icon!.url}
                            alt={item.icon!.alt ?? ''}
                            width={item.icon!.width ?? 64}
                            height={item.icon!.height ?? 64}
                            className="h-16 w-16 object-contain"
                          />
                        </div>
                      )}
                      {hasTitle &&
                        (isInteractive ? (
                          <button
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isExpanded}
                            className={cn(
                              'mb:text-xl flex flex-1 cursor-pointer items-center justify-between gap-3 text-left font-sans text-lg leading-130 font-semibold',
                              isTextDark ? 'text-primary-navy' : 'text-neutral-white',
                            )}
                          >
                            <span>{item.title}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 30 31"
                              fill="none"
                              className={cn(
                                'shrink-0 transition-transform duration-300',
                                isExpanded ? 'rotate-180' : 'rotate-0',
                              )}
                              aria-hidden="true"
                            >
                              <path
                                d="M24.375 10.979L15 20.354L5.625 10.979"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        ) : (
                          <h3
                            className={cn(
                              'mb:text-xl flex-1 font-sans text-lg leading-130 font-semibold',
                              isTextDark ? 'text-primary-navy' : 'text-neutral-white',
                            )}
                          >
                            {item.title}
                          </h3>
                        ))}
                    </div>
                  )}
                  {hasBody && (
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300 ease-in-out',
                        accordionMode && !isExpanded && 'max-h-0 opacity-0',
                        accordionMode && isExpanded && 'opacity-100',
                      )}
                    >
                      <div
                        className={cn(
                          'numbered-list-block__body font-sans leading-140 [&>p]:mb-3 [&>p:last-child]:mb-0',
                          accordionMode ? 'text-lg' : 'text-base',
                          /* CMS HTML puts copy in <p>, <li>, nested headings, etc. — set color on descendants so it wins over body {} and Dato classes. */
                          isTextDark &&
                            'text-primary-navy [&_p]:text-primary-navy [&_li]:text-primary-navy [&_strong]:text-primary-navy [&_a]:text-primary-teal',
                          !isTextDark &&
                            'text-neutral-white/85 [&_p]:text-neutral-white/85 [&_li]:text-neutral-white/85 [&_ul]:text-neutral-white/85 [&_ol]:text-neutral-white/85 [&_strong]:text-neutral-white [&_em]:text-neutral-white/90 [&_h1]:text-neutral-white [&_h2]:text-neutral-white [&_h3]:text-neutral-white [&_h4]:text-neutral-white [&_a]:text-secondary-light-teal [&_a]:underline',
                          hasTitle && 'mt-3',
                        )}
                        dangerouslySetInnerHTML={{ __html: item.content! }}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
