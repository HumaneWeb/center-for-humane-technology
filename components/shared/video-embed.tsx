'use client';

import { useState } from 'react';

interface YouTubeEmbedProps {
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function VideoEmbed({ title, url, thumbnailUrl }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const getVideoId = (url: string): string => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const videoId = getVideoId(url);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  const handlePlay = () => {
    setIsLoaded(true);
  };

  return (
    <div className="mb:mb-9 mx-auto w-full max-w-4xl">
      <div className="relative aspect-video overflow-hidden bg-black shadow-lg">
        {!isLoaded ? (
          <div className="group relative h-full w-full cursor-pointer" onClick={handlePlay}>
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="bg-opacity-30 group-hover:bg-opacity-40 absolute top-0 left-0 flex h-full w-full items-center justify-center transition-opacity duration-300">
              <div className="transform shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="161"
                  height="161"
                  viewBox="0 0 161 161"
                  fill="none"
                  className="mb:w-auto w-[100px]"
                >
                  <path
                    d="M70 93.25L94.0037 79.375L70 65.5V93.25ZM123.465 57.0363C124.066 59.21 124.482 62.1237 124.76 65.8237C125.084 69.5237 125.223 72.715 125.223 75.49L125.5 79.375C125.5 89.5037 124.76 96.95 123.465 101.714C122.309 105.876 119.626 108.559 115.464 109.715C113.29 110.316 109.312 110.733 103.208 111.01C97.195 111.334 91.6912 111.473 86.6038 111.473L79.25 111.75C59.8713 111.75 47.8 111.01 43.0363 109.715C38.8738 108.559 36.1913 105.876 35.035 101.714C34.4338 99.54 34.0175 96.6263 33.74 92.9263C33.4163 89.2262 33.2775 86.035 33.2775 83.26L33 79.375C33 69.2463 33.74 61.8 35.035 57.0363C36.1913 52.8738 38.8738 50.1913 43.0363 49.035C45.21 48.4338 49.1875 48.0175 55.2925 47.74C61.305 47.4162 66.8088 47.2775 71.8962 47.2775L79.25 47C98.6288 47 110.7 47.74 115.464 49.035C119.626 50.1913 122.309 52.8738 123.465 57.0363Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
