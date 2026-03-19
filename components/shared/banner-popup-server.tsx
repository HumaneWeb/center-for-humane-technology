import { Suspense } from 'react';
import { executeQuery } from '@/lib/cms/executeQuery';
import { BannerQuery } from '@/lib/cms/query';
import BannerPopup from './banner-popup';

export default async function BannerPopupServer() {
  const { banner } = await executeQuery(BannerQuery);

  if (!banner?.enabled) return null;

  return (
    <Suspense fallback={null}>
      <BannerPopup banner={banner} />
    </Suspense>
  );
}
