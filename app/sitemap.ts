import { executeQuery } from '@/lib/cms/executeQuery';
import { SitemapQuery } from '@/lib/cms/query';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    allBasicPages,
    aiInSociety,
    teamBoard,
    allTeamMembers,
    podcastList,
    allPodcasts,
    careersList,
    allCareers,
    blogList,
    caseStudiesList,
    allCaseStudies,
    toolkitList,
    allToolkits,
    allLandings,
    contact,
    donate,
  } = await executeQuery(SitemapQuery);

  const BASE_URL = 'https://www.humanetech.com';

  const sitemap: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date() },
    ...generatePageUrls(allBasicPages, BASE_URL),
    ...generatePageUrls([aiInSociety], BASE_URL),
    ...generatePageUrls([teamBoard], BASE_URL),
    ...generateMemberUrls(allTeamMembers, BASE_URL),
    ...generatePageUrls([podcastList], BASE_URL),
    ...generatePodcastUrls(allPodcasts, BASE_URL),
    ...generatePageUrls([careersList], BASE_URL),
    ...generateCareerUrls(allCareers, BASE_URL),
    ...generatePageUrls([blogList], BASE_URL),
    ...generatePageUrls([caseStudiesList], BASE_URL),
    ...generateCaseStudyUrls(allCaseStudies, BASE_URL),
    ...generatePageUrls([toolkitList], BASE_URL),
    ...generateToolkitUrls(allToolkits, BASE_URL),
    ...generateLandingUrls(allLandings, BASE_URL),
    { url: `${BASE_URL}/contact`, lastModified: contact!._updatedAt },
    { url: `${BASE_URL}/donate`, lastModified: donate!._updatedAt },
  ];

  return sitemap;
}

// Utility functions to generate URLs for different sections of the site
function generatePageUrls(pages: any[], baseUrl: string) {
  return pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page._updatedAt,
  }));
}

function generateMemberUrls(members: any[], baseUrl: string) {
  return members.map((member) => ({
    url: `${baseUrl}/team-board/${member.slug}`,
    lastModified: member._updatedAt,
  }));
}

function generatePodcastUrls(podcasts: any[], baseUrl: string) {
  return podcasts.map((podcast) => ({
    url: `${baseUrl}/podcast/${podcast.slug}`,
    lastModified: podcast._updatedAt,
  }));
}

function generateCareerUrls(careers: any[], baseUrl: string) {
  return careers.map((career) => ({
    url: `${baseUrl}/careers/${career.slug}`,
    lastModified: career._updatedAt,
  }));
}

function generateCaseStudyUrls(caseStudies: any[], baseUrl: string) {
  return caseStudies.map((caseStudy) => ({
    url: `${baseUrl}/case-study/${caseStudy.slug}`,
    lastModified: caseStudy._updatedAt,
  }));
}

function generateToolkitUrls(allToolkits: any[], baseUrl: string) {
  return allToolkits.map((toolkit) => ({
    url: `${baseUrl}/youth/${toolkit.slug}`,
    lastModified: toolkit._updatedAt,
  }));
}

function generateLandingUrls(landings: any[], baseUrl: string) {
  return landings.map((landing) => ({
    url: `${baseUrl}/landing/${landing.slug}`,
    lastModified: landing._updatedAt,
  }));
}
