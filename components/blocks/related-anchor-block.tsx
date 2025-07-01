'use client';

import type { CustomImageProps } from '../shared/custom-image';
import CustomImage from '../shared/custom-image';
import GenericCard from '../shared/generic-card';
import type { ImageContentProps } from './image-content-block';

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
      <div className="mb:grid-cols-5 mb:mb-[50px] mb-5 grid gap-5">
        {items.map((item) => (
          <div
            key={`nav-${item.id}`}
            onClick={() => handleCardClick(item.id)}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <GenericCard {...item} variant="minimal-small" />
          </div>
        ))}
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
              <div className="mb:grid-cols-[auto_1fr] mb:gap-6 mb:mb-20 mb-5 grid gap-3">
                <CustomImage {...item.image} extraClass="mb:max-w-[516px]" />
                <div
                  className="text-primary-navy mb:text-xl mb:leading-140 font-sans text-[18px] leading-130 font-medium"
                  dangerouslySetInnerHTML={{ __html: item.introduction }}
                />
              </div>
              <div className="mb:grid-cols-3 mb:mb-12 mb-5 grid gap-6">
                {item.items.map((subItem) => (
                  <div key={subItem.id} className="mb:gap-[30px] flex flex-col gap-[10px]">
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
