// @ts-nocheck
'use client';

import type React from 'react';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CustomLink from '../shared/custom-link';
import SearchEngine from './search-engine';
import type { NavbarChildren } from '@/lib/utils/types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils/css.utils';
import { usePathname } from 'next/navigation';

type Props = {
  items: NavbarChildren[];
};

export default function Navbar({ items }: Props) {
  const pathname = usePathname();
  const shouldNavbarBeFixed = pathname.includes('/case-study/');

  const [openSearchEngine, setOpenSearchEngine] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar when near top
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const dropdownElement = dropdownRefs.current[openDropdown!];
    const buttonElement = buttonRefs.current[openDropdown!];

    if (
      dropdownElement &&
      buttonElement &&
      !dropdownElement.contains(event.target as Node) &&
      !buttonElement.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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
    isMobile = false,
  }: {
    item: NavbarChildren;
    index: number;
    extraClassnames?: string;
    isMobile?: boolean;
  }) => {
    const hasDropdown = item.children.length > 0;
    const isOpen = openDropdown === index;

    const baseClasses = isMobile
      ? `uppercase text-primary-navy flex items-center justify-between px-4 py-3 font-sans text-[16px] leading-140 font-semibold tracking-018 hover:bg-accent transition-colors ${extraClassnames ? extraClassnames : ''}`
      : `uppercase text-primary-navy border-primary-navy flex h-full items-center justify-center gap-2.5 border-l-[1px] px-4 xl:px-8 font-sans text-[16px] xl:text-[18px] leading-140 font-semibold tracking-018 ${extraClassnames ? extraClassnames : ''}`;

    const renderDropdownItem = (dropdownItem: NavbarChildren, depth = 1) => {
      const hasChildren = dropdownItem.children && dropdownItem.children.length > 0;
      const [submenuOpen, setSubmenuOpen] = useState(false);
      const [openToLeft, setOpenToLeft] = useState(false);
      const submenuRef = useRef<HTMLDivElement>(null);
      const buttonRef = useRef<HTMLDivElement>(null);

      useLayoutEffect(() => {
        if (!submenuOpen || isMobile) return;

        const buttonEl = buttonRef.current;
        const submenuEl = submenuRef.current;

        if (buttonEl && submenuEl) {
          const buttonRect = buttonEl.getBoundingClientRect();
          const submenuWidth = submenuEl.offsetWidth;
          const spaceRight = window.innerWidth - buttonRect.right;

          setOpenToLeft(spaceRight < submenuWidth);
        }
      }, [submenuOpen, isMobile]);

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            submenuRef.current &&
            !submenuRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
          ) {
            setSubmenuOpen(false);
          }
        };
        if (!isMobile) {
          document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      if (!hasChildren) {
        return (
          <CustomLink
            key={dropdownItem.label}
            content={dropdownItem.link}
            onClick={() => {
              setOpenDropdown(null);
              if (isMobile) setIsMobileMenuOpen(false);
            }}
            withActiveClass
          >
            <div
              className={cn(
                'text-primary-navy tracking-02 hover:text-primary-teal flex items-center justify-between gap-2 font-sans leading-120 font-medium transition-all duration-200',
                isMobile ? 'px-4 py-2 text-[16px]' : 'text-[16px] xl:text-[18px]',
              )}
            >
              {dropdownItem.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="h-[20px] w-[20px]"
              >
                <path
                  d="M15.75 5.25L24.5 14M24.5 14L15.75 22.75M24.5 14H3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </CustomLink>
        );
      }

      return (
        <div key={dropdownItem.label} className="relative w-full">
          <div
            ref={buttonRef}
            className={cn(
              'text-primary-navy tracking-02 hover:text-primary-teal flex cursor-pointer items-center justify-between gap-2 font-sans leading-120 font-medium transition-all duration-200',
              isMobile ? 'px-4 py-2 text-[16px]' : 'text-[16px] xl:text-[18px]',
            )}
            onClick={() => {
              setSubmenuOpen((prev) => !prev);
            }}
          >
            {dropdownItem.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="h-[20px] w-[20px]"
            >
              <path
                d="M15.75 5.25L24.5 14M24.5 14L15.75 22.75M24.5 14H3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>

          <div
            ref={submenuRef}
            className={cn(
              isMobile
                ? submenuOpen
                  ? 'max-h-screen overflow-hidden pl-5 transition-all'
                  : 'max-h-0 overflow-hidden transition-all'
                : cn(
                    'border-primary-navy bg-neutral-white absolute top-0 z-50 min-w-[300px] flex-col gap-5 border px-5 py-4 shadow-sm',
                    submenuOpen ? 'flex' : 'hidden',
                    openToLeft ? 'right-[calc(100%+1.3rem)]' : 'left-[calc(100%+1.3rem)]',
                  ),
            )}
          >
            {dropdownItem.children!.map((child) => renderDropdownItem(child, depth + 1))}
          </div>
        </div>
      );
    };

    if (!hasDropdown) {
      return (
        <CustomLink
          content={item.link}
          extraClass={baseClasses}
          withActiveClass
          onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          {item.label}

          {!isMobile && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path d="M10.5 9L5.25 13.7631L5.25 4.23686L10.5 9Z" fill="#0B1023" />
            </svg>
          )}
        </CustomLink>
      );
    }

    return (
      <div className="has-[.active-link]:[&>button>span]:text-primary-teal has-[.active-link]:[&>button>svg>path]:fill-primary-teal relative">
        <button
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
          onClick={() => toggleDropdown(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn(
            isMobile
              ? 'text-primary-navy tracking-018 hover:text-primary-teal flex w-full cursor-pointer items-center justify-between px-4 py-3 font-sans text-[16px] leading-140 font-semibold uppercase transition-all duration-200'
              : 'text-primary-navy border-primary-navy tracking-018 hover:text-primary-teal flex h-full cursor-pointer items-center justify-center gap-2.5 border-l-[1px] px-6 font-sans text-[16px] leading-140 font-semibold uppercase transition-all duration-200 xl:px-8 xl:text-[18px]',
            extraClassnames,
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={`dropdown-${index}`}
        >
          <span>{item.label}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            className={cn('transition-transform duration-200', isOpen && isMobile && 'rotate-180')}
          >
            <path d="M6.5 11.5L1.73686 6.25L11.2631 6.25L6.5 11.5Z" fill="currentColor" />
          </svg>
        </button>

        <div
          ref={(el) => {
            dropdownRefs.current[index] = el;
          }}
          id={`dropdown-${index}`}
          className={cn(
            'bg-neutral-white border-primary-navy transition-all duration-300 ease-in-out',
            isMobile
              ? isOpen
                ? 'block max-h-screen border-t-[1px] opacity-100'
                : 'hidden max-h-0 opacity-0'
              : cn(
                  'absolute top-full left-0 z-50 hidden w-64 flex-col gap-5 border-[1px] px-5 py-4 shadow-sm',
                  isOpen && 'flex',
                ),
          )}
          role="menu"
          aria-orientation="vertical"
          onKeyDown={(e) => handleDropdownKeyDown(e, index)}
        >
          <div className={cn(isMobile ? 'space-y-1 py-2' : 'flex flex-col gap-5')}>
            {item
              .children!.filter((i) => !i.hideItem)
              .map((dropdownItem) => renderDropdownItem(dropdownItem))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.header
      className="ui-navbar border-primary-navy bg-neutral-white fixed top-0 right-0 left-0 z-40 border-b-[1px]"
      initial={{ y: 0 }}
      animate={shouldNavbarBeFixed ? {} : { y: isVisible ? 0 : -1000 }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div className="mb:px-0 mb:gap-0 flex h-16 items-center justify-between gap-7 px-4">
        <div className="mb:pl-4 flex items-center">
          <Link href="/" className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="372"
              height="40"
              viewBox="0 0 372 40"
              fill="none"
              className="max-w-[250px] max-w-full"
            >
              <g clipPath="url(#clip0_3098_2373)">
                <path
                  d="M372 0H366.815V1.81854L369.648 2.29089V37.6146L366.689 37.9217V39.7481H372V0Z"
                  fill="#0B1023"
                />
                <path
                  d="M0 40H5.18459V38.1815L2.35234 37.7091V2.39323L5.31046 2.07833V0.259792H0V40Z"
                  fill="#0B1023"
                />
                <path
                  d="M81.0649 28.7424V15.5481H83.9523V17.8469H84.0152C84.3456 16.3826 85.6752 15.3592 87.1779 15.4064C87.5004 15.4064 87.8309 15.4379 88.1456 15.5245V18.2562C87.7443 18.1303 87.3195 18.0752 86.9025 18.0831C85.1402 18.0831 84.0781 19.2403 84.0781 21.0903V28.7502H81.0728L81.0649 28.7424Z"
                  fill="#0B1023"
                />
                <path
                  d="M79.0668 22.8931V21.8855C79.0668 17.8862 76.7223 15.3592 73.0325 15.3592C69.3427 15.3592 66.8252 18.0437 66.8252 22.2004C66.8252 26.357 69.2405 28.9392 73.1348 28.9392C76.2031 28.9392 78.5397 27.2545 78.9331 24.8219H76.1087C75.7625 25.9083 74.6375 26.6011 73.1899 26.6168C71.1758 26.6168 69.8227 25.1998 69.8227 23.0742V22.8931H79.0668ZM73.0168 17.7052C74.8027 17.7052 76.03 18.9648 76.0929 20.8699H69.8384C69.9721 18.9884 71.2545 17.7052 73.0168 17.7052Z"
                  fill="#0B1023"
                />
                <path
                  d="M59.9803 12.5959H62.9857V15.5481H65.4875V17.8705H62.9857V24.8298C62.9857 25.9162 63.4892 26.4357 64.5827 26.4357C64.8817 26.4357 65.1807 26.4121 65.4718 26.3728V28.6951C64.9525 28.7817 64.4175 28.8211 63.8904 28.8132C61.0896 28.8132 59.9803 27.7977 59.9803 25.2549V17.8705H58.1787V15.5481H59.9803V12.5959Z"
                  fill="#0B1023"
                />
                <path
                  d="M44.9698 28.7424V15.5481H47.8492V17.8469H47.9122C48.6832 16.2409 50.0285 15.3985 52.0504 15.3985C54.9692 15.3985 56.6371 17.2486 56.6371 20.2952V28.7502H53.6317V20.8778C53.6317 18.9963 52.7349 17.9335 50.9254 17.9335C49.1159 17.9335 47.9672 19.2324 47.9672 21.1691V28.7424H44.9619H44.9698Z"
                  fill="#0B1023"
                />
                <path
                  d="M42.9633 22.8931V21.8855C42.9633 17.8862 40.6188 15.3592 36.929 15.3592C33.2392 15.3592 30.7217 18.0437 30.7217 22.2004C30.7217 26.357 33.137 28.9392 37.0313 28.9392C40.0996 28.9392 42.4362 27.2545 42.8295 24.8219H40.0052C39.659 25.9083 38.534 26.6011 37.0864 26.6168C35.0723 26.6168 33.7191 25.1998 33.7191 23.0742V22.8931H42.9633ZM36.9133 17.7052C38.6992 17.7052 39.9265 18.9648 39.9894 20.8699H33.7349C33.8686 18.9884 35.151 17.7052 36.9133 17.7052Z"
                  fill="#0B1023"
                />
                <path
                  d="M21.6508 29.0337C16.6786 29.0337 13.5396 25.6091 13.5396 20.0276C13.5396 14.446 16.6944 11.0215 21.6508 11.0215C25.6946 11.0215 28.7708 13.5485 29.1641 17.2879H26.0958C25.7261 15.1387 23.8301 13.5957 21.6508 13.6666C18.6612 13.6666 16.7337 16.1307 16.7337 20.0197C16.7337 23.9087 18.6455 26.3649 21.6823 26.3649C24.0031 26.3649 25.6395 25.121 26.1273 23.0191H29.1799C28.637 26.7506 25.7654 29.0258 21.6508 29.0258"
                  fill="#0B1023"
                />
                <path
                  d="M223.755 22.9089V21.9012C223.755 17.902 221.411 15.3749 217.721 15.3749C214.031 15.3749 211.514 18.0358 211.514 22.2161C211.514 26.3964 213.905 28.9549 217.815 28.9549C220.884 28.9549 223.22 27.2702 223.614 24.8376H220.789C220.443 25.924 219.326 26.6168 217.87 26.6325C215.856 26.6325 214.503 25.2155 214.503 23.0899V22.9089H223.755ZM217.69 17.7209C219.483 17.7209 220.711 18.9805 220.781 20.8856H214.519C214.653 19.0041 215.927 17.7209 217.697 17.7209H217.69Z"
                  fill="#0B1023"
                />
                <path
                  d="M197.879 28.7817V15.5639H200.767V17.8626H200.83C201.601 16.2566 202.946 15.4143 204.968 15.4143C207.887 15.4143 209.555 17.2643 209.555 20.3188V28.7739H206.549V20.9014C206.549 19.0199 205.66 17.9571 203.843 17.9571C202.025 17.9571 200.885 19.2561 200.885 21.1927V28.766L197.879 28.7817Z"
                  fill="#0B1023"
                />
                <path
                  d="M189.91 15.3907C186.818 15.3907 184.576 17.1147 184.505 19.5316H187.282C187.487 18.4688 188.462 17.7603 189.831 17.7603C191.452 17.7603 192.388 18.5239 192.388 19.9252V20.8935L188.958 21.0982C185.638 21.3029 183.836 22.657 183.836 25.003C183.836 27.3489 185.693 28.9234 188.289 28.9234V28.9077C190.036 28.9077 191.672 28.0496 192.396 26.6562H192.467V28.7817H195.338V19.7363C195.338 17.1147 193.199 15.3985 189.91 15.3985V15.3907ZM192.38 23.8614C192.38 25.4674 190.996 26.6011 189.17 26.6011C187.77 26.6011 186.85 25.9398 186.85 24.8612C186.85 23.7827 187.715 23.1608 189.359 23.0506L192.373 22.8538V23.8536L192.38 23.8614Z"
                  fill="#0B1023"
                />
                <path
                  d="M163.027 28.766V15.5639H165.93V17.8862H165.993C166.583 16.3432 168.094 15.3513 169.746 15.4143C171.603 15.4143 172.948 16.3511 173.436 18.0358H173.499C174.136 16.4141 175.717 15.4143 177.613 15.4143C180.21 15.4143 181.925 17.1541 181.925 19.7835V28.766H178.919V20.5078C178.919 18.8624 178.054 17.9413 176.504 17.9413C174.954 17.9413 173.939 19.0592 173.939 20.6731V28.766H171.021V20.3503C171.021 18.8624 170.108 17.9492 168.645 17.9492C167.181 17.9492 166.056 19.1065 166.056 20.7518V28.7739H163.027V28.766Z"
                  fill="#0B1023"
                />
                <path
                  d="M160.085 15.5639V28.766H157.197V26.4436H157.127C156.403 28.0496 155.089 28.9234 153.083 28.9234C150.211 28.9234 148.41 27.0577 148.41 24.0189V15.5639H151.415V23.4285C151.415 25.3572 152.343 26.3885 154.121 26.3885C155.899 26.3885 157.079 25.0974 157.079 23.1372V15.5639H160.085Z"
                  fill="#0B1023"
                />
                <path
                  d="M145.672 28.7581H142.58V21.2006H134.083V28.7581H130.968V11.3127H134.083V18.5554H142.556V11.3127H145.64L145.672 28.7581Z"
                  fill="#0B1023"
                />
                <path
                  d="M348.185 33.6627C348.004 33.6627 347.178 33.639 346.997 33.5997V31.2065C347.273 31.2458 347.548 31.2616 347.816 31.2537C349.098 31.2537 349.806 30.7577 350.176 29.5139L350.349 28.8919L345.628 15.6505H348.901L352.064 26.2547H352.119L355.274 15.6505H358.452L353.669 29.3171C352.552 32.5526 351.136 33.6548 348.177 33.6548"
                  fill="#0B1023"
                />
                <path
                  d="M341.207 15.6583V17.8705H341.152C340.334 16.3511 338.721 15.4379 336.998 15.5088C333.639 15.5088 331.491 18.1775 331.491 22.2082C331.491 26.2389 333.67 28.8054 336.935 28.8054C338.831 28.8054 340.381 27.9236 341.074 26.5145H341.144V28.7581C341.144 30.3877 339.878 31.3875 337.919 31.3875C336.408 31.3875 335.228 30.7971 334.976 29.8445H331.971C332.199 32.1511 334.528 33.639 337.824 33.639C341.695 33.639 344.15 31.6867 344.15 28.5377V15.6662H341.2L341.207 15.6583ZM337.824 26.3806C335.85 26.3806 334.559 24.814 334.559 22.2318C334.559 19.6497 335.818 18.0122 337.824 18.0122C339.831 18.0122 341.144 19.689 341.144 22.224C341.144 24.7589 339.831 26.3806 337.824 26.3806Z"
                  fill="#0B1023"
                />
                <path
                  d="M312.208 28.8526V10.6357H315.213V28.8762L312.208 28.8526Z"
                  fill="#0B1023"
                />
                <path
                  d="M283.783 28.8526V15.6583H286.663V17.9571H286.718C287.489 16.3511 288.834 15.5088 290.856 15.5088C293.775 15.5088 295.443 17.3588 295.443 20.4054V28.8605H292.453V20.988C292.453 19.1065 291.564 18.0437 289.747 18.0437C287.929 18.0437 286.789 19.3426 286.789 21.2793V28.8526H283.775H283.783Z"
                  fill="#0B1023"
                />
                <path
                  d="M269.465 28.8526V10.6357H272.439V17.9807H272.502C273.273 16.3747 274.649 15.5324 276.663 15.5324C279.574 15.5324 281.297 17.4611 281.297 20.4605V28.8919H278.284V21.0352C278.284 19.1773 277.356 18.0516 275.531 18.0516C273.705 18.0516 272.478 19.3663 272.478 21.3344V28.8605H269.473L269.465 28.8526Z"
                  fill="#0B1023"
                />
                <path
                  d="M267.883 20.3267H265.051C264.831 18.9333 263.792 17.9256 262.101 17.9256C260.126 17.9256 258.828 19.5946 258.828 22.2476C258.828 24.9006 260.134 26.5932 262.109 26.5932C263.713 26.5932 264.776 25.7666 265.059 24.2708H267.891C267.639 27.16 265.381 29.0573 262.093 29.0573C258.261 29.0573 255.783 26.4672 255.783 22.2555C255.783 18.0437 258.254 15.4773 262.069 15.4773C265.507 15.4694 267.671 17.5871 267.875 20.3267"
                  fill="#0B1023"
                />
                <path
                  d="M254.351 23.0033V21.9957C254.351 17.9965 252.007 15.4694 248.317 15.4694C244.627 15.4694 242.11 18.1539 242.11 22.3106C242.11 26.4672 244.525 29.0494 248.419 29.0494C251.488 29.0494 253.824 27.3647 254.218 24.9321H251.378C251.024 26.0185 249.906 26.7113 248.459 26.727C246.445 26.727 245.092 25.31 245.092 23.1844V23.0033H254.359H254.351ZM248.278 17.8154C250.064 17.8154 251.291 19.075 251.354 20.9801H245.099C245.233 19.0986 246.516 17.8154 248.27 17.8154H248.278Z"
                  fill="#0B1023"
                />
                <path
                  d="M237.901 28.8526H234.785V14.0602H229.491V11.4072H243.18V14.0445H237.901V28.8526Z"
                  fill="#0B1023"
                />
                <path
                  d="M303.743 15.4694C299.88 15.4694 297.394 18.0279 297.394 22.2476C297.394 26.4672 299.857 29.0494 303.743 29.0494C307.629 29.0494 310.108 26.3964 310.108 22.2318C310.108 18.0673 307.606 15.4694 303.743 15.4694ZM303.743 26.6483C301.69 26.6483 300.447 25.0187 300.447 22.2633C300.447 19.508 301.674 17.8784 303.743 17.8784C305.812 17.8784 307.055 19.5001 307.055 22.2633C307.055 25.0266 305.82 26.6483 303.743 26.6483Z"
                  fill="#0B1023"
                />
                <path
                  d="M323.679 15.4694C319.816 15.4694 317.33 18.0279 317.33 22.2476C317.33 26.4672 319.792 29.0494 323.679 29.0494C327.565 29.0494 330.043 26.3964 330.043 22.2318C330.043 18.0673 327.541 15.4694 323.679 15.4694ZM323.679 26.6483C321.625 26.6483 320.382 25.0187 320.382 22.2633C320.382 19.508 321.617 17.8784 323.679 17.8784C325.74 17.8784 326.983 19.5001 326.983 22.2633C326.983 25.0266 325.748 26.6483 323.679 26.6483Z"
                  fill="#0B1023"
                />
                <path
                  d="M116.618 28.7424V15.5481H119.497V17.8469H119.56C119.89 16.3826 121.22 15.3592 122.723 15.4064C123.053 15.4064 123.376 15.4379 123.69 15.5245V18.2562C123.289 18.1303 122.864 18.0752 122.447 18.0831C120.685 18.0831 119.623 19.2403 119.623 21.0903V28.7502H116.618V28.7424Z"
                  fill="#0B1023"
                />
                <path
                  d="M95.3445 28.7424V17.8626H93.5508V15.5402H95.3445V14.3594C95.3445 11.8559 96.501 10.7931 99.3411 10.7931C99.8289 10.7931 100.317 10.8246 100.797 10.9112V13.0998C100.482 13.0289 100.159 12.9974 99.8289 13.0053C98.7511 13.0053 98.3027 13.454 98.3027 14.4932V15.5402H100.804V17.8626H98.342V28.7345H95.3367L95.3445 28.7424Z"
                  fill="#0B1023"
                />
                <path
                  d="M114.612 22.1374C114.612 17.9571 112.11 15.3592 108.247 15.3592C104.384 15.3592 101.898 17.9177 101.898 22.1374C101.898 26.357 104.36 28.9392 108.239 28.9392C112.141 28.9392 114.604 26.3098 114.604 22.1374H114.612ZM108.255 26.5381H108.247C106.194 26.5381 104.966 24.9085 104.966 22.1531C104.966 19.3978 106.201 17.7682 108.263 17.7682C110.324 17.7682 111.567 19.3899 111.567 22.1531C111.567 24.9164 110.332 26.5381 108.263 26.5381H108.255Z"
                  fill="#0B1023"
                />
              </g>
              <defs>
                <clipPath id="clip0_3098_2373">
                  <rect width="372" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sxl:hidden cursor-pointer p-2"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#0B1023"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="#0B1023"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="sxl:flex hidden h-full items-stretch">
          {normal.map((item, index) => (
            <NavItemComponent key={index} item={item} index={index} />
          ))}

          {/* Search engine */}
          <button
            className="hover:text-primary-teal cursor-pointer border-l-[1px] px-5 transition-all duration-200 xl:px-8"
            onClick={() => setOpenSearchEngine((prev) => !prev)}
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
            >
              <path
                d="M21 21.5L15.2258 15.7258M15.2258 15.7258C16.7886 14.163 17.6666 12.0434 17.6666 9.83328C17.6666 7.62316 16.7886 5.50356 15.2258 3.94076C13.663 2.37797 11.5434 1.5 9.33328 1.5C7.12316 1.5 5.00356 2.37797 3.44076 3.94076C1.87797 5.50356 1 7.62316 1 9.83328C1 12.0434 1.87797 14.163 3.44076 15.7258C5.00356 17.2886 7.12316 18.1666 9.33328 18.1666C11.5434 18.1666 13.663 17.2886 15.2258 15.7258Z"
                stroke="currentColor"
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

      {/* Mobile Navigation - Conventional Dropdown */}
      <div
        className={cn(
          'sxl:hidden border-primary-navy overflow-hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'max-h-screen border-t-[1px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="mb:py-4 space-y-2">
          {normal.map((item, index) => (
            <NavItemComponent key={index} item={item} index={index} isMobile={true} />
          ))}

          {/* Mobile Search Button */}
          <button
            className="text-primary-navy hover:text-primary-teal flex w-full cursor-pointer items-center justify-between px-4 py-3 font-sans text-[16px] leading-140 font-semibold uppercase transition-all duration-200"
            onClick={() => {
              setOpenSearchEngine((prev) => !prev);
              setIsMobileMenuOpen(false);
            }}
          >
            <span>Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
            >
              <path
                d="M21 21.5L15.2258 15.7258M15.2258 15.7258C16.7886 14.163 17.6666 12.0434 17.6666 9.83328C17.6666 7.62316 16.7886 5.50356 15.2258 3.94076C13.663 2.37797 11.5434 1.5 9.33328 1.5C7.12316 1.5 5.00356 2.37797 3.44076 3.94076C1.87797 5.50356 1 7.62316 1 9.83328C1 12.0434 1.87797 14.163 3.44076 15.7258C5.00356 17.2886 7.12316 18.1666 9.33328 18.1666C11.5434 18.1666 13.663 17.2886 15.2258 15.7258Z"
                stroke="currentColor"
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
              isMobile={true}
            />
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {openSearchEngine && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SearchEngine onClose={() => setOpenSearchEngine(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
