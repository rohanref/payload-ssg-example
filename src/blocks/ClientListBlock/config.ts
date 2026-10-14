import type { Block } from 'payload'

export const ClientListBlock: Block = {
  slug: 'clientListBlock',
  interfaceName: 'ClientListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Clients',
    },
    {
      name: 'text',
      type: 'textarea',
      defaultValue: "We love our clients. Here’s a few we’ve worked with.",
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Client logos',
      // minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
