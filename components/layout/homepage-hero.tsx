import { ResultOf } from '@/lib/cms/graphql';
import { HomepageQuery } from '@/lib/cms/query';
import CtaList from '../shared/cta-list';
import { VideoPlayer } from 'react-datocms';

type Props = ResultOf<typeof HomepageQuery>;

export default function HomepageHero({ homepage }: Props) {
  const { title, introduction, ctas, decorationVideos } = homepage!;

  return (
    <section
      className="homepage-hero bg-primary-cream/50 h-dvh bg-contain bg-right bg-no-repeat py-12 lg:py-20"
      style={{
        backgroundImage: `url("/homepage-circles.svg")`,
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-0">
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

          <div className="grid-cols-1 gap-5 sm:hidden md:grid-cols-2 lg:grid lg:grid-cols-3">
            {/* {decorationVideos?.videos.map((video, index) => (
              <div
                key={video.id}
                className={`h-full w-full ${index === 0 ? 'pt-20' : ''} ${index === 1 ? 'ml-20 pt-48' : ''} ${index === 2 ? 'ml-40 pt-[-25em]' : ''} relative`}
              >
                <VideoPlayer
                  autoPlay
                  loop
                  muted
                  data={video.video}
                  className="relative h-[490px] w-[265px]"
                />
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
