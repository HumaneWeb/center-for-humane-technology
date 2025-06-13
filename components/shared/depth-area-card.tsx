import { cn } from '@/lib/utils/css.utils';
import CustomImage, { CustomImageProps } from './custom-image';
import CustomLink from './custom-link';

type Props = {
  title: string;
  introduction: string;
  image: CustomImageProps;
  link: any; // TODO
  variant: 'default' | 'vertical';
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
      className={cn('grid grid-cols-[1fr_1.5fr] gap-1', isVertical && 'flex flex-col gap-5')}
    >
      <div className="bg-primary-cream px-8 pt-8">
        <CustomImage {...image} />
      </div>
      <div className="bg-primary-cream p-8">
        <h2
          className={cn(
            'text-primary-navy font-sans text-4xl leading-130 font-semibold',
            isVertical && 'text-primary-teal text-2xl',
          )}
        >
          {title}
        </h2>
        <div
          className="text-primary-navy font-sans text-xl leading-140 font-medium"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      </div>
    </article>
  );

  if (link) {
    return <CustomLink content={link}>{mainContent()}</CustomLink>;
  }

  return mainContent();
}
