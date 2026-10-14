import type { Block } from 'payload'

export const CapabilitiesBlock: Block = {
  slug: 'capabilitiesBlock',
  interfaceName: 'CapabilitiesBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Capabilities',
    },
    {
      name: 'text',
      type: 'textarea',
      defaultValue: 'Our ever-evolving wheelhouse.',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Add one or more capability items',
      },
    },
  ],
}