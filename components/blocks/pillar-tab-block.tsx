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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Mobile: horizontal scrollable tabs ── */}
        <div className="mb:hidden mb-6 block">
          <p className="text-primary-navy tracking-049 mb-4 font-sans text-[22px] leading-120 font-semibold">
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
                  'snap-start shrink-0 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-all duration-200',
                  activeIndex === index
                    ? 'border-primary-navy bg-primary-navy text-neutral-white'
                    : 'border-neutral-300 text-primary-navy/50 hover:border-primary-navy/40 bg-transparent',
                )}
              >
                {pillar.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* ── Mobile: content panel ── */}
        <div className="mb:hidden block">
          <PillarContent pillar={activePillar} />
        </div>

        {/* ── Desktop: two-column layout ── */}
        <div className="mb:grid mb:grid-cols-[280px_1fr] mb:gap-16 hidden items-start">
          {/* Left: title + tab list */}
          <div className="sticky top-24">
            <h2 className="text-primary-navy tracking-049 mb:text-4xl mb:leading-110 mb-8 font-sans text-[29px] leading-120 font-semibold">
              {title}
            </h2>
            <nav className="flex flex-col gap-0">
              {pillars.map((pillar, index) => (
                <button
                  key={pillar.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'group flex items-start gap-3 py-3 text-left font-sans text-base transition-all duration-200',
                    'border-b border-neutral-200 last:border-b-0',
                    activeIndex === index
                      ? 'text-primary-navy'
                      : 'text-primary-navy/40 hover:text-primary-navy/70',
                  )}
                >
                  <span
                    className={cn(
                      'w-6 shrink-0 text-[15px] leading-130',
                      activeIndex === index ? 'font-semibold' : 'font-normal',
                    )}
                  >
                    {ROMAN[index]}.
                  </span>
                  <span
                    className={cn(
                      'leading-130 text-[15px]',
                      activeIndex === index ? 'font-semibold underline underline-offset-2' : 'font-normal',
                    )}
                  >
                    {pillar.tabLabel}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right: content panel */}
          <div>
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
      {/* Icon placeholder — teal rounded square */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-light-teal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-primary-navy"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
      </div>

      <h3 className="text-primary-navy mb:text-[39px] mb:leading-110 mb-4 font-sans text-[26px] leading-120 font-semibold">
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
