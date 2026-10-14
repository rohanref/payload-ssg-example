import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { News } from '@/payload-types'

export const getNews = unstable_cache(
  async () => {
    console.log('[DB HIT - CACHE MISS] All news → querying Payload/Neon')

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'news',
      sort: '-publishedAt',
      limit: 100,
      pagination: false,
      draft: false,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        metaTitle: true,
        metaDescription: true,
        metaImage: true,
        publishedAt: true,
        content: true,
      },
    })

    return result.docs as News[]
  },
  ['all-news'],
  {
    tags: ['news'],
  },
)

export const getNewsBySlug = async (slug: string, draft: boolean): Promise<News | null> => {
  if (draft) {
    console.log(`[DRAFT] News "${slug}" → querying Payload/Neon`)

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'news',
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: true,
      limit: 1,
      pagination: false,
      overrideAccess: true,
    })

    return (result.docs?.[0] as News) ?? null
  }

  return unstable_cache(
    async () => {
      console.log(`[DB HIT - CACHE MISS] News "${slug}" → querying Payload/Neon`)

      const payload = await getPayload({ config: configPromise })

      const result = await payload.find({
        collection: 'news',
        where: {
          slug: {
            equals: slug,
          },
        },
        draft: false,
        limit: 1,
        pagination: false,
        overrideAccess: false,
      })

      return (result.docs?.[0] as News) ?? null
    },
    ['news-by-slug', slug],
    {
      tags: [`news:${slug}`, 'news'],
    },
  )()
}
