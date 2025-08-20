'use client';

import GenericCard from '../shared/generic-card';
import Cta from '../shared/cta';
import { cn } from '@/lib/utils/css.utils';
import { useEffect, useRef, useState } from 'react';
import useIsMobile from '../hooks/is-mobile';
import { FadeIn } from '../shared/fade-in';

type Props = {
  title: string;
  introduction: string;
  variant: 'default' | 'minimal' | '4-columns' | '3-columns';
  backgroundColor: 'light-purple' | 'light-blue' | 'teal' | 'transparent';
  cta: any;
  items: any[];
};

export default function GenericCardsGrid({
  title,
  introduction,
  cta,
  variant,
  backgroundColor,
  items,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [showArrows, setShowArrows] = useState<boolean>(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector('.generic-card-ui') as HTMLElement;
      const gap = 24;
      const cardWidth = (card?.offsetWidth ?? 320) + gap;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector('.generic-card-ui') as HTMLElement;
      const gap = 24;
      const cardWidth = (card?.offsetWidth ?? 320) + gap;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const checkForOverflow = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll('.generic-card-ui');

      if (cards.length === 0) {
        setShowArrows(false);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const lastCardRect = cards[cards.length - 1].getBoundingClientRect();

      const hasOverflow = lastCardRect.right > containerRect.right + 1;

      setShowArrows(isMobile || hasOverflow);
    }
  };

  useEffect(() => {
    checkForOverflow();
    window.addEventListener('resize', checkForOverflow);

    return () => {
      window.removeEventListener('resize', checkForOverflow);
    };
  }, [isMobile, items]);

  if (variant === 'minimal') {
    return (
      <div className="generic-cards-grid bg-neutral-white overflow-x-hidden">
        <section
          className={cn(
            'mb:pt-[71px] mb:pb-10 py-8',
            backgroundColor === 'light-purple'
              ? 'bg-[#e4e0f7]'
              : 'text-primary-navy bg-[#0079810f] text-xl',
            backgroundColor === 'light-blue' && 'bg-[#e6e5f7]',
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h1 className="tracking-039 text-primary-navy mb:text-[39px] mb:leading-110 mb:mb-14 mb-5 font-sans text-[23px] leading-120 font-semibold">
                {title}
              </h1>

              {introduction && (
                <div
                  dangerouslySetInnerHTML={{ __html: introduction }}
                  className="text-primary-navy mb:[&>p>strong]:text-[25px] mb:mb-12 mb:text-xl mb-5 max-w-[840px] font-sans text-[18px] leading-140 [&>p]:mb-4 [&>p>strong]:text-[20px] [&>p>strong]:font-medium"
                />
              )}
            </FadeIn>
          </div>

          <div ref={scrollContainerRef} className="scrollbar-hide mb:mx-0 mx-4 overflow-x-auto">
            <FadeIn
              className={cn(
                'flex snap-x snap-mandatory items-stretch gap-6 overflow-x-visible pb-8',
              )}
            >
              <div
                className="mb:block hidden flex-shrink-0"
                style={{ width: 'max(0px, calc(50vw - 640px))' }}
              />

              {items.map((item) => (
                <GenericCard
                  {...item}
                  key={item.id}
                  extraClassnames={cn(
                    'generic-card-ui w-[calc(100dvw-48px)] sm:w-[55dvw] mb:w-[390px]! min-h-[500px] mb:p-7 p-3',
                    item.extraClassnames,
                  )}
                />
              ))}

              <div
                className="mb:block hidden flex-shrink-0"
                style={{ width: 'max(0px, calc(50vw - 640px))' }}
              />
            </FadeIn>
          </div>

          {showArrows && (items.length > 3 || isMobile) && (
            <ArrowsHandler scrollLeft={scrollLeft} scrollRight={scrollRight} />
          )}

          {cta && (
            <FadeIn className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Cta {...cta} extraClass="mt-16" />
            </FadeIn>
          )}
        </section>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'generic-cards-grid bg-neutral-white overflow-x-hidden',
        variant === '4-columns' && 'four-columns',
        variant === '3-columns' && 'bg-transparent',
      )}
    >
      <section
        className={cn(
          'mb:mb-2.5 mb:pt-[73px] mb:pb-24 py-8',
          backgroundColor === 'light-purple'
            ? 'bg-secondary-light-purple/20'
            : 'bg-primary-teal/[0.06] text-primary-navy text-xl',
          backgroundColor === 'transparent' && 'bg-transparent',
        )}
      >
        <div
          className={cn(
            'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
            variant === '3-columns' && 'max-w-full px-0 sm:px-0 lg:px-0',
          )}
        >
          <FadeIn>
            {title && (
              <h1 className="tracking-039 text-primary-blue mb:text-[39px] mb:leading-110 mb:mb-14 mb-8 font-sans text-[26px] leading-120 font-semibold">
                {title}
              </h1>
            )}
            {introduction && (
              <div
                dangerouslySetInnerHTML={{ __html: introduction }}
                className="text-primary-navy mb-12 max-w-[840px] font-sans leading-140 [&>p]:mb-4 [&>p>strong]:text-2xl [&>p>strong]:font-medium"
              />
            )}
          </FadeIn>

          <FadeIn
            delay={0.35}
            className={cn(
              'grid',
              variant === 'default' &&
                'Xno-responsive-grid mb:grid-cols-2 mb:gap-y-0 gap-x-32 gap-y-8',
              variant === '4-columns' && 'responsive-grid mb:grid-cols-3 gap-5',
              variant === '3-columns' && 'responsive-grid mb:grid-cols-3 gap-6',
            )}
          >
            {items.map((item) => (
              <GenericCard {...item} key={item.id} />
            ))}
          </FadeIn>

          {cta && (
            <FadeIn delay={0.35}>
              <Cta {...cta} extraClass="mb:mt-16 mt-8" />
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  );
}

export function ArrowsHandler({
  scrollLeft,
  scrollRight,
}: {
  scrollLeft: () => void;
  scrollRight: () => void;
}) {
  return (
    <FadeIn className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb:justify-center flex gap-5 sm:right-6 lg:right-8">
        <button
          onClick={scrollLeft}
          className={cn(
            'text-primary-navy hover:text-neutral-white bg-neutral-white hover:bg-primary-blue flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-5 transition-all duration-200',
          )}
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M11.8125 21.9375L3.375 13.5M3.375 13.5L11.8125 5.0625M3.375 13.5H23.625"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={scrollRight}
          className={cn(
            'text-primary-navy hover:text-neutral-white bg-neutral-white hover:bg-primary-blue flex h-16 w-16 cursor-pointer items-center justify-center rounded-full p-5 transition-all duration-200',
          )}
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M15.1875 5.0625L23.625 13.5M23.625 13.5L15.1875 21.9375M23.625 13.5H3.375"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </FadeIn>
  );
}
