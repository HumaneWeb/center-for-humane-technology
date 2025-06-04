import { type ResultOf } from '@/lib/cms/graphql';
import Cta from './cta';
import CustomImage from './custom-image';
import { AwarenessBlockFragment } from '@/lib/cms/query';

type Props = ResultOf<typeof AwarenessBlockFragment>;

export default function PodcastCard({ title, preTitle, introduction, cta, icon }: any) {
  return (
    <article>
      <h6 className="text-primary-blue tracking-075 mb-7 font-sans text-[15px] leading-135 font-medium uppercase">
        {preTitle}
      </h6>
      <h2 className="text-primary-blue tracking-049 mb-7 flex items-start font-sans text-5xl leading-110 font-semibold">
        {icon && <CustomImage {...icon} extraClass="mt-2 mr-3 inline-block" />}
        {title}
      </h2>
      <div
        className="text-primary-blue mb-7 font-sans text-xl leading-140 font-normal"
        dangerouslySetInnerHTML={{ __html: introduction }}
      />

      {/* TODO: */}
      <div className="mb-7 flex gap-5">
        <CustomImage
          url="https://www.datocms-assets.com/160835/1748435645-group-9.png"
          alt="Podcast Cover"
          width={211}
          height={210}
        />
        <div>
          <h5 className="text-primary-blue tracking-075 mb-2 font-sans text-[15px] leading-135 font-semibold uppercase">
            Latest Episode
          </h5>
          <h3 className="text-primary-teal font-sans text-2xl leading-120 font-semibold">
            Forever Chemicals, Forever Consequences: What PFAS Teaches Us About AI
          </h3>
        </div>
      </div>

      <Cta {...cta} />
    </article>
  );
}
