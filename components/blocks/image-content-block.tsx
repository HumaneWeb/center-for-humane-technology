import CustomImage, { CustomImageProps } from '../shared/custom-image';
import { cn, richHtmlBlockStackClass } from '@/lib/utils/css.utils';

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
            richHtmlBlockStackClass,
            'image-content-block__copy text-left font-sans text-base leading-140 text-primary-navy mb:text-xl',
            '[&>h1]:mb-0 [&>h1]:font-sans [&>h1]:text-[23px] [&>h1]:leading-120 [&>h1]:font-semibold [&>h1]:tracking-039 mb:[&>h1]:text-[29px] mb:[&>h1]:leading-110',
            '[&>h2]:mb-0 [&>h2]:font-sans [&>h2]:text-[20px] [&>h2]:leading-120 [&>h2]:font-semibold [&>h2]:tracking-039 mb:[&>h2]:text-[32px] mb:[&>h2]:leading-110',
            '[&>h3]:mb-0 [&>h3]:font-sans [&>h3]:text-[18px] [&>h3]:leading-130 [&>h3]:font-semibold mb:[&>h3]:text-[25px]',
            '[&_ul]:mx-0 [&_ul]:max-w-none [&_ul]:list-disc [&_ul]:pl-10 [&_ul]:text-left',
            '[&_ol]:mx-0 [&_ol]:max-w-none [&_ol]:list-decimal [&_ol]:pl-10 [&_ol]:text-left',
            '[&_li]:mb-3 [&_li]:text-left [&_li]:last:mb-0',
            '[&_li_ul]:mt-2 [&_li_ol]:mt-2',
            '[&_a]:font-semibold [&_a]:text-primary-teal [&_a]:underline [&_a]:hover:opacity-80',
            '[&>blockquote]:my-0 [&>blockquote]:border-l-4 [&>blockquote]:border-primary-blue [&>blockquote]:py-2 [&>blockquote]:pl-5 [&>blockquote]:italic',
            '[&>code]:rounded [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:text-sm',
            '[&>pre]:my-0 [&>pre]:overflow-x-auto [&>pre]:rounded [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:text-left',
            '[&>pre>code]:bg-transparent [&>pre>code]:p-0',
            '[&_strong]:font-semibold [&_em]:italic',
            imageOnRight ? 'order-first' : 'order-first mb:order-none',
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
