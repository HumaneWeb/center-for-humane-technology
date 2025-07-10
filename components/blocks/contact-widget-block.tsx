'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../shared/forms/input';
import { cn } from '@/lib/utils/css.utils';

type Props = {
  title: string;
  introduction: string;
};

export default function ContactWidgetBlock({ title, introduction }: Props) {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      type: 'policy',
      email: email,
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="bg-neutral-white">
      <section className="bg-secondary-light-purple/20 mb:py-12 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="newsletter-grid mb:gap-20 grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
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
              <form onSubmit={handleSubmit} className="mb:max-w-[500px] space-y-3">
                <div className="border-primary-blue mb:flex-row flex flex-col gap-0 overflow-hidden rounded-[5px] border-2">
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-primary-blue tracking-016 h-full flex-1 rounded-none border-0 bg-transparent px-4 py-[15px] text-[16px] leading-135 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <button
                    type="submit"
                    className={cn(
                      'bg-primary-blue tracking-02 text-neutral-white hover:bg-primary-navy mb:w-[170px] mb:text-xl mb:py-3 flex cursor-pointer items-center justify-center gap-5 rounded-none px-9.5 py-[15.9px] leading-120 font-semibold',
                    )}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
