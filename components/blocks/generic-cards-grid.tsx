'use client';

import GenericCard from '../shared/generic-card';
import Cta from '../shared/cta';
import { cn } from '@/lib/utils/css.utils';
import { useRef } from 'react';

type Props = {
  title: string;
  introduction: string;
  variant: 'default' | 'minimal';
  backgroundColor: string;
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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="bg-neutral-white overflow-x-hidden">
        <section
          className={cn(
            'mb-2.5x pt-[71px] pb-10',
            backgroundColor === 'light-purple'
              ? 'bg-secondary-light-purple/20'
              : 'text-primary-navy bg-[#0079810f] text-xl',
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="tracking-039 text-primary-navy mb-14 font-sans text-[39px] leading-110 font-semibold">
              {title}
            </h1>

            {introduction && (
              <div
                dangerouslySetInnerHTML={{ __html: introduction }}
                className="text-primary-navy mb-12 max-w-[840px] font-sans text-xl leading-140 [&>p]:mb-4 [&>p>strong]:text-[25px] [&>p>strong]:font-medium"
              />
            )}
          </div>

          <div ref={scrollContainerRef} className="scrollbar-hide overflow-x-auto">
            <div className={cn('flex snap-x snap-mandatory gap-6 overflow-x-visible pb-8')}>
              <div className="flex-shrink-0" style={{ width: 'max(0px, calc(50vw - 640px))' }} />

              {items.map((item) => (
                <GenericCard {...item} key={item.id} extraClassnames="min-h-[500px]" />
              ))}

              <div className="flex-shrink-0" style={{ width: 'max(0px, calc(50vw - 640px))' }} />
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end gap-5 sm:right-6 lg:right-8">
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
          </div>

          {cta && (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Cta {...cta} extraClass="mt-16" />
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="bg-neutral-white overflow-x-hidden">
      <section
        className={cn(
          'mb-2.5 pt-[73px] pb-24',
          backgroundColor === 'light-purple'
            ? 'bg-secondary-light-purple/20'
            : 'bg-primary-teal/[0.06] text-primary-navy text-xl',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="tracking-039 text-primary-blue mb-14 font-sans text-[39px] leading-110 font-semibold">
            {title}
          </h1>

          {introduction && (
            <div
              dangerouslySetInnerHTML={{ __html: introduction }}
              className="text-primary-navy mb-12 max-w-[840px] font-sans leading-140 [&>p]:mb-4 [&>p>strong]:text-2xl [&>p>strong]:font-medium"
            />
          )}

          <div className={cn('grid', variant === 'default' && 'grid-cols-2 gap-x-32')}>
            {items.map((item) => (
              <GenericCard {...item} key={item.id} />
            ))}
          </div>

          {cta && <Cta {...cta} extraClass="mt-16" />}
        </div>
      </section>
    </div>
  );
}
