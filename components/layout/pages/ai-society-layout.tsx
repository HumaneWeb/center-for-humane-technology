'use client';

import DonateBlock from '@/components/blocks/donate-block';
import GenericCardsGrid from '@/components/blocks/generic-cards-grid';
import NarrativeBlock from '@/components/blocks/narrative-block';
import useIsMobile from '@/components/hooks/is-mobile';
import Cta from '@/components/shared/cta';
import CustomImage from '@/components/shared/custom-image';
import { FadeIn } from '@/components/shared/fade-in';
import { cn } from '@/lib/utils/css.utils';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

type Props = { page: any; configuration: any };

export default function AiSocietyLayout({ page, configuration }: Props) {
  const {
    title,
    preTitle,
    introduction,
    image,
    mobileImage,
    cta,
    headline,
    subHeading,
    stakeIntroduction,
    contentHeadline,
    contentIntroduction,
    items,
    tbpHeadline,
    tbpSubHeading,
    tpbIntroduction,
    cards,
    tbpExtraInformation,
    narrative,
  } = page;
  const { donateTitle, donateCta, donateImage } = configuration!;

  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: itemRef, offset: ['start start', 'end end'] });

  const isMobile = useIsMobile({ breakpoint: mobileImage ? 1260 : 992 });

  const handleCardClick = (itemId: string) => {
    const element = document.getElementById(`content-${itemId}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="min-h-[750vh]">
      <Hero
        isMobile={isMobile}
        mobileImage={mobileImage}
        image={image}
        preTitle={preTitle}
        title={title}
        introduction={introduction}
        cta={cta}
      />
      <StakeSection
        isMobile={isMobile}
        headline={headline}
        subHeading={subHeading}
        stakeIntroduction={stakeIntroduction}
      />

      {/* Breaking Down the Problem */}
      <div className="mb:pt-[142px] mb:pb-[200px] bg-[#FFDECB] pt-10 pb-10">
        <div className="mb:mb-[142px] mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          {contentHeadline && (
            <FadeIn>
              <h2 className="tracking-031 mb:tracking-061 text-primary-blue mb:text-[61px] mb:mb-[42px] mb-5 font-sans text-[32px] leading-110 font-semibold">
                {contentHeadline}
              </h2>
            </FadeIn>
          )}
          {contentIntroduction && (
            <FadeIn delay={0.4}>
              <div
                className="text-primary-blue mb:text-[25px] mb:leading-130 max-w-[839px] font-sans text-xl leading-120 font-semibold"
                dangerouslySetInnerHTML={{ __html: contentIntroduction }}
              />
            </FadeIn>
          )}
        </div>

        {/* Cards */}
        <div className="mb:grid-cols-5 mb:gap-24 ai-society-items-grid grid grid-cols-1 gap-15 px-4 sm:px-6 lg:px-15">
          {items.map((item: any, index: number) => (
            <FadeIn
              key={item.id}
              delay={0.25 * index}
              className="cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
              <div className="mb:justify-center mb:mb-7.5 relative mb-5 flex items-center">
                <FadeIn delay={0.5}>
                  <CardEllipse />
                </FadeIn>
                {item.cardImage?.url && (
                  <img
                    className="absolute h-[222px] w-[222px] object-contain"
                    src={item.cardImage.url}
                  />
                )}
              </div>
              {item.cardHeadline && (
                <h6 className="text-primary-blue mb:text-xl mb-2.5 font-sans text-[18px] leading-120 font-semibold">
                  {item.cardHeadline}
                </h6>
              )}
              {item.cardIntroduction && (
                <p className="text-primary-blue font-sans text-[16px] leading-140">
                  {item.cardIntroduction}
                </p>
              )}
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Items */}
      <div ref={itemRef} className="bg-[#030E20]">
        {items.map((item: any, index: number) => (
          <ContentSection
            key={item.id}
            item={item}
            scrollYProgress={scrollYProgress}
            hideFirst={index === 0}
          />
        ))}
      </div>

      {/* The Big Picture */}
      <div className="mb:py-[100px] bg-[#FFDECB] py-10">
        <div className="mb:mb-[200px] mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          {tbpHeadline && (
            <FadeIn>
              <h2 className="tracking-031 mb:tracking-061 text-primary-blue mb:text-[61px] mb:mb-[53px] mb-5 text-center font-sans text-[32px] leading-110 font-semibold">
                {tbpHeadline}
              </h2>
            </FadeIn>
          )}
          {tbpSubHeading && (
            <FadeIn delay={0.35}>
              <p className="font-pixel text-primary-blue mb:text-[39px] mb:mb-[57px] mx-auto mb-5 max-w-[840px] text-center text-[25px] leading-130">
                {tbpSubHeading}
              </p>
            </FadeIn>
          )}
          {tpbIntroduction && (
            <FadeIn delay={0.45}>
              <div
                className="text-primary-navy mb:text-[25px] mb:leading-130 mb:mb-[57px] mb-5 text-center font-sans text-xl leading-120 font-semibold"
                dangerouslySetInnerHTML={{ __html: tpbIntroduction }}
              />
            </FadeIn>
          )}
          {cards && (
            <FadeIn className="mb:mb-[53px]" delay={0.55}>
              <GenericCardsGrid {...cards} variant="3-columns" />
            </FadeIn>
          )}
          {tbpExtraInformation && (
            <FadeIn delay={0.65}>
              <div
                className="text-primary-navy mb:text-[25px] mb:leading-130 text-center font-sans text-xl leading-120 font-semibold"
                dangerouslySetInnerHTML={{ __html: tbpExtraInformation }}
              />
            </FadeIn>
          )}
        </div>
        {narrative && <NarrativeBlock {...narrative} />}
      </div>

      {/* @ts-ignore */}
      <DonateBlock title={donateTitle} cta={donateCta} image={donateImage} />
    </div>
  );
}

// Utils
const CardEllipse = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="242"
    height="242"
    viewBox="0 0 242 242"
    fill="none"
  >
    <circle cx="121" cy="121" r="121" fill="#FFBB91" fillOpacity="0.4" />
  </svg>
);

const FullCardEllipse = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="852"
    height="852"
    viewBox="0 0 852 852"
    fill="none"
    className="mb:w-auto h-auto w-full"
  >
    <mask
      id="mask0_5263_9317"
      // style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="852"
      height="852"
    >
      <circle opacity="0.6" cx="426" cy="426" r="426" fill="url(#paint0_radial_5263_9317)" />
    </mask>
    <g mask="url(#mask0_5263_9317)">
      <rect
        x="-281.004"
        y="-16.4995"
        width="1412.04"
        height="900.315"
        fill="url(#paint1_linear_5263_9317)"
      />
      <path
        d="M247.144 436.394L-278.268 882.447H1131.04V-12.3955L530.374 536.277L247.144 436.394Z"
        fill="url(#paint2_linear_5263_9317)"
      />
    </g>
    <circle cx="426.144" cy="426.001" r="277.972" fill="url(#paint3_linear_5263_9317)" />
    <defs>
      <radialGradient
        id="paint0_radial_5263_9317"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(426.504 426.504) scale(425.496)"
      >
        <stop offset="0.740385" stopColor="#00909A" />
        <stop offset="1" stopColor="#E79C6E" stopOpacity="0" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_5263_9317"
        x1="-345.808"
        y1="229.203"
        x2="1187.89"
        y2="229.203"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2481D8" />
        <stop offset="0.475962" stopColor="#E79C6E" />
        <stop offset="1" stopColor="#00909A" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_5263_9317"
        x1="-278.268"
        y1="882.447"
        x2="531.59"
        y2="-393.017"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2481D8" />
        <stop offset="1" stopColor="#E79C6E" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_5263_9317"
        x1="122.658"
        y1="299.75"
        x2="703.782"
        y2="553.548"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2481D8" />
        <stop offset="0.357117" stopColor="#FFBB91" stopOpacity="0.5" />
        <stop offset="0.644231" stopColor="#E79C6E" />
        <stop offset="1" stopColor="#00909A" />
      </linearGradient>
    </defs>
  </svg>
);

const ItemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    className="mt-1.5"
  >
    <path
      d="M9.5 6.32234L12.6777 9.5L9.5 12.6777L6.32234 9.5L9.5 6.32234ZM9.5 0L0 9.5L9.5 19L19 9.5L9.5 0Z"
      fill="#FFBB91"
    />
  </svg>
);

const ItemIconBlue = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    className="mt-1.5"
  >
    <path
      d="M10 6.32234L13.1777 9.5L10 12.6777L6.82234 9.5L10 6.32234ZM10 0L0.5 9.5L10 19L19.5 9.5L10 0Z"
      fill="#6FE4E0"
    />
  </svg>
);

// Transitions component
// @ts-ignore
const Hero = ({ isMobile, mobileImage, image, preTitle, title, introduction, cta }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], ['80%', '0%']);
  const backgroundImageOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const backgroundOpacity = useTransform(scrollYProgress, [1, 0], [0.8, 1]);

  return (
    <motion.section
      id="complex-hero"
      ref={ref}
      className={cn('bg-complex-hero-blue mb:pt-30')}
      style={{ opacity: backgroundOpacity }}
    >
      <FadeIn
        delay={0.3}
        className={cn(
          'h-[130dvh] bg-contain bg-bottom-right bg-no-repeat',
          isMobile && mobileImage && 'complex-hero-grid',
          isMobile && 'h-auto',
        )}
        style={{
          backgroundImage: isMobile ? 'none' : `url(${image?.url})`,
          backgroundAttachment: isMobile ? 'initial' : 'fixed',
          backgroundSize: isMobile ? 'contain' : '870.878px 689.592px',
          opacity: isMobile ? 1 : backgroundImageOpacity,
        }}
      >
        <motion.div
          className="complex-hero-grid-content mb:pb-25 mb:h-[620px] mb:pt-0 mx-auto flex max-w-7xl items-end px-4 pt-35 pb-10 sm:px-6 lg:px-8"
          style={{
            opacity: isMobile ? 1 : contentOpacity,
            y: isMobile ? '0%' : contentY,
          }}
        >
          <div className="max-w-[750px]">
            <FadeIn delay={0.3}>
              <h2
                className={cn(
                  'mb:text-xl mb:leading-135 tracking-08 mb:tracking-[1px] mb:mb-3.5 mb-2 font-sans text-[16px] leading-120 font-semibold text-[#93C0FF] uppercase',
                )}
              >
                {preTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.35}>
              <h1
                className={cn(
                  'text-primary-cream mb:tracking-061 mb:text-6xl mb:mb-5 mb-2 font-sans text-[32px] leading-110 font-semibold tracking-[-0.32px]',
                )}
              >
                {title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div
                className="text-neutral-white mb:text-2xl mb:mb-3.5 mb-2 max-w-[600px] font-sans text-xl leading-140"
                dangerouslySetInnerHTML={{
                  __html: introduction,
                }}
              />
            </FadeIn>
            <FadeIn delay={0.45}>
              <Cta {...cta} />
            </FadeIn>
          </div>
        </motion.div>

        {isMobile && mobileImage && (
          <div className="complex-hero-grid-image">
            <CustomImage {...mobileImage} extraClass="objet-cover" />
          </div>
        )}
      </FadeIn>
    </motion.section>
  );
};
// @ts-ignore
const StakeSection = ({ isMobile, headline, subHeading, stakeIntroduction }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.6], ['100%', '0%']);

  return (
    <div ref={ref} className="stake-section mb:h-[100vh] bg-[#F0EBFF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="headline-wrapper mb:grid-cols-[1fr_2fr] mb:gap-20 relative grid gap-5">
          {headline && (
            <FadeIn
              delay={1}
              className="headline mb:sticky mb:top-0 mb:z-10 mb:h-screen mb:flex mb:p-8 mb:pt-8 items-center justify-center pt-8"
            >
              <motion.h2 className="mb:tracking-061 tracking-031 text-primary-navy mb:text-[61px] font-sans text-[32px] leading-110 font-semibold">
                {headline}
              </motion.h2>
            </FadeIn>
          )}

          <motion.div
            style={{
              opacity: isMobile ? 1 : textOpacity,
              y: isMobile ? '0%' : textY,
            }}
          >
            {subHeading && (
              <div>
                <h5 className="text-primary-navy mb:text-[25px] mb:leading-130 mb:mb-[37px] mb-5 font-sans text-xl leading-120 font-semibold">
                  {subHeading}
                </h5>
              </div>
            )}
            {stakeIntroduction && (
              <div
                className="text-primary-navy mb:text-xl font-sans text-[18px] leading-140 [&>p]:mb-5"
                dangerouslySetInnerHTML={{ __html: stakeIntroduction }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
// @ts-ignore
const ContentSection = ({ item, scrollYProgress, hideFirst = false }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.08]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <>
      {!hideFirst && (
        <div
          className={item.variant !== 'dark' ? 'pre-content-section-dark' : 'pre-content-section'}
        />
      )}
      <motion.div>
        <div
          id={`content-${item.id}`}
          className={cn(
            'bg-ai-society-blue mb:py-[100px] py-10',
            item.variant === 'dark' && 'bg-ai-society-dark-blue',
          )}
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb:grid-cols-2 mb:gap-17 content-section-grid grid items-center">
              <div className="mb:mb-7.5 relative mb-5 flex items-center justify-center">
                <FadeIn>
                  <FullCardEllipse />
                </FadeIn>
                {item.image?.url && (
                  <FadeIn className="absolute" delay={0.5} duration={2}>
                    <img src={item.image.url} className="max-h-[595px]" />
                  </FadeIn>
                )}
              </div>
              <FadeIn className="max-w-[621px]">
                {item.headline && (
                  <h2
                    className={cn(
                      'tracking-031 mb:tracking-061 mb:text-[61px] mb:mb-6 mb-5 font-sans text-[32px] leading-110 font-semibold text-[#FFBB91]',
                      item.variant === 'dark' && 'text-[#6FE4E0]',
                    )}
                  >
                    {item.headline}
                  </h2>
                )}
                {item.content && (
                  <div
                    className="text-primary-cream mb:text-[22px] font-sans text-[20px] leading-130 [&>p]:mb-5"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )}
              </FadeIn>
            </div>
          </div>
        </div>
        <div
          className={cn(
            'bg-primary-blue mb:pb-[300px] pb-[150px]',
            item.variant === 'dark' && 'bg-[#030E20]',
          )}
        >
          {item.items.slice(0, 1).map((helpItem: any) => (
            <FadeIn key={helpItem.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div
                className={cn(
                  'mb:mb-[90px] mx-auto mb-10 flex max-w-[1052px] items-center justify-center bg-[#FFBB91] p-2.5',
                  item.variant === 'dark' && 'bg-[#6FE4E0]',
                )}
              >
                {helpItem.headline && (
                  <h3
                    className={cn(
                      'font-pixel mb:text-[31px] text-center text-[25px] leading-110 text-[#0B1023]',
                      item.variant === 'dark' && 'text-primary-navy',
                    )}
                  >
                    {helpItem.headline}
                  </h3>
                )}
              </div>
              <div className="mx-auto max-w-[900px]">
                {helpItem.items.map((i: any, index: number) => (
                  <div
                    key={i.id}
                    className={cn(
                      'mb:mb-[50px] mb-10 grid grid-cols-[auto_1fr] items-start gap-2.5',
                      index === helpItem.items.length - 1 && 'mb:mb-[190px]',
                    )}
                  >
                    {item.variant === 'dark' ? <ItemIconBlue /> : <ItemIcon />}
                    {i.content && (
                      <p className="text-primary-cream mb:text-xl font-sans text-[18px] leading-140">
                        {i.content}
                      </p>
                    )}
                  </div>
                ))}

                {item.imageGif?.url && (
                  <FadeIn
                    delay={0.5}
                    duration={2}
                    className="mb-[90px] flex items-center justify-center"
                  >
                    <img src={item.imageGif.url} />
                  </FadeIn>
                )}
              </div>
            </FadeIn>
          ))}
          {item.items.slice(1).map((helpItem: any) => (
            <FadeIn key={helpItem.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div
                className={cn(
                  'mb:mb-[90px] mx-auto mb-10 flex max-w-[1052px] items-center justify-center bg-[#FFBB91] p-2.5',
                  item.variant === 'dark' && 'bg-[#6FE4E0]',
                )}
              >
                {helpItem.headline && (
                  <h3
                    className={cn(
                      'font-pixel mb:text-[31px] text-center text-[25px] leading-110 text-[#0B1023]',
                      item.variant === 'dark' && 'text-primary-navy',
                    )}
                  >
                    {helpItem.headline}
                  </h3>
                )}
              </div>
              <div className="mx-auto max-w-[900px]">
                {helpItem.items.map((i: any, index: number) => (
                  <div
                    key={i.id}
                    className={cn(
                      'mb:mb-[50px] mb-10 grid grid-cols-[auto_1fr] items-start gap-2.5',
                      index === helpItem.items.length - 1 && 'mb:mb-[190px]',
                    )}
                  >
                    {item.variant === 'dark' ? <ItemIconBlue /> : <ItemIcon />}
                    {i.content && (
                      <p className="text-primary-cream mb:text-xl font-sans text-[18px] leading-140">
                        {i.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn
              className={cn(
                'mb:p-[60px] mb:border-8 border-4 border-[#FFBB91] p-5',
                item.variant === 'dark' && 'border-[#6FE4E0]',
              )}
            >
              <FadeIn delay={0.5}>
                <h3
                  className={cn(
                    'tracking-039 mb:text-[39px] mb:leading-110 mb:mb-[33px] mb-5 text-center font-sans text-[23px] leading-120 font-semibold text-[#FFBB91]',
                    item.variant === 'dark' && 'text-[#6FE4E0]',
                  )}
                >
                  {item.helpHeadlineBox}
                </h3>
              </FadeIn>
              <FadeIn delay={0.8}>
                <div
                  className="text-primary-cream mb:text-[22px] text-center font-sans text-xl leading-130"
                  dangerouslySetInnerHTML={{ __html: item.helpContentBox }}
                />
              </FadeIn>
            </FadeIn>
          </div>
        </div>
      </motion.div>
    </>
  );
};
