// @ts-nocheck
import { cn } from '@/lib/utils/css.utils';
import CustomImage, { CustomImageProps } from './custom-image';
import CustomLink, { CustomLinkProps } from './custom-link';

type Props = {
  title: string;
  introduction: string;
  image: CustomImageProps;
  link: CustomLinkProps;
  variant?: 'default' | 'vertical';
};

export default function DepthAreaCard({
  title,
  introduction,
  image,
  link,
  variant = 'default',
}: Props) {
  const isVertical = variant === 'vertical';

  const mainContent = () => (
    <article
      className={cn(
        'group mb:grid-cols-[1fr_1.5fr] grid gap-1',
        isVertical && 'flex flex-col gap-10',
      )}
    >
      <div
        className={cn(
          'bg-primary-cream flex items-center justify-center px-6 transition-all duration-200',
          !isVertical && 'group-hover:bg-primary-blue',
          isVertical && 'group-hover:bg-transparent',
        )}
      >
        <CustomImage {...image} />
      </div>
      <div
        className={cn(
          'bg-primary-cream mb:p-8 p-0 transition-all duration-200',
          !isVertical && 'group-hover:bg-primary-blue',
          isVertical && 'mb:pt-0',
        )}
      >
        <h2
          className={cn(
            'text-primary-navy group-hover:text-neutral-white mb:text-4xl mb:leading-130 mb:mb-0 mb-2 font-sans text-[26px] leading-120 font-semibold',
            isVertical && 'text-primary-teal group-hover:text-primary-blue mb:text-2xl',
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            'text-primary-navy mb:text-xl font-sans text-[16px] leading-140 font-normal',
            !isVertical && 'group-hover:text-neutral-white',
          )}
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      </div>
    </article>
  );

  if (link) {
    return (
      <CustomLink content={link} extraClass="group">
        {mainContent()}
      </CustomLink>
    );
  }

  return mainContent();
}
