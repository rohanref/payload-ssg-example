import type { Config } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type GlobalSlug = keyof Config['globals']

async function getGlobal<T extends GlobalSlug>(slug: T, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global as Config['globals'][T]
}

/**
 * Returns an unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends GlobalSlug>(
  slug: T,
  depth = 0,
) =>
  unstable_cache(
    async () => getGlobal<T>(slug, depth),
    [slug],
    {
      tags: [`global_${slug}`],
    },
  )