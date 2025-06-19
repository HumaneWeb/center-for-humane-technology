import CustomImage from './custom-image';

type Props = {
  title: string;
  introduction: string;
  guideNumber: string;
  icon: any;
};

export default function GuideCard({ title, introduction, guideNumber, icon }: Props) {
  return (
    <article className="bg-guide-card p-8">
      <span className="text-neutral-white tracking-039 mb-4 block font-sans text-4xl leading-110 font-semibold">
        {guideNumber}
      </span>
      <h3 className="text-neutral-white mb-4 font-sans text-2xl leading-130 font-semibold">
        {title}
      </h3>
      <div
        className="text-neutral-white mb-5 font-sans text-[18px] leading-140 font-medium"
        dangerouslySetInnerHTML={{ __html: introduction }}
      />
      <CustomImage {...icon} />
    </article>
  );
}
