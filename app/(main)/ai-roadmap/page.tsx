import DonateBlock from '@/components/blocks/donate-block';
import PathForwardLayout from '@/components/layout/pages/path-forward-layout';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { PathForwardQuery } from '@/lib/cms/query';
import { PathForwardCmsData } from '@/lib/utils/types';
import { draftMode } from 'next/headers';

export const generateMetadata = generateMetadataFn({
  query: PathForwardQuery,
  // @ts-expect-error – shape from query .
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function PathForwardPage() {
  const { isEnabled } = await draftMode();

  const { page, configuration } = await executeQuery(PathForwardQuery, {
    includeDrafts: isEnabled,
  });

  return (
    <>
      <PathForwardLayout data={page as PathForwardCmsData} />
      <DonateBlock
        title={configuration?.donateTitle ?? null} // @ts-ignore
        cta={configuration?.donateCta ?? null} // @ts-ignore
        image={configuration?.donateImage ?? null}
      />
    </>
  );
}
