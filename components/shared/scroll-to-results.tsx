'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ScrollToResults() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const page = searchParams.get('page');

  useEffect(() => {
    if (search || page) {
      const el = document.getElementById('podcasts-grid');
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 120,
          behavior: 'auto',
        });
      }
    }
  }, [search]);

  return null;
}
