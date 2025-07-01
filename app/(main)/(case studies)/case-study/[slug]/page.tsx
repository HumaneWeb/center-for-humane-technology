import ContentLayout from '@/components/layout/content-layout';
import KeyTemplateLayout from '@/components/layout/key-template-layout';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { CaseStudyPageQuery } from '@/lib/cms/query';
import type { PageSlug } from '@/lib/utils/types';

export const generateMetadata = generateMetadataFn({
  query: CaseStudyPageQuery,
  // @ts-expect-error
  buildQueryVariables: ({ params }) => ({ slug: params.slug }), // @ts-expect-error
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function CaseStudyPage({ params }: PageSlug) {
  const { slug } = await params;
  const { page, configuration } = await executeQuery(CaseStudyPageQuery, { variables: { slug } });

  if (page?.variant === 'key-template') {
    return <KeyTemplateLayout page={page} configuration={configuration} />;
  }

  return <ContentLayout page={page} configuration={configuration} withImage={false} />;
}
