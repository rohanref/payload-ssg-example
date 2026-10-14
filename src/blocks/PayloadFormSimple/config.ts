import type { Block } from 'payload'

export const PayloadFormSimpleBlock: Block = {
  slug: 'payloadFormSimple',
  labels: {
    singular: 'Simple Form',
    plural: 'Simple Forms',
  },
  fields: [
    {
      name: 'formId',
      type: 'number',
      required: true,
    },
    {
      name: 'fieldMaxWidth',
      type: 'number',
      defaultValue: 400,
    },
    {
      name: 'formMaxWidth',
      type: 'number',
      defaultValue: 400,
    },
  ],
}
