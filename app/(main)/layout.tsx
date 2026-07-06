import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import NotificationBarServer from '@/components/shared/notification-bar-server';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NotificationBarServer />
      <Header />
      <main className="flex-1 pt-[var(--notification-bar-height,0px)]">{children}</main>
      <Footer />
    </>
  );
}
