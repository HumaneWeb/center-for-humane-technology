import CustomImage, { CustomImageProps } from '../shared/custom-image';
import { cn } from '@/lib/utils/css.utils';

export type ImageContentProps = {
  id?: string;
  content: string;
  image: CustomImageProps;
  imagePosition?: string | null;
  imageSize?: string | null;
};

export default function ImageContentBlock({ content, image, imagePosition, imageSize }: ImageContentProps) {
  const imageOnRight = imagePosition === 'img_right';
  const isSmall = imageSize === 'small';

  return (
    <div className="image-content-block mx-auto mt-10 mb-20 max-w-7xl items-end px-4 sm:px-6 lg:px-8 mb:mt-20 mb:mb-36">
      <div
        className={cn(
          'grid items-center gap-8 grid-cols-1 mb:gap-12',
          !isSmall && 'mb:grid-cols-2',
          isSmall && !imageOnRight && 'mb:grid-cols-[3fr_7fr]',
          isSmall && imageOnRight && 'mb:grid-cols-[7fr_3fr]',
        )}
      >
        <div
          className={cn(
            'min-w-0',
            imageOnRight ? 'order-last' : 'order-last mb:order-none',
          )}
        >
          <CustomImage
            {...image}
            extraClass={cn(
              'h-auto w-full max-w-full object-contain min-w-0',
              'mb:w-auto mb:max-w-none',
              image.extraClass,
            )}
          />
        </div>
        <div
          className={cn(
            'min-w-0 text-primary-navy font-sans text-base leading-140 mb:text-xl [&>p]:mb-4',
            imageOnRight ? 'order-first' : 'order-first mb:order-none',
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
