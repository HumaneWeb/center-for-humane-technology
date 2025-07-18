'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="bg-primary-navy text-primary-cream fixed right-0 bottom-0 left-0 z-50 flex w-full flex-col items-center justify-between gap-4 p-4 shadow-lg md:flex-row"
      role="dialog"
      aria-live="polite"
      aria-atomic="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="flex-1 text-center md:text-left">
        <h2 id="cookie-consent-title" className="sr-only mb-1 text-lg font-semibold">
          Cookie Consent
        </h2>
        <p id="cookie-consent-description" className="text-[16px] leading-140">
          We use cookies to ensure that you can experience the website in the best possible way.{' '}
          <Link href="/privacy-policy" className="text-secondary-light-teal font-semibold">
            Click here
          </Link>{' '}
          to find out more about our cookies policy
        </p>
      </div>
      <div className="mt-4 flex w-full justify-center gap-2 md:mt-0 md:w-auto">
        <button
          onClick={handleReject}
          className="bg-primary-cream text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 group mb:w-auto mb:justify-start group group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[5px] px-4 py-3 text-[18px] leading-120 font-semibold transition-all duration-200 ease-in"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 group mb:w-auto mb:justify-start group group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[5px] px-4 py-3 text-[18px] leading-120 font-semibold transition-all duration-200 ease-in"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
