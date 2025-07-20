// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import PodcastDetail from '@/components/layout/podcast-detail';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { PodcastDetailQuery } from '@/lib/cms/query';
import type { PageSlug } from '@/lib/utils/types';
import { notFound } from 'next/navigation';

export const generateMetadata = generateMetadataFn({
  query: PodcastDetailQuery,
  buildQueryVariables: ({ params }) => ({ slug: params.slug }),
  pickSeoMetaTags: (data) => data.podcast?._seoMetaTags,
});

export default async function PodcastDetailPage({ params }: PageSlug) {
  const { slug } = await params;

  const { podcast, podcastList, configuration } = await executeQuery(PodcastDetailQuery, {
    variables: { slug },
  });

  if (!podcast) {
    notFound();
  }

  return (
    <section>
      <PodcastDetail podcast={podcast} podcastList={podcastList} configuration={configuration} />

      <DonateBlock
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </section>
  );
}
