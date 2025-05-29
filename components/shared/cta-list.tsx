import Cta, { CtaProps } from './cta';

type Props = { items: CtaProps[] };

export default function CtaList({ items }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Cta key={item.id} {...item} />
      ))}
    </div>
  );
}
