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

export const generateMetadata = generateMetadataFn({
  query: InThePressListQuery,
  buildQueryVariables: () => ({ skip: 0, first: 10 }),
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

const NEWS_PER_PAGE = 10;

export default async function InThePressPage({ searchParams }: PodcastListPageProps) {
  const params = await searchParams;
  const currentPage = Number.parseInt(params.page || '1', 10);
  const skip = (currentPage - 1) * NEWS_PER_PAGE;

  const { page, blogs, press, podcastsCount, configuration } = await executeQuery(
    InThePressListQuery,
    { variables: { skip, first: NEWS_PER_PAGE } },
  );
  const totalPages = Math.ceil(podcastsCount.count / NEWS_PER_PAGE);

  return (
    <>
      <BasicHero title={page?.title} />

      <section className="mb:pt-16 mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10">
          {blogs.length > 0 && (
            <div>
              <h4 className="text-primary-blue mb-[33px] font-sans text-[29px] leading-130 font-semibold">
                News
              </h4>
              <div className="flex flex-col gap-5">
                {blogs.map((blog) => (
                  <Cta
                    key={blog.id}
                    label={blog?.title}
                    helperLabel={blog?.estTime}
                    variant="underline-help"
                    link={{ externalUrl: blog?.externalUrl }}
                    labelExtraClass="flex-col items-start"
                  />
                ))}
              </div>
            </div>
          )}
          {press.length > 0 && (
            <div>
              <h4 className="text-primary-blue mb-[33px] font-sans text-[29px] leading-130 font-semibold">
                Press
              </h4>

              <div className="flex flex-col gap-5">
                {press.map((p) => (
                  <Cta
                    key={p.id}
                    label={p.title}
                    helperLabel={`${p?.source} - ${p?.length}`}
                    variant="underline-help"
                    link={{ externalUrl: p.externalUrl }}
                    labelExtraClass="flex-col items-start"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/in-the-press"
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
