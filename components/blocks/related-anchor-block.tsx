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
      <div className="mb-14 grid grid-cols-5 gap-5">
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
            className="text-primary-navy mb-32 max-w-[948px] font-sans text-xl leading-140 font-medium"
            dangerouslySetInnerHTML={{ __html: information }}
          />
        )}
        <div className="flex flex-col gap-28">
          {items.map((item) => (
            <div key={item.id} id={`content-${item.id}`}>
              <h3 className="text-primary-blue mb-6 font-sans text-[29px] leading-130 font-semibold">
                {item.title}
              </h3>
              <div className="mb-20 grid grid-cols-[auto_1fr] gap-6">
                <CustomImage {...item.image} />
                <div
                  className="text-primary-navy font-sans text-xl leading-140 font-medium"
                  dangerouslySetInnerHTML={{ __html: item.introduction }}
                />
              </div>
              <div className="mb-12 grid grid-cols-3 gap-6">
                {item.items.map((subItem) => (
                  <div key={subItem.id} className="flex flex-col gap-[30px]">
                    <CustomImage {...subItem.image} extraClass="w-[190px] h-[190px]" />
                    <div
                      className="font-sans text-[16px] leading-140 font-medium"
                      dangerouslySetInnerHTML={{ __html: subItem.content }}
                    />
                  </div>
                ))}
              </div>
              <div
                className="text-primary-navy max-w-[948px] font-sans text-xl leading-140 font-medium"
                dangerouslySetInnerHTML={{ __html: item.information }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
