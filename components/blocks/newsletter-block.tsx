'use client';

import type { CustomImageProps } from '../shared/custom-image';
import { cn } from '@/lib/utils/css.utils';
import CustomLink, { CustomLinkProps } from '../shared/custom-link';
import { FadeIn } from '../shared/fade-in';

type Props = {
  id: string;
  title: string;
  introduction: string;
  withFeaturedContent: boolean;
  featuredTitle: string;
  featuredImage: CustomImageProps;
  featuredLink: CustomLinkProps;
  variant?: 'default' | 'vertical';
};

export default function NewsletterBlock({
  title,
  introduction,
  withFeaturedContent,
  featuredTitle,
  featuredImage,
  featuredLink,
  variant = 'default',
}: Props) {
  const renderFeaturedBlock = () => (
    <section className="newsletter-grid-featured flex w-full flex-col md:flex-row">
      <div
        className="newsletter-grid-featured-item mb:justify-end mb:px-12 mb:pb-7 mb:pt-44 flex w-full items-end bg-cover bg-center bg-no-repeat px-7 py-4 pt-20 md:w-1/2"
        style={{ backgroundImage: `url(${featuredImage!.url})` }}
      >
        <FadeIn className="max-w-sm text-center md:max-w-[560px]">
          {/* @ts-expect-error */}
          <CustomLink content={featuredLink}>
            <h2 className="text-primary-cream mb:text-[29px] text-left font-sans text-[23px] leading-130 font-semibold">
              {featuredTitle}
            </h2>
          </CustomLink>
        </FadeIn>
      </div>

      <FadeIn className="newsletter-grid-featured-item bg-secondary-light-purple/20 mb:w-1/2 mb:py-14 flex w-full items-center justify-start px-7 py-8">
        <div className="w-full md:max-w-[560px]">
          <h2 className="text-primary-blue mb:text-[29px] mb:mb-3 mb-5 font-sans text-[23px] leading-130 font-semibold">
            {title}
          </h2>
          {introduction && (
            <div
              className="text-primary-navy mb:text-[16px] mb-5 font-sans text-[18px] leading-135"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          )}

          <SubstackNewsletterWidget />
        </div>
      </FadeIn>
    </section>
  );

  if (withFeaturedContent) {
    return renderFeaturedBlock();
  }

  return (
    <div
      className={cn(
        'bg-neutral-white',
        variant === 'vertical' && 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
      )}
    >
      <section className={cn('bg-secondary-light-purple/20 mb:py-12 py-8')}>
        <FadeIn>
          <div className={cn('px-4 sm:px-6 lg:px-8', variant === 'default' && 'mx-auto max-w-7xl')}>
            <div
              className={cn(
                'newsletter-grid mb:gap-20 grid grid-cols-1 items-center gap-5 lg:grid-cols-2',
                variant === 'vertical' && 'mb:gap-5 lg:grid-cols-1',
              )}
            >
              <div>
                <h2 className="text-primary-blue mb:text-3xl mb:mb-3 mb:leading-130 mb-5 font-sans text-[23px] leading-120 font-semibold">
                  {title}
                </h2>
                {introduction && (
                  <div
                    className="text-primary-navy mb:text-xl font-sans text-[18px] leading-140 font-normal"
                    dangerouslySetInnerHTML={{ __html: introduction }}
                  />
                )}
              </div>
              <div>
                <SubstackNewsletterWidget />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

export const SubstackNewsletterWidget = () => {
  return (
    <div className="mb:max-w-[500px]">
      <iframe
        src="https://centerforhumanetechnology.substack.com/embed?simple=true"
        width="100%"
        height="150"
        frameBorder="0"
        scrolling="no"
        title="Newsletter signup"
      />
      <style jsx>{`
        iframe {
          min-height: 150px;
        }
      `}</style>
    </div>
  );
};


