// @ts-nocheck
import { cn } from '@/lib/utils/css.utils';
import CustomImage, { CustomImageProps } from './custom-image';
import CustomLink from './custom-link';

type Props = {
  id: string;
  title: string;
  episode?: string;
  introduction: string | null;
  image: CustomImageProps | null;
  slug: string;
  __typename: string;
  variant?: 'default' | 'small' | 'small-cols' | 'vertical';
  externalUrl?: string;
};

export default function PodcastMinimalCard({
  title,
  episode,
  introduction,
  image,
  variant = 'default',
  slug,
  __typename,
  externalUrl,
}: Props) {
  const cardContent = () => (
    <div
      className={cn(
        'podcast-grid group mb:flex-row mb:gap-5 flex flex-col',
        variant === 'small-cols' && 'mb:flex grid grid-cols-[128px_1fr] gap-4.5',
        variant === 'vertical' && 'mb:flex-col',
      )}
    >
      {image ? (
        <CustomImage
          {...image}
          alt={title}
          extraClass={cn(
            'mb:w-[300px] w-full mb:h-[300px] aspect-square object-cover',
            variant === 'small' && 'mb:w-[211px] mb:h-[210px] mb:mb-0 mb-2.5',
            variant === 'small-cols' && 'mb:w-[211px] mb:h-[210px] mb:mb-0 mb-2.5',
          )}
        />
      ) : (
        <div
          className={cn(
            'hidden',
            'mb:w-[300px] mb:h-[300px] aspect-square w-full bg-gray-200 object-cover',
            variant === 'small' && 'mb:w-[211px] mb:h-[210px] mb:mb-0 mb-2.5',
            variant === 'small-cols' && 'mb:w-[211px] mb:h-[210px] mb:mb-0 mb-2.5',
          )}
        />
      )}

      <div className={cn('pt-5', (variant === 'small' || variant === 'small-cols') && 'pt-0')}>
        {episode && (
          <h5
            className={cn(
              'text-primary-blue tracking-08 mb:leading-135 mb-2 font-sans text-[16px] leading-120 font-semibold uppercase',
              variant === 'small-cols' && 'mb:text-[16px] mb:mb-2 mb-0.5 text-[15px]',
            )}
          >
            {episode}
          </h5>
        )}
        {title && (
          <h3
            className={cn(
              'text-primary-teal group-hover:text-primary-blue mb:text-2xl mb:leading-135 mb-2 font-sans text-xl leading-120 font-semibold transition-all duration-200',
              variant === 'small-cols' && 'text-[18px]',
            )}
          >
            {title}
          </h3>
        )}
        {introduction && variant == 'default' && (
          <div
            className="text-primary-navy font-sans text-[16px] leading-140"
            dangerouslySetInnerHTML={{ __html: introduction }}
          />
        )}
      </div>
    </div>
  );

  if (externalUrl) {
    return (
      <a href={externalUrl} target="_blank">
        {cardContent()}
      </a>
    );
  }

  return <CustomLink content={{ content: { __typename, slug } }}>{cardContent()}</CustomLink>;
}
