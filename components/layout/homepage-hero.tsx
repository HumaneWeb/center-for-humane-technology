import Image from 'next/image';
import Cta from '@/components/shared/cta';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  profileImageUrl: string;
  profileImageAlt: string;
  backgroundImageUrl: string;
  backgroundImageAlt: string;
}

export default function HomepageHero({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  profileImageUrl,
  profileImageAlt,
  backgroundImageUrl,
  backgroundImageAlt,
}: HeroProps) {
  return (
    <section
      className="bg-primary-cream/50 h-dvh bg-contain bg-right bg-no-repeat py-12 lg:py-20"
      style={{
        backgroundImage: `url("/homepage-circles.svg")`,
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-0">
            <h1 className="text-primary-navy mb-9 font-sans text-4xl leading-110 font-semibold lg:text-6xl">
              {title}
            </h1>

            <p className="text-primary-navy mb-10 font-sans text-2xl leading-140">{description}</p>
            <div>
              <Cta label={ctaText} href={ctaHref} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="">
              <Image src={'/hero1.png'} alt={backgroundImageAlt} width={249} height={447} />
            </div>
            <div className="pt-15">
              <Image src={'/hero2.png'} alt={profileImageAlt} width={256} height={458} />
            </div>
            <div className="pt-8">
              <Image src={'/hero3.png'} alt={profileImageAlt} width={250} height={447} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
