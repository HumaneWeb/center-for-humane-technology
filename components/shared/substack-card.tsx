import { cn } from '@/lib/utils/css.utils';
import CustomImage from './custom-image';

type Props = {
  id: string;
  title: string;
  introduction: string | null;
  url: string;
  variant: 'default' | 'minimal';
  image: any | null;
};

export default function SubstackCard({ title, introduction, image, url, variant }: Props) {
  return (
    <a href={url} target="_blank">
      <article className={cn(variant === 'minimal' && 'bg-neutral-white w-[350px] p-7')}>
        <h2 className="text-primary-teal mb-7 font-sans text-2xl leading-130 font-semibold">
          {title}
        </h2>
        {image && <CustomImage {...image} extraClass="h-[252px] w-full mb-7 object-cover" />}
        {introduction && (
          <p className="text-primary-navy font-sans text-[16px] leading-140">{introduction}</p>
        )}
      </article>
    </a>
  );
}
