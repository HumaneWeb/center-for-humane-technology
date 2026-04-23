'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/css.utils';

type PillarItem = {
  id: string;
  tabLabel: string;
  subtitle?: string | null;
  content?: string | null;
  readMoreLabel?: string | null;
  readMoreUrl?: string | null;
  buttonLabel?: string | null;
  buttonUrl?: string | null;
  icon?: { url: string; alt?: string | null; width?: number | null; height?: number | null } | null;
  image?: { url: string; alt?: string | null; width?: number | null; height?: number | null } | null;
};

type Props = {
  title: string;
  copy?: string | null;
  pillars: PillarItem[];
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function PillarTabBlock({ title, copy, pillars }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activePillar = pillars[activeIndex];

  // On mobile, scroll the active tab into view whenever it changes
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

  if (!pillars.length) return null;

  return (
    <section className="mb:my-25 my-10">
      {/* ── Mobile: horizontal scrollable tabs ── */}
      <div className="mb:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-primary-navy tracking-049 mb-4 font-sans text-[29px] leading-120 font-semibold">
            {title}
          </p>
          {copy && (
            <div
              className="text-primary-navy mb-4 font-sans text-base leading-140 [&>p]:mb-4 [&>p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: copy }}
            />
          )}
          <div className="flex items-center gap-1">
            <button
              aria-label="Previous tab"
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              className={cn(
                  'shrink-0 p-3 text-primary-navy transition-opacity duration-200',
                  activeIndex === 0 ? 'pointer-events-none opacity-25' : 'opacity-100',
                )}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div
              ref={tabsRef}
              className="scrollbar-hide flex min-w-0 flex-1 snap-x snap-mandatory gap-2 overflow-x-auto pb-1"
            >
              {pillars.map((pillar, index) => (
                <button
                  key={pillar.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'snap-start shrink-0 border px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200',
                    activeIndex === index
                      ? 'border-primary-navy bg-primary-navy text-neutral-white'
                      : 'border-transparent bg-neutral-100 text-primary-navy/50',
                  )}
                >
                  {pillar.tabLabel}
                </button>
              ))}
            </div>

            <button
              aria-label="Next tab"
              onClick={() => setActiveIndex((i) => Math.min(pillars.length - 1, i + 1))}
              className={cn(
                  'shrink-0 p-3 text-primary-navy transition-opacity duration-200',
                  activeIndex === pillars.length - 1 ? 'pointer-events-none opacity-25' : 'opacity-100',
                )}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* ── Mobile: content panel ── */}
        <PillarContent pillar={activePillar} />
      </div>

      {/* ── Desktop ── */}
      <div className="hidden mb:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-primary-navy tracking-049 mb:text-[32px] mb:leading-110 mb-4 font-sans text-[29px] leading-120 font-semibold">
          {title}
        </h2>
        {copy && (
          <div
            className="text-primary-navy mb-10 font-sans text-base mb:text-xl leading-140 [&>p]:mb-4 [&>p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: copy }}
          />
        )}

        <div className="grid grid-cols-[25%_75%] items-stretch">
          {/* Left: sidebar */}
          <div>
            <div className="sticky top-0 py-8 pr-12">
              <p className="tracking-[3px] text-neutral-gray mb-4 font-sans text-xs font-semibold uppercase">
                Select Pillar
              </p>
              <nav className="flex flex-col gap-0">
                {pillars.map((pillar, index) => (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      'group flex cursor-pointer items-start gap-1.5 py-3 text-left font-sans text-base transition-all duration-200',
                      'border-b border-neutral-200 last:border-b-0',
                      activeIndex === index
                        ? 'text-primary-navy'
                        : 'text-primary-navy/40 hover:text-primary-navy/70',
                    )}
                  >
                    <span
                      className={cn(
                        'w-7 shrink-0 text-[18px] leading-130',
                        activeIndex === index ? 'font-semibold' : 'font-normal',
                      )}
                    >
                      {pad(index + 1)}.
                    </span>
                    <span
                      className={cn(
                        'leading-130 text-[18px]',
                        activeIndex === index
                          ? 'font-semibold underline underline-offset-2 decoration-2'
                          : 'font-normal',
                      )}
                    >
                      {pillar.tabLabel}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right: content panel */}
          <div className="bg-neutral-white py-8 pl-16 pr-8">
            <PillarContent pillar={activePillar} />
          </div>
        </div>
      </div>

    </section>
  );
}

function PillarContent({ pillar }: { pillar: PillarItem }) {
  return (
    <div key={pillar.id} className="animate-fade-in">
      {pillar.icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={pillar.icon.url}
          alt={pillar.icon.alt ?? ''}
          width={pillar.icon.width ?? 56}
          height={pillar.icon.height ?? 56}
          className="mb-5 h-14 w-14 object-contain"
        />
      )}

      <h3 className="text-primary-navy mb:text-[39px] mb:leading-110 mb-4 font-sans text-[23px] leading-120 font-semibold">
        {pillar.tabLabel}
      </h3>

      {pillar.subtitle && (
        <p className="text-primary-teal mb-6 font-sans text-lg italic leading-140">
          {pillar.subtitle}
        </p>
      )}

      {(pillar.content || pillar.image) && (
        <div className={cn('mb-8', pillar.image && 'mb:flex mb:items-start mb:gap-10')}>
          {pillar.content && (
            <div
              className="text-primary-navy mb:text-xl min-w-0 flex-1 font-sans text-base leading-140 [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: pillar.content }}
            />
          )}
          {pillar.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pillar.image.url}
              alt={pillar.image.alt ?? ''}
              width={pillar.image.width ?? 400}
              height={pillar.image.height ?? 300}
              className="mb:mt-0 mb:w-[42%] mb:shrink-0 mt-6 w-full rounded-lg object-cover"
            />
          )}
        </div>
      )}

      {(pillar.buttonLabel || pillar.readMoreLabel) && (
        <div className="flex flex-wrap items-center gap-4">
          {pillar.buttonLabel && pillar.buttonUrl && (
            <a
              href={pillar.buttonUrl}
              className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-block rounded-[5px] px-5 py-4 font-sans text-base font-semibold transition-all duration-200"
            >
              {pillar.buttonLabel}
            </a>
          )}
          {pillar.readMoreLabel && pillar.readMoreUrl && (
            <a
              href={pillar.readMoreUrl}
              className="text-primary-navy hover:text-primary-teal inline-flex items-center gap-2 font-sans text-base font-semibold transition-colors duration-200"
            >
              {pillar.readMoreLabel}
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
