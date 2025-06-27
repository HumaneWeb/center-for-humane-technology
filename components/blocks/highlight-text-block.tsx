'use client';

import { useEffect, useState } from 'react';
import Cta from '../shared/cta';

type Props = {
  id: string;
  title: string;
  introduction: string;
  dynamicTexts: string;
  cta: any;
};

export default function HighlightTextBlock({ title, introduction, dynamicTexts, cta }: Props) {
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
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <section className="bg-custom-gradient mb:min-h-[320px] mb:py-20 my-3 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb:gap-20 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          <div>
            <h2 className="text-primary-cream tracking-049 mb:text-5xl mb:leading-110 font-sans text-[29px] leading-120 font-semibold">
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
                className="text-neutral-white [&_strong]:text-secondary-light-teal mb:text-xl mb-5 font-sans text-[18px] leading-140 [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
            {cta && <Cta {...cta} />}
          </div>
        </div>
      </div>
    </section>
  );
}
