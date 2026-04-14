'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/css.utils';

type PillarItem = {
  id: string;
  tabLabel: string;
  subtitle?: string | null;
  content?: string | null;
  readMoreLabel?: string | null;
  readMoreUrl?: string | null;
};

type Props = {
  title: string;
  pillars: PillarItem[];
};

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];

export default function PillarTabBlock({ title, pillars }: Props) {
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
          <div
            ref={tabsRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1"
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
        </div>

        {/* ── Mobile: content panel ── */}
        <PillarContent pillar={activePillar} />
      </div>

      {/* ── Desktop: full-width two-column, sidebar bleeds to left viewport edge ── */}
      <div
        className="hidden mb:grid items-stretch"
        style={{ gridTemplateColumns: 'calc(max(0px, (100vw - 80rem) / 2) + 17.5rem) 1fr' }}
      >
        {/* Left: gray sidebar — fills column all the way to the left viewport edge */}
        <div className="bg-[#eeeeee]">
          <div
            className="sticky top-24 py-16 pr-12"
            style={{ paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))' }}
          >
            <h2 className="text-primary-navy tracking-049 mb:text-[32px] mb:leading-110 mb-8 font-sans text-[29px] leading-120 font-semibold">
              {title}
            </h2>
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
                    {ROMAN[index]}.
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

        {/* Right: content panel — aligns with container right edge */}
        <div
          className="py-16 pl-16"
          style={{ paddingRight: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))' }}
        >
          <PillarContent pillar={activePillar} />
        </div>
      </div>
    </section>
  );
}

function PillarContent({ pillar }: { pillar: PillarItem }) {
  return (
    <div key={pillar.id} className="animate-fade-in">
      <h3 className="text-primary-navy mb:text-[39px] mb:leading-110 mb-4 font-sans text-[23px] leading-120 font-semibold">
        {pillar.tabLabel}
      </h3>

      {pillar.subtitle && (
        <p className="text-primary-teal mb-6 font-sans text-lg italic leading-140">
          {pillar.subtitle}
        </p>
      )}

      {pillar.content && (
        <div
          className="text-primary-navy mb:text-xl mb-8 font-sans text-base leading-140 [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: pillar.content }}
        />
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
  );
}
