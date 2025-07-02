import type { ResultOf } from '@/lib/cms/graphql';
import type { HomepageQuery } from '@/lib/cms/query';
import CtaList from '../shared/cta-list';

type Props = ResultOf<typeof HomepageQuery>;

export default function HomepageHero({ homepage }: Props) {
  const { title, introduction, ctas } = homepage!;

  return (
    <section className="homepage-hero bg-primary-cream/50 mb:bg-contain mb:bg-right mb:bg-no-repeat mb:bg-[url('/homepage-circles.svg')] mb:h-dvh mb:py-20 pt-30 pb-10">
      <div className="homepage-grid-parent relative mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="homepage-grid grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="homepage-metadata space-y-0">
            <h1 className="text-primary-navy tracking-061 mb:text-6xl mb:mb-9 mb-5 font-sans text-[31px] leading-110 font-semibold">
              {title}
            </h1>
            {introduction && (
              <div
                className="text-primary-navy mb:mb-10 mb:text-2xl mb-5 font-sans text-xl leading-140"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
            {/* @ts-expect-error */}
            {ctas && <CtaList items={ctas} />}
          </div>

          <div className="homepage-videos-decoration absolute right-[-220px] grid-cols-1 gap-5 sm:hidden md:grid-cols-2 lg:grid lg:grid-cols-3">
            <RawVideoPlayer src="/video1.mp4" className="h-[440px] w-[247px]" />
            <RawVideoPlayer src="/video2.mp4" className="relative top-30 h-[440px] w-[247px]" />
            <RawVideoPlayer src="/video3.mp4" className="relative bottom-30 h-[440px] w-[247px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

const RawVideoPlayer = ({ src, className }: { src: string; className: string }) => {
  return (
    <div className={`raw-video-player relative overflow-hidden ${className}`}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        muted
        autoPlay
        loop
        playsInline
        aria-label="Video player"
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video element.
      </video>
    </div>
  );
};
