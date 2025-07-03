import CustomImage from '../shared/custom-image';
import type { CustomImageProps } from '../shared/custom-image';

type Props = {
  images: CustomImageProps[];
};

export default function ImageGalleryBlock({ images }: Props) {
  return (
    <div className="mb:gap-24 mb:mb-20 my-5 flex flex-wrap items-center justify-center gap-15">
      {images?.map((logo) => <CustomImage key={logo.id} {...logo} extraClass="mb:mb-4" />)}
    </div>
  );
}
