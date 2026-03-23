'use client';

import { FadeIn } from '@/components/shared/fade-in';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  mapRawPrincipleToPillar,
  type Pillar,
} from '@/lib/utils/path-forward.utils';
import BasicHero from '../basic-hero';
import { PathForwardCmsData } from '@/lib/utils/types';
import { getFirstParagraph, getPrincipleAnchorId } from '@/lib/utils/text.utils';

type PathForwardLayoutProps = { data: PathForwardCmsData | null; };

const PRINCIPLE_ZONE_BGS = ['#E2F9FB', '#F0F7F7', '#F8F4EF'] as const;

export default function PathForwardLayout({ data: dataProp, }: PathForwardLayoutProps) {
  if (!dataProp) return null;
  const data = dataProp;
  const principles: Pillar[] = (data.principles ?? []).map((p, i) => mapRawPrincipleToPillar(p, i));

  const zone1 = principles.slice(0, 2);
  const zone2 = principles.slice(2, 4);
  const zone3 = principles.slice(4, 7);

  const zonesRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <BasicHero
        title={data.title ?? null}
        preTitle={data.introductionLabel}
        variant='green'
      />
      <IntroSection introduction={data.introduction ?? ''} reportUrl={data.report?.url} />
      <PrinciplesOverview principles={principles} />
      <div ref={zonesRef} className="relative">
        <ScrollingZoneVector containerRef={zonesRef} />
        <PrincipleDetailsZone principles={zone1} bg={PRINCIPLE_ZONE_BGS[0]} startIndex={0} />
        <PrincipleDetailsZone principles={zone2} bg={PRINCIPLE_ZONE_BGS[1]} startIndex={2} />
        <PrincipleDetailsZone principles={zone3} bg={PRINCIPLE_ZONE_BGS[2]} startIndex={4} />
      </div>
      <HowChangeHappens label={data.systemLabel ?? ''} introduction={data.systemIntroduction ?? ''} reportUrl={data.report?.url} />
    </div>
  );
}

function IntroSection({ introduction, reportUrl }: { introduction: string, reportUrl?: string | null }) {
  return (
    <section className="bg-white py-12 mb:py-[80px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-[948px] flex-col gap-9">
          <FadeIn>
            <div className="space-y-5 font-sans text-[18px] leading-140 text-primary-navy mb:text-[20px]"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          </FadeIn>
          {reportUrl && (
            <FadeIn delay={0.2}>
              <a
                href={reportUrl}
                className="inline-flex w-fit items-center justify-center rounded-[5px] bg-secondary-light-teal px-5 py-[15px] font-sans text-[20px] font-semibold leading-120 text-primary-navy transition-colors hover:bg-[#8df5fc]"
              >
                Download the report
              </a>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}

function PrinciplesOverview({ principles }: { principles: Pillar[] }) {
  const topRow = principles.slice(0, 4);
  const bottomRow = principles.slice(4, 7);

  return (
    <section className="bg-[#fbede4]/80 py-12 mb:py-[80px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {topRow.length > 0 && (
          <div className="mb-20 grid grid-cols-2 gap-6 mb:grid-cols-4 mb:gap-10">
            {topRow.map((p, i) => (
              <PrincipleCard key={p.id} pillar={p} index={i} />
            ))}
          </div>
        )}
        {bottomRow.length > 0 && (
          <div className="grid grid-cols-2 gap-6 mb:grid-cols-3 mb:gap-10 mb:mx-auto mb:max-w-[75%]">
            {bottomRow.map((p, i) => (
              <PrincipleCard key={p.id} pillar={p} index={i + 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PrincipleCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  const anchorId = getPrincipleAnchorId(pillar.title, index + 1);
  return (
    <FadeIn delay={0.1 * index}>
      <a
        href={`#${anchorId}`}
        className="group flex flex-col items-start gap-[30px]"
      >
        <div className="size-[140px] overflow-hidden rounded-full bg-[#FFBD89]/20 mb:size-[242px]">
          {pillar.image && (
            <img
              src={pillar.image}
              alt={pillar.title}
              className="h-full w-full object-none transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="font-sans text-[18px] font-semibold leading-120 text-[#00909A] mb:text-[20px]">
            {num}
          </p>
          <p className="font-sans text-[16px] font-semibold leading-120 text-primary-blue mb:text-[20px]">
            {pillar.title}
          </p>
        </div>
      </a>
    </FadeIn>
  );
}

function PrincipleDetailsZone({
  principles,
  bg,
  startIndex,
}: {
  principles: Pillar[];
  bg: string;
  startIndex: number;
}) {
  if (principles.length === 0) return null;
  return (
    <div style={{ backgroundColor: bg }}>
      {principles.map((p, i) => (
        <PrincipleDetail key={p.id} pillar={p} globalIndex={startIndex + i} />
      ))}
    </div>
  );
}

function ScrollingZoneVector({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden pb-[47px] pt-[47px] mb:block">
      <motion.div
        style={{ rotate }}
        className="sticky top-[80px] ml-auto mr-[3%] h-[118px] w-[120px]"
      >
        <ZoneVector1 className="h-full w-full" />
      </motion.div>
    </div>
  );
}

const PRINCIPLE_DETAIL_IMAGE_SIZES: Record<number, { width: string; height: string }> = {
  1: { width: '292px', height: '104px' },
  2: { width: '203px', height: '269px' },
  3: { width: '199px', height: '258px' },
  4: { width: '234px', height: '236px' },
  5: { width: '183px', height: '348px' },
  7: { width: '248.262px', height: '144.752px' },
};

function PrincipleDetail({ pillar, globalIndex }: { pillar: Pillar; globalIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const num = globalIndex + 1;
  const preview = getFirstParagraph(pillar.content);
  const imageSize = PRINCIPLE_DETAIL_IMAGE_SIZES[num];
  const anchorId = getPrincipleAnchorId(pillar.title, num);

  return (
    <div id={anchorId} className="scroll-mt-24 py-12 mb:py-[80px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 mb:grid-cols-[292px_1fr] mb:gap-8">
          <FadeIn delay={0.2}>
            <div className="flex items-start justify-center">
              {pillar.imageDetail ? (
                <img
                  src={pillar.imageDetail}
                  alt={pillar.title}
                  className="shrink-0 object-contain"
                  style={
                    imageSize
                      ? { width: imageSize.width, height: imageSize.height }
                      : { maxWidth: '292px', height: 'auto' }
                  }
                />
              ) : (
                <div className="size-[242px] rounded-full bg-neutral-light-gray" />
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex max-w-[840px] flex-col gap-[25px]">
              <h3 className="font-sans text-[28px] font-semibold leading-110 tracking-[-0.39px] mb:text-[39px]">
                <span className="text-[#d6753a]">Principle {num}:</span>{' '}
                <span className="text-primary-blue">{pillar.title}</span>
              </h3>

              <div className="flex flex-col gap-[15px]">
                {!expanded ? (
                  <>
                    <p className="font-sans text-[18px] leading-140 text-primary-navy mb:text-[20px]">
                      {preview}
                    </p>
                    <button
                      type="button"
                      onClick={() => setExpanded(true)}
                      className="flex items-center gap-2 font-sans text-[18px] font-medium leading-130 text-primary-navy underline decoration-solid transition-colors hover:text-primary-teal mb:text-[20px] cursor-pointer"
                    >
                      Expand more
                      <ChevronDown />
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      className="prose max-w-none font-sans text-[18px] leading-140 text-primary-navy mb:text-[20px] [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:first:mt-0 [&_p]:mb-4 [&_p]:last:mb-0 [&_ul]:ml-4 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:ml-4 [&_ol]:space-y-2 [&_ol]:pl-5 [&_li]:list-disc [&_ol>li]:list-decimal"
                      dangerouslySetInnerHTML={{ __html: pillar.content }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setExpanded(false);
                        requestAnimationFrame(() => {
                          document.getElementById(anchorId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
                        });
                      }}
                      className="flex items-center gap-2 font-sans text-[18px] font-medium leading-130 text-primary-navy underline decoration-solid transition-colors hover:text-primary-teal mb:text-[20px] cursor-pointer"
                    >
                      Show less
                      <ChevronUp />
                    </button>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

function HowChangeHappens({ label, introduction, reportUrl }: { label: string, introduction: string, reportUrl?: string | null }) {
  return (
    <section className="bg-white py-12 mb:py-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mb-8 font-sans text-[36px] font-semibold leading-110 tracking-049 text-primary-blue mb:mb-10 mb:text-[49px]">
            {label}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex max-w-[839px] flex-col gap-10">
            <div className="space-y-5 font-sans text-[18px] leading-140 text-primary-navy mb:text-[20px]"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
            {reportUrl && (
              <a
                href={reportUrl}
                className="inline-flex w-fit items-center justify-center rounded-[5px] bg-secondary-light-teal px-5 py-[15px] font-sans text-[20px] font-semibold leading-120 text-primary-navy transition-colors hover:bg-[#8df5fc]"
              >
                Download the report
              </a>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path d="M13.5 11.25L9 6.75L4.5 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZoneVector1(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 118.009" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <path d="M43.1551 0.00895334C18.218 7.31389 3.85103e-07 30.4248 2.77077e-06 57.806C5.66771e-06 91.0552 26.8629 118.009 60 118.009C93.1371 118.009 120 91.0552 120 57.806C120 30.6017 102.017 7.61226 77.3274 0.152096L75.7826 5.70103C98.0523 12.4834 114.261 33.2452 114.261 57.806C114.261 87.8748 89.9675 112.25 60 112.25C30.0326 112.25 5.73914 87.8748 5.73913 57.806C5.73913 33.0684 22.182 12.1848 44.6994 5.55687L43.1551 0.00895334Z" fill="url(#z1g0)" />
        <path d="M72.1983 52.77C74.5946 57.6582 73.7663 63.7349 69.7135 67.8014C64.6197 72.9124 56.361 72.9124 51.2672 67.8014C46.1734 62.6904 46.1734 54.4038 51.2672 49.2928C55.1941 45.3526 61.0017 44.4506 65.7904 46.5855L62.95 51.6443C60.3748 50.7225 57.3872 51.2959 55.3254 53.3647C52.4729 56.2268 52.4729 60.8673 55.3254 63.7295C58.1779 66.5917 62.8028 66.5917 65.6553 63.7295C67.8444 61.533 68.3538 58.2889 67.1829 55.6052L72.1983 52.77Z" fill="url(#z1g1)" />
        <path d="M46.4618 43.0836C52.9988 37.093 62.8945 35.7399 70.9699 40.4181C80.9517 46.2005 84.3717 59.0073 78.6087 69.0228C72.8457 79.0384 60.0821 82.4699 50.1004 76.6875C42.1783 72.0982 38.3899 63.0846 40.0445 54.5532L45.6183 55.9888C44.5802 62.0735 47.3303 68.4333 52.9699 71.7004C60.2067 75.8927 69.4603 73.4048 73.6385 66.1436C77.8166 58.8823 75.3371 49.5974 68.1004 45.4051C62.3069 42.0489 55.2213 42.9746 50.4815 47.2027L46.4618 43.0836Z" fill="url(#z1g2)" />
        <path d="M35.0029 31.5805C46.436 20.7803 63.9959 18.2592 78.2944 26.5423C95.7625 36.6617 101.748 59.0735 91.6623 76.6007C81.5771 94.1279 59.2408 100.133 41.7727 90.0138C27.627 81.8192 21.0119 65.5634 24.3628 50.3684L29.9268 51.8018C27.1992 64.5542 32.7786 78.1541 44.6422 85.0268C59.3653 93.5559 78.1917 88.4943 86.6921 73.7214C95.1924 58.9485 90.1479 40.0585 75.4248 31.5294C63.4081 24.5681 48.6584 26.6605 39.02 35.6969L35.0029 31.5805Z" fill="url(#z1g3)" />
        <path d="M98.7269 36.9845C107.847 53.8548 105.299 75.3918 91.0843 89.655C73.7654 107.032 45.6859 107.032 28.367 89.655C11.0481 72.2775 11.0481 44.1031 28.367 26.7256C42.4574 12.5875 63.6705 9.95193 80.4165 18.8189L77.5973 23.8397C63.0406 16.2097 44.6525 18.5288 32.4252 30.7975C17.3476 45.9261 17.3476 70.4545 32.4252 85.5831C47.5028 100.712 71.9485 100.712 87.0261 85.5831C99.3782 73.1892 101.611 54.4868 93.7248 39.8121L98.7269 36.9845Z" fill="url(#z1g4)" />
        <path d="M34.7929 11.9019C54.5903 1.06271 79.9068 4.04851 96.6625 20.8609C117.038 41.3049 117.038 74.4514 96.6625 94.8955C76.2873 115.34 43.2526 115.34 22.8774 94.8955C6.24643 78.2082 3.19106 53.0585 13.7098 33.2609L18.7123 36.0889C9.42673 53.6902 12.1677 76.0057 26.9356 90.8236C45.0695 109.019 74.4704 109.019 92.6043 90.8236C110.738 72.6283 110.738 43.128 92.6043 24.9328C77.7117 9.98981 55.2202 7.31917 37.611 16.9202L34.7929 11.9019Z" fill="url(#z1g5)" />
        <path d="M88.9935 51.8436C91.7464 63.8491 86.5539 76.7464 75.367 83.227C61.642 91.1779 44.092 86.4595 36.168 72.6881C28.2439 58.9168 32.9464 41.3074 46.6713 33.3565C57.7052 26.9646 71.2114 28.7607 80.2007 36.8663L76.1799 40.9866C68.9891 34.6428 58.2928 33.2736 49.5409 38.3436C38.5609 44.7043 34.7989 58.7918 41.1382 69.8088C47.4775 80.8259 61.5175 84.6006 72.4974 78.2399C81.4025 73.0812 85.5591 62.8401 83.4304 53.2764L88.9935 51.8436Z" fill="url(#z1g6)" />
      </g>
      <path d="M43.1551 1.92705e-10C18.218 7.30494 2.38567e-06 30.4159 0 57.7971C-2.89694e-06 91.0462 26.8629 118 60 118C93.1371 118 120 91.0462 120 57.7971C120 30.5928 102.017 7.60331 77.3275 0.143149L75.7826 5.69208C98.0523 12.4744 114.261 33.2363 114.261 57.7971C114.261 87.8659 89.9675 112.241 60 112.241C30.0325 112.241 5.73912 87.8659 5.73913 57.7971C5.73913 33.0594 22.182 12.1758 44.6994 5.54791L43.1551 1.92705e-10Z" fill="url(#z1g7)" />
      <defs>
        <linearGradient id="z1g0" x1="-5.507" y1="32.212" x2="118.541" y2="38.546" gradientUnits="userSpaceOnUse"><stop stopColor="#68EEEA" /><stop offset="1" stopColor="#00919B" /></linearGradient>
        <linearGradient id="z1g1" x1="-5.507" y1="32.212" x2="118.541" y2="38.546" gradientUnits="userSpaceOnUse"><stop stopColor="#68EEEA" /><stop offset="1" stopColor="#00919B" /></linearGradient>
        <linearGradient id="z1g2" x1="-5.507" y1="32.212" x2="118.541" y2="38.546" gradientUnits="userSpaceOnUse"><stop stopColor="#68EEEA" /><stop offset="1" stopColor="#00919B" /></linearGradient>
        <linearGradient id="z1g3" x1="-5.507" y1="32.212" x2="118.541" y2="38.546" gradientUnits="userSpaceOnUse"><stop stopColor="#68EEEA" /><stop offset="1" stopColor="#00919B" /></linearGradient>
        <linearGradient id="z1g4" x1="-5.507" y1="32.212" x2="118.541" y2="38.546" gradientUnits="userSpaceOnUse"><stop stopColor="#68EEEA" /><stop offset="1" stopColor="#00919B" /></linearGradient>
        <linearGradient id="z1g5" x1="-5.507" y1="32.212" x2="118.541" y2="38.546" gradientUnits="userSpaceOnUse"><stop stopColor="#68EEEA" /><stop offset="1" stopColor="#00919B" /></linearGradient>
        <linearGradient id="z1g6" x1="-5.507" y1="32.212" x2="118.541" y2="38.546" gradientUnits="userSpaceOnUse"><stop stopColor="#68EEEA" /><stop offset="1" stopColor="#00919B" /></linearGradient>
        <linearGradient id="z1g7" x1="120" y1="118" x2="2.017" y2="-1.983" gradientUnits="userSpaceOnUse"><stop stopColor="#B9A1FE" /><stop offset="1" stopColor="#FF9C5F" /></linearGradient>
      </defs>
    </svg>
  );
}