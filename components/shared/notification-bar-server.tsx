import { Suspense } from 'react';
import { executeQuery } from '@/lib/cms/executeQuery';
import { NotificationBarQuery } from '@/lib/cms/query';
import NotificationBar from './notification-bar';

export default async function NotificationBarServer() {
  const { notificationBar } = await executeQuery(NotificationBarQuery);

  if (!notificationBar) return null;

  return (
    <Suspense fallback={null}>
      <NotificationBar notificationBar={notificationBar} />
    </Suspense>
  );
}
