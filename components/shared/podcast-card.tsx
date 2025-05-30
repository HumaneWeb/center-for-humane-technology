import Cta from './cta';
import CustomImage from './custom-image';

export default function PodcastCard() {
  return (
    <article>
      <h6 className="text-primary-blue tracking-075 mb-7 font-sans text-[15px] leading-135 font-medium uppercase">
        PODCAST
      </h6>
      <h2 className="text-primary-blue tracking-049 mb-7 flex items-center font-sans text-5xl leading-110 font-semibold">
        <CustomImage
          url="https://www.datocms-assets.com/160835/1748435621-image-13.png"
          alt="Podcast Icon"
          width={65}
          height={65}
          extraClass="mr-2 inline-block"
        />
        Your Undivided Attention
      </h2>
      <p className="text-primary-blue mb-7 font-sans text-xl leading-140 font-normal">
        Read more about how CHT provided expert guidance to Vermont lawmakers advancing legislation
        to protect children online, helping shape policy efforts to reduce digital harm.
      </p>
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

      <Cta label="Explore all episodes" />
    </article>
  );
}
