import ContentLayout from '@/components/layout/content-layout';
import KeyTemplateLayout from '@/components/layout/key-template-layout';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { CareerPageQuery } from '@/lib/cms/query';
import type { PageSlug } from '@/lib/utils/types';
import { notFound } from 'next/navigation';

export const generateMetadata = generateMetadataFn({
  query: CareerPageQuery,
  // @ts-expect-error
  buildQueryVariables: ({ params }) => ({ slug: params.slug }), // @ts-expect-error
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function CareersPage({ params }: PageSlug) {
  const { slug } = await params;
  const { page, configuration } = await executeQuery(CareerPageQuery, { variables: { slug } });

  if (!page) {
    notFound();
  }

  return (
    <ContentLayout
      page={{
        ...page,
        backCta: {
          label: 'Back to Careers',
          link: {
            content: {
              slug: 'careers',
              __typename: 'CareersListRecord',
            },
          },
        },
      }}
      configuration={configuration}
      withImage={false}
      special
    />
  );
}
