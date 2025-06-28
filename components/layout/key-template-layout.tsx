// @ts-nocheck
import { cn } from '@/lib/utils/css.utils';
import ComplexHero from './complex-hero';
import CustomStructuredText from '../shared/custom-structured-text';
import DonateBlock from '../blocks/donate-block';

export default function KeyTemplateLayout({ page, configuration }) {
  return (
    <div>
      <ComplexHero
        title={page?.title}
        preTitle={page?.preTitle}
        introduction={page?.introduction}
        image={page?.image}
        variant={page?.backgroundColor}
      />
      <div
        className={cn(
          'key-template-layout mb:pt-20 pt-10',
          page?.contentBackgroundColor === 'purple-gradient' && 'bg-basic-page',
          page?.contentBackgroundColor === 'white' && 'bg-white-page',
        )}
      >
        <CustomStructuredText data={page?.content} />
        <DonateBlock
          title={configuration?.donateTitle}
          image={configuration?.donateImage}
          cta={configuration?.donateCta}
        />
      </div>
    </div>
  );
}
