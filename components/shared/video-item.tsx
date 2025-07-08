import VideoEmbed from './video-embed';
import type { CustomImageProps } from './custom-image';
import { cn } from '@/lib/utils/css.utils';

type Props = {
  video: {
    title: string;
    url: string;
    thumbnailUrl: string;
  };
  thumbnailImage: CustomImageProps;
  extraClassnames?: string;
};

export default function VideoItem({ video, thumbnailImage, extraClassnames }: Props) {
  return (
    <div className={cn('mb:mt-9 mb:mb-16 mb-10', extraClassnames)}>
      <VideoEmbed {...video} thumbnailUrl={thumbnailImage?.url || video.thumbnailUrl} />
    </div>
  );
}
