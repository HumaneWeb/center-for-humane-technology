import Cta from './cta';
import CustomImage, { CustomImageProps } from './custom-image';
import PodcastMinimalCard from './podcast-minimal-card';

type Props = {
  title?: string;
  preTitle?: string;
  introduction?: string | null;
  cta?: any;
  icon: CustomImageProps | null;
  podcast?: any;
};

export default function PodcastCard({ title, preTitle, introduction, cta, icon, podcast }: Props) {
  return (
    <article className="podcast-card">
      {preTitle && (
        <h6 className="text-primary-blue mb:leading-135 tracking-08 mb:mb-7 mb-5 font-sans text-[16px] leading-120 font-medium uppercase">
          {preTitle}
        </h6>
      )}
      {title && (
        <h2 className="text-primary-blue tracking-031 mb:text-3xl mb:leading-110 mb:mb-7 mb-5 font-sans text-[23px] leading-120 font-semibold">
          {icon && (
            <CustomImage {...icon} extraClass="mb:mt-2 mb:mr-3 mb:inline-block mb:mb-0 mb-2.5" />
          )}
          {title}
        </h2>
      )}
      {introduction && (
        <div
          className="text-primary-blue mb:text-xl mb-7 font-sans text-[18px] leading-140 font-normal"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      )}
      {podcast && (
        <div className="mb:mb-7 mb-5">
          <PodcastMinimalCard {...podcast} variant="small" />
        </div>
      )}
      {cta && <Cta {...cta} />}
    </article>
  );
}
