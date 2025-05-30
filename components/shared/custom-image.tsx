import Image from 'next/image';
import { ResultOf } from '@/lib/cms/graphql';
import { ImageFragment } from '@/lib/cms/query';
import type { Optional } from '@/lib/utils/types';
import { logWarning } from '@/lib/utils/logs.utils';

export type CustomImageProps = Optional<
  ResultOf<typeof ImageFragment> & {
    extraClass?: string;
  }
>;

export default function CustomImage({ url, alt, width, height, extraClass }: CustomImageProps) {
  if (!url) {
    logWarning('[Custom Image] No url');
    return;
  }

  return (
    <Image
      src={url}
      alt={alt ?? 'CHT Image'}
      width={width!}
      height={height!}
      className={extraClass}
    />
  );
}
