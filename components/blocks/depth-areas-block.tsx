import React from 'react';
import DepthAreaCard from '../shared/depth-area-card';
import type { CustomImageProps } from '../shared/custom-image';

type Props = {
  id: string;
  title: string;
  introduction: string;
  items: {
    id: string;
    title: string;
    introduction: string;
    image: CustomImageProps;
    link: any;
  }[];
};

export default function DepthAreasBlock({ title, introduction, items }: Props) {
  return (
    <section className="mb:mb-24 mb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb:grid-cols-[1fr_2fr] mb:gap-15 grid grid-cols-1 items-start gap-5">
          <div>
            <h2 className="text-primary-navy tracking-049 mb:text-5xl mb:leading-110 mb:mb-1.5 mb-5 font-sans text-[29px] leading-120 font-semibold">
              {title}
            </h2>
            {introduction && (
              <div
                className="text-primary-navy mb:text-xl font-sans text-[18px] leading-140 [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>

          <div className="mb:gap-11 flex flex-col gap-3">
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <DepthAreaCard key={item.id} {...item} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
