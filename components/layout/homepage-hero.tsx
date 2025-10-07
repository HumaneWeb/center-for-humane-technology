import type { ResultOf } from '@/lib/cms/graphql';
import type { HomepageQuery } from '@/lib/cms/query';
import CtaList from '../shared/cta-list';
import { FadeIn } from '../shared/fade-in';
import { VideoPlayer } from 'react-datocms';

type Props = ResultOf<typeof HomepageQuery>;

export default function HomepageHero({ homepage, configuration }: Props) {
  const { title, introduction, ctas } = homepage!;

  const videos = configuration?.videosHomepage;

  const desktopVideos = {
    video1: videos?.find((v) => v.title === 'video1.mp4')?.video?.video?.muxPlaybackId,
    video2: videos?.find((v) => v.title === 'video2.mp4')?.video?.video?.muxPlaybackId,
    video3: videos?.find((v) => v.title === 'video3.mp4')?.video?.video?.muxPlaybackId,
  };

  const mobileVideos = [
    {
      id: 11,
      videoUrl: videos?.find((v) => v.title === 'video1-mobile.mp4')?.video?.video?.muxPlaybackId,
    },
    {
      id: 22,
      videoUrl: videos?.find((v) => v.title === 'video2-mobile.mp4')?.video?.video?.muxPlaybackId,
    },
    {
      id: 33,
      videoUrl: videos?.find((v) => v.title === 'video3-mobile.mp4')?.video?.video?.muxPlaybackId,
    },
    {
      id: 44,
      videoUrl: videos?.find((v) => v.title === 'video4-mobile.mp4')?.video?.video?.muxPlaybackId,
    },
  ];

  const mobileColumn1 = mobileVideos.filter((_, index) => index % 2 === 0);
  const mobileColumn2 = mobileVideos.filter((_, index) => index % 2 === 1);

  return (
    <section className="homepage-hero mb:bg-contain mb:bg-right mb:bg-no-repeat mb:bg-[url('/homepage-circles.svg')] mb:h-dvh mb:py-20 bg-[#F8F4EF] pt-30 pb-10">
      <div className="homepage-grid-parent relative mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="homepage-grid grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="homepage-metadata space-y-0">
              <h1 className="homepage-title text-primary-navy tracking-061 mb:text-6xl mb:mb-9 mb-5 font-sans text-[31px] leading-110 font-semibold">
                {title}
              </h1>
              {introduction && (
                <div
                  className="homepage-introduction text-primary-navy mb:mb-10 mb:text-2xl mb-5 font-sans text-xl leading-140"
                  dangerouslySetInnerHTML={{ __html: introduction }}
                />
              )}
              {/* @ts-expect-error */}
              {ctas && <CtaList items={ctas} />}
            </div>
          </FadeIn>
          <div className="homepage-videos-decoration absolute right-[-220px]">
            <div className="desktop-videos grid-cols-1 gap-5 md:grid-cols-2 lg:grid lg:grid-cols-3">
              <FadeIn delay={0.4}>
                <RawVideoPlayer src={desktopVideos.video1} className="h-[440px] w-[247px]" />
              </FadeIn>
              <FadeIn delay={0.5}>
                <RawVideoPlayer
                  src={desktopVideos.video2}
                  className="relative top-30 h-[440px] w-[247px]"
                />
              </FadeIn>
              <FadeIn delay={0.6}>
                <RawVideoPlayer
                  src={desktopVideos.video3}
                  className="relative bottom-30 h-[440px] w-[247px]"
                />
              </FadeIn>
            </div>

            {/* Tablet devices */}
            <FadeIn className="tablet-videos">
              <div className="tablet-videos-child relative overflow-hidden">
                <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-32 bg-gradient-to-b from-[#F8F4EF] to-transparent" />

                <div className="tablet-videos-child-wrapper mx-auto grid max-w-4xl grid-cols-2 gap-2.5 px-4 sm:px-6 lg:px-8">
                  <ScrollingColumn videos={mobileColumn1} direction="up" speed={30} />
                  <ScrollingColumn videos={mobileColumn2} direction="down" speed={30} />
                </div>
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32 bg-gradient-to-t from-[#F8F4EF] to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

const RawVideoPlayer = ({ src, className }: { src: string | undefined; className: string }) => {
  return (
    <div className={`raw-video-player relative overflow-hidden ${className}`}>
      <VideoPlayer
        className="absolute inset-0 h-full w-full object-cover"
        data={{
          muxPlaybackId: src,
        }}
        muted
        autoPlay
        loop
        playsInline
        // controls={false}
        aria-label="Video player"
      />
    </div>
  );
};

interface ScrollingColumnProps {
  videos: {
    id: number;
    videoUrl: string | undefined;
  }[];
  direction: 'up' | 'down';
  speed: number;
}

function ScrollingColumn({ videos, direction, speed }: ScrollingColumnProps) {
  const duplicatedVideos = [...videos, ...videos, ...videos];

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex flex-col gap-2.5 ${direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-up pt-12'}`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {duplicatedVideos.map((item, index) => (
          <RawVideoPlayer key={`${item.id}-${index}`} src={item.videoUrl} className="" />
        ))}
      </div>
    </div>
  );
}
