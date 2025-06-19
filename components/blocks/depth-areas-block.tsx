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
    <section className="mb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_2fr] items-start gap-15">
          <div>
            <h2 className="text-primary-navy tracking-049 mb-1.5 font-sans text-5xl leading-130 font-semibold">
              {title}
            </h2>
            {introduction && (
              <div
                className="text-primary-navy font-sans text-xl leading-140 [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>

          <div className="flex flex-col gap-11">
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
