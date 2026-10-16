import { revalidateTag } from 'next/cache'

export const WEBSITE_CACHE_TAGS = [
  'pages',
  'pages-sitemap',
  'news',
  'news-sitemap',
  'global_footer',
  'global_header',
  'smile-gallery',
  'redirects',
] as const

export const revalidateWebsite = () => {
  for (const tag of WEBSITE_CACHE_TAGS) {
    revalidateTag(tag, 'max')
  }
}
