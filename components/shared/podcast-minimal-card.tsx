import { cn } from '@/lib/utils/css.utils';
import CustomImage from './custom-image';

type Props = {
  id: string;
  title: string;
  introduction: string | null;
  image: any | null;
  slug: string;
  _modelApiKey: string;
  variant?: 'default' | 'small';
};

export default function PodcastMinimalCard({
  title,
  introduction,
  image,
  variant = 'default',
  slug,
  _modelApiKey,
}: Props) {
  return (
    <div className="flex gap-5">
      <CustomImage
        {...image}
        extraClass={cn('w-[300px] aspect-square', variant === 'small' && 'w-[211px] h-[210px]')}
      />
      <div className={cn('pt-5', variant === 'small' && 'pt-0')}>
        <h5 className="text-primary-blue tracking-075 mb-2 font-sans text-[15px] leading-135 font-semibold uppercase">
          Latest Episode
        </h5>
        <h3 className="text-primary-teal mb-2 font-sans text-2xl leading-120 font-semibold">
          {title}
        </h3>
        {introduction && variant == 'default' && (
          <div
            className="text-primary-navy font-sans text-[16px] leading-140"
            dangerouslySetInnerHTML={{ __html: introduction }}
          />
        )}
      </div>
    </div>
  );
}
