import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Work } from '@/payload-types'

const getCachedWork = (sort: string = '-publishedAt') =>
  unstable_cache(
    async () => {
      console.log('[DB HIT - CACHE MISS] All work → querying Payload/Neon')
      const payload = await getPayload({ config: configPromise })

      const result = await payload.find({
        collection: 'work',
        sort,
        limit: 1000,
        pagination: false,
        draft: false,
        overrideAccess: false,
      })

      return result.docs as Work[]
    },
    ['work-list', sort],
    {
      tags: ['work'],
    },
  )()

export const getWork = async (limit: number = 100, sort: string = '-publishedAt') => {
  const work = await getCachedWork(sort)

  return work.slice(0, limit)
}
