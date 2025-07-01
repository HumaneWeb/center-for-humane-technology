// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CustomImage, { type CustomImageProps } from '../shared/custom-image';
import CustomLink, { type CustomLinkProps } from '../shared/custom-link';
import type { CtaProps } from '../shared/cta';
import CtaList from '../shared/cta-list';

type Props = {
  id: string;
  title: string;
  ctas: CtaProps[];
  items: {
    id: string;
    title: string;
    image: CustomImageProps | null;
    link: CustomLinkProps | null;
  }[];
};

export default function MediaBlock({ title, items, ctas }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const renderItem = (item: any) => {
    const content = (
      <CustomImage
        {...item.image}
        extraClass="opacity-[.7] hover:opacity-100 transition-opacity duration-300"
      />
    );

    if (item.link) {
      return (
        <CustomLink key={item.id} content={item.link}>
          {content}
        </CustomLink>
      );
    }

    return <div key={item.id}>{content}</div>;
  };

  return (
    <section className="mb:my-24 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-primary-navy mb:text-center mb:text-3xl mb:leading-135 mb:mb-12 mb-10 font-sans text-[23px] leading-120 font-semibold">
            {title}
          </h2>

          <div className="mb:justify-center mb-16 hidden flex-wrap items-center gap-x-14 gap-y-8 md:flex">
            {items.map((item: any) => renderItem(item))}
          </div>

          <div className="mb-16 md:hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="logos-swiper"
            >
              {items.map((item: any) => (
                <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>
              ))}
            </Swiper>
          </div>

          {ctas && (
            <CtaList
              items={ctas}
              extraClassnames="flex-col items-center justify-center mb:gap-[33px]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
