import Footer from '@/components/layout/footer';

export default function DonateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
