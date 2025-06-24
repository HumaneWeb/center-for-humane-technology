import BlockBuilder from '@/components/blocks/block-builder';
import HomepageHero from '@/components/layout/homepage-hero';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { HomepageQuery } from '@/lib/cms/query';

export const generateMetadata = generateMetadataFn({
  query: HomepageQuery,
  // @ts-expect-error
  pickSeoMetaTags: (data) => data.homepage?._seoMetaTags,
});

export default async function HomePage() {
  const { homepage } = await executeQuery(HomepageQuery);

  return (
    <div>
      <HomepageHero homepage={homepage} />
      {/* @ts-expect-error */}
      <BlockBuilder components={homepage?.blocks} />
    </div>
  );
}
