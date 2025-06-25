// @ts-nocheck
import { cn } from '@/lib/utils/css.utils';
import BasicHero from './basic-hero';
import CustomStructuredText from '../shared/custom-structured-text';
import DonateBlock from '../blocks/donate-block';
import ContentSidebar from '../shared/content-sidebar';
import ContentTopBar from '../shared/content-top-bar';

export default function ContentLayout({ page, configuration }) {
  const { slug, title, introduction, cta, backCta, image, variant, contentAnchors, anchors } =
    page!;
  const { donateTitle, donateCta, donateImage } = configuration!;

  const withSidebar = contentAnchors === 'sidebar';
  const withTopBar = contentAnchors === 'top-bar';
  const none = contentAnchors === 'none';

  return (
    <>
      <BasicHero
        title={title}
        variant={variant}
        introduction={introduction}
        cta={cta}
        backCta={backCta}
        backgroundImage={image}
      />
      {withTopBar && <ContentTopBar items={anchors} />}

      <div className="mx-auto mt-35 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn('pb-50', withSidebar && 'grid grid-cols-[1fr_3fr] gap-13')}>
          {withSidebar && <ContentSidebar items={anchors} />}
          <div>
            <CustomStructuredText data={page?.content} centerContent={withTopBar || none} />
          </div>
        </div>
      </div>
      <DonateBlock title={donateTitle} cta={donateCta} image={donateImage} />
    </>
  );
}
