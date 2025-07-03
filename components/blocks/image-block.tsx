import CustomImage, { CustomImageProps } from '../shared/custom-image';
import { CustomLinkProps } from '../shared/custom-link';

type Props = {
  image: CustomImageProps;
  link: CustomLinkProps;
};

export default function ImageBlock({ image, link }: Props) {
  return (
    <div className="mb:mb-13.5 my-5 flex items-center justify-center">
      <CustomImage {...image} />
    </div>
  );
}
