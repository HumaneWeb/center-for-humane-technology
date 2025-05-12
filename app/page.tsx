import { performRequest } from '@/lib/cms/datocms';
import { PAGE_CONTENT_QUERY } from '@/lib/cms/query';

export default async function Home() {
  const { homepage } = await performRequest(PAGE_CONTENT_QUERY);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello world</h1>
    </div>
  );
}
