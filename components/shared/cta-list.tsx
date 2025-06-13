import { cn } from '@/lib/utils/css.utils';
import Cta, { CtaProps } from './cta';

type Props = {
  items: CtaProps[];
  extraClassnames?: string;
  variant?: 'default' | 'minimal' | 'underline';
};

export default function CtaList({ items, extraClassnames, variant }: Props) {
  return (
    <div className={cn('flex flex-wrap gap-3', extraClassnames)}>
      {items.map((item) => (
        <Cta key={item.id} {...item} variant={variant} />
      ))}
    </div>
  );
}
