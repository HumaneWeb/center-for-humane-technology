// @ts-nocheck
import BlockBuilderLanding from '@/components/blocks/block-builder-landing';
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import CustomImage from '@/components/shared/custom-image';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { LandingPageQuery } from '@/lib/cms/query';
import { cn } from '@/lib/utils/css.utils';
import { PageSlug } from '@/lib/utils/types';
import { notFound } from 'next/navigation';

export const generateMetadata = generateMetadataFn({
  query: LandingPageQuery,
  buildQueryVariables: ({ params }) => ({ slug: params.slug }),
  pickSeoMetaTags: (data) => data.landing?._seoMetaTags,
});

export default async function LandingPage({ params }: PageSlug) {
  const { slug } = await params;
  const { landing, configuration } = await executeQuery(LandingPageQuery, { variables: { slug } });

  if (!landing) {
    notFound();
  }

  const {
    logo,
    title,
    subheading,
    introduction,
    variant,
    backgroundColor,
    heroTextColor,
    heroBackgroundImage,
    blocks,
  } = landing!;

  const { donateTitle, donateCta, donateImage, newsletterTitle, newsletterIntroduction } =
    configuration!;

  return (
    <>
      {variant === 'with-hero-image' && (
        <div
          className="mb:min-h-[600px] relative bg-black bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackgroundImage?.url})` }}
        >
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="mb:pt-50 relative z-10 mx-auto max-w-7xl px-4 pt-30 sm:px-6 lg:px-8">
            <div className="mx-auto flex h-full max-w-[1065px] flex-col justify-end text-center">
              {logo && <CustomImage {...logo} width={210} height={142} extraClass="mb-4" />}
              {title && (
                <h1
                  className={cn(
                    'text-neutral-white tracking-039 mb:text-[39px] mb:leading-110 mb:mb-9 mb-2 text-center font-sans text-[23px] leading-120 font-semibold',
                    backgroundColor === 'light-orange' && 'text-primary-navy mb:text-[61px]',
                    heroTextColor === 'light' && 'text-[#FFE7D8]',
                    heroTextColor === 'dark' && 'text-primary-navy',
                  )}
                >
                  {title}
                </h1>
              )}
              {subheading && (
                <h2
                  className={cn(
                    'tracking-039 mb:text-4xl font-sans text-[20px] leading-110 font-semibold',
                    heroTextColor === 'light' && 'text-[#FFE7D8]',
                    heroTextColor === 'dark' && 'text-primary-navy',
                  )}
                >
                  {subheading}
                </h2>
              )}
              {introduction && (
                <div
                  dangerouslySetInnerHTML={{ __html: introduction }}
                  className={cn(
                    'mb:my-12 mb:text-[25px] mx-auto my-5 max-w-[837px] font-sans text-xl leading-140 [&>p]:mb-3',
                    heroTextColor === 'light' && 'text-[#FFE7D8]',
                    heroTextColor === 'dark' && 'text-primary-navy',
                  )}
                />
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          'bg-landing-page pt-30 pb-10',
          backgroundColor === 'light-orange' && 'bg-landing-page-orange',
          variant === 'with-hero-image' && 'mb:pt-15 pt-5',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {variant !== 'with-hero-image' && (
            <div className="flex flex-col items-center">
              {logo && <CustomImage {...logo} width={210} height={142} extraClass="mb-4" />}
              {title && (
                <h1
                  className={cn(
                    'text-neutral-white tracking-039 mb:text-[39px] mb:leading-110 mb:mb-9 mb-5 font-sans text-[23px] leading-120 font-semibold',
                    backgroundColor === 'light-orange' && 'text-primary-navy mb:text-[61px]',
                  )}
                >
                  {title}
                </h1>
              )}
              {subheading && (
                <h2 className="tracking-039 font-sans text-4xl leading-110 font-semibold">
                  {subheading}
                </h2>
              )}
            </div>
          )}

          <BlockBuilderLanding
            components={blocks}
            variant={backgroundColor === 'light-orange' ? 'text-dark' : 'text-default'}
          />
        </div>
      </div>

      <NewsletterBlock title={newsletterTitle} introduction={newsletterIntroduction} />
      <DonateBlock title={donateTitle} cta={donateCta} image={donateImage} />
    </>
  );
}
