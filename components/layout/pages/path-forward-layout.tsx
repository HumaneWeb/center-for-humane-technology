'use client';

import { FadeIn } from '@/components/shared/fade-in';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PrincipleIcon } from '@/components/shared/principle-icon';
import { mapRawPrincipleToPillar, type Pillar } from '@/lib/utils/path-forward.utils';
import { PathForwardCmsData } from '@/lib/utils/types';
import { extractParagraphsFromHtml, getPrincipleAnchorId } from '@/lib/utils/text.utils';
import { SubstackNewsletterWidget } from '@/components/blocks/newsletter-block';
import useIsMobile from '@/components/hooks/is-mobile';
import ComplexHero from '../complex-hero';

type PathForwardLayoutProps = { data: PathForwardCmsData | null };

type PrincipleStyleConfig = {
  overviewCardBg: string;
  overviewIndexColor: string;
  detailBg: string;
  detailIndexColor: string;
};

const PRINCIPLE_STYLES_BY_INDEX: PrincipleStyleConfig[] = [
  {
    overviewCardBg: '#DFEBE8',
    overviewIndexColor: '#00909A',
    detailBg: '#E9F4F2',
    detailIndexColor: '#00909A',
  },
  {
    overviewCardBg: '#ECD9D0',
    overviewIndexColor: '#C26F61',
    detailBg: '#F5ECE7',
    detailIndexColor: '#C26F61',
  },
  {
    overviewCardBg: '#E8E3EB',
    overviewIndexColor: '#978CBE',
    detailBg: '#F1EEF3',
    detailIndexColor: '#8376B3',
  },
  {
    overviewCardBg: '#DBE7D9',
    overviewIndexColor: '#2DAE7C',
    detailBg: '#EDF3EC',
    detailIndexColor: '#259268',
  },
  {
    overviewCardBg: '#E4D9D4',
    overviewIndexColor: '#8D7572',
    detailBg: '#F1ECE9',
    detailIndexColor: '#907774',
  },
  {
    overviewCardBg: '#F7E3D4',
    overviewIndexColor: '#D77D43',
    detailBg: '#FBF1E9',
    detailIndexColor: '#D6753A',
  },
  {
    overviewCardBg: '#D9D9E5',
    overviewIndexColor: '#6C7CBA',
    detailBg: '#ECECF2',
    detailIndexColor: '#6273B5',
  },
];

const DEFAULT_PRINCIPLE_STYLE: PrincipleStyleConfig = {
  overviewCardBg: 'rgba(255, 189, 137, 0.2)',
  overviewIndexColor: '#00909A',
  detailBg: '#F6F1EB',
  detailIndexColor: '#d6753a',
};

function getPrincipleStyleByIndex(index: number): PrincipleStyleConfig {
  return PRINCIPLE_STYLES_BY_INDEX[index] ?? DEFAULT_PRINCIPLE_STYLE;
}

export default function PathForwardLayout({ data: dataProp }: PathForwardLayoutProps) {
  if (!dataProp) return null;
  const data = dataProp;
  const principles: Pillar[] = (data.principles ?? []).map((p, i) => mapRawPrincipleToPillar(p, i));

  const zonesRef = useRef<HTMLDivElement>(null);


  // Create event listener for width less than 1260px, if true hide the background image of the complex hero
  useEffect(() => {
    const heroImageUrl = data.heroImage?.url;

    const handleResize = () => {
      const el = document.getElementById('complex-hero-background');
      if (!el) return;

      if (window.innerWidth < 1260) {
        el.style.backgroundImage = 'none';
      } else {
        el.style.backgroundImage = heroImageUrl ? `url(${heroImageUrl})` : 'none';
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data.heroImage?.url]);

  return (
    <div>
      {/* @ts-ignore */}
      <ComplexHero title={data.title!} preTitle={data.introductionLabel!} image={data.heroImage!} variant="green-ai" />
      <IntroSection introduction={data.introduction ?? ''} reportUrl={data.report?.url} downloadLabel={data.downloadLabel ?? ''} />
      <PrinciplesOverview principles={principles} />
      <div ref={zonesRef} className="relative">
        <ScrollingZoneVector containerRef={zonesRef} principles={principles} />
        <PrincipleDetailsZone principles={principles} />
      </div>
      <HowChangeHappens
        label={data.systemLabel ?? ''}
        introduction={data.systemIntroduction ?? ''}
        reportUrl={data.report?.url}
        formText={data.formText ?? ''}
        downloadLabel={data.downloadLabel ?? ''}
      />
    </div>
  );
}

function IntroSection({
  introduction,
  reportUrl,
  downloadLabel,
}: {
  introduction: string;
  reportUrl?: string | null;
  downloadLabel?: string | null;
}) {
  return (
    <section className="mb:py-[80px] bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-[948px] flex-col gap-9">
          <FadeIn>
            <div
              className="text-primary-navy mb:text-[20px] space-y-5 font-sans text-[18px] leading-140"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          </FadeIn>
          {reportUrl && (
            <FadeIn delay={0.2}>
              <a
                href={reportUrl}
                className="bg-secondary-light-teal text-primary-navy inline-flex w-fit items-center justify-center rounded-[5px] px-5 py-[15px] font-sans text-[20px] leading-120 font-semibold transition-colors hover:bg-[#8df5fc]"
              >
                {downloadLabel}
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
    <section className="mb:py-[80px] bg-[#F8F4EF]/80 py-12">
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
  const style = getPrincipleStyleByIndex(index);
  return (
    <FadeIn delay={0.1 * index}>
      <a
        href={`#${anchorId}`}
        className="group flex flex-col items-center gap-8 sm:items-start sm:gap-[30px]"
      >
        <div
          className="aspect-square w-[200px] max-w-full overflow-hidden rounded-full p-10 sm:p-5 mb:size-[242px]"
          style={{ backgroundColor: style.overviewCardBg }}
        >
          <PrincipleIcon
            kind="summary"
            variant={pillar.imageVariant}
            summarySrc={pillar.image}
            detailSrc={pillar.imageDetail}
            alt={pillar.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 mb:object-contain sm:p-3 p-0"
          />
        </div>
        <div className="flex flex-col gap-[10px] text-center sm:text-left">
          <p
            className="mb:text-[20px] font-sans text-[18px] leading-120 font-semibold"
            style={{ color: style.overviewIndexColor }}
          >
            {/* Principle */}
            {num}
          </p>
          <p className="text-primary-blue mb:text-[20px] font-sans text-[16px] leading-120 font-semibold">
            {pillar.title}
          </p>
        </div>
      </a>
    </FadeIn>
  );
}

function PrincipleDetailsZone({
  principles,
}: {
  principles: Pillar[];
}) {
  if (principles.length === 0) return null;
  return (
    <div>
      {principles.map((p, i) => (
        <div key={p.id} style={{ backgroundColor: getPrincipleStyleByIndex(i).detailBg }}>
          <PrincipleDetail pillar={p} globalIndex={i} />
        </div>
      ))}
    </div>
  );
}

// 7 steps (1..7) × 7 layers (outer ring + 6 inner rings)
const SCROLL_SVG_STEPS = [
  // Step 1
  [
    'M82.7139 0.0170898C34.9179 13.971 -4.57253e-06 58.1177 0 110.421C5.55246e-06 173.934 51.4873 225.421 115 225.421C178.513 225.421 230 173.934 230 110.421C230 58.4555 195.532 14.541 148.211 0.290522L145.25 10.8901C187.934 23.8458 219 63.5052 219 110.421C219 167.859 172.438 214.421 115 214.421C57.5624 214.421 11 167.859 11 110.421C11 63.1674 42.5154 23.2754 85.6738 10.6147L82.7139 0.0170898Z',
    'M138.38 100.802C142.973 110.139 141.385 121.747 133.617 129.515C123.854 139.278 108.025 139.278 98.2621 129.515C88.499 119.752 88.499 103.922 98.2621 94.1593C105.789 86.6327 116.92 84.9097 126.098 88.9879L120.654 98.6512C115.718 96.8904 109.992 97.9857 106.04 101.937C100.573 107.405 100.573 116.269 106.04 121.736C111.508 127.204 120.372 127.204 125.839 121.736C130.035 117.541 131.011 111.344 128.767 106.217L138.38 100.802Z',
    'M89.0518 82.2985C101.581 70.8553 120.548 68.2706 136.026 77.2068C155.157 88.2525 161.712 112.716 150.667 131.848C139.621 150.98 115.157 157.535 96.0257 146.489C80.8418 137.722 73.5807 120.505 76.7519 104.208L87.4352 106.95C85.4454 118.573 90.7163 130.722 101.526 136.963C115.396 144.971 133.132 140.218 141.14 126.348C149.149 112.477 144.396 94.7412 130.526 86.7331C119.422 80.3221 105.841 82.0903 96.7563 90.1668L89.0518 82.2985Z',
    'M67.0889 60.3252C89.0023 39.6946 122.659 34.8788 150.064 50.7013C183.545 70.0313 195.016 112.843 175.686 146.323C156.356 179.804 113.545 191.275 80.0643 171.945C52.9518 156.291 40.2728 125.24 46.6954 96.2141L57.3597 98.9521C52.1317 123.312 62.8256 149.29 85.5643 162.419C113.784 178.711 149.867 169.042 166.16 140.823C182.452 112.604 172.784 76.52 144.564 60.2276C121.532 46.9301 93.2618 50.9271 74.7884 68.1884L67.0889 60.3252Z',
    'M189.227 70.648C206.707 102.874 201.824 144.014 174.578 171.259C141.384 204.454 87.5647 204.454 54.3701 171.259C21.1755 138.065 21.1755 84.2459 54.3701 51.0513C81.3767 24.0447 122.035 19.0102 154.132 35.948L148.728 45.5388C120.828 30.9638 85.584 35.3938 62.1483 58.8295C33.2495 87.7283 33.2495 134.583 62.1483 163.481C91.0471 192.38 137.901 192.38 166.8 163.481C190.475 139.806 194.755 104.081 179.639 76.0494L189.227 70.648Z',
    'M66.6864 22.735C104.631 2.02998 153.155 7.73347 185.27 39.8485C224.322 78.9009 224.322 142.217 185.27 181.27C146.217 220.322 82.9008 220.322 43.8484 181.27C11.9723 149.394 6.11619 101.353 26.2771 63.5352L35.8652 68.9373C18.0679 102.559 23.3214 145.187 51.6266 173.492C86.3833 208.248 142.735 208.248 177.492 173.492C212.248 138.735 212.248 82.3833 177.492 47.6267C148.948 19.0826 105.839 13.9811 72.0878 32.321L66.6864 22.735Z',
    'M170.571 99.0319C175.847 121.965 165.895 146.601 144.453 158.981C118.147 174.168 84.5097 165.155 69.3219 138.849C54.1341 112.543 63.1472 78.9057 89.4533 63.7178C110.602 51.5078 136.489 54.9389 153.718 70.4222L146.012 78.2928C132.229 66.1748 111.728 63.5593 94.9533 73.2441C73.9084 85.3944 66.6979 112.304 78.8482 133.349C90.9985 154.394 117.908 161.605 138.953 149.454C156.021 139.6 163.988 120.037 159.908 101.769L170.571 99.0319Z',
  ],
  // Step 2
  [
    'M82.7139 0.0170898C34.9179 13.971 -4.57253e-06 58.1177 0 110.421C5.55246e-06 173.934 51.4873 225.421 115 225.421C178.513 225.421 230 173.934 230 110.421C230 58.4555 195.532 14.541 148.211 0.290522L145.25 10.8901C187.934 23.8458 219 63.5052 219 110.421C219 167.859 172.438 214.421 115 214.421C57.5624 214.421 11 167.859 11 110.421C11 63.1674 42.5154 23.2754 85.6738 10.6147L82.7139 0.0170898Z',
    'M140.892 113.5C140.2 123.883 133.022 133.142 122.411 135.985C109.074 139.559 95.3654 131.644 91.7919 118.307C88.2183 104.971 96.1329 91.2624 109.47 87.6888C119.751 84.9339 130.253 89.0073 136.162 97.1283L126.616 102.775C123.222 98.7822 117.715 96.8676 112.317 98.314C104.848 100.315 100.416 107.992 102.417 115.46C104.418 122.929 112.095 127.361 119.564 125.36C125.295 123.824 129.239 118.946 129.859 113.384L140.892 113.5Z',
    'M80.502 130.255C72.6915 115.191 75.1039 96.2018 87.7416 83.5642C103.363 67.9432 128.689 67.9432 144.31 83.5642C159.931 99.1851 159.931 124.512 144.31 140.133C131.913 152.53 113.402 155.088 98.4814 147.807L103.895 138.197C114.607 143.127 127.706 141.18 136.532 132.355C147.857 121.029 147.857 102.668 136.532 91.3423C125.207 80.0171 106.845 80.0171 95.5197 91.3423C86.4532 100.409 84.6462 113.984 90.0963 124.85L80.502 130.255Z',
    'M135.242 44.2762C164.066 52.9385 185.064 79.678 185.064 111.323C185.064 149.983 153.724 181.323 115.065 181.323C76.4046 181.323 45.0645 149.983 45.0645 111.323C45.0645 80.0163 65.6166 53.51 93.9649 44.5594L96.9258 55.1639C73.2157 62.8162 56.0645 85.0667 56.0645 111.323C56.0645 143.908 82.4797 170.323 115.064 170.323C147.649 170.323 174.064 143.908 174.064 111.323C174.064 84.728 156.468 62.2436 132.282 54.8758L135.242 44.2762Z',
    'M189.227 70.648C206.707 102.874 201.824 144.014 174.578 171.26C141.384 204.454 87.5647 204.454 54.3701 171.26C21.1756 138.065 21.1756 84.2459 54.3701 51.0514C81.3767 24.0447 122.035 19.0102 154.132 35.948L148.728 45.5388C120.828 30.9639 85.584 35.3939 62.1483 58.8295C33.2495 87.7283 33.2495 134.583 62.1483 163.481C91.0471 192.38 137.901 192.38 166.8 163.481C190.475 139.807 194.755 104.081 179.639 76.0494L189.227 70.648Z',
    'M29.1879 58.4378C51.6967 21.5343 96.5709 2.21199 140.441 13.9669C193.787 28.2611 225.446 83.0948 211.152 136.441C196.857 189.788 142.024 221.446 88.677 207.152C45.1335 195.485 16.0413 156.808 14.5925 113.977L25.597 113.861C26.9952 151.877 52.8584 186.166 91.524 196.527C139.003 209.249 187.805 181.073 200.526 133.594C213.248 86.1159 185.072 37.3139 137.594 24.5921C98.6019 14.1442 58.7178 31.2806 38.6586 64.0389L29.1879 58.4378Z',
    'M170.571 99.0319C175.847 121.965 165.895 146.601 144.453 158.981C118.147 174.168 84.5097 165.155 69.3219 138.849C54.1341 112.543 63.1472 78.9057 89.4533 63.7178C110.602 51.5078 136.489 54.9389 153.718 70.4222L146.012 78.2928C132.229 66.1748 111.728 63.5593 94.9533 73.2441C73.9084 85.3944 66.6979 112.304 78.8482 133.349C90.9985 154.394 117.908 161.605 138.953 149.454C156.021 139.6 163.988 120.037 159.908 101.769L170.571 99.0319Z',
  ],
  // Step 3
  [
    'M82.7139 0.0170898C34.9179 13.971 -4.57253e-06 58.1177 0 110.421C5.55246e-06 173.934 51.4873 225.421 115 225.421C178.513 225.421 230 173.934 230 110.421C230 58.4555 195.532 14.541 148.211 0.290522L145.25 10.8901C187.934 23.8458 219 63.5052 219 110.421C219 167.859 172.438 214.421 115 214.421C57.5624 214.421 11 167.859 11 110.421C11 63.1674 42.5154 23.2754 85.6738 10.6147L82.7139 0.0170898Z',
    'M114.277 136.789C103.894 136.098 94.6354 128.919 91.7921 118.308C88.2186 104.971 96.1331 91.263 109.47 87.6894C122.806 84.1159 136.515 92.0304 140.088 105.367C142.843 115.649 138.77 126.15 130.649 132.06L125.002 122.513C128.995 119.119 130.91 113.612 129.463 108.214C127.462 100.746 119.785 96.3134 112.317 98.3146C104.848 100.316 100.416 107.992 102.417 115.461C103.953 121.193 108.832 125.137 114.393 125.756L114.277 136.789Z',
    'M128.13 73.7127C144.304 78.8418 156.026 93.9752 156.026 111.847C156.026 133.939 138.117 151.848 116.026 151.848C93.9347 151.848 76.0261 133.939 76.0261 111.847C76.0261 94.3147 87.3066 79.4174 103.006 74.0155L105.972 84.6385C94.9116 88.7269 87.0261 99.3659 87.0261 111.847C87.0261 127.864 100.01 140.847 116.026 140.847C132.042 140.847 145.026 127.864 145.026 111.847C145.026 99.0255 136.704 88.1484 125.168 84.3192L128.13 73.7127Z',
    'M135.242 44.2761C164.066 52.9384 185.064 79.6779 185.064 111.323C185.064 149.983 153.724 181.323 115.064 181.323C76.4046 181.323 45.0645 149.983 45.0645 111.323C45.0645 80.0162 65.6166 53.5099 93.9649 44.5593L96.9258 55.1638C73.2157 62.8161 56.0645 85.0666 56.0645 111.323C56.0645 143.908 82.4797 170.323 115.064 170.323C147.649 170.323 174.064 143.908 174.064 111.323C174.064 84.7279 156.468 62.2435 132.282 54.8757L135.242 44.2761Z',
    'M31.7848 130.935C23.241 95.2831 38.6052 56.8086 71.9741 37.5431C112.629 14.071 164.614 28.0004 188.086 68.6552C211.558 109.31 197.629 161.295 156.974 184.767C123.898 203.864 83.3218 198.204 56.7029 173.536L64.4045 165.67C87.5818 186.97 122.771 191.813 151.474 175.241C186.868 154.807 198.995 109.549 178.56 74.1552C158.125 38.7616 112.868 26.6348 77.4741 47.0694C48.4785 63.81 35.098 97.2105 42.4434 128.199L31.7848 130.935Z',
    'M210.512 138.81C198.322 180.281 159.978 210.56 114.56 210.56C59.3318 210.56 14.5603 165.788 14.5603 110.56C14.5603 55.3312 59.3318 10.5597 114.56 10.5597C159.64 10.5597 197.751 40.389 210.236 81.3859L199.636 84.3458C188.447 47.9868 154.59 21.5597 114.56 21.5597C65.407 21.5597 25.5603 61.4064 25.5603 110.56C25.5603 159.713 65.407 199.56 114.56 199.56C154.928 199.56 189.018 172.684 199.915 135.851L210.512 138.81Z',
    'M170.571 99.0319C175.847 121.965 165.895 146.601 144.453 158.981C118.147 174.168 84.5098 165.155 69.3219 138.849C54.1341 112.543 63.1472 78.9056 89.4533 63.7178C110.602 51.5078 136.489 54.9389 153.718 70.4221L146.012 78.2928C132.229 66.1748 111.728 63.5593 94.9533 73.2441C73.9085 85.3944 66.698 112.304 78.8482 133.349C90.9985 154.394 117.908 161.605 138.953 149.454C156.021 139.6 163.988 120.037 159.908 101.769L170.571 99.0319Z',
  ],
  // Step 4
  [
    'M82.7139 0.0170898C34.9179 13.971 -4.57253e-06 58.1177 0 110.421C5.55246e-06 173.934 51.4873 225.421 115 225.421C178.513 225.421 230 173.934 230 110.421C230 58.4555 195.532 14.541 148.211 0.290522L145.25 10.8901C187.934 23.8458 219 63.5052 219 110.421C219 167.859 172.438 214.421 115 214.421C57.5624 214.421 11 167.859 11 110.421C11 63.1674 42.5154 23.2754 85.6738 10.6147L82.7139 0.0170898Z',
    'M138.38 100.802C142.973 110.139 141.385 121.747 133.617 129.515C123.854 139.278 108.025 139.278 98.2621 129.515C88.499 119.752 88.499 103.922 98.2621 94.1593C105.789 86.6327 116.92 84.9097 126.098 88.9879L120.654 98.6512C115.718 96.8904 109.992 97.9857 106.04 101.937C100.573 107.405 100.573 116.269 106.04 121.736C111.508 127.204 120.372 127.204 125.839 121.736C130.035 117.541 131.011 111.344 128.767 106.217L138.38 100.802Z',
    'M128.13 73.7128C144.304 78.8418 156.026 93.9752 156.026 111.848C156.026 133.939 138.117 151.848 116.026 151.848C93.9346 151.848 76.026 133.939 76.026 111.848C76.026 94.3147 87.3066 79.4174 103.006 74.0155L105.972 84.6385C94.9116 88.7269 87.026 99.366 87.026 111.848C87.026 127.864 100.01 140.848 116.026 140.848C132.042 140.848 145.026 127.864 145.026 111.848C145.026 99.0255 136.704 88.1484 125.168 84.3192L128.13 73.7128Z',
    'M135.242 44.2762C164.065 52.9385 185.064 79.678 185.064 111.323C185.064 149.983 153.724 181.323 115.064 181.323C76.4045 181.323 45.0644 149.983 45.0644 111.323C45.0644 80.0163 65.6166 53.51 93.9648 44.5594L96.9257 55.1639C73.2157 62.8162 56.0644 85.0667 56.0644 111.323C56.0644 143.908 82.4796 170.323 115.064 170.323C147.649 170.323 174.064 143.908 174.064 111.323C174.064 84.728 156.468 62.2436 132.282 54.8758L135.242 44.2762Z',
    'M186.931 155.639C167.762 186.89 129.693 203.232 92.4745 193.259C47.1299 181.109 20.2204 134.5 32.3704 89.1558C44.5205 43.8112 91.1291 16.9017 136.474 29.0517C173.365 38.9368 198.055 71.6308 199.434 107.896L188.427 108.012C187.099 76.562 165.64 48.2549 133.627 39.6769C94.1502 29.0992 53.5733 52.5263 42.9956 92.0028C32.4179 131.479 55.845 172.056 95.3215 182.634C127.662 191.299 160.741 177.143 177.459 150.037L186.931 155.639Z',
    'M142.81 14.6068C184.282 26.7973 214.56 65.1414 214.56 110.559C214.56 165.787 169.788 210.559 114.56 210.559C59.3313 210.559 14.5598 165.787 14.5598 110.559C14.5598 65.4794 44.3891 27.3682 85.3859 14.8832L88.3459 25.4828C51.9869 36.6727 25.5598 70.5294 25.5598 110.559C25.5598 159.712 65.4064 199.559 114.56 199.559C163.713 199.559 203.56 159.712 203.56 110.559C203.56 70.1915 176.685 36.1017 139.851 25.2045L142.81 14.6068Z',
    'M170.571 99.0319C175.847 121.965 165.895 146.601 144.453 158.981C118.147 174.168 84.5097 165.155 69.3219 138.849C54.1341 112.543 63.1472 78.9057 89.4533 63.7178C110.602 51.5078 136.489 54.9389 153.718 70.4222L146.011 78.2928C132.229 66.1748 111.728 63.5594 94.9533 73.2441C73.9084 85.3944 66.6979 112.304 78.8482 133.349C90.9984 154.394 117.908 161.605 138.953 149.454C156.021 139.6 163.988 120.037 159.908 101.769L170.571 99.0319Z',
  ],
  // Step 5
  [
    'M82.7139 0.0170898C34.9179 13.971 -4.57253e-06 58.1177 0 110.421C5.55246e-06 173.934 51.4873 225.421 115 225.421C178.513 225.421 230 173.934 230 110.421C230 58.4555 195.532 14.541 148.211 0.290522L145.25 10.8901C187.934 23.8458 219 63.5052 219 110.421C219 167.859 172.438 214.421 115 214.421C57.5624 214.421 11 167.859 11 110.421C11 63.1674 42.5154 23.2754 85.6738 10.6147L82.7139 0.0170898Z',
    'M124.004 88.1662C133.854 91.5211 140.94 100.852 140.94 111.837C140.94 125.644 129.747 136.837 115.94 136.837C102.132 136.837 90.9396 125.644 90.9396 111.837C90.9396 101.193 97.5921 92.1036 106.966 88.4972L109.949 99.1799C105.214 101.425 101.94 106.248 101.94 111.837C101.94 119.569 108.208 125.837 115.94 125.837C123.672 125.837 129.94 119.569 129.94 111.837C129.94 105.903 126.248 100.831 121.036 98.7931L124.004 88.1662Z',
    'M128.13 73.7128C144.304 78.8419 156.026 93.9753 156.026 111.848C156.026 133.939 138.117 151.848 116.026 151.848C93.9347 151.848 76.0261 133.939 76.0261 111.848C76.0261 94.3148 87.3067 79.4175 103.006 74.0156L105.972 84.6386C94.9117 88.727 87.0261 99.366 87.0261 111.848C87.0261 127.864 100.01 140.848 116.026 140.848C132.042 140.848 145.026 127.864 145.026 111.848C145.026 99.0256 136.704 88.1485 125.168 84.3193L128.13 73.7128Z',
    'M135.242 44.2762C164.066 52.9385 185.064 79.678 185.064 111.323C185.064 149.983 153.724 181.323 115.064 181.323C76.4045 181.323 45.0644 149.983 45.0644 111.323C45.0644 80.0163 65.6166 53.51 93.9648 44.5594L96.9258 55.1639C73.2157 62.8162 56.0645 85.0667 56.0645 111.323C56.0645 143.908 82.4797 170.323 115.064 170.323C147.649 170.323 174.064 143.908 174.064 111.323C174.064 84.728 156.468 62.2436 132.282 54.8758L135.242 44.2762Z',
    'M199.073 119.629C195.435 156.109 168.287 187.404 130.442 194.642C84.3336 203.461 39.8063 173.232 30.9875 127.123C22.1687 81.0149 52.3979 36.4876 98.5063 27.6688C136.019 20.4939 172.486 39.1657 189.527 71.2072L179.67 76.1072C164.773 48.3775 133.126 32.2468 100.573 38.4729C60.4313 46.1505 34.1141 84.9155 41.7916 125.057C49.4692 165.198 88.2341 191.516 128.376 183.838C161.261 177.548 184.868 150.395 188.107 118.712L199.073 119.629Z',
    'M142.81 14.6068C184.281 26.7973 214.56 65.1414 214.56 110.559C214.56 165.787 169.788 210.559 114.56 210.559C59.3311 210.559 14.5596 165.787 14.5596 110.559C14.5596 65.4794 44.3889 27.3682 85.3858 14.8832L88.3457 25.4828C51.9867 36.6727 25.5596 70.5294 25.5596 110.559C25.5596 159.712 65.4062 199.559 114.56 199.559C163.713 199.559 203.56 159.712 203.56 110.559C203.56 70.1915 176.684 36.1017 139.851 25.2045L142.81 14.6068Z',
    'M79.4771 71.0736C96.6995 55.0374 123.011 51.3383 144.453 63.7176C170.759 78.9054 179.772 112.543 164.584 138.849C149.397 165.155 115.759 174.168 89.453 158.98C68.3047 146.77 58.3326 122.636 63.1268 99.9733L73.7962 102.712C70.1929 120.707 78.1785 139.769 94.953 149.454C115.998 161.604 142.908 154.394 155.058 133.349C167.208 112.304 159.998 85.3941 138.953 73.2439C121.885 63.3896 100.96 66.2714 87.1787 78.9391L79.4771 71.0736Z',
  ],
  // Step 6
  [
    'M82.7139 0.0170898C34.9179 13.971 -4.57253e-06 58.1177 0 110.421C5.55246e-06 173.934 51.4873 225.421 115 225.421C178.513 225.421 230 173.934 230 110.421C230 58.4555 195.532 14.541 148.211 0.290522L145.25 10.8901C187.934 23.8458 219 63.5052 219 110.421C219 167.859 172.438 214.421 115 214.421C57.5624 214.421 11 167.859 11 110.421C11 63.1674 42.5154 23.2754 85.6738 10.6147L82.7139 0.0170898Z',
    'M124.004 88.1662C133.854 91.5211 140.94 100.852 140.94 111.837C140.94 125.644 129.747 136.837 115.94 136.837C102.132 136.837 90.9396 125.644 90.9396 111.837C90.9396 101.193 97.5921 92.1036 106.966 88.4972L109.949 99.1799C105.214 101.425 101.94 106.248 101.94 111.837C101.94 119.569 108.208 125.837 115.94 125.837C123.672 125.837 129.94 119.569 129.94 111.837C129.94 105.903 126.248 100.831 121.036 98.7931L124.004 88.1662Z',
    'M128.13 73.7128C144.304 78.8419 156.026 93.9753 156.026 111.848C156.026 133.939 138.117 151.848 116.026 151.848C93.9347 151.848 76.0261 133.939 76.0261 111.848C76.0261 94.3148 87.3067 79.4175 103.006 74.0156L105.972 84.6386C94.9117 88.727 87.0261 99.366 87.0261 111.848C87.0261 127.864 100.01 140.848 116.026 140.848C132.042 140.848 145.026 127.864 145.026 111.848C145.026 99.0256 136.704 88.1485 125.168 84.3193L128.13 73.7128Z',
    'M135.242 44.2762C164.066 52.9385 185.064 79.678 185.064 111.323C185.064 149.983 153.724 181.323 115.064 181.323C76.4045 181.323 45.0644 149.983 45.0644 111.323C45.0644 80.0163 65.6166 53.51 93.9648 44.5594L96.9258 55.1639C73.2157 62.8162 56.0645 85.0667 56.0645 111.323C56.0645 143.908 82.4797 170.323 115.064 170.323C147.649 170.323 174.064 143.908 174.064 111.323C174.064 84.728 156.468 62.2436 132.282 54.8758L135.242 44.2762Z',
    'M39.7217 151.663C22.2417 119.437 27.1244 78.297 54.37 51.0513C87.5646 17.8568 141.384 17.8568 174.578 51.0513C207.773 84.2459 207.773 138.065 174.578 171.259C147.572 198.266 106.913 203.301 74.8167 186.363L80.2202 176.772C108.12 191.347 143.364 186.917 166.8 163.481C195.699 134.583 195.699 87.7283 166.8 58.8295C137.901 29.9307 91.047 29.9307 62.1482 58.8295C38.4734 82.5043 34.1936 118.23 49.3091 146.261L39.7217 151.663Z',
    'M142.81 14.6068C184.281 26.7973 214.56 65.1414 214.56 110.559C214.56 165.787 169.788 210.559 114.56 210.559C59.3311 210.559 14.5596 165.787 14.5596 110.559C14.5596 65.4794 44.3889 27.3682 85.3858 14.8832L88.3457 25.4828C51.9867 36.6727 25.5596 70.5294 25.5596 110.559C25.5596 159.712 65.4062 199.559 114.56 199.559C163.713 199.559 203.56 159.712 203.56 110.559C203.56 70.1915 176.684 36.1017 139.851 25.2045L142.81 14.6068Z',
    'M133.095 58.7562C155.594 65.6532 171.953 86.5904 171.953 111.349C171.953 141.725 147.329 166.349 116.953 166.349C86.5776 166.349 61.9532 141.725 61.9532 111.349C61.9532 86.929 77.868 66.2258 99.8917 59.0463L102.855 69.6556C85.4689 75.5325 72.9532 91.9795 72.9532 111.349C72.9532 135.65 92.6527 155.349 116.953 155.349C141.254 155.349 160.953 135.65 160.953 111.349C160.953 91.6404 147.995 74.9597 130.134 69.3588L133.095 58.7562Z',
  ],
  // Step 7 (final)
  [
    'M82.7139 0C34.9179 13.9539 -4.57253e-06 58.1006 0 110.404C5.55246e-06 173.917 51.4873 225.404 115 225.404C178.513 225.404 230 173.917 230 110.404C230 58.4385 195.532 14.5239 148.211 0.273432L145.25 10.873C187.934 23.8287 219 63.4881 219 110.404C219 167.842 172.438 214.404 115 214.404C57.5624 214.404 11 167.842 11 110.404C11 63.1504 42.5154 23.2583 85.6738 10.5977L82.7139 0Z',
    'M124.004 88.1491C133.854 91.504 140.94 100.835 140.94 111.82C140.94 125.627 129.747 136.82 115.94 136.82C102.132 136.82 90.9396 125.627 90.9396 111.82C90.9396 101.176 97.5921 92.0865 106.966 88.4802L109.949 99.1628C105.214 101.408 101.94 106.231 101.94 111.82C101.94 119.552 108.208 125.82 115.94 125.82C123.672 125.82 129.94 119.552 129.94 111.82C129.94 105.886 126.248 100.814 121.036 98.7761L124.004 88.1491Z',
    'M128.13 73.6957C144.304 78.8248 156.026 93.9582 156.026 111.83C156.026 133.922 138.117 151.831 116.026 151.831C93.9347 151.831 76.0261 133.922 76.0261 111.83C76.0261 94.2977 87.3067 79.4004 103.006 73.9985L105.972 84.6215C94.9117 88.7099 87.0261 99.3489 87.0261 111.83C87.0261 127.847 100.01 140.83 116.026 140.83C132.042 140.83 145.026 127.847 145.026 111.83C145.026 99.0085 136.704 88.1314 125.168 84.3022L128.13 73.6957Z',
    'M135.242 44.2591C164.066 52.9214 185.064 79.6609 185.064 111.306C185.064 149.966 153.724 181.306 115.064 181.306C76.4045 181.306 45.0644 149.966 45.0644 111.306C45.0644 79.9992 65.6166 53.4929 93.9648 44.5423L96.9258 55.1468C73.2157 62.7991 56.0645 85.0496 56.0645 111.306C56.0645 143.891 82.4797 170.306 115.064 170.306C147.649 170.306 174.064 143.891 174.064 111.306C174.064 84.7109 156.468 62.2265 132.282 54.8587L135.242 44.2591Z',
    'M138.689 29.6373C173.836 40.0642 199.474 72.6072 199.474 111.138C199.474 158.083 161.418 196.138 114.474 196.138C67.53 196.138 29.4742 158.083 29.4742 111.138C29.4742 72.9452 54.6641 40.6354 89.3365 29.9166L92.2974 40.5192C62.2629 49.9416 40.4742 77.9953 40.4742 111.138C40.4742 152.007 73.6051 185.138 114.474 185.138C155.343 185.138 188.474 152.007 188.474 111.138C188.474 77.657 166.239 49.369 135.729 40.236L138.689 29.6373Z',
    'M142.81 14.5897C184.281 26.7802 214.56 65.1243 214.56 110.542C214.56 165.77 169.788 210.542 114.56 210.542C59.3311 210.542 14.5596 165.77 14.5596 110.542C14.5596 65.4623 44.3889 27.3511 85.3858 14.8661L88.3457 25.4657C51.9867 36.6556 25.5596 70.5123 25.5596 110.542C25.5596 159.695 65.4062 199.542 114.56 199.542C163.713 199.542 203.56 159.695 203.56 110.542C203.56 70.1744 176.684 36.0846 139.851 25.1874L142.81 14.5897Z',
    'M133.095 58.7391C155.594 65.6361 171.953 86.5733 171.953 111.332C171.953 141.708 147.329 166.332 116.953 166.332C86.5776 166.332 61.9532 141.708 61.9532 111.332C61.9532 86.9119 77.868 66.2087 99.8917 59.0292L102.855 69.6385C85.4689 75.5155 72.9532 91.9624 72.9532 111.332C72.9532 135.632 92.6527 155.332 116.953 155.332C141.254 155.332 160.953 135.632 160.953 111.332C160.953 91.6233 147.995 74.9426 130.134 69.3417L133.095 58.7391Z',
  ],
] as const;

function ScrollingZoneVector({
  containerRef,
  principles,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  principles: Pillar[];
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const t = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const principleAnchorIds = useMemo(
    () => principles.map((p, i) => getPrincipleAnchorId(p.title, i + 1)),
    [principles]
  );

  const stepThresholdsRef = useRef<number[]>([]);
  const [, forceRerender] = useState(0);

  // Rotate until the start of the final transition (step 6 -> 7), then hold.
  // This avoids showing the final SVG in a rotated state.
  const rotate = useTransform(t, (value) => {
    const thresholds = stepThresholdsRef.current;
    const fallbackStart = 0.12;
    const fallbackStop = 0.85;
    const startAt =
      // Keep step 1 fully still/visible until first real transition.
      thresholds && thresholds.length >= 2 ? thresholds[1] : fallbackStart;
    const stopAt =
      // We start showing the final SVG already in transition 5 (step 5 -> 6),
      // so we stop rotating at the start of that transition.
      thresholds && thresholds.length >= 3 ? thresholds[thresholds.length - 3] : fallbackStop;

    if (value <= startAt) return 0;

    const denom = Math.max(1e-6, stopAt - startAt);
    const normalized = Math.max(0, Math.min(1, (value - startAt) / denom));
    return 360 * normalized;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const computeThresholds = () => {
      const nextThresholds: number[] = [];

      for (const id of principleAnchorIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const offset = el.offsetTop - container.offsetTop;
        nextThresholds.push(offset);
      }

      // Fallback if anchors aren't found yet
      if (nextThresholds.length === 0) {
        stepThresholdsRef.current = [];
        forceRerender((x) => x + 1);
        return;
      }

      const min = Math.min(...nextThresholds);
      const max = Math.max(...nextThresholds);
      const span = Math.max(1, max - min);

      // Normalize to 0..1
      const normalized = nextThresholds.map((px) => (px - min) / span);

      // Ensure strictly increasing; if duplicates exist, nudge slightly.
      const eps = 1e-4;
      for (let i = 1; i < normalized.length; i++) {
        if (normalized[i] <= normalized[i - 1]) normalized[i] = normalized[i - 1] + eps;
      }

      // Anchor the range so the first and last steps can be reached fully.
      normalized[0] = 0;
      normalized[normalized.length - 1] = 1;

      stepThresholdsRef.current = normalized;
      forceRerender((x) => x + 1);
    };

    computeThresholds();

    const ro = new ResizeObserver(() => computeThresholds());
    ro.observe(container);

    return () => {
      ro.disconnect();
    };
  }, [containerRef, principleAnchorIds]);

  const stepOpacities = SCROLL_SVG_STEPS.map((_, stepIndex) =>
    useTransform(t, (value) => {
      const thresholds = stepThresholdsRef.current;
      const clamped = Math.max(0, Math.min(1, value));
      const snapEps = 1e-3;

      // If we couldn't compute thresholds, fall back to equal segmentation.
      if (!thresholds || thresholds.length < 2) {
        const segments = SCROLL_SVG_STEPS.length - 1;
        const raw = clamped * segments;
        const current = Math.floor(raw);
        const next = Math.min(segments, current + 1);
        const localT = raw - current;
        if (stepIndex === current) return 1 - localT;
        if (stepIndex === next) return localT;
        return 0;
      }

      const segments = Math.min(SCROLL_SVG_STEPS.length - 1, thresholds.length - 1);
      const firstTransitionStart = thresholds[1];

      // Hard clamp ends so first/last SVG show fully.
      const lastStepIndex = segments;
      if (clamped <= (thresholds[0] ?? 0) + snapEps) return stepIndex === 0 ? 1 : 0;
      if (clamped >= (thresholds[lastStepIndex] ?? 1) - snapEps)
        return stepIndex === lastStepIndex ? 1 : 0;
      if (typeof firstTransitionStart === 'number' && clamped < firstTransitionStart - snapEps) {
        return stepIndex === 0 ? 1 : 0;
      }

      // Start showing the final SVG during transition 5 (step 5 -> 6).
      // From the beginning of step 6 onward, keep the final at 100%.
      const transition5Start = thresholds[4];
      const transition5End = thresholds[5];
      if (typeof transition5End === 'number' && clamped >= transition5End - snapEps) {
        return stepIndex === lastStepIndex ? 1 : 0;
      }

      // Find current segment by thresholds.
      let current = 0;
      while (current < segments - 1 && clamped >= thresholds[current + 1]) current++;
      const next = Math.min(segments, current + 1);

      const start = thresholds[current] ?? 0;
      const end = thresholds[next] ?? 1;
      const denom = Math.max(1e-6, end - start);
      const localT = (clamped - start) / denom;
      const localClamped = Math.max(0, Math.min(1, localT));
      const isLastTransition = next === lastStepIndex;
      const snapToEnd = isLastTransition && clamped >= end - snapEps;

      // During transition 5 (index 4 -> 5), crossfade step 5 directly into the final step (7).
      if (
        typeof transition5Start === 'number' &&
        typeof transition5End === 'number' &&
        clamped >= transition5Start &&
        clamped < transition5End
      ) {
        const denom5 = Math.max(1e-6, transition5End - transition5Start);
        const local5 = (clamped - transition5Start) / denom5;
        const local5Clamped = Math.max(0, Math.min(1, local5));
        if (stepIndex === 4) return 1 - local5Clamped;
        if (stepIndex === lastStepIndex) return local5Clamped;
        return 0;
      }

      if (stepIndex === current) return snapToEnd ? 0 : 1 - localClamped;
      if (stepIndex === next) return snapToEnd ? 1 : localClamped;
      return 0;
    })
  );

  const isMobile = useIsMobile({ breakpoint: 1450 });
  if (isMobile) return null;

  return (
    <div className="mb:block pointer-events-none absolute inset-0 z-10 hidden pt-[47px] pb-[47px]">
      <motion.div
        style={{ rotate }}
        className="sticky top-[80px] mr-[3%] ml-auto h-[118px] w-[120px]"
      >
        <svg
          viewBox="0 0 230 226"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient
              id="sphere-gradient"
              x1="0"
              y1="225.404"
              x2="225.358"
              y2="-4.54886"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B9A1FE" />
              <stop offset="1" stopColor="#FF9C5F" />
            </linearGradient>
          </defs>

          {SCROLL_SVG_STEPS.map((stepPaths, stepIndex) => (
            <motion.g key={`step-${stepIndex}`} style={{ opacity: stepOpacities[stepIndex] }}>
              {stepPaths.map((d, layerIndex) => (
                <path key={`step-${stepIndex}-layer-${layerIndex}`} d={d} fill="url(#sphere-gradient)" />
              ))}
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

const PRINCIPLE_DETAIL_IMAGE_SIZES: Record<number, { width: string; height: string }> = {
  1: { width: '289px', height: '281px' },
  2: { width: '203px', height: '269px' },
  3: { width: '325px', height: '190px' },
  4: { width: '243px', height: '325px' },
  5: { width: '299px', height: '313px' },
  6: { width: '378px', height: '222px' },
  7: { width: '371px', height: '273px' },
};

function PrincipleDetail({ pillar, globalIndex }: { pillar: Pillar; globalIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const num = globalIndex + 1;
  const style = getPrincipleStyleByIndex(globalIndex);
  const previewParagraphs = useMemo(() => {
    const htmlParagraphs = pillar.content.match(/<p\b[^>]*>[\s\S]*?<\/p>/gi)?.slice(0, 2);
    if (htmlParagraphs?.length) return htmlParagraphs;

    // Fallback for content that might not include <p> tags.
    return extractParagraphsFromHtml(pillar.content)
      .slice(0, 2)
      .map((paragraph) => `<p>${paragraph}</p>`);
  }, [pillar.content]);
  const imageSize = PRINCIPLE_DETAIL_IMAGE_SIZES[num];
  const anchorId = getPrincipleAnchorId(pillar.title, num);

  return (
    <div id={anchorId} className="mb:py-[80px] scroll-mt-24 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb:grid-cols-[292px_1fr] mb:gap-8 grid grid-cols-1 items-start gap-8">
          <FadeIn delay={0.2}>
            <div className="flex items-start justify-center">
              <PrincipleIcon
                kind="detail"
                variant={pillar.imageVariant}
                summarySrc={pillar.image}
                detailSrc={pillar.imageDetail}
                alt={pillar.title}
                className="shrink-0 object-contain"
                style={
                  imageSize
                    ? { width: imageSize.width, height: imageSize.height }
                    : { maxWidth: '292px', height: 'auto' }
                }
              />
              {!pillar.imageVariant && !pillar.imageDetail && !pillar.image && (
                <div className="bg-neutral-light-gray size-[242px] rounded-full" />
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex max-w-[840px] flex-col gap-[25px]">
              <h3 className="mb:text-[39px] font-sans text-[28px] leading-110 font-semibold tracking-[-0.39px]">
                <span style={{ color: style.detailIndexColor }}>Principle {num}:</span>{' '}
                <span className="text-primary-blue">{pillar.title}</span>
              </h3>

              <div className="flex flex-col gap-[15px]">
                {!expanded ? (
                  <>
                    {previewParagraphs.map((paragraph, index) => (
                      <div
                        key={`${anchorId}-preview-${index}`}
                        className="text-primary-navy mb:text-[20px] font-sans text-[18px] leading-140"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => setExpanded(true)}
                      className="text-primary-navy hover:text-primary-teal mb:text-[20px] flex cursor-pointer items-center gap-2 font-sans text-[18px] leading-130 font-medium underline decoration-solid transition-colors"
                    >
                      How We Get There
                      <ChevronDown />
                    </button>
                  </>
                ) : (
                  <>
                    <div
                      className="prose text-primary-navy mb:text-[20px] max-w-none font-sans text-[18px] leading-140 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[20px] [&_h3]:leading-tight [&_h3]:font-semibold [&_h3]:first:mt-0 [&_li]:list-disc [&_ol]:ml-4 [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol>li]:list-decimal [&_p]:mb-4 [&_p]:last:mb-0 [&_ul]:ml-4 [&_ul]:space-y-2 [&_ul]:pl-5"
                      dangerouslySetInnerHTML={{ __html: pillar.content }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setExpanded(false);
                        requestAnimationFrame(() => {
                          document
                            .getElementById(anchorId)
                            ?.scrollIntoView({ behavior: 'auto', block: 'start' });
                        });
                      }}
                      className="text-primary-navy hover:text-primary-teal mb:text-[20px] flex cursor-pointer items-center gap-2 font-sans text-[18px] leading-130 font-medium underline decoration-solid transition-colors"
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

function HowChangeHappens({
  label,
  introduction,
  reportUrl,
  formText,
  downloadLabel,
}: {
  label: string;
  introduction: string;
  reportUrl?: string | null;
  formText?: string | null;
  downloadLabel?: string | null;
}) {
  return (
    <section className="mb:py-[60px] bg-white py-8 sm:py-12 md:mb:py-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="tracking-049 text-primary-blue mb-8 font-sans text-[28px] leading-110 font-semibold sm:mb-10 sm:text-[36px] mb:mb-12 mb:text-[49px]">
            {label}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 mb:gap-6 gap-2 md:grid-cols-2">
            <div className="bg-[#F0F7F7] p-6 sm:p-8 md:p-10">
              <div
                className="text-primary-navy space-y-5 font-sans text-[16px] leading-140 mb-7 sm:text-[18px] sm:mb:text-[22px]"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
              {reportUrl && (
                <a
                  href={reportUrl}
                  className="bg-secondary-light-teal text-primary-navy inline-flex w-fit items-center justify-center rounded-[5px] px-4 py-3 font-sans text-[18px] sm:px-5 sm:py-[15px] sm:text-[20px] leading-120 font-semibold transition-colors hover:bg-[#8df5fc]"
                >
                  {downloadLabel}
                </a>
              )}
            </div>

            <div className="bg-[#F3F0FF] p-6 sm:p-8 md:p-10 mt-4 md:mt-0">
              <p className="text-primary-navy font-sans text-[16px] leading-140 mb-7 sm:text-[18px] sm:mb:text-[22px]">
                {formText}
              </p>
              <SubstackNewsletterWidget />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M13.5 11.25L9 6.75L4.5 11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
