'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// const payloadURL = process.env.NEXT_PUBLIC_SERVER_URL

interface NewsEntry {
  title: string
  slug: string
  metaDescription?: string
  publishedAt?: string
}

interface NewsBlockProps {
  heading?: string
  text?: string
  initialLimit?: number
  showSidebar?: boolean
  sidebarTitle?: string
  sidebarButtonText?: string
  sidebarButtonLink?: string
  className?: string
}

export const NewsBlock: React.FC<NewsBlockProps> = ({
  heading,
  text,
  initialLimit = 3,
  showSidebar = true,
  sidebarTitle,
  sidebarButtonText,
  sidebarButtonLink,
  className,
}) => {
  const [newsPosts, setNewsPosts] = useState<NewsEntry[]>([])
  const [visibleCount, setVisibleCount] = useState(initialLimit)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        // const res = await fetch(`${payloadURL}/api/news?sort=-publishedAt`)
        const res = await fetch('/api/news-cached')
        if (res.ok) {
          const json = await res.json()
          setNewsPosts(json.docs ?? [])
        }
      } catch (err) {
        console.warn('Failed to fetch news posts from Payload:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, newsPosts.length))
  }

  // Show spinner while fetching
  if (loading) {
    return (
      <div
        className={`max-w-[1200px] mx-auto mt-6 px-4 pb-16 flex justify-center items-center ${className || ''}`}
      >
        <div className="w-10 h-10 border-4 border-black/30 border-t-black rounded-full animate-spin" />
      </div>
    )
  }

  if (!newsPosts.length) return null

  return (
    <div
      className={`max-w-[1200px] mx-auto mt-6 px-4 pb-16 flex justify-between ${className || ''}`}
    >
      <div className="sm:w-[calc(60%-2em)] max-w-[700px] flex flex-col">
        {heading && <h2 className="mb-6">{heading}</h2>}
        {text && <p className="mb-8">{text}</p>}

        {newsPosts.slice(0, visibleCount).map((post) => (
          <div key={post.slug} className="mb-16 flex flex-col">
            <h3 className="mb-4">{post.title}</h3>
            {post.metaDescription && <p className="mb-4">{post.metaDescription}</p>}
            <Link
              href={`/journal/${post.slug}`}
              className="self-start shadow-lg px-6 py-4 rounded-full"
            >
              Read Article{' '}
              <svg
                className="w-[12px] inline-block ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
              </svg>
            </Link>
          </div>
        ))}

        {visibleCount < newsPosts.length && (
          <button
            onClick={showMore}
            className="self-center sm:self-end mt-6 shadow-lg px-6 py-4 rounded-full"
          >
            Show More{' '}
            <svg
              className="w-[10px] inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </button>
        )}
      </div>

      {showSidebar && sidebarTitle && sidebarButtonText && sidebarButtonLink && (
        <div className="max-sm:hidden w-[35%] flex flex-col">
          <div className="sticky ml-auto right-0 top-10 bg-[#fbfbfb] max-w-[350px] rounded-3xl shadow-lg p-8">
            <p className="font-bold text-4xl mb-4">{sidebarTitle}</p>
            <Link href={sidebarButtonLink}>
              {sidebarButtonText}{' '}
              <svg
                className="w-[12px] inline-block ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
