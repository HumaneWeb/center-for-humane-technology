import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <section className="pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container m-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="text-center">
                <h3 className="mb-4 font-sans text-3xl font-bold text-black sm:text-4xl">
                  Sorry, the page can&apos;t be found
                </h3>
                <p className="text-body-color mb-10 font-sans text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed">
                  The page you were looking for appears to have been moved, deleted or does not
                  exist.
                </p>
                <Link
                  href="/"
                  className="bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-block rounded-md px-5 py-4 text-xl leading-120 font-semibold transition-colors"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
