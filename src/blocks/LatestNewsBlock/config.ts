import type { Block } from 'payload'

export const LatestNewsBlock: Block = {
  slug: 'latestNewsBlock',
  interfaceName: 'LatestNewsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Journal',
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 2,
      admin: {
        description: 'Number of recent news posts to show',
      },
    },
  ],
}
