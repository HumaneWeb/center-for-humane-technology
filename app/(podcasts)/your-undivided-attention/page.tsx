// @ts-nocheck
import React from 'react';
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import PodcastListHero from '@/components/layout/podcast-list-hero';
import PodcastMinimalCard from '@/components/shared/podcast-minimal-card';
import { SearchInput } from '@/components/shared/search-input';
import { executeQuery } from '@/lib/cms/executeQuery';
import { PodcastListQuery } from '@/lib/cms/query';

interface PodcastListPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function PodcastListPage({ searchParams }: PodcastListPageProps) {
  const searchQuery = (await searchParams.search?.toLowerCase()) || '';
  const { page, podcasts, configuration } = await executeQuery(PodcastListQuery, {
    variables: { searchQuery },
  });

  const firstThree = podcasts.slice(0, 3);
  const remaining = podcasts.slice(3);

  return (
    <>
      {/* @ts-expect-error */}
      <PodcastListHero {...page} />

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <SearchInput
          value={searchParams.search || ''}
          placeholder="Search topic by keyword..."
          className="mb-16 max-w-[406px]"
        />

        {searchQuery && (
          <div className="mb-8">
            <p className="text-gray-600">
              {podcasts.length > 0
                ? `Found ${podcasts.length} podcast${podcasts.length !== 1 ? 's' : ''} for "${searchParams.search}"`
                : `No podcasts found for "${searchParams.search}"`}
            </p>
          </div>
        )}

        <div className="mb-16 flex max-w-[948px] flex-col gap-12">
          {firstThree.map((podcast) => (
            <PodcastMinimalCard {...podcast} key={podcast.id} />
          ))}
        </div>
      </section>

      <NewsletterBlock
        // @ts-expect-error
        title={configuration?.newsletterTitle}
        introduction={configuration?.newsletterIntroduction}
      />

      {remaining.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <div className="mb-36 flex max-w-[948px] flex-col gap-12">
            {remaining.map((podcast) => (
              <PodcastMinimalCard {...podcast} key={podcast.id} />
            ))}
          </div>
        </section>
      )}

      <DonateBlock
        // @ts-expect-error
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </>
  );
}
