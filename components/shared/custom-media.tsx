import CustomImage, { CustomImageProps } from './custom-image';
import { cn } from '@/lib/utils/css.utils';

export type UploadVideoProps = {
  streamingUrl?: string | null;
  mp4Url?: string | null;
  thumbnailUrl?: string | null;
  alt?: string | null;
};

export type CustomMediaProps = CustomImageProps & {
  mimeType?: string | null;
  video?: UploadVideoProps | null;
};

export default function CustomMedia({
  mimeType,
  video,
  extraClass,
  alt,
  title,
  ...imageProps
}: CustomMediaProps) {
  const videoSrc = video?.mp4Url || video?.streamingUrl;

  if (videoSrc) {
    return (
      <div className={cn('relative overflow-hidden', extraClass)}>
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={video?.thumbnailUrl ?? undefined}
          aria-label={video?.alt || alt || title || 'Video'}
        >
          {video.mp4Url && <source src={video.mp4Url} type="video/mp4" />}
          {video.streamingUrl && <source src={video.streamingUrl} type="application/x-mpegURL" />}
        </video>
      </div>
    );
  }

  if (mimeType?.startsWith('video/')) {
    return null;
  }

  return <CustomImage alt={alt} title={title} extraClass={extraClass} {...imageProps} />;
}
