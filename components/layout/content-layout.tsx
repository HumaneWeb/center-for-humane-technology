// @ts-nocheck
import { cn } from '@/lib/utils/css.utils';
import BasicHero from './basic-hero';
import CustomStructuredText from '../shared/custom-structured-text';
import DonateBlock from '../blocks/donate-block';
import ContentSidebar from '../shared/content-sidebar';
import ContentTopBar from '../shared/content-top-bar';

export default function ContentLayout({ page, configuration, withImage = true }) {
  const {
    slug,
    title,
    introduction,
    cta,
    backCta,
    image,
    variant,
    contentAnchors,
    anchors,
    textColor,
  } = page!;
  const { donateTitle, donateCta, donateImage } = configuration!;

  const withSidebar = contentAnchors === 'sidebar';
  const withTopBar = contentAnchors === 'top-bar';
  const none = contentAnchors === 'none';

  return (
    <>
      <BasicHero
        title={title}
        variant={textColor}
        introduction={introduction}
        cta={cta}
        backCta={backCta}
        backgroundImage={withImage ? image : null}
      />
      {withTopBar && <ContentTopBar items={anchors} />}

      <div className="mb:mt-35 mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn('mb:pb-50 pb-10', withSidebar && 'mb:grid-cols-[1fr_3fr] mb:gap-13 grid')}
        >
          {withSidebar && <ContentSidebar items={anchors} />}
          <div className="content-layout">
            <CustomStructuredText data={page?.content} centerContent={withTopBar || none} />
          </div>
        </div>
      </div>
      <DonateBlock title={donateTitle} cta={donateCta} image={donateImage} />
    </>
  );
}
