import { cn } from '@/lib/utils/css.utils';

export type ButtonBlockProps = {
  id: string;
  label: string;
  link?: string | null;
  variant?: 'default' | 'minimal' | 'border';
  extraClass?: string;
};

export default function ButtonBlock({
  label,
  link,
  variant = 'default',
  extraClass,
}: ButtonBlockProps) {
  const css = cn(
    `bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-block rounded-[5px] px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in`,
    variant === 'minimal' &&
      'text-primary-teal hover:text-primary-navy bg-transparent p-0 hover:bg-transparent',
    variant === 'border' &&
      'border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-neutral-white border-2 bg-transparent',
    extraClass,
  );

  if (!link) {
    return <span className={css}>{label}</span>;
  }

  // Check if external URL
  const isExternal = link.startsWith('http://') || link.startsWith('https://');

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={css}>
        {label}
      </a>
    );
  }

  return (
    <a href={link} className={css}>
      {label}
    </a>
  );
}

