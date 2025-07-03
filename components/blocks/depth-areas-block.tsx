'use client';

import React, { useRef } from 'react';
import DepthAreaCard from '../shared/depth-area-card';
import type { CustomImageProps } from '../shared/custom-image';
import { ArrowsHandler } from './generic-cards-grid';
import { cn } from '@/lib/utils/css.utils';

type Props = {
  id: string;
  title: string;
  introduction: string;
  items: {
    id: string;
    title: string;
    introduction: string;
    image: CustomImageProps;
    link: any;
  }[];
};

export default function DepthAreasBlock({ title, introduction, items }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector('.depth-area-card') as HTMLElement;
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
      const card = scrollContainerRef.current.querySelector('.depth-area-card') as HTMLElement;
      const gap = 24;
      const cardWidth = (card?.offsetWidth ?? 320) + gap;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mb:my-25 my-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb:grid-cols-[1fr_2fr] mb:gap-15 grid grid-cols-1 items-start gap-5">
          <div>
            <h2 className="text-primary-navy tracking-049 mb:text-5xl mb:leading-110 mb:mb-1.5 mb-5 font-sans text-[29px] leading-120 font-semibold">
              {title}
            </h2>
            {introduction && (
              <div
                className="text-primary-navy mb:text-xl font-sans text-[18px] leading-140 [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>

          <div
            ref={scrollContainerRef}
            className="scrollbar-hide mb:overflow-x-visible grid gap-5 overflow-x-auto"
          >
            <div
              className={cn(
                'mb:flex-col mb:gap-11 Xpb-8 flex snap-x snap-mandatory flex-row gap-3 overflow-x-visible overflow-y-visible',
              )}
            >
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <DepthAreaCard
                    key={item.id}
                    {...item}
                    extraClassnames="w-[calc(100dvw-48px)] sm:w-[55dvw] mb:w-auto!"
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* <div className="mb:hidden mb:mb-0 mb-10 block">
            <ArrowsHandler scrollLeft={scrollLeft} scrollRight={scrollRight} />
          </div> */}
        </div>
      </div>
    </section>
  );
}
