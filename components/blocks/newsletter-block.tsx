'use client';

import { forwardRef, useState } from 'react';
import type { CustomImageProps } from '../shared/custom-image';
import Input from '../shared/forms/input';
import LoadingSpinner from '../shared/loading-spinner';
import { cn } from '@/lib/utils/css.utils';
import CustomLink from '../shared/custom-link';

type Props = {
  id: string;
  title: string;
  introduction: string;
  withFeaturedContent: boolean;
  featuredTitle: string;
  featuredImage: CustomImageProps;
  featuredLink: any;
};

export default function NewsletterBlock({
  title,
  introduction,
  withFeaturedContent,
  featuredTitle,
  featuredImage,
  featuredLink,
}: Props) {
  const renderFeaturedBlock = () => (
    <section className="flex w-full flex-col md:flex-row">
      <div
        className="mb:justify-end mb:px-12 mb:pb-7 mb:pt-44 flex w-full items-end bg-cover bg-center bg-no-repeat px-7 py-4 pt-20 md:w-1/2"
        style={{ backgroundImage: `url(${featuredImage!.url})` }}
      >
        <div className="max-w-sm text-center md:max-w-[560px]">
          {/* @ts-expect-error */}
          <CustomLink content={featuredLink}>
            <h2 className="text-primary-cream mb:text-[29px] text-left font-sans text-[23px] leading-130 font-semibold">
              {featuredTitle}
            </h2>
          </CustomLink>
        </div>
      </div>

      <div className="bg-secondary-light-purple/20 mb:w-1/2 mb:py-14 flex w-full items-center justify-start px-7 py-8">
        <div className="w-full md:max-w-[560px]">
          <h2 className="text-primary-blue mb:text-[29px] mb:mb-3 mb-5 font-sans text-[23px] leading-130 font-semibold">
            {title}
          </h2>
          {introduction && (
            <div
              className="text-primary-navy mb:text-[16px] mb-5 font-sans text-[18px] leading-135"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          )}

          <SubstackNewsletterWidget />
        </div>
      </div>
    </section>
  );

  if (withFeaturedContent) {
    return renderFeaturedBlock();
  }

  return (
    <div className="bg-neutral-white">
      <section className="bg-secondary-light-purple/20 mb:py-12 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb:gap-20 grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
            <div>
              <h2 className="text-primary-blue mb:text-3xl mb:mb-3 mb:leading-130 mb-5 font-sans text-[23px] leading-120 font-semibold">
                {title}
              </h2>
              {introduction && (
                <div
                  className="text-primary-navy mb:text-xl font-sans text-[18px] leading-140 font-normal"
                  dangerouslySetInnerHTML={{ __html: introduction }}
                />
              )}
            </div>
            <div>
              <SubstackNewsletterWidget />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const SubstackNewsletterWidget = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    if (!isValidEmail(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://substackapi.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          domain: 'centerforhumanetechnology.substack.com',
        }),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Successfully subscribed! Check your email for confirmation.',
        });
        setEmail('');
      } else {
        setMessage({
          type: 'error',
          text: 'Subscription failed. Please try again later.',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[500px] space-y-3">
      <div className="border-primary-blue mb:flex-row flex flex-col gap-0 overflow-hidden rounded-[5px] border-2">
        <Input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-primary-blue tracking-016 h-full flex-1 rounded-none border-0 bg-transparent px-4 py-[15px] text-[16px] leading-135 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'bg-primary-blue tracking-02 text-neutral-white hover:bg-primary-navy mb:w-[170px] mb:text-xl flex cursor-pointer items-center justify-center gap-5 rounded-none px-9.5 py-3 leading-120 font-semibold',
            isLoading && 'pointer-events-none',
          )}
        >
          {isLoading ? (
            <>
              <LoadingSpinner classNames="w-6 h-6" />
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {message && (
        <Alert
          className={`items-center ${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
        >
          <div className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
            {message.type === 'success' ? <CheckCircleIcon /> : <AlertCircleIcon />}
          </div>
          <AlertDescription
            className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}
          >
            {message.text}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
};

//
const CheckCircleIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const Alert = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        `relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm`,
        className,
      )}
      {...props}
    />
  ),
);

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`text-sm leading-relaxed ${className}`} {...props} />
));
