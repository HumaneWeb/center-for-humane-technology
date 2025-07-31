// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import { PaginationControls } from '@/components/shared/pagination-controls';
import { executeQuery } from '@/lib/cms/executeQuery';
import { InThePressListQuery } from '@/lib/cms/query';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import type { PodcastListPageProps } from '@/lib/utils/types';
import BasicHero from '@/components/layout/basic-hero';
import Cta from '@/components/shared/cta';
import PodcastMinimalCard from '@/components/shared/podcast-minimal-card';
import { formatDate } from '@/lib/utils/date.utils';
import { FadeIn } from '@/components/shared/fade-in';
import { draftMode } from 'next/headers';

export const generateMetadata = generateMetadataFn({
  query: InThePressListQuery,
  buildQueryVariables: () => ({ skip: 0, first: 10 }),
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

const NEWS_PER_PAGE = 10;

export default async function InThePressPage({ searchParams }: PodcastListPageProps) {
  const { isEnabled } = await draftMode();

  const params = await searchParams;
  const currentPage = Number.parseInt(params.page || '1', 10);
  const skip = (currentPage - 1) * NEWS_PER_PAGE;

  const { page, press, pressCount, configuration } = await executeQuery(InThePressListQuery, {
    variables: { skip, first: NEWS_PER_PAGE },
    includeDrafts: isEnabled,
  });
  const totalPages = Math.ceil(pressCount.count / NEWS_PER_PAGE);

  const { title, featuredMedia } = page;

  return (
    <>
      <BasicHero title={title} />

      <FadeIn className="press-page mb:pt-16 mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="max-w-[948px]">
          {currentPage === 1 && featuredMedia.length > 0 && (
            <div className="mb-10">
              <h4 className="text-primary-blue mb:text-[29px] mb:leading-130 mb:mb-[33px] mb-5 font-sans text-[23px] leading-120 font-semibold">
                Recommended Media
              </h4>
              <div className="podcast-card mb:grid-cols-3 grid gap-5">
                {featuredMedia.map((item) => (
                  <PodcastMinimalCard
                    key={item.id}
                    title={item.title}
                    episode={`${item.category} | ${formatDate(item.date)}`}
                    image={item.image}
                    externalUrl={item.externalUrl}
                    introduction={`${item.source ? `<b>${item.source}</b> - ` : ''}${item.length ?? '-'}`}
                    labelExtraClass="flex-col items-start"
                    variant="vertical"
                  />
                ))}
              </div>
            </div>
          )}

          {press.length > 0 && (
            <div>
              <h4 className="text-primary-blue mb:text-[29px] mb:leading-130 mb:mb-[33px] mb-5 font-sans text-[23px] leading-120 font-semibold">
                News + Press
              </h4>
              <div className="podcast-card flex flex-col gap-5">
                {press.map((item) => (
                  <PodcastMinimalCard
                    key={item.id}
                    title={item.title}
                    episode={`${formatDate(item.date)}`}
                    image={item.image}
                    externalUrl={item.externalUrl}
                    introduction={`${item.source ? `<b>${item.source}</b> - ` : ''}${item.length ?? '-'}`}
                    labelExtraClass="flex-col items-start"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </FadeIn>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/press"
        className="mb:mb-16 mb-8"
      />

      <NewsletterBlock
        title={configuration?.newsletterTitle}
        introduction={configuration?.newsletterIntroduction}
      />
      <DonateBlock
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </>
  );
}
