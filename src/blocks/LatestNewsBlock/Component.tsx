import React from 'react'
import type { LatestNewsBlock as LatestNewsBlockProps, News } from '@/payload-types'
import Link from 'next/link'
import { getNews } from '@/utilities/getNews'

type Props = LatestNewsBlockProps & {
  className?: string
  entries?: News[] // optional pre-fetched entries
  isBlackBG?: boolean
}

export const fetchLatestNews = async (limit: number = 2) => {
  const news = await getNews()

  return news.slice(0, limit)
}

export const LatestNewsBlock: React.FC<Props> = async ({
  heading,
  text,
  limit = 2,
  entries,
  className,
  isBlackBG,
}) => {
  const newsPosts = entries ?? (await fetchLatestNews(limit ?? 2))

  if (!newsPosts.length) return null

  return (
    <section className={className || 'max-w-[1500px] px-4 mx-auto mb-16'}>
      {heading && <h2 className={isBlackBG ? 'mb-6 sm:!text-[3em]' : 'mb-6'}>{heading}</h2>}

      {text && <p className="mb-6">{text}</p>}

      <div className="mx-auto grid gap-8 sm:grid-cols-2">
        {newsPosts.map((post: News) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="flex flex-col justify-between"
          >
            <h3 className={isBlackBG ? 'mb-4' : 'mb-2'}>{post.title}</h3>

            {isBlackBG && post.metaDescription && <p className="mb-6">{post.metaDescription}</p>}

            <p
              className={`mt-auto self-start cursor-pointer shadow-lg px-6 py-4 rounded-full ${
                isBlackBG ? 'bg-white text-black' : ''
              }`}
            >
              Read Article{' '}
              <svg
                className="w-[12px] inline-block ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
              </svg>
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
