'use client';

import { FadeIn } from '@/components/shared/fade-in';
import { cn } from '@/lib/utils/css.utils';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { PATH_FORWARD_DATA, SHOW_SEVEN_PRINCIPLES_HEADER, SHOW_THREE_DOMAINS_SECTION, type Pillar, type PillarHowSection } from './path-forward-data';

const data = PATH_FORWARD_DATA;

const SECTION_IDS = {
  introduction: 'introduction',
  howWeChange: 'how-we-change-a-system',
  threeDomains: 'three-domains-of-change',
  sevenPrinciples: 'seven-principles',
} as const;

export default function PathForwardLayout() {
  return (
    <div>
      <FloatingNav />
      <Hero />
      <IntroductionSection />
      <BridgeSection />
      {SHOW_THREE_DOMAINS_SECTION && <DomainsSection />}
      <PillarsSection />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Floating navigation – visible after scrolling, links to each section
// ---------------------------------------------------------------------------
const NAV_ITEMS: { id: string; label: string }[] = [
  { id: SECTION_IDS.introduction, label: 'Introduction' },
  { id: SECTION_IDS.howWeChange, label: 'How We Change a System' },
  ...(SHOW_THREE_DOMAINS_SECTION ? [{ id: SECTION_IDS.threeDomains, label: 'Three Domains of Change' }] : []),
  { id: SECTION_IDS.sevenPrinciples, label: 'Seven Principles' },
  ...data.pillars.map((p) => ({ id: p.id, label: `${p.number} – ${p.title}` })),
];

function FloatingNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [canInteract, setCanInteract] = useState(false);

  const opacity = useTransform(scrollY, [200, 450], [0, 1]);
  useMotionValueEvent(scrollY, 'change', (v) => setCanInteract(v > 350));

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return () => { };
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(id);
          });
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
    return () => observers.forEach((cleanup) => cleanup());
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      ref={containerRef}
      className="fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 lg:flex"
      style={{ opacity, pointerEvents: canInteract ? 'auto' : 'none' }}
      aria-label="Page sections"
    >
      {/* Vertical accent line matching the page "path" motif */}
      <div
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#007981]/40 to-transparent"
        aria-hidden
      />
      {/* Panel with light background so nav stays readable over dark sections (e.g. Seven Principles) */}
      <ul className="flex max-h-[70vh] w-80 flex-col gap-0.5 overflow-y-auto rounded-r-lg border-y border-r border-[#007981]/15 bg-[#F8F4EF]/98 py-4 pl-6 pr-4 shadow-[2px_0_12px_rgba(0,121,129,0.08)]">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'group flex items-center gap-3 rounded-r-md border-l-2 border-transparent py-2 pl-3 pr-2 font-sans text-[15px] leading-snug transition-colors',
                activeId === item.id
                  ? 'border-[#007981] font-semibold text-[#0B1023]'
                  : 'border-transparent text-[#0B1023]/50 hover:border-[#007981]/40 hover:text-[#0B1023]'
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                  activeId === item.id ? 'bg-[#007981]' : 'bg-[#0B1023]/25 group-hover:bg-[#007981]/60'
                )}
                aria-hidden
              />
              <span className="min-w-0 break-words">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

// ---------------------------------------------------------------------------
// Section 1 – Hero
// ---------------------------------------------------------------------------
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <motion.section
      ref={ref}
      className="bg-path-forward-hero relative overflow-hidden pt-20 pb-10"
    >
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8"
        style={{ opacity: contentOpacity }}
      >
        <div className="mb:grid-cols-[minmax(0,624px)_1fr] mb:items-center mb:gap-16 grid grid-cols-1 gap-10 w-full">
          <div>
            <FadeIn delay={0.35}>
              <h1 className="mb:tracking-[-0.61px] mb:text-[61px] mb-4 font-sans text-[40px] leading-[1.1] font-semibold tracking-[-0.61px] text-[#F8F4EF]">
                {data.hero.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.65}>
              <a
                href={data.report.downloadUrl}
                download
                className="inline-flex items-center justify-center rounded-[5px] bg-[#68EEEA] px-5 py-[15px] font-sans text-[20px] leading-[1.2] font-semibold text-[#0B1023] transition-all duration-300 hover:bg-[#8df5fc]"
              >
                {data.report.downloadLabel}
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.5} className="mb:justify-self-end">
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.co/452x452/D9D9D9/000000?text=Image"
                alt=""
                className="h-[452px] w-[452px] rounded-[452px]"
              />
            </div>
          </FadeIn>
        </div>
      </motion.div>
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// Section – Introduction (Figma: "The Stakes")
// ---------------------------------------------------------------------------
function IntroductionSection() {
  return (
    <div id={SECTION_IDS.introduction} className="scroll-mt-24 bg-[#053235] py-10 mb:py-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb:grid-cols-[auto_1fr] mb:gap-16 grid grid-cols-1 gap-8">
          <FadeIn>
            <h2 className="mb:tracking-[-0.61px] font-sans text-[32px] leading-[1.1] font-semibold text-[#68EEEA] mb:text-[61px]">
              Introduction
            </h2>
          </FadeIn>
          <div>
            {data.introduction.map((p, i) => (
              <FadeIn key={i} delay={0.05 * i} className="mb-5 last:mb-0">
                <p
                  className={cn(
                    'font-sans text-white',
                    i === 0
                      ? 'text-[25px] font-semibold leading-[1.3]'
                      : 'text-[18px] leading-[1.4] mb:text-[20px]'
                  )}
                >
                  {p}
                </p>
              </FadeIn>
            ))}

            {/* Signatures */}
            <FadeIn delay={0.2}>
              <div className="mb:grid-cols-3 mb:gap-12 mt-12 grid grid-cols-1 gap-8">
                {data.introSignatures.map((sig) => (
                  <div key={sig.name} className="flex flex-col items-start">
                    <img
                      src="https://www.datocms-assets.com/160835/1773161367-group-638.png"
                      alt=""
                      className="mb-4 max-h-[102px] w-auto shrink-0 object-contain"
                    />
                    <p className="font-sans text-[20px] leading-[1.2] font-semibold text-white">
                      {sig.name}
                    </p>
                    <p className="mt-1 font-sans text-[16px] leading-[1.4] text-white/80">
                      {sig.role}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section 2 – Bridge
// ---------------------------------------------------------------------------
function BridgeSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const textOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.05, 0.35], ['40px', '0px']);

  return (
    <div ref={ref} id={SECTION_IDS.howWeChange} className="scroll-mt-24 bg-[#007981] py-10 mb:py-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb:tracking-[-0.61px] mb:text-[61px] mb:mb-10 mb-6 font-sans text-[32px] leading-[1.1] font-semibold text-white">
            {data.bridge.headline}
          </h2>
        </FadeIn>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="columns-1 max-w-[839px]"
        >
          {data.bridge.paragraphs.map((p, i) => (
            <p
              key={i}
              className={cn(
                'mb-6 font-sans leading-[1.4] text-white last:mb-0',
                i === 0 ? 'text-[18px] font-semibold leading-[1.3] mb:text-[25px]' : 'text-[18px] mb:text-[20px]'
              )}
            >
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section 3 – Three Domains of Change
// ---------------------------------------------------------------------------
const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  scale: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  ),
  people: (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

function DomainsSection() {
  return (
    <div id={SECTION_IDS.threeDomains} className="scroll-mt-24 bg-[#F8F4EF] py-10 mb:py-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb:tracking-[-0.61px] mb:text-[61px] mb:mb-4 mb-3 text-center font-sans text-[32px] leading-[1.1] font-semibold text-[#0B1023]">
            Three Domains of Change
          </h2>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mb:text-[22px] mb:leading-[1.3] mb:mb-[80px] mx-auto mb-10 max-w-[700px] text-center font-sans text-lg leading-[1.4] text-[#0B1023]/80">
            Each domain changes behaviors in the tech ecosystem in a different way. Together, these processes are mutually reinforcing.
          </p>
        </FadeIn>

        <div className="path-forward-domains-grid mb:grid-cols-3 mb:gap-10 grid grid-cols-1 gap-8">
          {data.domains.map((domain, index) => (
            <FadeIn key={domain.id} delay={0.25 * index}>
              <div className="rounded-2xl border border-[#007981]/20 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-[#007981]/10">
                <div className="mb-5 text-[#007981]">
                  {DOMAIN_ICONS[domain.icon]}
                </div>
                <h3 className="mb:text-[25px] mb-3 font-sans text-xl leading-[1.2] font-semibold text-[#0B1023]">
                  {domain.title}
                </h3>
                <p className="font-sans text-[16px] leading-[1.4] text-[#0B1023]/70">
                  {domain.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section 4 – Seven Solution Pillars
// ---------------------------------------------------------------------------
function PillarsSection() {
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(null);

  return (
    <div id={SECTION_IDS.sevenPrinciples} className="scroll-mt-24 bg-path-forward-pillars py-10 mb:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {SHOW_SEVEN_PRINCIPLES_HEADER && (
          <>
            <FadeIn>
              <h2 className="mb:tracking-[-0.61px] mb:text-[61px] mb:mb-4 mb-3 text-center font-sans text-[32px] leading-[1.1] font-semibold text-[#68EEEA]">
                Seven Principles
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mb:text-[22px] mb:leading-[1.3] mb:mb-[80px] mx-auto mb-10 max-w-[750px] text-center font-sans text-lg leading-[1.4] text-white/80">
                Robust enough to address the complex issues society faces with AI, while still nimble enough to navigate the pace of change.
              </p>
            </FadeIn>
          </>
        )}

        <div className="space-y-20 mb:space-y-32">
          {data.pillars.map((pillar, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <React.Fragment key={pillar.id}>
                {index > 0 && (
                  <div className="mx-auto flex max-w-[200px] items-center justify-center gap-3">
                    <div className="h-px flex-1 bg-[#68EEEA]/30" />
                    <div className="h-2 w-2 rotate-45 border border-[#68EEEA]/50" />
                    <div className="h-px flex-1 bg-[#68EEEA]/30" />
                  </div>
                )}
                <PillarBlock
                  pillar={pillar}
                  imageOnRight={imageOnRight}
                  activeAccordionId={activeAccordionId}
                  onAccordionToggle={(id) => setActiveAccordionId((current) => (current === id ? null : id))}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const MAX_PREVIEW_WORDS = 120;

const paragraphClass = 'mb-4 font-sans text-[16px] leading-[160%] text-white/70 last:mb-0';
const listItemClass = 'flex items-start gap-3';
const listItemTextClass = 'font-sans text-[16px] leading-[160%] text-white/70';

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function takeWords(text: string, maxWords: number): { text: string; consumed: number; hasMore: boolean } {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const hasMore = words.length > maxWords;
  const taken = hasMore ? words.slice(0, maxWords).join(' ') : text.trim();
  const consumed = hasMore ? maxWords : words.length; // words actually shown (to subtract from budget)
  return { text: taken, consumed, hasMore };
}

/** Renders paragraphs in the same structure as full content, truncated to maxWords */
function renderParagraphsUpToWords(paragraphs: string[], maxWords: number): { node: React.ReactNode; hasMore: boolean } {
  let left = maxWords;
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < paragraphs.length && left > 0; i++) {
    const { text, consumed, hasMore } = takeWords(paragraphs[i], left);
    left -= consumed;
    nodes.push(
      <p key={i} className={paragraphClass}>
        {text}
        {hasMore && '…'}
      </p>,
    );
    if (hasMore) break;
  }
  const totalWords = wordCount(paragraphs.join(' '));
  return { node: <>{nodes}</>, hasMore: totalWords > maxWords };
}

/** Renders How We Get There sections in the same structure as full content, truncated to maxWords */
function renderHowWeGetThereUpToWords(sections: PillarHowSection[], maxWords: number): { node: React.ReactNode; hasMore: boolean } {
  let left = maxWords;
  const sectionNodes: React.ReactNode[] = [];
  for (let si = 0; si < sections.length && left > 0; si++) {
    const section = sections[si];
    left -= wordCount(section.heading);
    if (left <= 0) break;
    const parts: React.ReactNode[] = [];
    parts.push(
      <h5 key="h" className="mb-3 font-sans text-[18px] leading-120 font-semibold text-white">
        {section.heading}
      </h5>,
    );
    if (section.intro) {
      const { text, consumed, hasMore } = takeWords(section.intro, left);
      left -= consumed;
      parts.push(
        <p key="intro" className="mb-4 font-sans text-[16px] leading-[160%] text-white/70">
          {text}
          {hasMore && '…'}
        </p>,
      );
      if (hasMore) {
        sectionNodes.push(<div key={si} className="mb-8 last:mb-0">{parts}</div>);
        return { node: <>{sectionNodes}</>, hasMore: true };
      }
    }
    const listItems: React.ReactNode[] = [];
    for (let ii = 0; ii < section.items.length && left > 0; ii++) {
      const { text, consumed, hasMore } = takeWords(section.items[ii], left);
      left -= consumed;
      listItems.push(
        <li key={ii} className={listItemClass}>
          <DiamondBullet />
          <span className={listItemTextClass}>{text}{hasMore && '…'}</span>
        </li>,
      );
      if (hasMore) break;
    }
    parts.push(<ul key="ul" className="space-y-3 pl-1">{listItems}</ul>);
    sectionNodes.push(<div key={si} className="mb-8 last:mb-0">{parts}</div>);
  }
  const totalWords = sections.reduce(
    (acc, s) => acc + wordCount(s.heading) + (s.intro ? wordCount(s.intro) : 0) + s.items.reduce((a, i) => a + wordCount(i), 0),
    0,
  );
  return { node: <>{sectionNodes}</>, hasMore: totalWords > maxWords };
}

/** Renders list items in the same structure as full content, truncated to maxWords */
function renderListUpToWords(items: string[], maxWords: number): { node: React.ReactNode; hasMore: boolean } {
  let left = maxWords;
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < items.length && left > 0; i++) {
    const { text, consumed, hasMore } = takeWords(items[i], left);
    left -= consumed;
    nodes.push(
      <li key={i} className={listItemClass}>
        <CheckBullet />
        <span className="font-sans text-[16px] leading-[160%] text-white/60">{text}{hasMore && '…'}</span>
      </li>,
    );
    if (hasMore) break;
  }
  return { node: <ul className="space-y-3 pl-1">{nodes}</ul>, hasMore: wordCount(items.join(' ')) > maxWords };
}

type PrincipleSectionAccordionProps = {
  accordionId: string;
  title: string;
  previewContent: React.ReactNode;
  hasMoreContent: boolean;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
};

function PrincipleSectionAccordion({
  accordionId,
  title,
  previewContent,
  hasMoreContent,
  children,
  isExpanded,
  onToggle,
}: PrincipleSectionAccordionProps) {
  const [showFullContent, setShowFullContent] = useState(false);

  // Reset "Read more" state when this accordion is closed
  useEffect(() => {
    if (!isExpanded) setShowFullContent(false);
  }, [isExpanded]);

  return (
    <div className="mt-4 first:mt-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-white/20">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left font-sans transition-colors hover:bg-white/5"
        aria-expanded={isExpanded}
        aria-controls={`accordion-body-${accordionId}`}
        id={`accordion-heading-${accordionId}`}
      >
        <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[#68EEEA]">
          {title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'shrink-0 text-[#68EEEA] transition-transform duration-300',
            isExpanded ? 'rotate-180' : 'rotate-0',
          )}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isExpanded && (
        <div id={`accordion-body-${accordionId}`} className="border-t border-white/10 bg-white/[0.02]" aria-labelledby={`accordion-heading-${accordionId}`}>
          {!showFullContent ? (
            <div className="px-5 py-4">
              {previewContent}
              {hasMoreContent && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullContent(true);
                  }}
                  className="mt-3 font-sans text-[16px] font-semibold text-[#68EEEA] underline transition-colors hover:text-[#8df5fc]"
                >
                  Read more
                </button>
              )}
            </div>
          ) : (
            <div className="px-5 py-4">
              {children}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullContent(false);
                }}
                className="mt-4 font-sans text-[16px] font-semibold text-[#68EEEA] underline transition-colors hover:text-[#8df5fc]"
              >
                Show less
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const ACCORDION_KEYS = {
  currentPath: 'currentPath',
  narrowPath: 'narrowPath',
  howWeGetThere: 'howWeGetThere',
  whatsBeingDone: 'whatsBeingDone',
} as const;

type PillarBlockProps = {
  pillar: Pillar;
  imageOnRight: boolean;
  activeAccordionId: string | null;
  onAccordionToggle: (id: string) => void;
};

function PillarBlock({ pillar, imageOnRight, activeAccordionId, onAccordionToggle }: PillarBlockProps) {
  const accordionId = (key: string) => `${pillar.id}-${key}`;

  const currentPathPreview = renderParagraphsUpToWords(pillar.currentPath, MAX_PREVIEW_WORDS);
  const narrowPathPreview = renderParagraphsUpToWords(pillar.narrowPath, MAX_PREVIEW_WORDS);
  const howWeGetTherePreview = renderHowWeGetThereUpToWords(pillar.howWeGetThere, MAX_PREVIEW_WORDS);
  const whatsBeingDonePreview = renderListUpToWords(pillar.whatsBeingDone, MAX_PREVIEW_WORDS);

  return (
    <div id={pillar.id} className="scroll-mt-24 pillar-block">
      {/* Hero row: number + title + summary + image */}
      <div
        className={cn(
          'mb:grid-cols-2 mb:gap-16 mb:items-center grid grid-cols-1 gap-8',
        )}
      >
        <FadeIn
          delay={0.2}
          className={cn(imageOnRight ? 'mb:order-1' : 'mb:order-2')}
        >
          <div>
            <span className="font-sans mb:text-[61px] mb-4 block text-[32px] leading-[1.1] font-semibold tracking-[-0.61px] text-[#ffbb91]">
              {pillar.number}
            </span>
            <h3 className="mb:text-[61px] mb-4 font-sans text-[25px] leading-[1.1] font-semibold tracking-[-0.61px] text-[#8df5fc]">
              {pillar.title}
            </h3>
            <p className="font-sans text-[22px] leading-[1.3] font-semibold text-[#e6fefd] mb:text-[29px]">
              {pillar.summary}
            </p>
          </div>
        </FadeIn>

        <FadeIn
          delay={0.4}
          className={cn(imageOnRight ? 'mb:order-2' : 'mb:order-1')}
        >
          <div className="flex aspect-square w-full max-w-[452px] items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9]">
            {pillar.image ? (
              <img
                src={pillar.image}
                alt={pillar.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-sans text-[36px] font-normal leading-[1.4] text-black">
                Image
              </span>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Full content below – each section in an accordion (collapsed by default, max 120 words + Read more) */}
      <div className="mx-auto mt-10 max-w-[860px] mb:mt-16">
        <FadeIn delay={0.2}>
          <PrincipleSectionAccordion
            accordionId={accordionId(ACCORDION_KEYS.currentPath)}
            title="Current Path"
            previewContent={currentPathPreview.node}
            hasMoreContent={currentPathPreview.hasMore}
            isExpanded={activeAccordionId === accordionId(ACCORDION_KEYS.currentPath)}
            onToggle={() => onAccordionToggle(accordionId(ACCORDION_KEYS.currentPath))}
          >
            {pillar.currentPath.map((p, i) => (
              <p key={i} className={paragraphClass}>
                {p}
              </p>
            ))}
          </PrincipleSectionAccordion>

          <PrincipleSectionAccordion
            accordionId={accordionId(ACCORDION_KEYS.narrowPath)}
            title="Narrow Path"
            previewContent={narrowPathPreview.node}
            hasMoreContent={narrowPathPreview.hasMore}
            isExpanded={activeAccordionId === accordionId(ACCORDION_KEYS.narrowPath)}
            onToggle={() => onAccordionToggle(accordionId(ACCORDION_KEYS.narrowPath))}
          >
            {pillar.narrowPath.map((p, i) => (
              <p key={i} className={paragraphClass}>
                {p}
              </p>
            ))}
          </PrincipleSectionAccordion>

          <PrincipleSectionAccordion
            accordionId={accordionId(ACCORDION_KEYS.howWeGetThere)}
            title="How We Get There"
            previewContent={howWeGetTherePreview.node}
            hasMoreContent={howWeGetTherePreview.hasMore}
            isExpanded={activeAccordionId === accordionId(ACCORDION_KEYS.howWeGetThere)}
            onToggle={() => onAccordionToggle(accordionId(ACCORDION_KEYS.howWeGetThere))}
          >
            {pillar.howWeGetThere.map((section: PillarHowSection, si: number) => (
              <div key={si} className="mb-8 last:mb-0">
                <h5 className="mb-3 font-sans text-[18px] leading-120 font-semibold text-white">
                  {section.heading}
                </h5>
                {section.intro && (
                  <p className="mb-4 font-sans text-[16px] leading-[160%] text-white/70">
                    {section.intro}
                  </p>
                )}
                <ul className="space-y-3 pl-1">
                  {section.items.map((item: string, ii: number) => (
                    <li key={ii} className={listItemClass}>
                      <DiamondBullet />
                      <span className={listItemTextClass}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </PrincipleSectionAccordion>

          <PrincipleSectionAccordion
            accordionId={accordionId(ACCORDION_KEYS.whatsBeingDone)}
            title="What's Already Being Done"
            previewContent={whatsBeingDonePreview.node}
            hasMoreContent={whatsBeingDonePreview.hasMore}
            isExpanded={activeAccordionId === accordionId(ACCORDION_KEYS.whatsBeingDone)}
            onToggle={() => onAccordionToggle(accordionId(ACCORDION_KEYS.whatsBeingDone))}
          >
            <ul className="space-y-3 pl-1">
              {pillar.whatsBeingDone.map((item: string, i: number) => (
                <li key={i} className={listItemClass}>
                  <CheckBullet />
                  <span className="font-sans text-[16px] leading-[160%] text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </PrincipleSectionAccordion>
        </FadeIn>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared SVG Helpers
// ---------------------------------------------------------------------------
function DiamondBullet() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 19 19" fill="none" className="mt-1.5 shrink-0">
      <path d="M9.5 6.32234L12.6777 9.5L9.5 12.6777L6.32234 9.5L9.5 6.32234ZM9.5 0L0 9.5L9.5 19L19 9.5L9.5 0Z" fill="#68EEEA" />
    </svg>
  );
}

function CheckBullet() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#68EEEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1.5 shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 16.5V18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75V16.5M16.5 12L12 16.5M12 16.5L7.5 12M12 16.5V3" />
    </svg>
  );
}

