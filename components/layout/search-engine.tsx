'use client';

import { buildClient } from '@datocms/cma-client';
import { useEffect, useState } from 'react';
import { useSiteSearch } from 'react-datocms';
import ReactPaginate from 'react-paginate';
import LoadingSpinner from '../shared/loading-spinner';

const client = buildClient({ apiToken: process.env.NEXT_PUBLIC_DATOCMS_SITE_SEARCH_TOKEN! });

type SearchEngineProps = {
  onClose: () => void;
};

export default function SearchEngine({ onClose }: SearchEngineProps) {
  const [query, setQuery] = useState<string>('');
  const [sent, setIsSent] = useState<boolean>(false);

  const { state, error, data } = useSiteSearch({
    client,
    initialState: { locale: 'en' },
    buildTriggerId: process.env.NEXT_PUBLIC_DATOCMS_BUILD_TRIGGER_ID!,
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
        className="hover:text-primary-teal absolute top-4 right-4 cursor-pointer font-sans text-5xl text-white transition"
      >
        &times;
      </button>

      <div className="mx-auto my-30 max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            state.setQuery(query);
            setIsSent(true);
          }}
          className="flex flex-col gap-3"
        >
          <h3 className="tracking-049 mb:text-4xl mb:leading-110 mb:mb-10 mb-5 font-sans text-[25px] leading-120 font-semibold">
            Explore Our Content
          </h3>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="text-primary-blue tracking-016 focus:to-primary-navy bg-primary-cream w-full rounded-[5px] border p-3.5 font-sans text-[16px] leading-135 focus:ring-1 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 group inline-block cursor-pointer rounded-md px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in"
          >
            Search
          </button>
        </form>

        {!data && !error && (
          <div className="my-5 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {error && <p className="my-5 text-red-400">Error! {error}</p>}

        {data && (
          <>
            <div className="my-5 space-y-4">
              {data.pageResults.map((result) => (
                <div key={result.id} className="rounded-sm border border-white/20 bg-white/10 p-4">
                  <a
                    href={result.url}
                    className="text-primary-cream text-xl font-semibold hover:underline"
                  >
                    {result.title}
                  </a>
                  <p className="mt-1 text-gray-300">{result.bodyExcerpt}</p>
                  <p className="mt-1 text-sm text-gray-400">{result.url}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-center">
              <ReactPaginate
                pageCount={data.totalPages}
                forcePage={state.page}
                onPageChange={({ selected }) => {
                  state.setPage(selected);
                }}
                containerClassName="font-sans flex gap-2 text-white"
                pageClassName="px-3 py-1 border border-white/20 rounded hover:bg-white/10"
                activeClassName="bg-primary-teal font-semibold text-primary-cream"
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
