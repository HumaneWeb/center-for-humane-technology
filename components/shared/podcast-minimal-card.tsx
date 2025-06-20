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
  variant?: 'default' | 'small';
};

export default function PodcastMinimalCard({
  title,
  episode,
  introduction,
  image,
  variant = 'default',
  slug,
  __typename,
}: Props) {
  return (
    <CustomLink content={{ content: { __typename, slug } }}>
      <div className="group flex gap-5">
        {image && (
          <CustomImage
            {...image}
            extraClass={cn('w-[300px] aspect-square', variant === 'small' && 'w-[211px] h-[210px]')}
          />
        )}

        <div className={cn('pt-5', variant === 'small' && 'pt-0')}>
          {episode && (
            <h5 className="text-primary-blue tracking-075 mb-2 font-sans text-[15px] leading-135 font-semibold uppercase">
              {episode}
            </h5>
          )}
          {title && (
            <h3 className="text-primary-teal group-hover:text-primary-blue mb-2 font-sans text-2xl leading-120 font-semibold transition-all duration-200">
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
    </CustomLink>
  );
}
