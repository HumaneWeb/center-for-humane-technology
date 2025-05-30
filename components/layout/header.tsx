import { executeQuery } from '@/lib/cms/executeQuery';
import { NavbarQuery } from '@/lib/cms/query';
import Navbar from './navbar';

export default async function Header() {
  const { navbar } = await executeQuery(NavbarQuery);
  // @ts-expect-error
  return <Navbar items={navbar} />;
}
