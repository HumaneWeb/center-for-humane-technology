// @ts-nocheck
import { cn } from '@/lib/utils/css.utils';
import ComplexHero from './complex-hero';
import CustomStructuredText from '../shared/custom-structured-text';
import DonateBlock from '../blocks/donate-block';
import BasicHero from './basic-hero';
import { FadeIn } from '../shared/fade-in';

export default function KeyTemplateLayout({ page, configuration, variant = 'key-template' }) {
  return (
    <div>
      {variant === 'key-template-small' ? (
        <BasicHero title={page?.title} preTitle={page?.preTitle} variant={page?.backgroundColor} />
      ) : (
        <ComplexHero
          title={page?.title}
          preTitle={page?.preTitle}
          introduction={page?.introduction}
          image={page?.image}
          mobileImage={page?.mobileImage}
          variant={page?.backgroundColor}
        />
      )}
      <div
        className={cn(
          'key-template-layout mb:pt-20 pt-10',
          page?.contentBackgroundColor === 'purple-gradient' && 'bg-basic-page',
          page?.contentBackgroundColor === 'white' && 'bg-white-page',
        )}
      >
        <FadeIn>
          <CustomStructuredText data={page?.content} />
        </FadeIn>
        <DonateBlock
          title={configuration?.donateTitle}
          image={configuration?.donateImage}
          cta={configuration?.donateCta}
        />
      </div>
    </div>
  );
}
