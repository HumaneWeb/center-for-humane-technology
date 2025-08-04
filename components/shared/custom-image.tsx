import Image from 'next/image';
import { logWarning } from '@/lib/utils/logs.utils';
import { cn } from '@/lib/utils/css.utils';

export type CustomImageProps = {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  withCaption?: boolean;
  extraClass?: string;
} & React.HTMLAttributes<HTMLImageElement>;

export default function CustomImage({
  url,
  alt,
  width,
  height,
  title,
  withCaption = false,
  extraClass,
  ...props
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
          unoptimized
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
      unoptimized
      {...props}
    />
  );
}
