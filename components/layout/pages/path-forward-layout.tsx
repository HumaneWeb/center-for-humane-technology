'use client';

import { FadeIn } from '@/components/shared/fade-in';
import { cn } from '@/lib/utils/css.utils';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { PATH_FORWARD_DATA, type Pillar, type PillarHowSection } from './path-forward-data';

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
      <DomainsSection />
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
  { id: SECTION_IDS.threeDomains, label: 'Three Domains of Change' },
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
      if (!el) return () => {};
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
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#10B981]/30 to-transparent"
        aria-hidden
      />
      {/* Panel with light background so nav stays readable over dark sections (e.g. Seven Principles) */}
      <ul className="flex max-h-[70vh] w-80 flex-col gap-0.5 overflow-y-auto rounded-r-lg border-y border-r border-[#064E3B]/10 bg-[#F8F4EF]/98 py-4 pl-6 pr-4 shadow-[2px_0_12px_rgba(6,78,59,0.08)]">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'group flex items-center gap-3 rounded-r-md border-l-2 border-transparent py-2 pl-3 pr-2 font-sans text-[15px] leading-snug transition-colors',
                activeId === item.id
                  ? 'border-[#10B981] font-semibold text-[#064E3B]'
                  : 'border-transparent text-[#0A1628]/50 hover:border-[#10B981]/40 hover:text-[#064E3B]'
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                  activeId === item.id ? 'bg-[#10B981]' : 'bg-[#0A1628]/25 group-hover:bg-[#10B981]/60'
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.6]);

  return (
    <motion.section
      ref={ref}
      className="bg-path-forward-hero relative overflow-hidden py-10 mb:py-[100px]"
    >
      {/* Decorative grid lines */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />

      <motion.div
        className="relative z-10 mx-auto max-w-[860px] px-4 sm:px-6 lg:px-8"
        style={{ opacity: contentOpacity }}
      >
        <FadeIn delay={0.2}>
          <p className="mb:text-xl mb:leading-135 tracking-08 mb:tracking-[1px] mb-4 font-sans text-[16px] leading-120 font-semibold uppercase text-[#6EE7B7]">
            {data.hero.preTitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <h1 className="mb:tracking-061 mb:text-[72px] mb-6 max-w-[900px] font-sans text-[40px] leading-110 font-semibold tracking-[-0.4px] text-white">
            {data.hero.title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="mb:text-[25px] mb:leading-130 max-w-[700px] font-sans text-xl leading-140 text-[#D1FAE5]">
            {data.hero.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.65}>
          <a
            href={data.report.downloadUrl}
            download
            className="mt-10 inline-flex items-center gap-3 border-2 border-[#6EE7B7] px-8 py-4 font-sans text-[16px] leading-100 font-semibold tracking-wide text-[#6EE7B7] uppercase transition-all duration-300 hover:bg-[#6EE7B7] hover:text-[#0A1628]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {data.report.downloadLabel}
          </a>
        </FadeIn>

      </motion.div>

      {/* Decorative emerald glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)',
        }}
      />
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// Section – Introduction
// ---------------------------------------------------------------------------
function IntroductionSection() {
  return (
    <div id={SECTION_IDS.introduction} className="scroll-mt-24 bg-[#F8F4EF] py-10 mb:py-[100px]">
      <div className="mx-auto max-w-[860px] px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb:tracking-061 tracking-031 mb:text-[49px] mb:mb-10 mb-6 font-sans text-[32px] leading-110 font-semibold text-[#064E3B]">
            Introduction
          </h2>
        </FadeIn>
        {data.introduction.map((p, i) => (
          <FadeIn key={i} delay={0.1} className='mb-6'>
            <p className="mb:text-xl font-sans text-[18px] leading-140 text-[#0A1628]">
              {p}
            </p>
          </FadeIn>
        ))}

        {/* Signatures */}
        <FadeIn delay={0.2}>
          <div className="mb:grid-cols-3 mb:gap-8 mt-10 grid grid-cols-1 gap-6 border-t border-[#064E3B]/15 pt-10">
            {data.introSignatures.map((sig) => (
              <div key={sig.name}>
                <p className="font-sans text-[18px] leading-120 font-semibold text-[#064E3B]">
                  {sig.name}
                </p>
                <p className="mt-1 font-sans text-[16px] leading-140 text-[#0A1628]/60">
                  {sig.role}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
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
    <div ref={ref} id={SECTION_IDS.howWeChange} className="scroll-mt-24 bg-[#ECFDF5] py-10 mb:py-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb:tracking-061 tracking-031 mb:text-[61px] mb:mb-10 mb-6 font-sans text-[32px] leading-110 font-semibold text-[#064E3B]">
            {data.bridge.headline}
          </h2>
        </FadeIn>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="columns-1"
        >
          {data.bridge.paragraphs.map((p, i) => (
            <p
              key={i}
              className="mb:text-xl mb-6 font-sans text-[18px] leading-140 text-[#0A1628]"
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
    <div id={SECTION_IDS.threeDomains} className="scroll-mt-24 bg-[#F0FDF4] py-10 mb:py-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="tracking-031 mb:tracking-061 mb:text-[61px] mb:mb-4 mb-3 text-center font-sans text-[32px] leading-110 font-semibold text-[#064E3B]">
            Three Domains of Change
          </h2>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mb:text-[22px] mb:leading-130 mb:mb-[80px] mx-auto mb-10 max-w-[700px] text-center font-sans text-lg leading-140 text-[#0A1628]/80">
            Each domain changes behaviors in the tech ecosystem in a different way. Together, these processes are mutually reinforcing.
          </p>
        </FadeIn>

        <div className="path-forward-domains-grid mb:grid-cols-3 mb:gap-10 grid grid-cols-1 gap-8">
          {data.domains.map((domain, index) => (
            <FadeIn key={domain.id} delay={0.25 * index}>
              <div className="rounded-2xl border border-[#10B981]/20 bg-white/80 p-8 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-[#10B981]/10">
                <div className="mb-5 text-[#10B981]">
                  {DOMAIN_ICONS[domain.icon]}
                </div>
                <h3 className="mb:text-[25px] mb-3 font-sans text-xl leading-120 font-semibold text-[#064E3B]">
                  {domain.title}
                </h3>
                <p className="font-sans text-[16px] leading-140 text-[#0A1628]/70">
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
        <FadeIn>
          <h2 className="tracking-031 mb:tracking-061 mb:text-[61px] mb:mb-4 mb-3 text-center font-sans text-[32px] leading-110 font-semibold text-[#6EE7B7]">
            Seven Principles
          </h2>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="mb:text-[22px] mb:leading-130 mb:mb-[80px] mx-auto mb-10 max-w-[750px] text-center font-sans text-lg leading-140 text-white/70">
            Robust enough to address the complex issues society faces with AI, while still nimble enough to navigate the pace of change.
          </p>
        </FadeIn>

        <div className="space-y-20 mb:space-y-32">
          {data.pillars.map((pillar, index) => {
            const imageOnRight = index % 2 === 0;
            return (
              <React.Fragment key={pillar.id}>
                {index > 0 && (
                  <div className="mx-auto flex max-w-[200px] items-center justify-center gap-3">
                    <div className="h-px flex-1 bg-[#10B981]/20" />
                    <div className="h-2 w-2 rotate-45 border border-[#10B981]/30" />
                    <div className="h-px flex-1 bg-[#10B981]/20" />
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
        <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[#6EE7B7]">
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
            'shrink-0 text-[#6EE7B7] transition-transform duration-300',
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
                  className="mt-3 font-sans text-[16px] font-semibold text-[#6EE7B7] underline transition-colors hover:text-[#10B981]"
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
                className="mt-4 font-sans text-[16px] font-semibold text-[#6EE7B7] underline transition-colors hover:text-[#10B981]"
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
            <span className="font-pixel mb:text-[49px] mb-4 block text-[32px] leading-100 text-[#10B981]">
              {pillar.number}
            </span>
            <h3 className="mb:text-[31px] mb-4 font-sans text-[25px] leading-120 font-semibold text-white">
              {pillar.title}
            </h3>
            <p className="font-sans text-[18px] leading-140 font-semibold text-[#6EE7B7]/80">
              {pillar.summary}
            </p>
          </div>
        </FadeIn>

        <FadeIn
          delay={0.4}
          className={cn(imageOnRight ? 'mb:order-2' : 'mb:order-1')}
        >
          <div className="overflow-hidden rounded-xl">
            <img
              src={pillar.image}
              alt={pillar.title}
              className="h-auto w-full object-cover"
            />
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
      <path d="M9.5 6.32234L12.6777 9.5L9.5 12.6777L6.32234 9.5L9.5 6.32234ZM9.5 0L0 9.5L9.5 19L19 9.5L9.5 0Z" fill="#10B981" />
    </svg>
  );
}

function CheckBullet() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1.5 shrink-0">
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

