import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datocms-assets.com',
      },
      new URL('https://www.datocms-assets.com/**'),
      new URL('https://substackcdn.com/**'),
      new URL('https://substack-post-media.s3.amazonaws.com/**'),
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/who-we-are',
        destination: '/impact-and-story',
        permanent: true,
      },
      {
        source: '/the-social-dilemma',
        destination: '/landing/the-social-dilemma',
        permanent: true,
      },
      // Redirects from webflow
      {
        source: '/news/wired-silicon-valley-its-your-chance-to-turn-the-tide-on-covid-19',
        destination:
          'https://www.wired.com/story/opinion-this-is-silicon-valleys-chance-to-step-up-for-humanity/',
        permanent: true,
      },
      {
        source: '/news/tristan-harris-fighting-skynet-and-firewalling-attention',
        destination: 'https://tim.blog/2019/09/19/tristan-harris/',
        permanent: true,
      },
      {
        source: '/team/:slug*',
        destination: '/team-board',
        permanent: true,
      },
      {
        source: '/resources/take-control',
        destination: '/take-control',
        permanent: true,
      },
      {
        source: '/news/financial-times-oped',
        destination: 'https://www.ft.com/content/abd80d98-595e-11ea-abe5-8e03987b7b20',
        permanent: true,
      },
      {
        source: '/news/bits-pretzels-conference-how-technology-can-become-more-humane-video-24-min',
        destination: 'https://www.youtube.com/watch?v=z8jbZPL92xs',
        permanent: true,
      },
      {
        source: '/problem',
        destination: '/the-cht-perspective',
        permanent: true,
      },
      {
        source: '/news/cnbc-social-media-is-downgrading-humanity',
        destination:
          'https://www.cnbc.com/video/2019/10/23/center-of-humane-techs-tristan-harris-attacks-facebook-and-google.html',
        permanent: true,
      },
      {
        source: '/news/milken-institute-technology-must-operate-for-the-public-good',
        destination:
          'https://milkeninstitute.org/power-of-ideas/technology-platforms-must-operate-public-good',
        permanent: true,
      },
      {
        source: '/news/the-times-uk-our-lives-are-now-ruled-by-algorithms-and-apps',
        destination:
          'https://www.thetimes.co.uk/article/the-silicon-valley-insider-who-says-turn-off-your-phone-rwspxt6xr',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/team-board',
        permanent: true,
      },
      {
        source: '/news/medium-how-can-tech-step-up-for-humanity',
        destination:
          'https://medium.com/center-for-humane-technology/from-inform-to-persuade-how-can-tech-step-up-for-humanity-3ac21de4c53b',
        permanent: true,
      },
      {
        source: '/news/nyt-our-brains-are-no-match-for-our-technology',
        destination: 'https://www.nytimes.com/2019/12/05/opinion/digital-technology-brain.html',
        permanent: true,
      },
      {
        source: '/news/npr-future-you',
        destination:
          'https://www.npr.org/2019/11/20/717487360/video-elon-musks-next-quest-is-a-mind-machine-meld-let-s-consider-the-implicatio',
        permanent: true,
      },
      {
        source: '/news/al-jazeera-rebelling-against-attention-economy-humane-tech-movement-expands',
        destination:
          'https://www.aljazeera.com/ajimpact/rebelling-attention-economy-humane-tech-movement-expands-190724210851788.html',
        permanent: true,
      },
      {
        source: '/resources',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/bloomberg-radio-harris-on-the-future-of-technology-podcast-645-min',
        destination:
          'https://www.bloomberg.com/news/audio/2019-10-30/harris-on-the-future-of-technology-podcast',
        permanent: true,
      },
      {
        source: '/news/wired-the-toxic-potential-of-youtubes-feedback-loop',
        destination: 'https://www.wired.com/story/the-toxic-potential-of-youtubes-feedback-loop/',
        permanent: true,
      },
      {
        source: '/news/scientific-american-the-technology-of-kindness',
        destination: 'https://www.scientificamerican.com/article/the-technology-of-kindness/',
        permanent: true,
      },
      {
        source: '/category/podcasts',
        destination: '/podcast',
        permanent: true,
      },
      {
        source: '/news/the-new-yorker-big-techs-big-defector',
        destination:
          'https://www.newyorker.com/magazine/2019/12/02/big-techs-big-defector?verso=true',
        permanent: true,
      },
      {
        source: '/news/associated-press-qa-ex-googler-harris-on-how-tech-downgrades-humans',
        destination:
          'https://sentinelcolorado.com/sentinel-magazine/qa-ex-google-exec-harris-on-how-tech-downgrades-humans/',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/impact-and-story',
        permanent: true,
      },
      {
        source: '/news/wired-facebook-knows-more-about-you-than-the-cia',
        destination:
          'https://www.wired.com/story/facebook-knows-more-about-you-than-cia/?mbid=social_twitter_onsiteshare',
        permanent: true,
      },
      {
        source: '/the-social-dilemma-film',
        destination: '/landing/the-social-dilemma',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/tsd',
        destination: '/landing/the-social-dilemma',
        permanent: true,
      },
      {
        source: '/take-control-of-your-social-media-use',
        destination: '/youth/take-control-of-your-social-media-use',
        permanent: true,
      },
      {
        source: '/category/media',
        destination: '/press',
        permanent: true,
      },
      {
        source: '/YEImpactHighlights2020',
        destination:
          'https://assets-global.website-files.com/5f0e1294f002b15080e1f2ff/6035b2bf3069ba4e190f880f_CHT%20YE%20Report%20_2020_FINAL%20(1).pdf',
        permanent: true,
      },
      {
        source: '/tell-your-social-media-story',
        destination: '/youth/tell-your-social-media-story',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/press',
        permanent: true,
      },
      {
        source: '/social-media-and-the-brain',
        destination: '/youth/social-media-and-the-brain',
        permanent: true,
      },
      {
        source: '/foundations-of-humane-technology',
        destination: '/course',
        permanent: true,
      },
      {
        source: '/the-attention-economy',
        destination: '/youth/the-attention-economy',
        permanent: true,
      },
      {
        source: '/seeing-the-consequences',
        destination: '/youth/seeing-the-consequences',
        permanent: true,
      },
      {
        source: '/old-home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/brain',
        destination: '/brain-science',
        permanent: true,
      },
      {
        source: '/teaching-for-humane-technology',
        destination: '/youth/teaching-for-humane-technology',
        permanent: true,
      },
      {
        source: '/ledger',
        destination: 'https://ledger.humanetech.com/',
        permanent: true,
      },
      {
        source: '/film',
        destination: '/landing/the-social-dilemma',
        permanent: true,
      },
      {
        source: '/movie',
        destination: '/landing/the-social-dilemma',
        permanent: true,
      },
      {
        source: '/persuasive-technology',
        destination: '/youth/persuasive-technology',
        permanent: true,
      },
      {
        source: '/takecontrol',
        destination: '/take-control',
        permanent: true,
      },
      {
        source: '/imagine-humane-technology',
        destination: '/youth/imagine-humane-technology',
        permanent: true,
      },
      {
        source: '/what-we-do',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: '/podcast/feed-drop-conversations-with-people-who-hate-me',
        destination: '/podcast/bonus-conversations-with-people-who-hate-me',
        permanent: true,
      },
      {
        source: '/course-2',
        destination: '/course',
        permanent: true,
      },
      {
        source: '/podcast/why-ai-bias-is-existential-with-dr-joy-buolamwini',
        destination: '/podcast/no-one-is-immune-to-ai-harms-with-dr-joy-buolamwini',
        permanent: true,
      },
      {
        source: '/podcast/bonus-zigzags-exploration-of-the-long-term-stock-exchange',
        destination: '/podcast/bonus-how-might-a-long-term-stock-market-transform-tech',
        permanent: true,
      },
      {
        source: '/askus',
        destination: 'https://survey.phonic.ai/64133bea892a36a98d5cd231',
        permanent: true,
      },
      {
        source: '/careers-training-partnerships-lead',
        destination:
          'https://docs.google.com/forms/d/e/1FAIpQLSd-mF9SIuKO7yfI-P97J2ZP0AMRXXw-WKgTH9rli-Y8Jl9Lmg/viewform',
        permanent: true,
      },
      {
        source: '/learn-more',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tnp22',
        destination: '/donate',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
