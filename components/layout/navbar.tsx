'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CustomImage from '../shared/custom-image';
import CustomLink from '../shared/custom-link';
import SearchEngine from './search-engine';

type Props = {
  items: {
    id: string;
    label: string;
    asButton: boolean;
    children: { id: string; label: string };
  }[];
};

export default function Navbar({ items }: Props) {
  const [openSearchEngine, setOpenSearchEngine] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { normal, asButtons } = items.reduce(
    (acc, item) => {
      if (item.asButton) {
        acc.asButtons.push(item);
      } else {
        acc.normal.push(item);
      }
      return acc;
    },
    {
      normal: [] as Props['items'],
      asButtons: [] as Props['items'],
    },
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        const buttonElement = buttonRefs.current[openDropdown];

        if (
          dropdownElement &&
          buttonElement &&
          !dropdownElement.contains(event.target as Node) &&
          !buttonElement.contains(event.target as Node)
        ) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const item = items[index];
    if (!item.children) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setOpenDropdown(openDropdown === index ? null : index);
        break;
      case 'Escape':
        setOpenDropdown(null);
        buttonRefs.current[index]?.focus();
        break;
      case 'ArrowDown':
        if (openDropdown === index) {
          event.preventDefault();
          const firstLink = dropdownRefs.current[index]?.querySelector('a');
          firstLink?.focus();
        }
        break;
    }
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent, dropdownIndex: number) => {
    const dropdown = dropdownRefs.current[dropdownIndex];
    if (!dropdown) return;

    const links = Array.from(dropdown.querySelectorAll('a'));
    const currentIndex = links.indexOf(event.target as HTMLAnchorElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
        links[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
        links[prevIndex]?.focus();
        break;
      case 'Escape':
        setOpenDropdown(null);
        buttonRefs.current[dropdownIndex]?.focus();
        break;
    }
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const NavItemComponent = ({
    item,
    index,
    extraClassnames,
  }: {
    item: any;
    index: number;
    extraClassnames?: string;
  }) => {
    const hasDropdown = item.children.length > 0;
    const isOpen = openDropdown === index;

    if (!hasDropdown) {
      return (
        <CustomLink
          extraClass={`text-primary-navy border-primary-navy flex h-full items-center justify-center gap-2.5 border-l-[1px] px-8 font-sans text-[18px] leading-140 font-semibold tracking-018 ${extraClassnames ? extraClassnames : ''}`}
        >
          {item.label}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path d="M10.5 9L5.25 13.7631L5.25 4.23686L10.5 9Z" fill="#0B1023" />
          </svg>
        </CustomLink>
      );
    }

    if (hasDropdown) {
      return (
        <div className="relative">
          <button
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => toggleDropdown(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="text-primary-navy border-primary-navy tracking-018 flex h-full cursor-pointer items-center justify-center gap-2.5 border-l-[1px] px-8 font-sans text-[18px] leading-140 font-semibold"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls={`dropdown-${index}`}
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
          </button>

          {isOpen && (
            <div
              ref={(el) => (dropdownRefs.current[index] = el)}
              id={`dropdown-${index}`}
              className="bg-neutral-white border-primary-navy absolute top-full left-0 z-50 flex w-64 flex-col gap-5 border-[1px] px-5 py-4 shadow-sm"
              role="menu"
              aria-orientation="vertical"
              onKeyDown={(e) => handleDropdownKeyDown(e, index)}
            >
              {item.children!.map((dropdownItem, dropdownIndex) => (
                <CustomLink
                  key={dropdownIndex}
                  href={dropdownItem.href}
                  className="block px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 focus:outline-none"
                  role="menuitem"
                  onClick={() => setOpenDropdown(null)}
                >
                  <div className="text-primary-navy tracking-02 flex items-center justify-between font-sans text-[18px] leading-120 font-medium">
                    {dropdownItem.label}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      className="w-[20px]"
                    >
                      <path
                        d="M15.75 5.25L24.5 14M24.5 14L15.75 22.75M24.5 14H3.5"
                        stroke="#0B1023"
                        strokeWidth="2"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                </CustomLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <header className="border-primary-navy bg-neutral-white border-b-[1px] pl-10">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <CustomImage
              id="navbar-logo"
              url="https://www.datocms-assets.com/160835/1748441837-logo.svg"
              alt="Center for Humane Technology logo"
              width={372}
              height={40}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden h-full items-stretch md:flex">
          {normal.map((item, index) => (
            <NavItemComponent key={index} item={item} index={index} />
          ))}

          {/* Search engine */}
          <button
            className="cursor-pointer border-l-[1px] px-8"
            onClick={() => setOpenSearchEngine((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
            >
              <path
                d="M21 21.5L15.2258 15.7258M15.2258 15.7258C16.7886 14.163 17.6666 12.0434 17.6666 9.83328C17.6666 7.62316 16.7886 5.50356 15.2258 3.94076C13.663 2.37797 11.5434 1.5 9.33328 1.5C7.12316 1.5 5.00356 2.37797 3.44076 3.94076C1.87797 5.50356 1 7.62316 1 9.83328C1 12.0434 1.87797 14.163 3.44076 15.7258C5.00356 17.2886 7.12316 18.1666 9.33328 18.1666C11.5434 18.1666 13.663 17.2886 15.2258 15.7258Z"
                stroke="#0B1023"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {asButtons.map((item, index) => (
            <NavItemComponent
              key={index}
              item={item}
              index={index}
              extraClassnames="bg-secondary-light-teal"
            />
          ))}
        </nav>
      </div>

      {openSearchEngine && <SearchEngine onClose={() => setOpenSearchEngine(false)} />}
    </header>
  );
}
