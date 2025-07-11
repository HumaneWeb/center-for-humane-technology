'use client';
import { cn } from '@/lib/utils/css.utils';
import type { CustomImageProps } from '../shared/custom-image';
import useIsMobile from '../hooks/is-mobile';
import CustomImage from '../shared/custom-image';

type Props = {
  preTitle: string;
  title: string;
  introduction: string;
  image: CustomImageProps;
  mobileImage?: CustomImageProps;
  variant: 'blue' | 'light-blue' | 'green' | 'purple';
};

export default function ComplexHero({
  title,
  preTitle,
  introduction,
  image,
  mobileImage,
  variant,
}: Props) {
  const isMobile = useIsMobile({ breakpoint: mobileImage ? 1260 : 992 });

  return (
    <section
      id="complex-hero"
      className={cn(
        variant === 'blue' && 'bg-complex-hero-blue',
        variant === 'light-blue' && 'bg-complex-hero-light-blue',
        variant === 'green' && 'bg-complex-hero-green',
        variant === 'purple' && 'bg-complex-hero-purple',
      )}
    >
      <div
        className={cn(
          'bg-contain bg-bottom-right bg-no-repeat',
          isMobile && mobileImage && 'complex-hero-grid',
        )}
        style={{
          backgroundImage: isMobile ? 'none' : `url(${image?.url})`,
        }}
      >
        <div className="complex-hero-grid-content mb:pb-25 mb:h-[620px] mb:pt-0 mx-auto flex max-w-7xl items-end px-4 pt-35 pb-10 sm:px-6 lg:px-8">
          <div className="max-w-[750px]">
            {preTitle && (
              <h2
                className={cn(
                  'mb:text-xl mb:leading-135 tracking-08 mb:tracking-[1px] mb:mb-3.5 mb-2 font-sans text-[16px] leading-120 font-semibold text-[#93C0FF] uppercase',
                  variant === 'green' && 'text-[#ACFFFC]',
                )}
              >
                {preTitle}
              </h2>
            )}
            <h1
              className={cn(
                'text-primary-cream mb:tracking-061 mb:text-6xl mb:mb-5 mb-2 font-sans text-[32px] leading-110 font-semibold tracking-[-0.32px]',
              )}
            >
              {title}
            </h1>
            {introduction && (
              <div
                className="text-neutral-white mb:text-2xl max-w-[600px] font-sans text-xl leading-140"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>
        </div>
        {isMobile && mobileImage && (
          <div className="complex-hero-grid-image">
            <CustomImage {...mobileImage} extraClass="objet-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
