import React from 'react';
import Link from 'next/link';
import { executeQuery } from '@/lib/cms/executeQuery';
import { FooterQuery } from '@/lib/cms/query';
import CustomImage from '../shared/custom-image';
import CustomLink from '../shared/custom-link';

export default async function Footer() {
  const { footer } = await executeQuery(FooterQuery);
  const {
    logo,
    columns,
    generalQuestionsEmail,
    mediaInquiriesEmail,
    extraLinks,
    copyrightText,
    facebookUrl,
    twitterXUrl,
    linkedinUrl,
    youtubeUrl,
  } = footer!;

  return (
    <footer className="bg-primary-blue text-neutral-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b-[1px] border-[#4F5984] pb-12">
          <Link href="/">
            <CustomImage {...logo} />
          </Link>
          <div className="flex gap-3">
            {facebookUrl && (
              <Link href={facebookUrl} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="36"
                  viewBox="0 0 35 36"
                  fill="none"
                >
                  <circle cx="17.5" cy="18" r="17" fill="#293462" stroke="white" />
                  <path
                    d="M19.1851 19.3519H21.5925L22.5554 15.5001H19.1851V13.5741C19.1851 12.5823 19.1851 11.6482 21.111 11.6482H22.5554V8.41265C22.2415 8.37124 21.0561 8.27783 19.8043 8.27783C17.1898 8.27783 15.3332 9.87346 15.3332 12.8038V15.5001H12.4443V19.3519H15.3332V27.5371H19.1851V19.3519Z"
                    fill="white"
                  />
                </svg>
              </Link>
            )}
            {twitterXUrl && (
              <Link href={twitterXUrl} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="36"
                  viewBox="0 0 35 36"
                  fill="none"
                >
                  <circle cx="17.5" cy="18" r="17" fill="#293462" stroke="white" />
                  <path
                    d="M19.3703 17.1988L25.1621 10.6113H23.7901L18.7589 16.33L14.7435 10.6113H10.1111L16.1845 19.2598L10.1111 26.1669H11.4831L16.7927 20.1265L21.0342 26.1669H25.6666M11.9783 11.6237H14.086L23.7891 25.2043H21.6808"
                    fill="white"
                  />
                </svg>
              </Link>
            )}
            {linkedinUrl && (
              <Link href={linkedinUrl} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="36"
                  viewBox="0 0 35 36"
                  fill="none"
                >
                  <circle cx="17.5" cy="18" r="17" fill="#293462" stroke="white" />
                  <path
                    d="M14.0227 23.8336H11.1202V15.0057H14.0227V23.8336ZM12.5699 13.8016C11.6417 13.8016 10.8889 13.0755 10.8889 12.1989C10.8889 11.7779 11.066 11.3741 11.3813 11.0763C11.6965 10.7786 12.124 10.6113 12.5699 10.6113C13.0157 10.6113 13.4432 10.7786 13.7585 11.0763C14.0737 11.3741 14.2508 11.7779 14.2508 12.1989C14.2508 13.0755 13.4977 13.8016 12.5699 13.8016ZM24.8858 23.8336H21.9895V19.5362C21.9895 18.5121 21.9677 17.1987 20.4805 17.1987C18.9714 17.1987 18.7402 18.3114 18.7402 19.4624V23.8336H15.8408V15.0057H18.6245V16.2099H18.6652C19.0527 15.5164 19.9992 14.7844 21.4114 14.7844C24.3489 14.7844 24.8889 16.6113 24.8889 18.9843V23.8336H24.8858Z"
                    fill="white"
                  />
                </svg>
              </Link>
            )}
            {youtubeUrl && (
              <Link href={youtubeUrl} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="36"
                  viewBox="0 0 35 36"
                  fill="none"
                >
                  <circle cx="17.5" cy="18" r="17" fill="#293462" stroke="white" />
                  <path
                    d="M26.8323 13.5792C26.6176 12.717 25.9851 12.0379 25.1819 11.8074C23.7262 11.3887 17.889 11.3887 17.889 11.3887C17.889 11.3887 12.0518 11.3887 10.5961 11.8074C9.79293 12.0379 9.1604 12.717 8.94572 13.5792C8.55566 15.1421 8.55566 18.4028 8.55566 18.4028C8.55566 18.4028 8.55566 21.6636 8.94572 23.2264C9.1604 24.0887 9.79293 24.7395 10.5961 24.9699C12.0518 25.3887 17.889 25.3887 17.889 25.3887C17.889 25.3887 23.7262 25.3887 25.1819 24.9699C25.9851 24.7395 26.6176 24.0887 26.8323 23.2264C27.2223 21.6636 27.2223 18.4028 27.2223 18.4028C27.2223 18.4028 27.2223 15.1421 26.8323 13.5792ZM15.9799 21.3633V15.4423L20.8587 18.4029L15.9799 21.3633Z"
                    fill="white"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8 border-b-[1px] border-[#4F5984]">
          <div className="flex flex-col gap-10 border-r-[1px] border-[#4F5984] pt-9 pb-20">
            <div>
              <h3 className="tracking-02 mb-4 font-sans text-xl leading-120 font-semibold">
                Media Inquiries
              </h3>
              <p>
                <a
                  href={`mailto:${mediaInquiriesEmail}`}
                  className="text-neutral-white font-sans text-lg font-medium underline"
                >
                  {mediaInquiriesEmail}
                </a>
              </p>
            </div>

            <div>
              <h3 className="tracking-02 mb-4 font-sans text-xl leading-120 font-semibold">
                General Questions
              </h3>
              <p>
                <a
                  href={`mailto:${generalQuestionsEmail}`}
                  className="text-neutral-white font-sans text-lg font-medium underline"
                >
                  {generalQuestionsEmail}
                </a>
              </p>
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.id} className="pt-9">
              <h3 className="tracking-02 mb-4 font-sans text-xl leading-120 font-semibold">
                {column.headline}
              </h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.id} className="mb-4">
                    <Link
                      href="/"
                      className="text-neutral-white font-sans text-lg leading-135 font-normal"
                    >
                      TODO: ADD LABEL
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-9">
          <p className="tracking-013 font-sans text-[13px] leading-120 font-medium">
            {extraLinks.map((extraLink) => (
              <React.Fragment key={extraLink.id}>
                <CustomLink extraClass="underline">TODO: ADD LABEL</CustomLink>
                {' | '}
              </React.Fragment>
            ))}
            © {new Date().getFullYear()} {copyrightText}
          </p>
          <Link
            href="https://tectonica.co"
            className="tracking-013 font-sans text-[13px] leading-120 font-medium"
          >
            Built by Tectonica
          </Link>
        </div>
      </div>
    </footer>
  );
}
