import CustomImage from '../shared/custom-image';

type Props = {
  content: string;
  image: any;
};

export default function ImageContentBlock({ content, image }: Props) {
  return (
    <div className="mx-auto mt-20 mb-36 max-w-7xl items-end px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 items-center gap-12">
        <CustomImage {...image} />
        <div
          className="text-primary-navy font-sans text-xl leading-140 [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
