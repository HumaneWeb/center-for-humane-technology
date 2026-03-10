'use client';

import { FadeIn } from '@/components/shared/fade-in';
import { cn } from '@/lib/utils/css.utils';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
// Floating navigation – button bottom-left to open/close section list
// ---------------------------------------------------------------------------
const NAV_ITEMS: { id: string; label: string }[] = [
  { id: SECTION_IDS.introduction, label: 'Introduction' },
  { id: SECTION_IDS.howWeChange, label: 'How We Change a System' },
  ...(SHOW_THREE_DOMAINS_SECTION ? [{ id: SECTION_IDS.threeDomains, label: 'Three Domains of Change' }] : []),
  ...data.pillars.map((p) => ({ id: p.id, label: `Principle ${p.number}` })),
];

function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  const navContent = (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 lg:bottom-8 lg:left-8">
      <motion.nav
        initial={false}
        animate={{
          maxHeight: isOpen ? 400 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-56 overflow-hidden border border-[#007981]/25 bg-[#F8F4EF]/98 shadow-lg"
        aria-label="Page sections"
        aria-hidden={!isOpen}
      >
        <ul className="flex max-h-[min(60vh,400px)] flex-col overflow-y-auto py-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={cn(
                  'block border-l-2 border-transparent py-2 pl-4 pr-3 font-sans text-[13px] leading-snug transition-colors',
                  activeId === item.id
                    ? 'border-[#007981] font-semibold text-[#0B1023]'
                    : 'text-[#0B1023]/70 hover:border-[#007981]/40 hover:bg-[#007981]/05 hover:text-[#0B1023]'
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-[#007981]/30 bg-[#F8F4EF]/98 text-[#0B1023] shadow-md transition-all duration-200 hover:scale-105 hover:border-[#007981]/60 hover:bg-[#F8F4EF] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#007981]/40"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>
    </div>
  );

  if (typeof document === 'undefined') return navContent;
  return createPortal(navContent, document.body);
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
              <PillarBlock
                key={pillar.id}
                pillar={pillar}
                imageOnRight={imageOnRight}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const MAX_PREVIEW_WORDS = 120;
const paragraphClass = 'mb-4 font-sans text-[16px] leading-[160%] text-white last:mb-0';
const listItemClass = 'flex items-start gap-3';
const listItemTextClass = 'font-sans text-[16px] leading-[160%] text-white';
const sectionTitleClass = 'mb-3 mt-8 font-sans text-[18px] font-semibold leading-tight text-white first:mt-0';

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

/** Renders all pillar content in order (currentPath → narrowPath → howWeGetThere → whatsBeingDone), truncated to maxWords. Section titles are only shown when there is content from that section within the word budget. */
function renderPillarContentUpToWords(pillar: Pillar, maxWords: number): { node: React.ReactNode; hasMore: boolean } {
  let left = maxWords;
  const nodes: React.ReactNode[] = [];
  const pushParagraphs = (paragraphs: string[]) => {
    for (let i = 0; i < paragraphs.length && left > 0; i++) {
      const { text, consumed, hasMore } = takeWords(paragraphs[i], left);
      left -= consumed;
      nodes.push(
        <p key={`p-${nodes.length}`} className={paragraphClass}>
          {text}
          {hasMore && '…'}
        </p>,
      );
      if (hasMore) return true;
    }
    return false;
  };

  if (left > 0 && pillar.currentPath.length > 0) {
    nodes.push(<h5 key="current-path" className={sectionTitleClass}>Current Path</h5>);
    if (pushParagraphs(pillar.currentPath)) return { node: <>{nodes}</>, hasMore: true };
  }
  if (left > 0 && pillar.narrowPath.length > 0) {
    nodes.push(<h5 key="narrow-path" className={sectionTitleClass}>Narrow Path</h5>);
    if (pushParagraphs(pillar.narrowPath)) return { node: <>{nodes}</>, hasMore: true };
  }
  if (left > 0 && pillar.howWeGetThere.length > 0) {
    nodes.push(<h5 key="how-we-get-there" className={sectionTitleClass}>How We Get There</h5>);
    for (let si = 0; si < pillar.howWeGetThere.length && left > 0; si++) {
      const section = pillar.howWeGetThere[si];
      const headingWords = wordCount(section.heading);
      if (left < headingWords) break;
      left -= headingWords;
      const parts: React.ReactNode[] = [
        <h5 key="h" className="mb-3 font-sans text-[18px] leading-120 font-semibold text-white">
          {section.heading}
        </h5>,
      ];
      if (section.intro) {
        const { text, consumed, hasMore } = takeWords(section.intro, left);
        left -= consumed;
        parts.push(
          <p key="intro" className="mb-4 font-sans text-[16px] leading-[160%] text-white">
            {text}
            {hasMore && '…'}
          </p>,
        );
        if (hasMore) {
          nodes.push(<div key={`hw-${si}`} className="mb-8 last:mb-0">{parts}</div>);
          return { node: <>{nodes}</>, hasMore: true };
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
        if (hasMore) {
          parts.push(<ul key="ul" className="space-y-3 pl-1">{listItems}</ul>);
          nodes.push(<div key={`hw-${si}`} className="mb-8 last:mb-0">{parts}</div>);
          return { node: <>{nodes}</>, hasMore: true };
        }
      }
      parts.push(<ul key="ul" className="space-y-3 pl-1">{listItems}</ul>);
      nodes.push(<div key={`hw-${si}`} className="mb-8 last:mb-0">{parts}</div>);
    }
  }
  if (left > 0 && pillar.whatsBeingDone.length > 0) {
    nodes.push(<h5 key="whats-being-done" className={sectionTitleClass}>What&apos;s Already Being Done</h5>);
    const listResult = renderListUpToWords(pillar.whatsBeingDone, left);
    nodes.push(<div key="wabd" className="mb-8 last:mb-0">{listResult.node}</div>);
  }
  const totalWords =
    wordCount(pillar.currentPath.join(' ')) +
    wordCount(pillar.narrowPath.join(' ')) +
    pillar.howWeGetThere.reduce(
      (acc, s) => acc + wordCount(s.heading) + (s.intro ? wordCount(s.intro) : 0) + s.items.reduce((a, i) => a + wordCount(i), 0),
      0,
    ) +
    wordCount(pillar.whatsBeingDone.join(' '));
  return { node: <>{nodes}</>, hasMore: totalWords > maxWords };
}

/** Renders full pillar content (all sections in order) */
function renderPillarFullContent(pillar: Pillar): React.ReactNode {
  return (
    <>
      <h5 className={sectionTitleClass}>Current Path</h5>
      {pillar.currentPath.map((p, i) => (
        <p key={`cp-${i}`} className={paragraphClass}>
          {p}
        </p>
      ))}
      <h5 className={sectionTitleClass}>Narrow Path</h5>
      {pillar.narrowPath.map((p, i) => (
        <p key={`np-${i}`} className={paragraphClass}>
          {p}
        </p>
      ))}
      <h5 className={sectionTitleClass}>How We Get There</h5>
      {pillar.howWeGetThere.map((section, si) => (
        <div key={`hw-${si}`} className="mb-8 last:mb-0">
          <h5 className="mb-3 font-sans text-[18px] leading-120 font-semibold text-white">
            {section.heading}
          </h5>
          {section.intro && (
            <p className="mb-4 font-sans text-[16px] leading-[160%] text-white">
              {section.intro}
            </p>
          )}
          <ul className="space-y-3 pl-1">
            {section.items.map((item, ii) => (
              <li key={ii} className={listItemClass}>
                <DiamondBullet />
                <span className={listItemTextClass}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h5 className={sectionTitleClass}>What&apos;s Already Being Done</h5>
      <ul className="space-y-3 pl-1">
        {pillar.whatsBeingDone.map((item, i) => (
          <li key={i} className={listItemClass}>
            <CheckBullet />
            <span className="font-sans text-[16px] leading-[160%] text-white/80">{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

type PillarBlockProps = {
  pillar: Pillar;
  imageOnRight: boolean;
};

function PillarBlock({ pillar, imageOnRight }: PillarBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const preview = renderPillarContentUpToWords(pillar, MAX_PREVIEW_WORDS);
  const fullContent = renderPillarFullContent(pillar);

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

      {/* Single expandable: first 120 words + Read more → full content + Show less */}
      <div className="mx-auto mt-10 max-w-[860px] mb:mt-16">
        <FadeIn delay={0.2}>
          <div id={`${pillar.id}-accordion`} className="overflow-hidden border border-white/15 bg-white/[0.03] transition-colors hover:border-white/40">
            <div className="px-5 py-4">
              {!expanded ? (
                <>
                  {preview.node}
                  {preview.hasMore && (
                    <button
                      type="button"
                      onClick={() => setExpanded(true)}
                      className="mt-3 font-sans text-[16px] font-semibold text-white underline transition-colors hover:text-[#8df5fc]"
                    >
                      Read more
                    </button>
                  )}
                </>
              ) : (
                <>
                  {fullContent}
                  <button
                    type="button"
                    onClick={() => {
                      setExpanded(false);
                      requestAnimationFrame(() => {
                        const el = document.getElementById(`${pillar.id}-accordion`);
                        if (!el) return;
                        el.scrollIntoView({ behavior: 'auto', block: 'start' });
                        window.scrollBy({ top: -80, left: 0, behavior: 'auto' });
                      });
                    }}
                    className="mt-4 font-sans text-[16px] font-semibold text-white underline transition-colors hover:text-[#8df5fc]"
                  >
                    Show less
                  </button>
                </>
              )}
            </div>
          </div>
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

