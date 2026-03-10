'use client';

import { FadeIn } from '@/components/shared/fade-in';
import { cn } from '@/lib/utils/css.utils';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PATH_FORWARD_DATA, type Pillar, type PillarHowSection } from './path-forward-data';

const data = PATH_FORWARD_DATA;

export default function PathForwardLayout() {
  return (
    <div>
      <Hero />
      <IntroductionSection />
      <BridgeSection />
      <DomainsSection />
      <PillarsSection />
      <ReportSection />
      <CtaSection />
    </div>
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
    <div className="bg-[#F8F4EF] py-10 mb:py-[100px]">
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
    <div ref={ref} className="bg-[#ECFDF5] py-10 mb:py-[100px]">
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
    <div className="bg-[#F0FDF4] py-10 mb:py-[100px]">
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
  return (
    <div className="bg-path-forward-pillars py-10 mb:py-[120px]">
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
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type PillarBlockProps = {
  pillar: Pillar;
  imageOnRight: boolean;
};

function PillarBlock({ pillar, imageOnRight }: PillarBlockProps) {
  return (
    <div className="pillar-block">
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

      {/* Full content below */}
      <div className="mx-auto mt-10 max-w-[860px] mb:mt-16">
        {/* Current Path */}
        <FadeIn delay={0.2}>
          <h4 className="mb-4 font-sans text-sm tracking-widest text-[#10B981] uppercase">
            Current Path
          </h4>
          {pillar.currentPath.map((p, i) => (
            <p key={i} className="mb-4 font-sans text-[16px] leading-[160%] text-white/70 last:mb-0">
              {p}
            </p>
          ))}
        </FadeIn>

        {/* Narrow Path */}
        <FadeIn delay={0.2}>
          <h4 className="mt-8 mb-4 font-sans text-sm tracking-widest text-[#10B981] uppercase">
            Narrow Path
          </h4>
          {pillar.narrowPath.map((p, i) => (
            <p key={i} className="mb-4 font-sans text-[16px] leading-[160%] text-white/70 last:mb-0">
              {p}
            </p>
          ))}
        </FadeIn>

        {/* How We Get There */}
        <FadeIn delay={0.2}>
          <h4 className="mt-8 mb-6 font-sans text-sm tracking-widest text-[#10B981] uppercase">
            How We Get There
          </h4>
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
                  <li key={ii} className="flex items-start gap-3">
                    <DiamondBullet />
                    <span className="font-sans text-[16px] leading-[160%] text-white/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </FadeIn>

        {/* What's Already Being Done */}
        <FadeIn delay={0.2}>
          <h4 className="mt-8 mb-4 font-sans text-sm tracking-widest text-[#10B981] uppercase">
            What&#39;s Already Being Done
          </h4>
          <ul className="space-y-3 pl-1">
            {pillar.whatsBeingDone.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <CheckBullet />
                <span className="font-sans text-[16px] leading-[160%] text-white/60">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section 5 – Solutions Report
// ---------------------------------------------------------------------------
function ReportSection() {
  return (
    <div className="bg-path-forward-light py-10 mb:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb:grid-cols-[1fr_1fr] mb:gap-20 mb:items-center grid grid-cols-1 gap-10">
          {/* Report visual */}
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-center">
              <ReportVisual />
            </div>
          </FadeIn>

          {/* Report text */}
          <FadeIn delay={0.4}>
            <div>
              <h2 className="tracking-031 mb:tracking-061 mb:text-[49px] mb-5 font-sans text-[32px] leading-110 font-semibold text-[#064E3B]">
                {data.report.headline}
              </h2>
              <p className="mb:text-xl mb-6 font-sans text-[18px] leading-140 text-[#0A1628]/80">
                {data.report.description}
              </p>
              <p className="mb-8 font-sans text-sm leading-140 text-[#0A1628]/50">
                {data.report.detail}
              </p>
              <a
                href={data.report.downloadUrl}
                className="inline-flex items-center gap-3 rounded-[5px] bg-[#10B981] px-6 py-4 font-sans text-xl leading-120 font-semibold text-white transition-all duration-200 hover:bg-[#059669]"
              >
                <DownloadIcon />
                {data.report.downloadLabel}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section 6 – Final CTAs
// ---------------------------------------------------------------------------
const CTA_ICONS: Record<string, React.ReactNode> = {
  download: <DownloadIcon />,
  petition: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  ),
  podcast: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
};

function CtaSection() {
  return (
    <div className="bg-path-forward-dark py-10 mb:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Closing message */}
        <FadeIn>
          <p className="mb:text-[25px] mb:leading-130 mb:mb-[80px] mx-auto mb-10 max-w-[800px] text-center font-sans text-xl leading-140 font-semibold text-[#D1FAE5]">
            {data.closingMessage}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="tracking-031 mb:tracking-061 mb:text-[49px] mb:mb-[60px] mb-8 text-center font-sans text-[32px] leading-110 font-semibold text-white">
            What You Can Do Next
          </h2>
        </FadeIn>

        <div className="mb:grid-cols-3 mb:gap-8 grid grid-cols-1 gap-6">
          {data.ctas.map((cta, index) => (
            <FadeIn key={cta.id} delay={0.2 * index}>
              <a
                href={cta.url}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-[#10B981]/40 hover:bg-white/10"
              >
                <div className="mb-5 text-[#6EE7B7] transition-colors group-hover:text-[#10B981]">
                  {CTA_ICONS[cta.icon]}
                </div>
                <h3 className="mb:text-[25px] mb-3 font-sans text-xl leading-120 font-semibold text-white">
                  {cta.title}
                </h3>
                <p className="mb-6 flex-1 font-sans text-[16px] leading-140 text-white/60">
                  {cta.description}
                </p>
                <span className="inline-flex items-center gap-2 font-sans text-lg font-semibold text-[#6EE7B7] transition-colors group-hover:text-[#10B981]">
                  {cta.label}
                  <ArrowRightIcon />
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
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

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ReportVisual() {
  return (
    <div className="relative">
      {/* Glow behind the report */}
      <div
        className="absolute inset-0 -m-8 rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)',
        }}
      />
      {/* Mock report cover */}
      <div className="relative flex h-[400px] w-[300px] flex-col justify-between rounded-lg border border-[#10B981]/30 bg-gradient-to-br from-[#064E3B] to-[#0A1628] p-8 shadow-2xl mb:h-[480px] mb:w-[360px]">
        <div>
          <div className="mb-3 h-1 w-12 rounded bg-[#10B981]" />
          <p className="font-sans text-xs tracking-widest text-[#6EE7B7]/60 uppercase">
            Center for Humane Technology
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-sans text-2xl leading-120 font-semibold text-white mb:text-3xl">
            A Path Forward
          </h4>
          <p className="font-sans text-sm leading-140 text-white/50">
            Seven Principles for Humane AI — The Solutions Report
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#10B981]/20" />
          <div className="h-8 w-8 rounded-full bg-[#10B981]/10" />
          <div className="h-8 w-8 rounded-full bg-[#10B981]/5" />
        </div>
      </div>
    </div>
  );
}
