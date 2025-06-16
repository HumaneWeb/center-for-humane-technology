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
      className={cn('group grid grid-cols-[1fr_1.5fr] gap-1', isVertical && 'flex flex-col gap-5')}
    >
      <div
        className={cn(
          'bg-primary-cream flex items-center justify-center px-8 pt-8 transition-all duration-200',
          !isVertical && 'group-hover:bg-primary-blue',
          isVertical && 'group-hover:bg-neutral-white',
        )}
      >
        <CustomImage {...image} />
      </div>
      <div
        className={cn(
          'bg-primary-cream p-8 transition-all duration-200',
          !isVertical && 'group-hover:bg-primary-blue',
        )}
      >
        <h2
          className={cn(
            'text-primary-navy group-hover:text-neutral-white font-sans text-4xl leading-130 font-semibold',
            isVertical && 'text-primary-teal group-hover:text-primary-blue text-2xl',
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            'text-primary-navy font-sans text-xl leading-140 font-medium',
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
