'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils/css.utils';
import { getCmsRecordPath } from '@/lib/utils/cms.utils';
import { type ResultOf } from '@/lib/cms/graphql';
import { type NotificationBarQuery } from '@/lib/cms/query';

export type NotificationBarData = NonNullable<
  ResultOf<typeof NotificationBarQuery>['notificationBar']
>;

export const NOTIFICATION_BAR_DISMISSED_COOKIE = 'notification_bar_dismissed';
export const NOTIFICATION_BAR_HEIGHT_VAR = '--notification-bar-height';

/** Hours when CMS omits dismissedDuration */
const DEFAULT_DISMISSED_DURATION_HOURS = 24;

function normalizeSitePath(path: string): string {
  if (path === '/' || path === '') return '/';
  return path.replace(/\/+$/, '') || '/';
}

type Props = {
  notificationBar: NotificationBarData;
};

export default function NotificationBar({ notificationBar }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const barRef = useRef<HTMLDivElement>(null);

  const excludedPaths = useMemo(() => {
    return new Set(
      notificationBar.pageExclusions
        .map((item) => {
          const slug = 'slug' in item ? item.slug : null;
          const path = getCmsRecordPath(item.__typename, slug);
          return path ? normalizeSitePath(path) : null;
        })
        .filter((p): p is string => p != null),
    );
  }, [notificationBar.pageExclusions]);

  const syncBarHeight = useCallback((height: number) => {
    document.documentElement.style.setProperty(
      NOTIFICATION_BAR_HEIGHT_VAR,
      `${height}px`,
    );
  }, []);

  useEffect(() => {
    const path = normalizeSitePath(pathname ?? '');
    if (excludedPaths.has(path)) {
      setIsVisible(false);
      return;
    }

    const debugNotificationBar = searchParams.has('debug-notification-bar');
    if (!debugNotificationBar) {
      if (!notificationBar.enabled) return;
      const cookie = document.cookie
        .split('; ')
        .find((c) => c.startsWith(`${NOTIFICATION_BAR_DISMISSED_COOKIE}=`));
      const dismissedVersion = cookie?.split('=')[1];
      if (dismissedVersion === notificationBar._updatedAt) return;
    }

    const delay = notificationBar.delay ?? 0;
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [
    notificationBar._updatedAt,
    notificationBar.delay,
    notificationBar.enabled,
    excludedPaths,
    pathname,
    searchParams,
  ]);

  useEffect(() => {
    if (!isVisible) {
      syncBarHeight(0);
      return;
    }

    const element = barRef.current;
    if (!element) return;

    const updateHeight = () => {
      syncBarHeight(element.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => {
      observer.disconnect();
      syncBarHeight(0);
    };
  }, [isVisible, syncBarHeight]);

  const handleClose = () => {
    const hours =
      notificationBar.dismissedDuration ?? DEFAULT_DISMISSED_DURATION_HOURS;
    const expires = new Date();
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${NOTIFICATION_BAR_DISMISSED_COOKIE}=${notificationBar._updatedAt}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={barRef}
          key="notification-bar"
          role="region"
          aria-label="Site notification"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-primary-navy text-neutral-white fixed top-0 right-0 left-0 z-50 border-b border-white/10"
        >
          <div className="mx-auto flex max-w-7xl items-start justify-between gap-3 px-4 py-3 sm:items-center sm:gap-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              {notificationBar.text && (
                <div
                  dangerouslySetInnerHTML={{ __html: notificationBar.text }}
                  className={cn(
                    'text-neutral-white min-w-0 flex-1 font-sans text-[15px] leading-140 sm:text-base',
                    '[&>p]:mb-0 [&>p:last-child]:mb-0',
                    '[&_a]:text-secondary-light-teal [&_a]:font-semibold [&_a]:underline [&_a]:hover:opacity-80',
                    '[&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1',
                    '[&>ol]:list-decimal [&>ol]:pl-5 [&>ol>li]:mb-1',
                  )}
                />
              )}

              {notificationBar.buttonUrl && notificationBar.buttonText && (
                <Link
                  href={notificationBar.buttonUrl}
                  className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[5px] px-4 py-2.5 font-sans text-[15px] leading-120 font-semibold transition-all duration-200 ease-in sm:px-5 sm:py-3 sm:text-[16px]"
                >
                  {notificationBar.buttonText}
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Dismiss notification"
              className="text-neutral-white hover:bg-neutral-white/10 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
