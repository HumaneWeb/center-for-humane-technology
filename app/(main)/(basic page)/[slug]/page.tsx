import ContentLayout from '@/components/layout/content-layout';
import KeyTemplateLayout from '@/components/layout/key-template-layout';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { BasicPageQuery } from '@/lib/cms/query';
import type { PageSlug } from '@/lib/utils/types';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export const generateMetadata = generateMetadataFn({
  query: BasicPageQuery,
  // @ts-expect-error
  buildQueryVariables: ({ params }) => ({ slug: params.slug }), // @ts-expect-error
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function BasicPage({ params }: PageSlug) {
  const { isEnabled } = await draftMode();

  const { slug } = await params;
  const { page, configuration } = await executeQuery(BasicPageQuery, {
    variables: { slug },
    includeDrafts: isEnabled,
  });

  if (!page) {
    notFound();
  }

  if (page?.variant === 'key-template' || page?.variant === 'key-template-small') {
    return <KeyTemplateLayout page={page} configuration={configuration} variant={page?.variant} />;
  }

  return <ContentLayout page={page} configuration={configuration} />;
}
