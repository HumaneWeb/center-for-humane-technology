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
    <div className="mx-auto mt-20 mb-36 max-w-7xl items-end px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          'grid items-center gap-12',
          !isSmall && 'grid-cols-2',
          isSmall && !imageOnRight && 'grid-cols-[3fr_7fr]',
          isSmall && imageOnRight && 'grid-cols-[7fr_3fr]',
        )}
      >
        <div className={cn(imageOnRight && 'order-last')}>
          <CustomImage {...image} />
        </div>
        <div
          className="text-primary-navy font-sans text-xl leading-140 [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
