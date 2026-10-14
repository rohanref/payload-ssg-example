'use client'
import React, { useEffect, useState } from 'react'
import type { Page } from '@/payload-types'

type VideoHeroType =
  | { children?: React.ReactNode; videoHero?: never } // fallback
  | (Omit<Page['hero'], 'richText'> & { children?: never; videoHero?: Page['hero']['videoHero'] })

export const VideoHero: React.FC<VideoHeroType> = ({ videoHero }) => {
  const [isClient, setIsClient] = useState(false)

  // Only render on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  if (!videoHero?.desktopVideoUrl && !videoHero?.mobileVideoUrl) return null

  return (
    <div className="mt-[-103px] sm:mt-[-180px] block bg-black">
      {videoHero?.desktopVideoUrl && (
        <div
          className="max-sm:hidden bg-black"
          style={{ padding: '56.25% 0 0 0', position: 'relative', marginTop: '-103px' }}
        >
          <iframe
            src={`${videoHero.desktopVideoUrl}?autoplay=1&loop=1&muted=1&background=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="Desktop Video Hero"
          />
        </div>
      )}

      {videoHero?.mobileVideoUrl && (
        <div
          className="sm:hidden bg-black"
          style={{ padding: '125% 0 0 0', position: 'relative', marginTop: '-180px' }}
        >
          <iframe
            src={`${videoHero.mobileVideoUrl}?autoplay=1&loop=1&muted=1&background=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="Mobile Video Hero"
          />
        </div>
      )}
    </div>
  )
}