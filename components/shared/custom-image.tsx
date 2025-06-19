import Image from 'next/image';
import { ResultOf } from '@/lib/cms/graphql';
import { ImageFragment } from '@/lib/cms/query';
import type { Optional } from '@/lib/utils/types';
import { logWarning } from '@/lib/utils/logs.utils';
import { cn } from '@/lib/utils/css.utils';

export type CustomImageProps = Optional<
  ResultOf<typeof ImageFragment> & {
    withCaption?: boolean;
    extraClass?: string;
  }
>;

export default function CustomImage({
  url,
  alt,
  width,
  height,
  title,
  withCaption = false,
  extraClass,
}: CustomImageProps) {
  if (!url) {
    logWarning('[Custom Image] No url');
    return;
  }

  if (withCaption && title) {
    return (
      <div>
        <Image
          src={url}
          alt={alt ?? 'CHT Image'}
          width={width!}
          height={height!}
          className={cn(withCaption && title && 'mb-3.5', extraClass)}
        />
        {withCaption && title && (
          <p className="text-primary-navy font-sans text-[16px] leading-140">{title}</p>
        )}
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={alt ?? 'CHT Image'}
      width={width!}
      height={height!}
      className={cn(withCaption && title && 'mb-3.5', extraClass)}
    />
  );
}
