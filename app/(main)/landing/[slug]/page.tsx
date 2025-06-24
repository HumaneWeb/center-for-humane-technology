// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NarrativeBlock from '@/components/blocks/narrative-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import StatsBlock from '@/components/blocks/stats-block';
import Cta from '@/components/shared/cta';
import CustomImage from '@/components/shared/custom-image';
import VideoEmbed from '@/components/shared/video-embed';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { LandingPageQuery } from '@/lib/cms/query';
import { PageSlug } from '@/lib/utils/types';

export const generateMetadata = generateMetadataFn({
  query: LandingPageQuery,
  buildQueryVariables: ({ params }) => ({ slug: params.slug }),
  pickSeoMetaTags: (data) => data.landing?._seoMetaTags,
});

export default async function LandingPage({ params }: PageSlug) {
  const { slug } = await params;

  const { landing, configuration } = await executeQuery(LandingPageQuery, {
    variables: { slug },
  });

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
    highlightBlockCta,
  } = landing!;

  const { donateTitle, donateCta, donateImage, newsletterTitle, newsletterIntroduction } =
    configuration!;

  return (
    <>
      <div className="bg-landing-page pt-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {logo && <CustomImage {...logo} width={210} height={142} extraClass="mb-4" />}
            {title && (
              <h1 className="text-neutral-white tracking-039 mb-9 font-sans text-[39px] leading-110 font-semibold">
                {title}
              </h1>
            )}
            {youtubeUrl && <VideoEmbed {...youtubeUrl} />}
            {cta && (
              <div className="my-14">
                <Cta {...cta} />
              </div>
            )}
          </div>

          {contentTitle && (
            <h2 className="tracking-039 text-neutral-white mx-auto mb-9 max-w-[840px] text-center font-sans text-[39px] leading-110 font-semibold">
              {contentTitle}
            </h2>
          )}
          {contentInformation && (
            <div
              dangerouslySetInnerHTML={{ __html: contentInformation }}
              className="text-neutral-white mx-auto mb-20 max-w-[840px] text-center font-sans text-[25px] leading-140 [&>p]:mb-4"
            />
          )}
          {logos && (
            <div className="mb-20 flex items-center justify-center gap-24">
              {logos?.map((logo) => <CustomImage key={logo.id} {...logo} extraClass="mb-4" />)}
            </div>
          )}
          {stats && <StatsBlock {...stats} variant="landing" />}
        </div>

        <div className="mx-auto mt-[118px] mb-50 flex max-w-7xl flex-col justify-end px-4 sm:px-6 lg:px-8">
          {highlightBlockCta.title && (
            <h3 className="text-neutral-white tracking-049 mb-16 font-sans text-[49px] leading-110 font-semibold">
              {highlightBlockCta.title}
            </h3>
          )}

          <div className="mb-28 grid grid-cols-2 gap-24">
            <div>
              {highlightBlockCta.firstQuote && (
                <p className="text-neutral-white mb-6 font-sans text-[25px] leading-140 font-normal">
                  {highlightBlockCta.firstQuote}
                </p>
              )}
              {highlightBlockCta.firstQuoteAuthor && (
                <span className="text-neutral-white font-sans text-xl leading-135 font-semibold tracking-[1px] uppercase">
                  {highlightBlockCta.firstQuoteAuthor}
                </span>
              )}
            </div>
            <div>
              {highlightBlockCta.secondQuote && (
                <p className="text-neutral-white mb-6 font-sans text-[25px] leading-140 font-normal">
                  {highlightBlockCta.secondQuote}
                </p>
              )}
              {highlightBlockCta.secondQuoteAuthor && (
                <span className="text-neutral-white font-sans text-xl leading-135 font-semibold tracking-[1px] uppercase">
                  {highlightBlockCta.secondQuoteAuthor}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-[2fr_1fr] gap-36 bg-[#1B2343] px-[73px] py-[59px]">
            {highlightBlockCta.headlineBlock && (
              <h3 className="text-neutral-white font-sans text-[29px] leading-130 font-semibold">
                {highlightBlockCta.headlineBlock}
              </h3>
            )}
            {highlightBlockCta.cta && (
              <div>
                <Cta {...highlightBlockCta.cta} />
              </div>
            )}
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
