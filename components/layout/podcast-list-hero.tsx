'use client';

import useIsMobile from '../hooks/is-mobile';
import CustomImage, { CustomImageProps } from '../shared/custom-image';
import { FadeIn } from '../shared/fade-in';

type Props = {
  title: string;
  introduction: string | null;
  extraInformation: string | null;
  image: CustomImageProps | null;
  decoratorIcon: CustomImageProps | null;
  applePodcastsUrl: string | null;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
};

export default function PodcastListHero({
  title,
  introduction,
  extraInformation,
  image,
  decoratorIcon,
  applePodcastsUrl,
  spotifyUrl,
  youtubeUrl,
}: Props) {
  const isMobile = useIsMobile({ breakpoint: 1440 });

  return (
    <section className="podcast-list-hero bg-gradient-podcast-list mb:pt-20">
      <FadeIn
        className="podcast-list-hero-wrapper mb:min-h-[700px] bg-contain bg-bottom-right bg-no-repeat"
        style={{ backgroundImage: isMobile ? 'none' : `url(${image?.url})` }}
      >
        <FadeIn
          delay={0.4}
          className="podcast-list-hero-wrapper-content relative mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8"
        >
          {decoratorIcon && (
            <div className="podcast-list-hero-decorator mb:absolute left-[-60px] pt-3">
              <CustomImage
                {...decoratorIcon}
                extraClass="mb:w-[65px] w-[50px] mb-2 mb:mb-0"
                alt="TED"
              />
            </div>
          )}
          <div className="max-w-[620px]">
            <h1 className="text-primary-blue mb:tracking-061 mb:text-6xl mb:mb-7 mb-3 font-sans text-[32px] leading-110 font-semibold tracking-[-0.32px]">
              {title}
            </h1>
            {introduction && (
              <div
                className="text-primary-navy mb:text-xl mb:mb-7 mb-3 font-sans text-[18px] leading-140 font-normal"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
            {extraInformation && (
              <div
                className="text-primary-navy mb:mb-16 mb-10 font-sans text-[16px] leading-140"
                dangerouslySetInnerHTML={{ __html: extraInformation }}
              />
            )}

            <div className="mb:items-center mb:gap-10 mb:justify-start flex items-start justify-between gap-8">
              {applePodcastsUrl && (
                <a
                  href={applePodcastsUrl}
                  target="_blank"
                  className="mb:flex-row mb:text-left mb:flex-none flex flex-1 flex-col items-center justify-center gap-2.5 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                  >
                    <path
                      d="M9.79002 3.89504e-05C4.37666 -0.015086 -0.015086 4.37666 3.89504e-05 9.79002V34.21C-0.015086 39.6233 4.37666 44.0151 9.79002 44H34.21C39.6233 44.0151 44.0151 39.6233 44 34.21V9.79002C44.0151 4.37666 39.6233 -0.015086 34.21 3.89504e-05H9.79002ZM21.7484 4.70391C26.0315 4.70391 29.9049 6.3594 32.857 9.45177C35.0996 11.7796 36.3591 14.2491 37.004 17.5024C37.2253 18.5845 37.2253 21.5339 37.0163 22.7507C36.3288 26.6241 34.21 30.0919 31.0805 32.4624C29.964 33.308 27.2346 34.7765 26.7974 34.7765C26.6324 34.7765 26.62 34.6115 26.6915 33.9309C26.8276 32.8419 26.9555 32.6205 27.5715 32.362C28.5519 31.955 30.228 30.7574 31.2524 29.7344C33.0412 27.9427 34.3172 25.7029 34.9332 23.2457C35.3196 21.7332 35.2687 18.3741 34.8466 16.8218C33.5142 11.8786 29.4745 8.0424 24.5341 7.00978C23.1027 6.7169 20.4875 6.7169 19.0341 7.00978C14.0346 8.0424 9.89452 12.0739 8.63502 17.1449C8.29815 18.5254 8.29815 21.8859 8.63502 23.2609C9.4724 26.62 11.6435 29.6972 14.4856 31.5315C15.0453 31.9041 15.7176 32.2836 15.9981 32.3991C16.6128 32.6631 16.7503 32.8872 16.863 33.9666C16.9345 34.6335 16.9194 34.8191 16.764 34.8191C16.6636 34.8191 15.9115 34.496 15.1154 34.1165L15.0439 34.0601C10.5105 31.8326 7.60927 28.0596 6.55053 23.0381C6.2934 21.7415 6.24253 18.656 6.50103 17.4666C7.15965 14.2725 8.42052 11.781 10.5174 9.57552C13.541 6.3869 17.4295 4.70391 21.7539 4.70391H21.7484ZM22 9.86152C22.7439 9.8684 23.4685 9.93302 24.0254 10.054C29.1335 11.1925 32.7484 16.3006 32.0457 21.3689C31.7666 23.4162 31.0654 25.0937 29.8196 26.6544C29.2036 27.4422 27.7062 28.7609 27.4422 28.7609C27.3982 28.7609 27.3556 28.259 27.3556 27.6567V26.5457L28.1146 25.6369C30.9925 22.1925 30.7862 17.38 27.6485 14.2299C26.4316 12.9979 25.0195 12.2733 23.2004 11.946C22.0275 11.7246 21.7827 11.7246 20.5508 11.9309C18.6753 12.232 17.2274 12.9539 15.9376 14.2299C12.7875 17.3525 12.5785 22.1925 15.4591 25.6369L16.2181 26.5457V27.6636C16.2181 28.2796 16.1673 28.7732 16.1026 28.7732C16.0531 28.7732 15.6228 28.4804 15.1635 28.1146L15.0989 28.0926C13.574 26.8757 12.2279 24.7197 11.6683 22.5995C11.3328 21.318 11.3328 18.8911 11.6834 17.6151C12.6074 14.1708 15.1498 11.4991 18.667 10.2465C19.4191 9.98115 20.7419 9.83815 21.989 9.86015L22 9.86152ZM21.7566 15.3395C22.33 15.3395 22.8951 15.455 23.3117 15.6695C24.1986 16.1356 24.9384 17.0294 25.2161 17.9754C26.0686 20.8684 23.0037 23.4039 20.2235 22.1072H20.2029C18.8925 21.4981 18.1899 20.3528 18.1748 18.8623C18.1748 17.5161 18.9186 16.3488 20.2153 15.6613C20.6236 15.4468 21.1901 15.3381 21.7621 15.3381L21.7566 15.3395ZM21.7415 24.013C23.5551 24.0061 24.8641 24.6496 25.3509 25.7881C25.7152 26.6406 25.5805 29.326 24.9494 33.6737C24.5272 36.7097 24.2907 37.4756 23.705 37.9926C22.8951 38.7076 21.7566 38.9097 20.6676 38.522H20.6621C19.3518 38.049 19.0713 37.411 18.5268 33.6724C17.9053 29.326 17.7678 26.6392 18.1349 25.7867C18.6134 24.6551 19.9169 24.0199 21.7429 24.0116L21.7415 24.013Z"
                      fill="#0B1023"
                    />
                  </svg>

                  <span className="text-primary-navy mb:text-[16px] font-sans text-sm leading-100 font-medium">
                    Apple <br className="mb:block hidden" />
                    Podcasts
                  </span>
                </a>
              )}

              {spotifyUrl && (
                <a
                  href={spotifyUrl}
                  target="_blank"
                  className="mb:flex-row mb:text-left mb:flex-none flex flex-1 flex-col items-center justify-center gap-2.5 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M35.013 19.5035C27.9224 15.2927 16.225 14.905 9.45339 16.9598C8.36659 17.2876 7.21819 16.6759 6.88819 15.5869C6.55819 14.5001 7.172 13.3517 8.2588 13.0217C16.0314 10.6611 28.9498 11.1163 37.114 15.9629C38.0908 16.5437 38.412 17.807 37.8312 18.7838C37.2548 19.7606 35.9876 20.0843 35.013 19.5035ZM34.782 25.7404C34.2848 26.5478 33.2288 26.8005 32.4214 26.3055C26.51 22.6711 17.4944 21.6194 10.5006 23.7424C9.59201 24.0152 8.63501 23.5047 8.36001 22.5983C8.08721 21.6919 8.5976 20.7346 9.504 20.4596C17.4922 18.0352 27.4252 19.2102 34.2166 23.3836C35.024 23.8786 35.277 24.9352 34.782 25.7404ZM32.0892 31.7303C31.6932 32.3771 30.8506 32.5817 30.2038 32.1857C25.0382 29.0287 18.535 28.3162 10.8768 30.0652C10.1398 30.2346 9.4028 29.7721 9.2356 29.0329C9.0662 28.2959 9.526 27.562 10.2674 27.3926C18.6472 25.4764 25.8346 26.3008 31.6338 29.845C32.2806 30.241 32.4852 31.0835 32.0892 31.7303ZM22 0C9.8494 0 0 9.8494 0 22C0 34.1506 9.8494 44 22 44C34.1506 44 44 34.1506 44 22C44 9.8516 34.1506 0 22 0Z"
                      fill="#0B1023"
                    />
                  </svg>

                  <span className="text-primary-navy mb:text-[16px] font-sans text-sm leading-100 font-medium">
                    Spotify
                  </span>
                </a>
              )}

              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  className="mb:flex-row mb:text-left mb:flex-none flex flex-1 flex-col items-center justify-center gap-2.5 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 46 32"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.3734 21.7264V9.30023C22.9555 11.376 26.5043 13.3812 30.7014 15.543C27.2397 17.3913 22.9555 19.4652 18.3734 21.7264ZM43.9093 3.12013C43.1189 2.11759 41.7718 1.3372 40.3376 1.07883C36.1221 0.308152 9.82327 0.30596 5.61005 1.07883C4.45995 1.2864 3.43582 1.78812 2.55606 2.56764C-1.15083 5.87999 0.0107322 23.643 0.904238 26.5204C1.27997 27.7658 1.76569 28.6641 2.37739 29.2537C3.16551 30.0332 4.24457 30.5699 5.48402 30.8106C8.95494 31.5018 26.8365 31.8882 40.2643 30.9144C41.5014 30.7068 42.5965 30.1528 43.4602 29.3402C46.8876 26.041 46.654 7.28044 43.9093 3.12013Z"
                      fill="#0B1023"
                    />
                  </svg>

                  <span className="text-primary-navy mb:text-[16px] font-sans text-sm leading-100 font-medium">
                    YouTube
                  </span>
                </a>
              )}
            </div>
          </div>
        </FadeIn>

        {isMobile && image && (
          <div>
            <CustomImage {...image} alt={title} />
          </div>
        )}
      </FadeIn>
    </section>
  );
}
