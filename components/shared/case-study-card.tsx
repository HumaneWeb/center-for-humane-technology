import Cta from './cta';
import CustomImage from './custom-image';

export default function CaseStudyCard() {
  return (
    <article>
      <h6 className="text-primary-cream tracking-075 mb-7 font-sans text-[15px] leading-135 font-medium uppercase">
        CASE STUDY
      </h6>
      <h2 className="text-primary-cream tracking-031 mb-7 font-sans text-3xl leading-110 font-semibold">
        Vermont Kids Code
      </h2>
      <div className="mb-7">
        <CustomImage
          url="https://www.datocms-assets.com/160835/1748435125-image.png"
          alt="CHT in the media 1"
          width={516}
          height={252}
        />
      </div>
      <p className="text-neutral-white mb-7 font-sans text-xl leading-140 font-normal">
        Read more about how CHT provided expert guidance to Vermont lawmakers advancing legislation
        to protect children online, helping shape policy efforts to reduce digital harm.
      </p>
      <Cta label="Read the full case study" />
    </article>
  );
}
