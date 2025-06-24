import { cn } from '@/lib/utils/css.utils';
import BasicHero from './basic-hero';
import CustomStructuredText from '../shared/custom-structured-text';
import DonateBlock from '../blocks/donate-block';

export default function ContentLayout({ page, configuration }) {
  const { slug, title, introduction, cta, backCta, backgroundImage, variant } = page!;
  const { donateTitle, donateCta, donateImage } = configuration!;

  const isTopBar = slug === 'content-example-2';

  return (
    <>
      <BasicHero
        title={title}
        variant={variant}
        introduction={introduction}
        cta={cta}
        backCta={backCta}
        backgroundImage={backgroundImage}
      />
      {/* {isTopBar && (
        <div className="bg-neutral-white sticky top-0 mt-10 self-start border border-[#A8ADB6] py-3.5">
          <ul className="text-primary-teal mx-auto flex max-w-7xl items-center justify-center gap-20 px-4 font-sans text-[16px] leading-140 font-semibold sm:px-6 lg:px-8">
            <li>Overview</li>
            <li>Introduction</li>
            <li>Question 1</li>
            <li>Question 2</li>
            <li>Question 3</li>
            <li>Question 4</li>
            <li>Question 5</li>
            <li>Go Deeper</li>
          </ul>
        </div>
      )} */}

      <div
      // className="mx-auto mt-35 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div
          className={cn(
            'pb-50',
            // !isTopBar && 'grid grid-cols-[1fr_3fr]'
          )}
        >
          {/* {!isTopBar && (
            <div className="sticky top-20 self-start">
              <ul className="text-primary-teal flex flex-col gap-7 font-sans text-xl leading-130 font-semibold">
                <li>
                  Link short
                  <ul className="pt-5 pl-5">
                    <li>Link longer example</li>
                  </ul>
                </li>
                <li>Link medium</li>
                <li>Link short</li> <li>Link medium</li>
              </ul>
            </div>
          )} */}

          <div>
            <CustomStructuredText data={page?.content} centerContent={isTopBar} />
          </div>
        </div>
      </div>
      <DonateBlock title={donateTitle} cta={donateCta} image={donateImage} />
    </>
  );
}
