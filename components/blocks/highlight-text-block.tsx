'use client';

import { useEffect, useState } from 'react';
import Cta from '../shared/cta';
import { FragmentOf, readFragment } from '@/lib/cms/graphql';
import { HighlightTextBlockFragment } from '@/lib/cms/query';

type Props = FragmentOf<typeof HighlightTextBlockFragment>;

export default function HighlightTextBlock(data: Props) {
  const { title, introduction, dynamicTexts, cta } = readFragment(HighlightTextBlockFragment, data);

  const texts = dynamicTexts.split(',');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 800);
    }, 6000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <section className="bg-custom-gradient my-5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-15 lg:grid-cols-2">
          <div>
            <h2 className="text-primary-cream tracking-049 font-sans text-5xl leading-110 font-semibold">
              {title}{' '}
              <span
                className={`text-secondary-light-teal block transition-opacity duration-800 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {texts[currentIndex]}
              </span>
            </h2>
          </div>
          <div>
            {introduction && (
              <div
                className="text-neutral-white [&_strong]:text-secondary-light-teal mb-5 font-sans text-xl leading-140 [&>p]:mb-4"
                dangerouslySetInnerHTML={{
                  __html: introduction,
                }}
              />
            )}
            {/* @ts-expect-error */}
            {cta && <Cta {...cta} />}
          </div>
        </div>
      </div>
    </section>
  );
}
