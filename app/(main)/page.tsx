import BlockBuilder from '@/components/blocks/block-builder';
import HomepageHero from '@/components/layout/homepage-hero';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { HomepageQuery } from '@/lib/cms/query';
import { draftMode } from 'next/headers';

export const generateMetadata = generateMetadataFn({
  query: HomepageQuery,
  // @ts-expect-error
  pickSeoMetaTags: (data) => data.homepage?._seoMetaTags,
});

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const { homepage, configuration } = await executeQuery(HomepageQuery, {
    includeDrafts: isEnabled,
  });

  return (
    <div>
      <HomepageHero homepage={homepage} configuration={configuration} />
      {/* @ts-expect-error */}
      <BlockBuilder components={homepage?.blocks} />
    </div>
  );
}
