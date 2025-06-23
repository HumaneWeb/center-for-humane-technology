// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NarrativeBlock from '@/components/blocks/narrative-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import StatsBlock from '@/components/blocks/stats-block';
import Cta from '@/components/shared/cta';
import CustomImage from '@/components/shared/custom-image';
import VideoEmbed from '@/components/shared/video-embed';
import { executeQuery } from '@/lib/cms/executeQuery';
import { LandingPageQuery } from '@/lib/cms/query';

export default async function LandingPage() {
  const { landing, configuration } = await executeQuery(LandingPageQuery);

  const {
    logo,
    title,
    youtubeUrl,
    cta,
    contentTitle,
    contentInformation,
    logos,
    stats,
    narrativeBlocks,
  } = landing!;

  const { donateTitle, donateCta, donateImage, newsletterTitle, newsletterIntroduction } =
    configuration!;

  return (
    <>
      <div className="bg-landing-page pt-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <CustomImage {...logo} width={210} height={142} extraClass="mb-4" />
            <h1 className="text-neutral-white tracking-039 mb-9 font-sans text-[39px] leading-110 font-semibold">
              {title}
            </h1>
            <VideoEmbed {...youtubeUrl} />
            <div className="mb-14">
              <Cta {...cta} />
            </div>
          </div>

          <h2 className="tracking-039 text-neutral-white mx-auto mb-9 max-w-[840px] text-center font-sans text-[39px] leading-110 font-semibold">
            {contentTitle}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: contentInformation }}
            className="text-neutral-white mx-auto mb-14 max-w-[840px] font-sans text-[25px] leading-140 [&>p]:mb-4"
          />

          <div className="mb-20 flex items-center justify-center gap-24">
            {logos?.map((logo) => <CustomImage key={logo.id} {...logo} extraClass="mb-4" />)}
          </div>

          <div>
            <StatsBlock {...stats} variant="landing" />
          </div>
        </div>

        <div className="">
          <div className="mx-auto mb-50 flex min-h-[800px] max-w-7xl flex-col justify-end px-4 sm:px-6 lg:px-8">
            <h3 className="text-neutral-white tracking-049 mb-16 font-sans text-[49px] leading-110 font-semibold">
              The Impact
            </h3>
            <div className="mb-24 grid grid-cols-2 gap-24">
              <div>
                <p className="text-neutral-white mb-6 font-sans text-[29px] leading-130 font-semibold">
                  “It is the most consequential documentary I have seen in the past three or four
                  years… It is mind-blowing.”
                </p>
                <span className="text-secondary-light-teal font-sans text-xl leading-135 tracking-[1px] uppercase">
                  - today show
                </span>
              </div>
              <div>
                <p className="text-neutral-white mb-6 font-sans text-[29px] leading-130 font-semibold">
                  “Remarkably effective in sounding the alarm about the incursion of data mining and
                  manipulative technology into our social lives and beyond.”
                </p>
                <span className="text-secondary-light-teal font-sans text-xl leading-135 tracking-[1px] uppercase">
                  - the new york times
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[2fr_1fr] gap-36 bg-[#1B2343] px-[73px] py-[59px]">
              <h3 className="text-neutral-white font-sans text-[29px] leading-130 font-semibold">
                This is the headline for the CTA block lorem ipsum dolor sit amet consectetur.
              </h3>
              <div>
                <Cta label="CTA to other page" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            {narrativeBlocks?.map((block) => (
              <NarrativeBlock
                key={block.id}
                {...block}
                extraClass="[&>div]:p-0"
                textExtraClass="text-neutral-white"
              />
            ))}
          </div>
        </div>
      </div>

      <NewsletterBlock title={newsletterTitle} introduction={newsletterIntroduction} />
      <DonateBlock title={donateTitle} cta={donateCta} image={donateImage} />
    </>
  );
}
