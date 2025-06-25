import { cn } from '@/lib/utils/css.utils';
import type { CustomImageProps } from '../shared/custom-image';

type Props = {
  preTitle: string;
  title: string;
  introduction: string;
  image: CustomImageProps;
  variant: 'blue' | 'light-blue' | 'green' | 'purple';
};

export default function ComplexHero({ title, preTitle, introduction, image, variant }: Props) {
  return (
    <section
      id="complex-hero"
      className={cn(
        variant === 'blue' && 'bg-complex-hero-blue',
        variant === 'light-blue' && 'bg-complex-hero-light-blue',
        variant === 'green' && 'bg-complex-hero-green',
        variant === 'purple' && 'bg-complex-hero-purple',
      )}
    >
      <div
        className="bg-contain bg-bottom-right bg-no-repeat"
        style={{ backgroundImage: image ? `url(${image.url})` : undefined }}
      >
        <div className="mx-auto flex h-[620px] max-w-7xl items-end px-4 pb-25 sm:px-6 lg:px-8">
          <div className="max-w-[750px]">
            {preTitle && (
              <h2
                className={cn(
                  'mb-3.5 font-sans text-xl leading-135 font-semibold tracking-[1px] text-[#93C0FF] uppercase',
                  variant === 'green' && 'text-[#ACFFFC]',
                )}
              >
                {preTitle}
              </h2>
            )}
            <h1
              className={cn(
                'text-primary-cream tracking-061 mb-5 font-sans text-6xl leading-110 font-semibold',
              )}
            >
              {title}
            </h1>
            {introduction && (
              <div
                className="text-neutral-white max-w-[600px] font-sans text-2xl leading-140"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
