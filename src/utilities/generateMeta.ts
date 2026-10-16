import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-og.jpg'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title + '' : 'Dental Health Care Associates'

  const noIndex = (doc?.meta as any)?.noIndex === true

  return {
    description:
      doc?.meta?.description ||
      'Dentists Melbourne CBD. General Dentistry, Cosmetic Dentistry and Dental Hygiene. Dentists Collins Street in the heart of the Melbourne CBD. Ph: 03 9650 2909',
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: mergeOpenGraph({
      description:
        doc?.meta?.description ||
        'Dentists Melbourne CBD. General Dentistry, Cosmetic Dentistry and Dental Hygiene. Dentists Collins Street in the heart of the Melbourne CBD. Ph: 03 9650 2909',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
