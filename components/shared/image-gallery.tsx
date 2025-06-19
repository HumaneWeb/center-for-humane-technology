'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import type { CustomImageProps } from './custom-image';

interface ImageGalleryProps {
  images: {
    id: string;
    preTitle: string;
    title: string;
    image: CustomImageProps;
  }[];
  autoPlayInterval?: number;
}

export default function ImageGallery({ images, autoPlayInterval = 5000 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), autoPlayInterval);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(goToNext, autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, autoPlayInterval]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const dragThreshold = 50;
    if (info.offset.x > dragThreshold) {
      goToPrevious();
    } else if (info.offset.x < -dragThreshold) {
      goToNext();
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="relative mb-4 aspect-square overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className="relative h-full">
              <img
                src={images[currentIndex].image.image.url}
                alt={images[currentIndex].image.alt}
                className="h-full w-full object-cover"
                draggable="false"
                loading="eager"
              />
              <div className="text-primary-cream absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="font-sans text-sm leading-140 font-semibold uppercase">
                  {images[currentIndex].preTitle}
                </div>
                <h2 className="font-sans text-xl leading-140 font-semibold">
                  {images[currentIndex].title}
                </h2>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/10 to-transparent opacity-0 md:opacity-0" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent opacity-0 md:opacity-0" />
      </div>

      <div className="mt-4 flex w-full items-center justify-between gap-7">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-[15px] cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary-teal w-12 flex-[2]'
                : 'bg-primary-blue hover:bg-primary-navy w-8 flex-1'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
