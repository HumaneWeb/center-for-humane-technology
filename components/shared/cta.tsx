import Link from 'next/link';

export default function Cta({
  label,
  href,
  extraClass,
}: {
  label: string;
  href: string;
  extraClass?: string;
}) {
  return (
    <Link
      href={href}
      className={`bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white inline-block rounded-md px-5 py-4 text-xl leading-120 font-semibold transition-colors ${extraClass}`}
    >
      {label}
    </Link>
  );
}
