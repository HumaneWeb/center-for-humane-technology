'use client';

import { useEffect, useState } from 'react';
import Cta from '../shared/cta';

export default function HighlightTextBlock() {
  const texts = [
    'moving the needle in the right direction',
    'creating positive change worldwide',
    'building a better digital future',
    'empowering communities everywhere',
    'transforming lives through technology',
    'making a meaningful impact',
  ];

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
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          <div>
            <h2 className="text-primary-cream font-sans text-5xl leading-110 font-semibold">
              Together, we are{' '}
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
            <p className="text-neutral-white mb-5 font-sans text-xl leading-140">
              An estimated <strong className="text-secondary-light-teal">100 million people</strong>{' '}
              watched The Social Dilemma. Among them,{' '}
              <strong className="text-secondary-light-teal">42 attorney generals</strong> that took
              action and sued Meta for their design practices.
            </p>
            <Cta label="More about our impact" href="/impact" />
          </div>
        </div>
      </div>
    </section>
  );
}
