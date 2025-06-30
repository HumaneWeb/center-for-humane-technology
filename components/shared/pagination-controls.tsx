'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
  basePath?: string;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  searchQuery,
  basePath,
  className = '',
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (pageNumber > 1) params.set('page', pageNumber.toString());
    return `${basePath}${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const getVisiblePages = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={`mx-auto flex max-w-7xl items-center gap-1 px-4 pt-16 sm:px-6 lg:px-8 ${className}`}
      aria-label="Pagination"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex h-8 w-8 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-8 w-8 cursor-not-allowed items-center justify-center text-gray-300">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {visiblePages.map((pageNum, index) => {
        if (pageNum === '...') {
          return (
            <span key={index} className="flex h-8 w-8 items-center justify-center text-gray-400">
              ⋯
            </span>
          );
        }

        const isActive = pageNum === currentPage;
        return (
          <Link
            key={index}
            href={createPageUrl(pageNum as number)}
            className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary-navy text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-label={`Go to page ${pageNum}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNum}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex h-8 w-8 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-8 w-8 cursor-not-allowed items-center justify-center text-gray-300">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
