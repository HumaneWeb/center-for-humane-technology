'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <>
      <section className="pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container m-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="text-center">
                <h3 className="mb-4 font-sans text-3xl font-bold text-black sm:text-4xl">
                  An error has occurred
                </h3>
                <p className="text-body-color mb-10 font-sans text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed">
                  Sorry, something didn’t go as planned. Please refresh or come back later.
                </p>

                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={reset}
                    className="text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 group border-primary-navy inline-block cursor-pointer rounded-[5px] border-1 bg-transparent px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in"
                  >
                    Reload page
                  </button>

                  <Link
                    href="/"
                    className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-block cursor-pointer rounded-md px-5 py-4 text-xl leading-120 font-semibold transition-colors"
                  >
                    Back to Homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
