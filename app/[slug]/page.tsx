import { performRequest } from '@/lib/cms/datocms';
import { BASIC_PAGE_CONTENT_QUERY } from '@/lib/cms/query';

export default async function BasicPage() {
  const { basicPage } = await performRequest(BASIC_PAGE_CONTENT_QUERY);

  return <h1>Basic page title: {basicPage.title}</h1>;
}
