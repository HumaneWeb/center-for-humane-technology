import BlockBuilder from '@/components/blocks/block-builder';
import { executeQuery } from '@/lib/cms/executeQuery';
import { BasicPageQuery } from '@/lib/cms/query';

export default async function BasicPage() {
  const { page } = await executeQuery(BasicPageQuery);

  return (
    <div>
      {/* @ts-expect-error */}
      <BlockBuilder components={page?.blocks} />
    </div>
  );
}
