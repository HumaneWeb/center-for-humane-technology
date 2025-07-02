// @ts-nocheck
'use client';

import { StructuredText } from 'react-datocms';
import NewsletterBlock from '../blocks/newsletter-block';
import PodcastMinimalCard from '../shared/podcast-minimal-card';
import Cta from '../shared/cta';
import CustomLink from '../shared/custom-link';
import CustomImage from '../shared/custom-image';
import { formatDate } from '@/lib/utils/date.utils';
import { useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from 'lucide-react';

export default function PodcastDetail({
  podcast,
  podcastList,
  configuration,
}: {
  podcast: any;
  podcastList: any;
  configuration: any;
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    title,
    content,
    directDownloadLink,
    image,
    date,
    episode,
    substackUrl,
    videoUrl,
    recommendedMedia,
    majorTakeaways,
    moreListening = [],
  } = podcast!;

  const { applePodcastsUrl, spotifyUrl, youtubeUrl } = podcastList;

  return (
    <>
      <div className="bg-gradient-podcast-list mb:min-h-[700px] mb:pb-0 pt-10 pb-8">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <CustomLink
            content={{ content: podcastList }}
            extraClass="flex items-center gap-2 mb-5 mb:mb-14"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.75 19.5L8.25 12L15.75 4.5"
                stroke="#293462"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-primary-blue mb:text-xl font-sans text-[18px] leading-120 font-semibold underline">
              All episodes
            </span>
          </CustomLink>

          <div className="mb:grid-cols-[1.2fr_2fr] mb:gap-10 grid gap-5">
            <div>
              {image && (
                <CustomImage
                  {...image}
                  extraClass="mb-0 mb:mb-10 mb:w-[400px] w-full mb:h-[400px]"
                />
              )}

              {(applePodcastsUrl || spotifyUrl || youtubeUrl) && (
                <div className="mb:gap-10 my-5 flex flex-wrap items-center gap-5">
                  {applePodcastsUrl && (
                    <a
                      href={applePodcastsUrl}
                      target="_blank"
                      className="flex items-center gap-2.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31"
                        height="32"
                        viewBox="0 0 31 32"
                        fill="none"
                      >
                        <path
                          d="M6.89751 0.500027C3.08355 0.489371 -0.0106288 3.58355 2.74423e-05 7.39751V24.6025C-0.0106288 28.4164 3.08355 31.5106 6.89751 31.5H24.1025C27.9164 31.5106 31.0106 28.4164 31 24.6025V7.39751C31.0106 3.58355 27.9164 0.489371 24.1025 0.500027H6.89751ZM15.3227 3.81412C18.3404 3.81412 21.0693 4.98049 23.1492 7.1592C24.7293 8.79929 25.6166 10.5392 26.071 12.8312C26.2269 13.5936 26.2269 15.6716 26.0797 16.5289C25.5953 19.2579 24.1025 21.7011 21.8976 23.3712C21.111 23.967 19.188 25.0016 18.88 25.0016C18.7637 25.0016 18.755 24.8854 18.8054 24.4058C18.9013 23.6386 18.9914 23.4826 19.4254 23.3005C20.1161 23.0137 21.297 22.17 22.0187 21.4492C23.279 20.1869 24.178 18.6088 24.612 16.8777C24.8843 15.8121 24.8484 13.4454 24.551 12.3517C23.6123 8.86904 20.7661 6.16624 17.2854 5.43871C16.2769 5.23236 14.4344 5.23236 13.4104 5.43871C9.88804 6.16624 6.97114 9.00661 6.08377 12.5793C5.84642 13.552 5.84642 15.9196 6.08377 16.8883C6.67373 19.255 8.20339 21.4231 10.2058 22.7154C10.6001 22.9779 11.0738 23.2453 11.2714 23.3266C11.7044 23.5126 11.8013 23.6705 11.8808 24.431C11.9311 24.9009 11.9205 25.0316 11.811 25.0316C11.7403 25.0316 11.2104 24.804 10.6495 24.5366L10.5991 24.4969C7.40514 22.9275 5.36108 20.2693 4.61514 16.7314C4.43399 15.8179 4.39814 13.644 4.58027 12.806C5.0443 10.5556 5.93264 8.80026 7.40998 7.24639C9.54026 4.99986 12.2799 3.81412 15.3266 3.81412H15.3227ZM15.5 7.44789C16.0241 7.45273 16.5346 7.49826 16.927 7.58351C20.5259 8.38564 23.0727 11.9845 22.5777 15.5553C22.381 16.9978 21.887 18.1797 21.0093 19.2792C20.5753 19.8343 19.5203 20.7633 19.3343 20.7633C19.3033 20.7633 19.2733 20.4097 19.2733 19.9854V19.2027L19.808 18.5623C21.8356 16.1356 21.6903 12.745 19.4796 10.5256C18.6223 9.65761 17.6274 9.14707 16.3457 8.91651C15.5194 8.76054 15.3469 8.76054 14.4789 8.90586C13.1576 9.11801 12.1375 9.62661 11.2288 10.5256C9.00939 12.7256 8.86214 16.1356 10.8917 18.5623L11.4264 19.2027V19.9903C11.4264 20.4243 11.3906 20.7721 11.345 20.7721C11.3102 20.7721 11.0069 20.5657 10.6834 20.308L10.6379 20.2925C9.56351 19.4352 8.61511 17.9162 8.22083 16.4224C7.98445 15.5195 7.98445 13.8097 8.23148 12.9107C8.88248 10.4839 10.6737 8.60167 13.1518 7.71914C13.6817 7.53217 14.6136 7.43142 15.4922 7.44692L15.5 7.44789ZM15.3285 11.3074C15.7325 11.3074 16.1307 11.3888 16.4242 11.5399C17.049 11.8683 17.5702 12.498 17.7659 13.1645C18.3665 15.2027 16.2072 16.9891 14.2484 16.0756H14.2338C13.3106 15.6464 12.8156 14.8394 12.8049 13.7893C12.8049 12.8409 13.329 12.0184 14.2426 11.5341C14.5303 11.3829 14.9294 11.3064 15.3324 11.3064L15.3285 11.3074ZM15.3179 17.4182C16.5957 17.4134 17.5179 17.8668 17.8608 18.6689C18.1176 19.2695 18.0226 21.1615 17.578 24.2247C17.2806 26.3637 17.1139 26.9033 16.7012 27.2675C16.1307 27.7713 15.3285 27.9137 14.5613 27.6405H14.5574C13.6342 27.3072 13.4366 26.8577 13.0529 24.2237C12.6151 21.1615 12.5182 19.2686 12.7768 18.6679C13.114 17.8707 14.0323 17.4231 15.3188 17.4173L15.3179 17.4182Z"
                          fill="#872EC4"
                        />
                      </svg>

                      <span className="text-primary-navy mb:text-[16px] font-sans text-[14px] leading-100 font-medium">
                        Apple <br />
                        Podcasts
                      </span>
                    </a>
                  )}
                  {spotifyUrl && (
                    <a href={spotifyUrl} target="_blank" className="flex items-center gap-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31"
                        height="32"
                        viewBox="0 0 31 32"
                        fill="none"
                      >
                        <ellipse cx="15.5" cy="15.5" rx="12.5" ry="11.5" fill="#0B1023" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.6683 14.2411C19.6726 11.2744 11.4312 11.0012 6.66035 12.4489C5.89465 12.6799 5.08554 12.2489 4.85304 11.4817C4.62054 10.716 5.053 9.90687 5.8187 9.67437C11.2948 8.01122 20.3965 8.33193 26.1485 11.7466C26.8367 12.1558 27.063 13.0458 26.6538 13.734C26.2477 14.4222 25.3549 14.6503 24.6683 14.2411ZM24.5055 18.6353C24.1552 19.2042 23.4112 19.3821 22.8423 19.0334C18.6775 16.4728 12.3256 15.7318 7.39815 17.2276C6.758 17.4198 6.08375 17.0602 5.89 16.4216C5.6978 15.783 6.0574 15.1084 6.696 14.9147C12.324 13.2066 19.3223 14.0345 24.1072 16.9748C24.676 17.3236 24.8542 18.068 24.5055 18.6353ZM22.6083 22.8554C22.3293 23.3111 21.7356 23.4553 21.2799 23.1763C17.6405 20.9521 13.0588 20.4501 7.6632 21.6823C7.14395 21.8017 6.6247 21.4758 6.5069 20.955C6.38755 20.4358 6.7115 19.9187 7.23385 19.7993C13.1378 18.4493 18.2016 19.0301 22.2874 21.5272C22.7431 21.8062 22.8873 22.3997 22.6083 22.8554ZM15.5 0.5C6.93935 0.5 0 7.43935 0 16C0 24.5606 6.93935 31.5 15.5 31.5C24.0606 31.5 31 24.5606 31 16C31 7.4409 24.0606 0.5 15.5 0.5Z"
                          fill="#1ED760"
                        />
                      </svg>

                      <span className="text-primary-navy mb:text-[16px] font-sans text-[14px] leading-100 font-medium">
                        Spotify
                      </span>
                    </a>
                  )}
                  {youtubeUrl && (
                    <a href={youtubeUrl} target="_blank" className="flex items-center gap-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="22"
                        viewBox="0 0 32 22"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.7815 14.8792V6.46145C15.969 7.86759 18.4377 9.22595 21.3575 10.6904C18.9493 11.9425 15.969 13.3474 12.7815 14.8792ZM30.5456 2.27492C29.9958 1.59579 29.0586 1.06713 28.0609 0.892113C25.1284 0.370038 6.83358 0.368553 3.90264 0.892113C3.10257 1.03272 2.39014 1.3726 1.77813 1.90066C-0.80058 4.14451 0.00746589 16.1775 0.629035 18.1267C0.890411 18.9704 1.2283 19.5789 1.65384 19.9783C2.20209 20.5063 2.95275 20.8699 3.81497 21.033C6.22953 21.5012 18.6689 21.763 28.0099 21.1033C28.8706 20.9627 29.6324 20.5874 30.2332 20.0369C32.6175 17.802 32.4549 5.0932 30.5456 2.27492Z"
                          fill="#C4302B"
                        />
                      </svg>

                      <span className="text-primary-navy mb:text-[16px] font-sans text-[14px] leading-100 font-medium">
                        YouTube
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-primary-blue mb:text-xl mb:leading-110 mb:mb-7 mb-2 font-sans text-[18px] leading-120 font-semibold">
                {episode} {date ? `| ${formatDate(date)}` : ''}
              </h3>
              <h1 className="tracking-039 text-primary-blue mb:text-[39px] mb:leading-110 mb:mb-7 mb-5 font-sans text-[26px] leading-120 font-semibold">
                {title}
              </h1>
              {directDownloadLink && (
                <audio ref={audioRef} controls className="hidden">
                  <source src={directDownloadLink} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}

              {(directDownloadLink || videoUrl || substackUrl) && (
                <div className="mb:gap-7 mb-7 flex flex-wrap items-center gap-3">
                  {directDownloadLink && (
                    <Cta
                      onClick={() => {
                        if (!audioRef.current) return;

                        if (isPlaying) {
                          audioRef.current.pause();
                          setIsPlaying(false);
                        } else {
                          audioRef.current.play();
                          setIsPlaying(true);
                        }
                      }}
                    >
                      {isPlaying ? (
                        <PauseIcon
                          fill="#0B1023"
                          stroke="#0B1023"
                          className="transition-colors group-hover:fill-white group-hover:stroke-white"
                        />
                      ) : (
                        <PlayIcon
                          fill="#0B1023"
                          stroke="#0B1023"
                          className="transition-colors group-hover:fill-white group-hover:stroke-white"
                        />
                      )}
                      <span>Play episode</span>
                    </Cta>
                  )}
                  {videoUrl && (
                    <Cta extraClass="flex items-center gap-2.5 mb:w-auto w-full mb:justify-start justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="group-hover:[&>path]:fill-neutral-white"
                      >
                        <path
                          d="M17 10.5V7C17 6.73478 16.8946 6.48043 16.7071 6.29289C16.5196 6.10536 16.2652 6 16 6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7V17C3 17.2652 3.10536 17.5196 3.29289 17.7071C3.48043 17.8946 3.73478 18 4 18H16C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V13.5L21 17.5V6.5L17 10.5Z"
                          fill="black"
                        />
                      </svg>
                      <span>Watch Video</span>
                    </Cta>
                  )}
                  {substackUrl && (
                    <Cta extraClass="flex items-center gap-2.5 p-0 bg-transparent text-primary-blue underline hover:bg-transparent hover:text-primary-navy mb:w-auto w-full mb:justify-start justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="32"
                        viewBox="0 0 28 32"
                        fill="none"
                        className="group-hover:[&>path]:fill-primary-navy"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3 5H25V8.06977H3V5ZM3 16.1973H25V30L13.9977 23.8578L3 30V16.1973ZM3 10.5986H25V13.6684H3V10.5986Z"
                          fill="#293462"
                        />
                      </svg>
                      <span>Read on Substack</span>
                    </Cta>
                  )}
                </div>
              )}

              {content && (
                <div className="text-primary-navy font-sans text-[16px] leading-140 [&>p]:mb-4">
                  <StructuredText data={content} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <NewsletterBlock
        title={configuration?.newsletterTitle}
        introduction={configuration?.newsletterIntroduction}
      />
      <div className="mb:pt-[100px] mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mb:mb-50 mb:grid-cols-2 mb-10 grid gap-15">
          {majorTakeaways && (
            <div>
              <h3 className="text-primary-blue mb:text-[29px] mb:leading-130 mb:mb-[33px] mb-5 font-sans text-[23px] leading-120 font-semibold">
                Major Takeaways
              </h3>
              <div className="structured-content">
                <StructuredText data={majorTakeaways} />
              </div>
            </div>
          )}
          {recommendedMedia && (
            <div>
              <h3 className="text-primary-blue mb:text-[29px] mb:leading-130 mb:mb-[33px] mb-5 font-sans text-[23px] leading-120 font-semibold">
                Other recommended reading
              </h3>
              <div className="structured-content">
                <StructuredText data={recommendedMedia} />
              </div>
            </div>
          )}
        </div>

        {moreListening.length > 0 && (
          <div className="mb:mb-40 mb-20">
            <h2 className="text-primary-blue mb:text-3xl mb:leading-130 mb-8 font-sans text-[23px] leading-120 font-semibold">
              Continue listening
            </h2>
            <div className="mb:grid-cols-2 mb:gap-y-11 grid gap-x-16 gap-y-5">
              {moreListening.map((podcast) => (
                <PodcastMinimalCard {...podcast} key={podcast.id} variant="small-cols" />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
