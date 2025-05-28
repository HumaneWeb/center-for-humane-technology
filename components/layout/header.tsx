import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  logoText: string;
  navigationItems: Array<{
    label: string;
    href: string;
  }>;
  ctaText: string;
  ctaHref: string;
}

const navigationItems = [
  { label: 'THE ISSUES', href: '/about' },
  { label: 'WHAT WE DO', href: '/research' },
  { label: 'RESOURCES', href: '/get-involved' },
  { label: 'ABOUT US', href: '/contact' },
];

export default function Header({ logoText, ctaText, ctaHref }: HeaderProps) {
  return (
    <header className="border-primary-navy bg-neutral-white border-b-[1px] pl-10">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            <Image
              src="https://www.datocms-assets.com/160835/1748441837-logo.svg"
              alt={logoText}
              width={372}
              height={40}
            />
          </Link>
        </div>

        <nav className="hidden h-full items-stretch md:flex">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-primary-navy border-primary-navy flex h-full items-center justify-center gap-2.5 border-l-[1px] px-8 font-sans text-[18px] leading-140 font-semibold"
            >
              {item.label}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path d="M6.5 11.5L1.73686 6.25L11.2631 6.25L6.5 11.5Z" fill="#0B1023" />
              </svg>
            </Link>
          ))}

          <Link
            href={'/donate'}
            className="text-primary-navy border-primary-navy bg-secondary-light-teal flex h-full items-center justify-center gap-2.5 border-l-[1px] px-8 font-sans text-[18px] leading-140 font-semibold"
          >
            Donate
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path d="M10.5 9L5.25 13.7631L5.25 4.23686L10.5 9Z" fill="#0B1023" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
