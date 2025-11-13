import { cn } from '@/lib/utils/css.utils';
import { FadeIn } from '../shared/fade-in';
import ButtonBlock, { ButtonBlockProps } from './button-block';

type Props = {
  id: string;
  alignment?: string | null;
  buttons: ButtonBlockProps[];
  isInner?: boolean;
};

export default function ButtonsBlock({ alignment, buttons, isInner = false }: Props) {

  // Bail early if no buttons
  if (!buttons || buttons.length === 0) {
    return null;
  }

  const alignmentClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[alignment || 'left'] || 'justify-start';

  // If rendered within structured text, just render the buttons without section wrapper
  if (isInner) {
    return (
      <FadeIn>
        <div className={cn('flex flex-wrap items-center gap-4', alignmentClass)}>
          {buttons.map((button) => (
            <ButtonBlock key={button.id} {...button} />
          ))}
        </div>
      </FadeIn>
    );
  }

  // Standalone section rendering (for landing pages, etc.)
  return (
    <section className="mb:py-10 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className={cn('flex flex-wrap items-center gap-4', alignmentClass)}>
            {buttons.map((button) => (
              <ButtonBlock key={button.id} {...button} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

