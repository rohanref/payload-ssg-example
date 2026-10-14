'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import type { WorkBlock as WorkBlockProps, Work } from '@/payload-types'
import { getMediaURL } from '@/utilities/getURL'

type Props = WorkBlockProps & {
  className?: string
  entryClassName?: string
  imgClassName?: string
}

function isWork(entry: number | Work): entry is Work {
  return typeof entry !== 'number'
}

export const WorkBlock: React.FC<Props> = ({
  heading,
  buttonText,
  buttonLink,
  limit,
  fetchLimit,
  entries,
  isBlackBG,
  className,
  entryClassName,
  imgClassName,
}) => {
  const [workEntries, setWorkEntries] = useState(entries ?? [])
  const [visibleCount, setVisibleCount] = useState(limit)
  const [loading, setLoading] = useState(false) // start as false

  // If entries aren't passed in from Payload, fetch latest work
  useEffect(() => {
    if (!entries || entries.length === 0) {
      setLoading(true)
      fetch(`/api/work-cached?limit=${fetchLimit}&sort=-publishedAt`)
        .then((res) => res.json())
        .then((data) => {
          setWorkEntries(data.docs ?? [])
          setLoading(false)
        })
        .catch((err) => {
          console.error('Failed to fetch work entries:', err)
          setLoading(false)
        })
    }
  }, [entries, fetchLimit])

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + limit, workEntries.length))
  }

  // Show inline spinner while fetching
  if (loading) {
    return (
      <div className={cn('pt-12 pb-12 px-4 flex justify-center items-center', className)}>
        <div className="w-10 h-10 border-4 border-black/30 border-t-black rounded-full animate-spin" />
      </div>
    )
  }

  if (!workEntries.length) return null

  return (
    <div
      className={cn(
        'pt-12 px-4 pb-12',
        isBlackBG ? 'bg-black text-white' : 'bg-white text-black',
        className,
      )}
    >
      <div className="max-w-[1500px] mx-auto flex flex-col">
        {heading && <h2 className="mb-6">{heading}</h2>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {workEntries.slice(0, visibleCount).map((entry) => {
            if (!isWork(entry)) return null // <-- skip if it's just an ID

            return (
              <Link
                href={`/our-work/${entry.slug}`}
                key={entry.slug}
                className={cn('mb-6 flex flex-col', entryClassName)}
              >
                {entry.thumbImage && typeof entry.thumbImage !== 'number' && (
                  <div className="mb-4 aspect-[600/315] relative">
                    <Image
                      src={getMediaURL(entry.thumbImage.url)}
                      alt={entry.title}
                      fill
                      className={cn('object-cover', imgClassName)}
                    />
                  </div>
                )}
                {entry.subtitle && <p className="ignore-effect">{entry.subtitle}</p>}
                <h3>{entry.title}</h3>
              </Link>
            )
          })}
        </div>

        {/* Show more button */}
        {visibleCount < workEntries.length && (
          <button
            onClick={showMore}
            className="self-center cursor-pointer mt-6 shadow-lg px-6 py-4 rounded-full"
          >
            More Projects
            <svg
              className="w-[10px] inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </button>
        )}

        {/* Optional "View All" button */}
        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className={`cursor-pointer px-6 py-4 rounded-full mt-6 mx-auto flex items-center justify-center ${
              isBlackBG ? 'border border-[#ccc]' : 'shadow-lg'
            }`}
          >
            {buttonText}
            <svg
              className="w-[12px] inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
