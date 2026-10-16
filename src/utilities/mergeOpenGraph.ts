import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Dentists Melbourne CBD. General Dentistry, Cosmetic Dentistry and Dental Hygiene. Dentists Collins Street in the heart of the Melbourne CBD. Ph: 03 9650 2909',
  images: [
    {
      url: `${getServerSideURL()}/website-template-og.jpg`,
    },
  ],
  siteName: 'Dental Health Care Associates | Dentists Collins Street Melbourne',
  title: 'Dental Health Care Associates | Dentists Collins Street Melbourne',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
