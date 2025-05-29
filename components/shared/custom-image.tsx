import Image from 'next/image';
import { ResultOf } from '@/lib/cms/graphql';
import { ImageFragment } from '@/lib/cms/query';

export type CustomImageProps = ResultOf<typeof ImageFragment> & {
  extraClass?: string;
};

export default function CustomImage({ url, alt, width, height, extraClass }: CustomImageProps) {
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
