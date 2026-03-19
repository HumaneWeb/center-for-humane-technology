'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils/css.utils';
import { type ResultOf } from '@/lib/cms/graphql';
import { type BannerQuery } from '@/lib/cms/query';

export type BannerData = NonNullable<ResultOf<typeof BannerQuery>['banner']>;

type Props = {
  banner: BannerData;
};

export const BANNER_DISMISSED_COOKIE = 'banner_dismissed';
const DISMISS_DAYS = 30;

export default function BannerPopup({ banner }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const debugBanner = searchParams.has('debug-banner');
    if (!debugBanner) {
      if (!banner.enabled) return;
      const cookie = document.cookie
        .split('; ')
        .find((c) => c.startsWith(`${BANNER_DISMISSED_COOKIE}=`));
      const dismissedVersion = cookie?.split('=')[1];
      if (dismissedVersion === banner._updatedAt) return;
    }

    const delay = banner.delay ?? 0;
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [banner._updatedAt, banner.delay, banner.enabled, searchParams]);

  const handleClose = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + DISMISS_DAYS);
    document.cookie = `${BANNER_DISMISSED_COOKIE}=${banner._updatedAt}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            key="banner-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            key="banner-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={banner.headline ? 'banner-popup-headline' : undefined}
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-primary-cream fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl"
          >
            <button
              onClick={handleClose}
              aria-label="Close banner"
              className="bg-neutral-white text-primary-navy hover:bg-primary-cream absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-sm transition-colors duration-200"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            {banner.photo?.url && (
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                <Image
                  src={banner.photo.url}
                  alt={banner.photo.alt ?? ''}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="p-8 pt-10">
              {banner.headline && (
                <h2
                  id="banner-popup-headline"
                  className="text-primary-navy mb-4 font-sans text-[23px] font-semibold leading-120 tracking-tight"
                >
                  {banner.headline}
                </h2>
              )}

              {banner.text && (
                <div
                  dangerouslySetInnerHTML={{ __html: banner.text }}
                  className={cn(
                    'text-primary-navy mb-6 font-sans text-base leading-140',
                    '[&>p]:mb-3 [&>p:last-child]:mb-0',
                    '[&_a]:font-semibold [&_a]:underline [&_a]:hover:opacity-80',
                    '[&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-2',
                    '[&>ol]:list-decimal [&>ol]:pl-5 [&>ol>li]:mb-2',
                  )}
                />
              )}

              {banner.linkUrl && (
                <Link
                  href={banner.linkUrl}
                  onClick={handleClose}
                  className="bg-primary-navy text-primary-cream hover:bg-primary-blue tracking-02 inline-flex cursor-pointer items-center gap-2.5 rounded-[5px] px-6 py-3 font-sans text-[18px] font-semibold leading-120 transition-all duration-200 ease-in"
                >
                  Learn More
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
