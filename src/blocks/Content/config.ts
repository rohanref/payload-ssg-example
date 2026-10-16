import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  BlockquoteFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },
  {
    name: 'columnType',
    type: 'select',
    defaultValue: 'richText',
    options: [
      { label: 'Rich Text', value: 'richText' },
      { label: 'Media', value: 'media' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlockquoteFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      condition: (_data, siblingData) => siblingData?.columnType === 'richText',
    },
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_data, siblingData) => siblingData?.columnType === 'media',
    },
  },
  {
    name: 'links',
    type: 'array',
    label: 'Links',
    fields: [link()],
    maxRows: 6,
    admin: {
      initCollapsed: true,
    },
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    {
      name: 'maxWidth',
      type: 'text',
      label: 'Max Width',
      admin: {
        description:
          'Optional: enter a max-width for this block (e.g., 1100px). If set, content will be centered. Only works for single columns',
      },
    },
    {
      name: 'paddingTop',
      type: 'number',
      label: 'Padding Top (px)',
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Top padding in pixels',
      },
    },
    {
      name: 'paddingBottom',
      type: 'number',
      label: 'Padding Bottom (px)',
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Bottom padding in pixels',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        description: 'Any valid CSS color value (e.g., #ffffff, rgb(0,0,0), transparent)',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color',
      admin: {
        description: 'Any valid CSS color value (e.g., #333333)',
      },
    },
  ],
}
