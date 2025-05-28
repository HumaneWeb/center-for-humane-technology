import type { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

import './globals.css';

export const metadata: Metadata = {
  title: 'Center for Humane Technology',
  description:
    "We're a nonprofit exposing the negative effects of persuasive technology and social media and empowering people to take action. Discover The Social Dilemma, our podcast, course, and more.",
  twitter: {
    site: '@HumaneTech_',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kvx4yfh.css" />
      </head>

      <body className={`antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
