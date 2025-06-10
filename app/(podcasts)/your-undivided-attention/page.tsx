import React from 'react';
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import PodcastListHero from '@/components/layout/podcast-list-hero';
import PodcastMinimalCard from '@/components/shared/podcast-minimal-card';
import { SearchInput } from '@/components/shared/search-input';
import { executeQuery } from '@/lib/cms/executeQuery';
import { PodcastListQuery } from '@/lib/cms/query';

export default async function PodcastListPage() {
  const { page, podcasts, configuration } = await executeQuery(PodcastListQuery);

  const firstThree = podcasts.slice(0, 3);
  const remaining = podcasts.slice(3);

  return (
    <>
      {/* @ts-expect-error */}
      <PodcastListHero {...page} />

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <SearchInput
          value=""
          placeholder="Search topic by keyword..."
          className="mb-16 max-w-[406px]"
        />

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

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-36 flex max-w-[948px] flex-col gap-12">
          {remaining.map((podcast) => (
            <PodcastMinimalCard {...podcast} key={podcast.id} />
          ))}
        </div>
      </section>

      <DonateBlock
        // @ts-expect-error
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </>
  );
}
