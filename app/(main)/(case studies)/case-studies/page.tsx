// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import { PaginationControls } from '@/components/shared/pagination-controls';
import { executeQuery } from '@/lib/cms/executeQuery';
import { CaseStudiesListQuery } from '@/lib/cms/query';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import type { PodcastListPageProps } from '@/lib/utils/types';
import GenericCard from '@/components/shared/generic-card';
import BasicHero from '@/components/layout/basic-hero';
import { FadeIn } from '@/components/shared/fade-in';

export const generateMetadata = generateMetadataFn({
  query: CaseStudiesListQuery,
  buildQueryVariables: ({ params }) => ({
    searchQuery: '',
    skip: 0,
    first: 10,
  }),
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

const CASE_STUDIES_PER_PAGE = 12;

export default async function CaseStudiesListPage({ searchParams }: PodcastListPageProps) {
  const params = await searchParams;
  const searchQuery = params.search?.toLowerCase() || '';
  const currentPage = Number.parseInt(params.page || '1', 10);
  const skip = (currentPage - 1) * CASE_STUDIES_PER_PAGE;

  const { page, studies, podcastsCount, configuration } = await executeQuery(CaseStudiesListQuery, {
    variables: {
      searchQuery,
      skip,
      first: CASE_STUDIES_PER_PAGE,
    },
  });

  const totalPages = Math.ceil(podcastsCount.count / CASE_STUDIES_PER_PAGE);

  return (
    <>
      <BasicHero title={page.title} />

      <FadeIn className="mb:pt-16 mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {studies.length > 0 && (
          <div className="mb:grid-cols-2 mb:gap-28 mb:mb-50 mb-15 grid gap-10">
            {studies.map((study) => (
              <GenericCard
                key={study.id}
                title={study.title}
                introduction={study.introduction}
                image={study.image}
                cta={[{ link: { content: study } }]}
                variant="default"
              />
            ))}
          </div>
        )}
      </FadeIn>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
        basePath="/case-studies"
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
