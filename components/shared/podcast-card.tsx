import Cta from './cta';
import CustomImage from './custom-image';
import PodcastMinimalCard from './podcast-minimal-card';

export default function PodcastCard({ title, preTitle, introduction, cta, icon, podcast }: any) {
  return (
    <article>
      {preTitle && (
        <h6 className="text-primary-blue tracking-075 mb-7 font-sans text-[15px] leading-135 font-medium uppercase">
          {preTitle}
        </h6>
      )}
      {title && (
        <h2 className="text-primary-blue tracking-049 mb-7 flex items-start font-sans text-5xl leading-110 font-semibold">
          {icon && <CustomImage {...icon} extraClass="mt-2 mr-3 inline-block" />}
          {title}
        </h2>
      )}
      {introduction && (
        <div
          className="text-primary-blue mb-7 font-sans text-xl leading-140 font-medium"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      )}

      {podcast && (
        <div className="mb-7">
          <PodcastMinimalCard {...podcast} variant="small" />
        </div>
      )}

      {cta && <Cta {...cta} />}
    </article>
  );
}
