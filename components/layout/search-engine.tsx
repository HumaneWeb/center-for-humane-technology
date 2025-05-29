'use client';

import { buildClient } from '@datocms/cma-client';
import { useEffect, useState } from 'react';
import { useSiteSearch } from 'react-datocms';
import ReactPaginate from 'react-paginate';

const client = buildClient({ apiToken: process.env.NEXT_PUBLIC_DATOCMS_SITE_SEARCH_TOKEN! });

type SearchEngineProps = {
  onClose: () => void;
};

export default function SearchEngine({ onClose }: SearchEngineProps) {
  const [query, setQuery] = useState<string>('');

  const { state, error, data } = useSiteSearch({
    client,
    initialState: { locale: 'en' },
    buildTriggerId: '7497',
    resultsPerPage: 10,
  });

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="bg-primary-navy fixed top-0 left-0 z-[100] h-full w-full overflow-y-auto p-6 text-white">
      <button
        onClick={onClose}
        aria-label="Close search"
        className="hover:text-secondary-light-teal absolute top-4 right-4 cursor-pointer font-sans text-5xl text-white transition"
      >
        &times;
      </button>

      <div className="mx-auto my-30 max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            state.setQuery(query);
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-sm bg-white px-4 py-2 text-black focus:ring-2 focus:outline-none"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {!data && !error && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-400">Error! {error}</p>}

        {data && (
          <>
            <div className="space-y-4">
              {data.pageResults.map((result) => (
                <div key={result.id} className="rounded-lg border border-white/20 bg-white/10 p-4">
                  <a
                    href={result.url}
                    className="text-xl font-semibold text-blue-300 hover:underline"
                  >
                    {result.title}
                  </a>
                  <p className="mt-1 text-gray-300">{result.bodyExcerpt}</p>
                  <p className="mt-1 text-sm text-gray-400">{result.url}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-gray-200">Total results: {data.totalResults}</p>

            <div className="mt-4 flex justify-center">
              <ReactPaginate
                pageCount={data.totalPages}
                forcePage={state.page}
                onPageChange={({ selected }) => {
                  state.setPage(selected);
                }}
                containerClassName="flex gap-2 text-white"
                pageClassName="px-3 py-1 border border-white/20 rounded hover:bg-white/10"
                activeClassName="bg-blue-600 text-white"
                previousLabel="<"
                nextLabel=">"
                previousClassName="px-3 py-1 border border-white/20 rounded hover:bg-white/10"
                nextClassName="px-3 py-1 border border-white/20 rounded hover:bg-white/10"
                disabledClassName="opacity-50 cursor-not-allowed"
                renderOnZeroPageCount={() => null}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
