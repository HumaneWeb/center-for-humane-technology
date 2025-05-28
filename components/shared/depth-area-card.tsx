import Image from 'next/image';

export default function DepthAreaCard() {
  return (
    <article className="grid grid-cols-[1fr_1.5fr] gap-1">
      <div className="bg-primary-cream px-8 pt-8">
        <Image
          src="https://www.datocms-assets.com/160835/1748432867-group.png"
          alt="CHT in the media 1"
          width={330}
          height={390}
        />
      </div>
      <div className="bg-primary-cream p-8">
        <h2 className="text-primary-navy font-sans text-4xl leading-130 font-semibold">
          In-depth Area 1
        </h2>
        <p className="text-primary-navy font-sans text-xl leading-140 font-normal">
          Use this component whenever you want to feature any specific content.{' '}
        </p>
      </div>
    </article>
  );
}
