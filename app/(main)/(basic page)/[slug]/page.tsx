// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import ComplexHero from '@/components/layout/complex-hero';
import CustomStructuredText from '@/components/shared/custom-structured-text';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { BasicPageQuery } from '@/lib/cms/query';
import { cn } from '@/lib/utils/css.utils';
import type { PageSlug } from '@/lib/utils/types';

export const generateMetadata = generateMetadataFn({
  query: BasicPageQuery,
  buildQueryVariables: ({ params }) => ({ slug: params.slug }),
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function BasicPage({ params }: PageSlug) {
  const { slug } = await params;
  const { page, configuration } = await executeQuery(BasicPageQuery, { variables: { slug } });

  return (
    <div>
      <ComplexHero
        title={page?.title}
        preTitle={page?.preTitle}
        introduction={page?.introduction}
        image={page?.image}
        variant={page?.backgroundColor}
      />
      <div
        className={cn(
          'pt-20',
          page?.contentBackgroundColor === 'purple-gradient' && 'bg-basic-page',
          page?.contentBackgroundColor === 'white' && 'bg-white-page',
        )}
      >
        <CustomStructuredText data={page?.content} />
        <DonateBlock
          title={configuration?.donateTitle}
          image={configuration?.donateImage}
          cta={configuration?.donateCta}
        />
      </div>
    </div>
  );
}
