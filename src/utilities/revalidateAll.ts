import { revalidateTag } from 'next/cache'

export const WEBSITE_CACHE_TAGS = [
  'pages',
  'pages-sitemap',
  'news',
  'news-sitemap',
  'redirects',
  'work-sitemap',
  'work',
] as const

export const revalidateWebsite = () => {
  for (const tag of WEBSITE_CACHE_TAGS) {
    revalidateTag(tag, 'max')
  }
}
