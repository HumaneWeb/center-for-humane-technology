'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/css.utils';

type CardItem = {
  id: string;
  tabLabel: string;
  subtitle?: string | null;
  content?: string | null;
  image?: { url: string; alt?: string | null; width?: number | null; height?: number | null } | null;
};

type Props = {
  title: string;
  copy?: string | null;
  cards?: CardItem[];
};

export default function TopNavCardBlock({ title, copy, cards = [] }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeStartX = useRef<number | null>(null);

  const activeCard = cards[activeIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) setActiveIndex((i) => Math.min(cards.length - 1, i + 1));
    else setActiveIndex((i) => Math.max(0, i - 1));
  };

  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab && tabsRef.current) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex]);

  if (!cards.length) return null;

  return (
    <section className="my-10 mb:my-25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-primary-navy tracking-049 mb-4 font-sans text-[29px] leading-120 font-semibold mb:text-[32px] mb:leading-110">
          {title}
        </h2>
        {copy && (
          <div
            className="text-primary-navy mb-8 font-sans text-base leading-140 mb:text-xl mb:mb-10 [&>p]:mb-4 [&>p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: copy }}
          />
        )}

        {/* Horizontal tab nav */}
        <div className="flex items-center gap-1 mb:gap-0 -mx-4 mb:mx-0">
          {/* Left chevron – mobile only */}
          <button
            aria-label="Previous tab"
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            className={cn(
              'mb:hidden shrink-0 p-3 text-primary-navy transition-opacity duration-200',
              activeIndex === 0 ? 'pointer-events-none opacity-25' : 'opacity-100',
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={tabsRef}
            className="scrollbar-hide flex min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto border-b border-neutral-200"
          >
            {cards.map((card, index) => (
              <button
                key={card.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'cursor-pointer snap-start shrink-0 flex flex-col items-center gap-2 px-5 pb-4 pt-3 font-sans text-xs mb:text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-200 border-b-2 -mb-px',
                  activeIndex === index
                    ? 'border-primary-navy text-primary-navy'
                    : 'border-transparent text-primary-navy/60 hover:text-primary-navy/80 hover:border-primary-navy/30',
                )}
              >
                <span>{card.tabLabel}</span>
              </button>
            ))}
          </div>

          {/* Right chevron – mobile only */}
          <button
            aria-label="Next tab"
            onClick={() => setActiveIndex((i) => Math.min(cards.length - 1, i + 1))}
            className={cn(
              'mb:hidden shrink-0 p-3 text-primary-navy transition-opacity duration-200',
              activeIndex === cards.length - 1 ? 'pointer-events-none opacity-25' : 'opacity-100',
            )}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Content panel – swipeable on mobile */}
        <div
          className="pt-8 mb:pt-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent card={activeCard} />
        </div>
      </div>
    </section>
  );
}

function CardContent({ card }: { card: CardItem }) {
  return (
    <div key={card.id} className="animate-fade-in">
      <div className={cn(card.image ? 'mb:flex mb:items-start mb:gap-12' : '')}>
        {/* Text content – above image on mobile, right of image on desktop */}
        <div className="min-w-0 flex-1">
          <h3 className="text-primary-navy mb-4 font-sans text-[23px] leading-120 font-semibold mb:text-[39px] mb:leading-110">
            {card.tabLabel}
          </h3>

          {card.subtitle && (
            <p className="text-primary-teal mb-6 font-sans text-lg italic leading-140">
              {card.subtitle}
            </p>
          )}

          {card.content && (
            <div
              className="text-primary-navy font-sans text-base leading-140 mb:text-xl [&>p]:mb-4 [&>p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: card.content }}
            />
          )}
        </div>

        {/* Image – below text on mobile, left on desktop */}
        {card.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image.url}
            alt={card.image.alt ?? ''}
            width={card.image.width ?? 400}
            height={card.image.height ?? 300}
            className="mb:w-[40%] mb:shrink-0 mb:mt-0 mb:order-first mt-6 w-full max-h-[45vh] mb:max-h-none rounded-lg object-contain"
          />
        )}
      </div>
    </div>
  );
}
