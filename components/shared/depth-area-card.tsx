import CustomImage, { CustomImageProps } from './custom-image';
import CustomLink from './custom-link';

type Props = {
  title: string;
  introduction: string;
  image: CustomImageProps;
  link: any; // TODO
};

export default function DepthAreaCard({ title, introduction, image, link }: Props) {
  const mainContent = () => (
    <article className="grid grid-cols-[1fr_1.5fr] gap-1">
      <div className="bg-primary-cream px-8 pt-8">
        <CustomImage {...image} />
      </div>
      <div className="bg-primary-cream p-8">
        <h2 className="text-primary-navy font-sans text-4xl leading-130 font-semibold">{title}</h2>
        <div
          className="text-primary-navy font-sans text-xl leading-140 font-normal"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      </div>
    </article>
  );

  if (link) {
    return <CustomLink content={link}>{mainContent()}</CustomLink>;
  }

  return mainContent();
}
