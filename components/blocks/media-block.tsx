import Image from 'next/image';
import Link from 'next/link';

export default function MediaBlock() {
  return (
    <section className="my-20">
      <div className="mx-auto max-w-7xl">
        <div>
          <h2 className="text-primary-navy mb-12 text-center font-sans text-3xl leading-135 font-semibold">
            CHT in the media
          </h2>

          <div className="mb-16 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>{' '}
            <div>
              <Image
                src="https://www.datocms-assets.com/160835/1748432407-axios_logo-2020-1.svg"
                alt="CHT in the media 1"
                width={110}
                height={30}
              />
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/media"
              className="text-primary-teal mb-8 inline-block font-sans text-xl leading-120 font-bold underline"
            >
              View all media appearances
            </Link>
            <p className="text-primary-navy font-sans text-xl leading-120">
              Journalist or media enquiry?{' '}
              <Link
                href="/contact"
                className="text-primary-teal mb-8 font-sans text-xl leading-120 font-bold underline"
              >
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
