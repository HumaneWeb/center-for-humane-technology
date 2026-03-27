import { cn } from '@/lib/utils/css.utils';
import Cta, { CtaProps } from './cta';

type Props = {
  items: CtaProps[];
  extraClassnames?: string;
  variant?: 'default' | 'minimal' | 'underline';
  ctaExtraClassnames?: string;
  invertPrimaryButtons?: boolean;
};

export default function CtaList({
  items,
  extraClassnames,
  variant,
  ctaExtraClassnames,
  invertPrimaryButtons,
}: Props) {
  return (
    <div className={cn('flex flex-wrap gap-3', extraClassnames)}>
      {items.map((item) => (
        <Cta
          key={item.id}
          {...item}
          variant={variant || item.variant}
          extraClass={ctaExtraClassnames}
          invertPrimaryButtons={invertPrimaryButtons ?? item.invertPrimaryButtons}
        />
      ))}
    </div>
  );
}
