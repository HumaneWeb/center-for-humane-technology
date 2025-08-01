import type { Metadata } from 'next';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import CookieConsent from '@/components/shared/cookie-consent';

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
        <link
          rel="preload"
          href={process.env.NEXT_PUBLIC_VIDEO_1}
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={process.env.NEXT_PUBLIC_VIDEO_2}
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={process.env.NEXT_PUBLIC_VIDEO_3}
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={process.env.NEXT_PUBLIC_VIDEO_MOBILE_1}
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={process.env.NEXT_PUBLIC_VIDEO_MOBILE_2}
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={process.env.NEXT_PUBLIC_VIDEO_MOBILE_3}
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={process.env.NEXT_PUBLIC_VIDEO_MOBILE_4}
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />

        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/kvx4yfh.css" />
        <link rel="apple-touch-icon" href="/apple-icon.png" type="image/png" sizes="96x96" />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-icon.png"
          type="image/png"
          sizes="96x96"
        />
        <GoogleTagManager gtmId="GTM-PCWTN2N" />
      </head>

      <body className={`flex min-h-screen flex-col antialiased`}>
        {children}
        <CookieConsent />
        <Script src="https://js.supascribe.com/v1/loader/0PyjPA3c4Cew9C80vN0BMFKcpWn1.js" />
      </body>
    </html>
  );
}
