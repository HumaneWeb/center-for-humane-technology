// @ts-nocheck
import { cn } from '@/lib/utils/css.utils';
import BasicHero from './basic-hero';
import CustomStructuredText from '../shared/custom-structured-text';
import DonateBlock from '../blocks/donate-block';
import ContentSidebar from '../shared/content-sidebar';
import ContentTopBar from '../shared/content-top-bar';
import { FadeIn } from '../shared/fade-in';

export default function ContentLayout({
  page,
  configuration,
  withImage = true,
  special = false,
  containerClassNames = '',
  children,
}) {
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
    content,
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

      <div className={containerClassNames}>
        <div
          className={cn(
            'mb:mt-35 mb:mx-auto mb:max-w-7xl mb:px-4 mt-10 px-0',
            none && 'px-4 sm:px-6 lg:px-8',
            containerClassNames,
          )}
        >
          <div
            className={cn('mb:pb-50 pb-10', withSidebar && 'mb:grid-cols-[1fr_3fr] mb:gap-13 grid')}
          >
            {withSidebar && <ContentSidebar items={anchors} />}
            <FadeIn className="content-layout">
              <CustomStructuredText
                data={page?.content}
                centerContent={withTopBar || none}
                special={special}
              />
            </FadeIn>
          </div>
        </div>
      </div>
      {children}
      <DonateBlock title={donateTitle} cta={donateCta} image={donateImage} />
    </>
  );
}
