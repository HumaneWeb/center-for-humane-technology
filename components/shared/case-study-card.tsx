import { type ResultOf } from '@/lib/cms/graphql';
import Cta from './cta';
import CustomImage from './custom-image';
import { AwarenessBlockFragment } from '@/lib/cms/query';

type Props = ResultOf<typeof AwarenessBlockFragment>;

export default function CaseStudyCard({ title, preTitle, image, introduction, cta }: any) {
  return (
    <article>
      {preTitle && (
        <h6 className="text-primary-cream tracking-075 mb-7 font-sans text-[15px] leading-135 font-medium uppercase">
          {preTitle}
        </h6>
      )}
      {title && (
        <h2 className="text-primary-cream tracking-031 mb-7 font-sans text-3xl leading-110 font-semibold">
          {title}
        </h2>
      )}
      {image && (
        <div className="mb-7">
          <CustomImage {...image} />
        </div>
      )}
      {introduction && (
        <div
          className="text-neutral-white mb-7 font-sans text-xl leading-140 font-medium"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      )}
      {cta && <Cta {...cta} />}
    </article>
  );
}
