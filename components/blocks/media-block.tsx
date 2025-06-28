// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CustomImage, { type CustomImageProps } from '../shared/custom-image';
import CustomLink, { type CustomLinkProps } from '../shared/custom-link';

type Props = {
  id: string;
  title: string;
  information: string;
  items: {
    id: string;
    title: string;
    image: CustomImageProps | null;
    link: CustomLinkProps | null;
  }[];
};

export default function MediaBlock({ title, items, information }: Props) {
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

          {information && (
            <div
              className="tracking-02 [&>p>a]:text-primary-teal [&>p>a]:hover:text-primary-blue mb:text-xl [&>p]:mb:mb-8 mb:text-center font-sans text-[18px] leading-120 [&>p]:mb-4 [&>p>a]:font-bold [&>p>a]:underline [&>p>a]:transition-all [&>p>a]:duration-200 [&>p>a]:ease-in"
              dangerouslySetInnerHTML={{ __html: information }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
