import VideoEmbed from './video-embed';
import type { CustomImageProps } from './custom-image';

type Props = {
  video: {
    title: string;
    url: string;
    thumbnailUrl: string;
  };
  thumbnailImage: CustomImageProps;
};

export default function VideoItem({ video, thumbnailImage }: Props) {
  return (
    <div className="mb:mt-9 mb:mb-16 mb-10">
      <VideoEmbed {...video} thumbnailUrl={thumbnailImage?.url || video.thumbnailUrl} />
    </div>
  );
}
