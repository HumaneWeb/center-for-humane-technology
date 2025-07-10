'use client';

import { useRef } from 'react';
import type { CustomImageProps } from '../shared/custom-image';
import CustomImage from '../shared/custom-image';
import GenericCard from '../shared/generic-card';
import type { ImageContentProps } from './image-content-block';
import { cn } from '@/lib/utils/css.utils';
import { ArrowsHandler } from './generic-cards-grid';

type Props = {
  items: {
    id: string;
    title: string;
    introduction: string;
    image: CustomImageProps;
    items: ImageContentProps[];
    information: string;
  }[];
  information?: string;
};

export default function RelatedAnchorBlock({ items, information }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector('.generic-card-ui') as HTMLElement;
      const gap = 24;
      const cardWidth = (card?.offsetWidth ?? 320) + gap;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector('.generic-card-ui') as HTMLElement;
      const gap = 24;
      const cardWidth = (card?.offsetWidth ?? 320) + gap;
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (itemId: string) => {
    const element = document.getElementById(`content-${itemId}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div>
      <div
        ref={scrollContainerRef}
        className="mb:mb-[50px] scrollbar-hide mb:overflow-x-visible mb-0 grid gap-5 overflow-x-auto"
      >
        <div
          className={cn(
            'flex snap-x snap-mandatory gap-6 overflow-x-visible overflow-y-visible pb-8',
          )}
        >
          {items.map((item) => (
            <div
              key={`nav-${item.id}`}
              onClick={() => handleCardClick(item.id)}
              className="mb:hover:scale-105 flex-1 cursor-pointer transition-transform"
            >
              <GenericCard
                {...item}
                variant="minimal-small"
                wrapperExtraClassnames="h-full"
                extraClassnames="generic-card-ui w-[calc(100dvw-48px)] sm:w-[55dvw] mb:w-auto!"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb:hidden mb:mb-0 mb-10 block">
        <ArrowsHandler scrollLeft={scrollLeft} scrollRight={scrollRight} />
      </div>

      <div className="max-w-[948px]">
        {information && (
          <div
            className="text-primary-navy mb:text-xl mb:mb-[110px] mb-5 max-w-[948px] font-sans text-[18px] leading-140 font-normal"
            dangerouslySetInnerHTML={{ __html: information }}
          />
        )}
        <div className="mb:gap-[75px] flex flex-col gap-10">
          {items.map((item) => (
            <div key={item.id} id={`content-${item.id}`}>
              <h3 className="text-primary-navy mb:text-[29px] mb:leading-130 mb:mb-6 mb-5 font-sans text-[23px] leading-120 font-semibold">
                {item.title}
              </h3>
              <div className="anchor-parent-grid mb:grid-cols-[auto_1fr] mb:gap-6 mb:mb-20 mb-5 grid gap-3">
                <CustomImage {...item.image} extraClass="mb:max-w-[516px]" />
                <div
                  className="text-primary-navy mb:text-xl mb:leading-140 font-sans text-[18px] leading-130 font-medium"
                  dangerouslySetInnerHTML={{ __html: item.introduction }}
                />
              </div>
              <div className="mb:grid-cols-3 mb:mb-12 mb-5 grid gap-6">
                {item.items.map((subItem) => (
                  <div
                    key={subItem.id}
                    className="anchor-child-grid mb:gap-[30px] flex flex-col gap-[10px]"
                  >
                    <CustomImage {...subItem.image} extraClass="w-[190px] h-[190px]" />
                    <div
                      className="mb:leading-140 font-sans text-[16px] leading-130 font-medium"
                      dangerouslySetInnerHTML={{ __html: subItem.content }}
                    />
                  </div>
                ))}
              </div>
              <div
                className="text-primary-navy mb:text-xl mb:leading-140 max-w-[948px] font-sans text-[18px] leading-130 font-normal"
                dangerouslySetInnerHTML={{ __html: item.information }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
