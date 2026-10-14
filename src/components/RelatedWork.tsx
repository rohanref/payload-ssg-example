import { WorkBlock } from '@/blocks/WorkBlock/Component'
import type { Work } from '@/payload-types'

interface Props {
  currentId: string
  publishedAt?: string | null
  hasCreditsBlock?: boolean
}

export async function RelatedWork({
  currentId,
  publishedAt,
  hasCreditsBlock,
}: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/related-work?currentId=${currentId}&publishedAt=${publishedAt}`,
    {
      next: { tags: ['work'] },
    }
  )

  const posts: Work[] = await res.json()

  if (!posts?.length) return null

  return (
    <WorkBlock
      blockType="workBlock"
      heading="More work"
      entries={posts}
      limit={3}
      fetchLimit={3}
      isBlackBG
      className={hasCreditsBlock ? 'pt-0' : undefined}
    />
  )
}