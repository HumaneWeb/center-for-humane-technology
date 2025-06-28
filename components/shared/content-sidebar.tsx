'use client';

import { cn } from '@/lib/utils/css.utils';
import type { SidebarItem } from '@/lib/utils/types';
import { handleClickJumpToSection } from '@/lib/utils/ui.utils';
import { useEffect, useState } from 'react';

interface ContentSidebarProps {
  items: SidebarItem[];
  className?: string;
}

function ContentSidebar({ items, className = '' }: ContentSidebarProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedItem((prev) => (prev === index ? null : index));
  };

  return (
    <div className="sticky top-20 self-start">
      <div>
        {items.map((item, index) => {
          const isActive = expandedItem === index;
          const hasChildLinks = item.sublinks.length > 0;

          return (
            <div key={index} className="mb-2 last:mb-0">
              <button
                onClick={() => {
                  if (hasChildLinks) toggleItem(index);
                  handleClickJumpToSection(item.headline, true);
                }}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between p-2.5 text-left transition-all duration-200 ease-in hover:bg-[#F0F7F7] focus:outline-none',
                  isActive && hasChildLinks && 'bg-[#F0F7F7]',
                  className,
                )}
              >
                <span
                  className={cn(
                    'mb:text-xl mb:leading-130 text-[18px] leading-140 font-semibold',
                    isActive && hasChildLinks ? 'text-primary-navy' : 'text-primary-teal',
                  )}
                >
                  {item.headline}
                </span>
                {hasChildLinks && (
                  <span>
                    {isActive ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.2228 14.4779C16.0295 14.671 15.7674 14.7795 15.4941 14.7795C15.2208 14.7795 14.9587 14.671 14.7653 14.4779L11.0253 10.7379L7.28532 14.4779C7.19091 14.5792 7.07706 14.6605 6.95056 14.7168C6.82406 14.7732 6.68751 14.8035 6.54904 14.8059C6.41057 14.8084 6.27303 14.7829 6.14463 14.731C6.01622 14.6792 5.89957 14.602 5.80165 14.504C5.70372 14.4061 5.62652 14.2895 5.57465 14.1611C5.52279 14.0327 5.49732 13.8951 5.49976 13.7566C5.5022 13.6182 5.53251 13.4816 5.58887 13.3551C5.64524 13.2286 5.7265 13.1148 5.82782 13.0204L10.2966 8.55162C10.4899 8.3585 10.752 8.25002 11.0253 8.25002C11.2986 8.25002 11.5607 8.3585 11.7541 8.55162L16.2228 13.0204C16.4159 13.2137 16.5244 13.4758 16.5244 13.7491C16.5244 14.0224 16.4159 14.2845 16.2228 14.4779Z"
                          fill="#293462"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.80257 8.55253C5.99593 8.35941 6.25804 8.25094 6.53132 8.25094C6.8046 8.25094 7.06671 8.35941 7.26007 8.55253L11.0001 12.2925L14.7401 8.55253C14.8345 8.45121 14.9483 8.36994 15.0748 8.31358C15.2013 8.25721 15.3379 8.22691 15.4764 8.22446C15.6148 8.22202 15.7524 8.24749 15.8808 8.29936C16.0092 8.35123 16.1258 8.42842 16.2237 8.52635C16.3217 8.62428 16.3989 8.74092 16.4507 8.86933C16.5026 8.99774 16.5281 9.13528 16.5256 9.27375C16.5232 9.41221 16.4929 9.54877 16.4365 9.67527C16.3802 9.80177 16.2989 9.91562 16.1976 10.01L11.7288 14.4788C11.5355 14.6719 11.2734 14.7804 11.0001 14.7804C10.7268 14.7804 10.4647 14.6719 10.2713 14.4788L5.80257 10.01C5.60945 9.81667 5.50098 9.55456 5.50098 9.28128C5.50098 9.008 5.60945 8.74589 5.80257 8.55253Z"
                          fill="#007981"
                        />
                      </svg>
                    )}
                  </span>
                )}
              </button>

              {isActive && hasChildLinks && (
                <div className="mb:pt-5 flex flex-col gap-4 pb-2 pl-[28px]">
                  {item.sublinks.map((subLink, subIndex) => (
                    <div key={subLink.id || subIndex}>
                      <span
                        onClick={() => {
                          handleClickJumpToSection(subLink.headline, true);
                        }}
                        className="text-primary-teal mb:text-xl mb:leading-130 block cursor-pointer p-2.5 text-[18px] leading-140 font-medium transition-all duration-200 ease-in hover:bg-[#F0F7F7]"
                      >
                        {subLink.headline}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface MobileSidebarWrapperProps {
  items: SidebarItem[];
  className?: string;
}

export default function MobileSidebarWrapper({ items, className }: MobileSidebarWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!isMobile) {
    return <ContentSidebar items={items} className={className} />;
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 z-50 h-full w-80 transform overflow-y-auto bg-white drop-shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <ContentSidebar items={items} className={className} />
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className="bg-primary-teal hover:bg-primary-navy focus:ring-primary-teal fixed bottom-6 left-6 z-50 transform cursor-pointer rounded-full p-4 text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        {sidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        )}
      </button>
    </>
  );
}
