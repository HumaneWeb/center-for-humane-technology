import Footer from '@/components/layout/footer';
import Script from 'next/script';

export default function DonateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
      <Script src="https://js.stripe.com/v3" />
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
    </>
  );
}
