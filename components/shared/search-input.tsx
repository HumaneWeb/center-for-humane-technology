'use client';

import type React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type FilterInputProps = {
  value: string;
  placeholder?: string;
  className?: string;
};

export const SearchInput: React.FC<FilterInputProps> = ({
  value,
  placeholder = 'Search...',
  className = '',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get('search') as string;

    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M21 21L15.2258 15.2258M15.2258 15.2258C16.7886 13.663 17.6666 11.5434 17.6666 9.33328C17.6666 7.12316 16.7886 5.00356 15.2258 3.44076C13.663 1.87797 11.5434 1 9.33328 1C7.12316 1 5.00356 1.87797 3.44076 3.44076C1.87797 5.00356 1 7.12316 1 9.33328C1 11.5434 1.87797 13.663 3.44076 15.2258C5.00356 16.7886 7.12316 17.6666 9.33328 17.6666C11.5434 17.6666 13.663 16.7886 15.2258 15.2258Z"
            stroke="#0B1023"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        className="text-primary-blue tracking-016 focus:to-primary-navy mb:text-[16px] mb:leading-135 w-full rounded-[5px] border p-3.5 font-sans text-sm leading-120 focus:ring-1 focus:outline-none"
        defaultValue={value}
        autoComplete="off"
      />
    </form>
  );
};
