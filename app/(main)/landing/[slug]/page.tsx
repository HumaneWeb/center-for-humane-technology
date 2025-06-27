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
    thumbnail,
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
              <h1 className="text-neutral-white tracking-039 mb:text-[39px] mb:leading-110 mb-9 font-sans text-[23px] leading-120 font-semibold">
                {title}
              </h1>
            )}
            {youtubeUrl && (
              <VideoEmbed
                {...youtubeUrl}
                thumbnailUrl={thumbnail?.url || youtubeUrl.thumbnailUrl}
              />
            )}
            {cta && (
              <div className="mb:my-14 my-10">
                <Cta {...cta} />
              </div>
            )}
          </div>

          {contentTitle && (
            <h2 className="tracking-039 text-neutral-white mb:text-[39px] mb:leading-110 mb:mb-9 mx-auto mb-5 max-w-[840px] text-center font-sans text-[23px] leading-120 font-semibold">
              {contentTitle}
            </h2>
          )}
          {contentInformation && (
            <div
              dangerouslySetInnerHTML={{ __html: contentInformation }}
              className="text-neutral-white mb:text-[25px] mb:mb-20 mx-auto mb-15 max-w-[840px] text-center font-sans text-xl leading-140 [&>p]:mb-4"
            />
          )}
          {logos && (
            <div className="mb:gap-24 mb-20 flex flex-wrap items-center justify-center gap-15">
              {logos?.map((logo) => <CustomImage key={logo.id} {...logo} extraClass="mb:mb-4" />)}
            </div>
          )}
          {stats && <StatsBlock {...stats} variant="landing" />}
        </div>

        <div className="mb:mt-[118px] mb:mb-50 mx-auto mt-20 mb-20 flex max-w-7xl flex-col justify-end px-4 sm:px-6 lg:px-8">
          {highlightBlockCta.title && (
            <h3 className="text-neutral-white tracking-049 mb:text-[49px] mb:leading-110 mb:mb-16 mb-5 font-sans text-[29px] leading-120 font-semibold">
              {highlightBlockCta.title}
            </h3>
          )}

          <div className="mb:grid-cols-2 mb:gap-24 mb:mb-28 mb-20 grid gap-12">
            <div>
              {highlightBlockCta.firstQuote && (
                <p className="text-neutral-white mb:text-[25px] mb:mb-6 mb-3 font-sans text-xl leading-140 font-normal">
                  {highlightBlockCta.firstQuote}
                </p>
              )}
              {highlightBlockCta.firstQuoteAuthor && (
                <span className="text-neutral-white mb:text-xl mb:leading-135 mb:tracking-[1px] font-sans text-[18px] leading-120 font-semibold tracking-[0.9px] uppercase">
                  {highlightBlockCta.firstQuoteAuthor}
                </span>
              )}
            </div>
            <div>
              {highlightBlockCta.secondQuote && (
                <p className="text-neutral-white mb:text-[25px] mb:mb-6 mb-3 font-sans text-xl leading-140 font-normal">
                  {highlightBlockCta.secondQuote}
                </p>
              )}
              {highlightBlockCta.secondQuoteAuthor && (
                <span className="text-neutral-white mb:text-xl mb:leading-135 mb:tracking-[1px] font-sans text-[18px] leading-120 font-semibold tracking-[0.9px] uppercase">
                  {highlightBlockCta.secondQuoteAuthor}
                </span>
              )}
            </div>
          </div>
          <div className="mb:grid-cols-[2fr_1fr] mb:px-[73px] mb:py-[59px] mb:gap-36 grid gap-5 bg-[#1B2343] p-8">
            {highlightBlockCta.headlineBlock && (
              <h3 className="text-neutral-white mb:text-[29px] mb:leading-130 font-sans text-[23px] leading-120 font-semibold">
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

        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div>
            {narrativeBlocks?.map((block) => (
              <NarrativeBlock
                key={block.id}
                {...block}
                extraClass="[&>div]:p-0 mb:mb-0 mb-5"
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
