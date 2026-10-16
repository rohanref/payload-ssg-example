import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
// import { GeistMono } from 'geist/font/mono'
// import { GeistSans } from 'geist/font/sans'
import React, { cache } from 'react'
import Script from 'next/script'

// import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { headers } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  // Get the current path (async headers)
  const headersList = await headers()
  const currentPath = headersList.get('x-invoke-path') ?? headersList.get('x-pathname') ?? '/' // fallback for root

  // Remove leading slash for Payload query
  const slug = currentPath === '/' ? 'home' : currentPath.replace(/^\/+/, '')

  // Fetch page from Payload
  // const page = await queryPageBySlug({ slug })

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

        {/* Load gtag script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M7NQRF2DN3"
          strategy="afterInteractive"
        />

        {/* Initialize gtag */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', 'G-M7NQRF2DN3');
            window.gtag('config', 'AW-1017740444');
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
          
          {children}
          
        </Providers>
      </body>
    </html>
  )
}

// Cached helper to query Payload by slug
// const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
//   const { isEnabled: draft } = await draftMode()
//   const payload = await getPayload({ config: configPromise })

//   const result = await payload.find({
//     collection: 'pages',
//     draft,
//     limit: 1,
//     pagination: false,
//     overrideAccess: draft,
//     where: {
//       slug: { equals: slug },
//     },
//   })

//   return result.docs?.[0] || null
// })

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
