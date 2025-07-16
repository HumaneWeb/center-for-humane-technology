import AiSocietyLayout from '@/components/layout/pages/ai-society-layout';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { AiSocietyQuery } from '@/lib/cms/query';

export const generateMetadata = generateMetadataFn({
  query: AiSocietyQuery,
  // @ts-expect-error
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function AiSocietyPage() {
  const { page, configuration } = await executeQuery(AiSocietyQuery);
  return <AiSocietyLayout page={page} configuration={configuration} />;
}
