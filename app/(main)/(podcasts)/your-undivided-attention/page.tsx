// @ts-nocheck
import React from 'react';
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import PodcastListHero from '@/components/layout/podcast-list-hero';
import PodcastMinimalCard from '@/components/shared/podcast-minimal-card';
import { SearchInput } from '@/components/shared/search-input';
import { executeQuery } from '@/lib/cms/executeQuery';
import { PodcastListQuery } from '@/lib/cms/query';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import type { PodcastListPageProps } from '@/lib/utils/types';

export const generateMetadata = generateMetadataFn({
  query: PodcastListQuery,
  buildQueryVariables: ({ params }) => ({ searchQuery: '' }),
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function PodcastListPage({ searchParams }: PodcastListPageProps) {
  const searchQuery = (await searchParams.search?.toLowerCase()) || '';
  const { page, podcasts, configuration } = await executeQuery(PodcastListQuery, {
    variables: { searchQuery },
  });

  const firstThree = podcasts.slice(0, 3);
  const remaining = podcasts.slice(3);

  return (
    <>
      <PodcastListHero {...page} />

      <section className="mb:pt-16 mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <SearchInput
          value={searchParams.search || ''}
          placeholder="Search topic by keyword..."
          className="mb:mb-16 mb-8 max-w-[406px]"
        />

        {searchQuery && (
          <div className="mb:mb-8 mb-4">
            <p className="mb:text-xl font-sans text-[16px] leading-140 font-normal">
              {podcasts.length > 0 ? (
                <>
                  Found {podcasts.length} result{podcasts.length !== 1 ? 's' : ''} for:{' '}
                  <strong>{searchParams.search}</strong>
                </>
              ) : (
                <>
                  No results found for "<strong>{searchParams.search}</strong>"
                </>
              )}
            </p>
          </div>
        )}

        <div className="mb:mb-16 mb-8 flex max-w-[948px] flex-col gap-12">
          {firstThree.map((podcast) => (
            <PodcastMinimalCard {...podcast} key={podcast.id} />
          ))}
        </div>
      </section>

      <NewsletterBlock
        title={configuration?.newsletterTitle}
        introduction={configuration?.newsletterIntroduction}
      />

      {remaining.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <div className="mb:mb-36 mb-20 flex max-w-[948px] flex-col gap-12">
            {remaining.map((podcast) => (
              <PodcastMinimalCard {...podcast} key={podcast.id} />
            ))}
          </div>
        </section>
      )}

      <DonateBlock
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </>
  );
}
