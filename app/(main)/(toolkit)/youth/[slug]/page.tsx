import ContentLayout from '@/components/layout/content-layout';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { ToolkitPageQuery } from '@/lib/cms/query';
import type { PageSlug } from '@/lib/utils/types';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export const generateMetadata = generateMetadataFn({
  query: ToolkitPageQuery,
  // @ts-expect-error
  buildQueryVariables: ({ params }) => ({ slug: params.slug }), // @ts-expect-error
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function BasicPage({ params }: PageSlug) {
  const { isEnabled } = await draftMode();
  const { slug } = await params;

  const { page, configuration } = await executeQuery(ToolkitPageQuery, {
    variables: { slug },
    includeDrafts: isEnabled,
  });

  if (!page) {
    notFound();
  }

  return <ContentLayout page={page} configuration={configuration} />;
}
