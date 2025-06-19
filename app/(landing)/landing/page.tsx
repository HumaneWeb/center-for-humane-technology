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
      <div className="bg-landing-page flex flex-col items-center justify-center">
        <CustomImage {...logo} width={210} height={142} extraClass="mb-4" />
        <h1 className="text-neutral-white tracking-039 mb-9 font-sans text-[39px] leading-110 font-semibold">
          {title}
        </h1>

        <VideoEmbed {...youtubeUrl} />
        <div className="mb-14">
          <Cta {...cta} />
        </div>

        <h2 className="tracking-039 text-neutral-white mx-auto mb-9 max-w-[840px] text-center font-sans text-[39px] leading-110 font-semibold">
          {contentTitle}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: contentInformation }}
          className="text-neutral-white mx-auto mb-14 max-w-[840px] font-sans text-[25px] leading-140 [&>p]:mb-4"
        />

        <div className="mb-24 flex items-center justify-center gap-24">
          {logos?.map((logo) => (
            <CustomImage key={logo.id} {...logo} width={210} height={142} extraClass="mb-4" />
          ))}
        </div>

        <div>
          <StatsBlock {...stats} variant="landing" />
        </div>

        <div className="mb-50">the impact....</div>

        <div>
          {narrativeBlocks?.map((block) => (
            <NarrativeBlock key={block.id} {...block} textExtraClass="text-neutral-white" />
          ))}
        </div>
      </div>

      <NewsletterBlock title={newsletterTitle} introduction={newsletterIntroduction} />
      <DonateBlock title={donateTitle} cta={donateCta} image={donateImage} />
    </>
  );
}
