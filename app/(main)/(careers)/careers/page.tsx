// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import { PaginationControls } from '@/components/shared/pagination-controls';
import { executeQuery } from '@/lib/cms/executeQuery';
import { CareerListQuery } from '@/lib/cms/query';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import type { PodcastListPageProps } from '@/lib/utils/types';
import BasicHero from '@/components/layout/basic-hero';
import CareerCard from '@/components/shared/career-card';

export const generateMetadata = generateMetadataFn({
  query: CareerListQuery,
  buildQueryVariables: () => ({ skip: 0, first: 10 }),
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

const CAREERS_PER_PAGE = 10;

export default async function CareersPage({ searchParams }: PodcastListPageProps) {
  const params = await searchParams;
  const currentPage = Number.parseInt(params.page || '1', 10);
  const skip = (currentPage - 1) * CAREERS_PER_PAGE;

  const { page, careers, careersCount, configuration } = await executeQuery(CareerListQuery, {
    variables: { skip, first: CAREERS_PER_PAGE },
  });
  const totalPages = Math.ceil(careersCount.count / CAREERS_PER_PAGE);

  return (
    <>
      <BasicHero title={page?.title} />

      <section className="mb:pt-16 mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <div className="mb:grid-cols-2 grid gap-10">
          {careers.length > 0 && (
            <div className="flex flex-col gap-10">
              {careers.map((career) => (
                <CareerCard key={career.id} {...career} />
              ))}
            </div>
          )}
        </div>
      </section>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/careers"
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
