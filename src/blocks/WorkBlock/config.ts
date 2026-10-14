import type { Block } from 'payload'

export const WorkBlock: Block = {
  slug: 'workBlock',
  interfaceName: 'WorkBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Our work',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'View all projects',
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '/our-work',
    },
    {
      name: 'limit',
      type: 'number',
      required: true,
      defaultValue: 3,
      admin: {
        description: 'Number of work entries to show initially',
      },
    },
    {
      name: 'fetchLimit',
      type: 'number',
      required: true,
      defaultValue: 100,
      admin: {
        description:
          'Max number of recent work items to fetch (use the same number as the Limit field to avoid showing the load more button)',
      },
    },
    {
      name: 'entries',
      type: 'relationship',
      relationTo: 'work',
      hasMany: true,
      admin: {
        description: 'Optional: select specific work entries. If none are selected, the block will fetch the latest from Payload.',
      },
    },
    {
      name: 'isBlackBG',
      type: 'checkbox',
      label: 'Black background?',
      defaultValue: false,
      admin: {
        description: 'Tick for black bg, leave unticked for white bg',
      },
    },
  ],
}