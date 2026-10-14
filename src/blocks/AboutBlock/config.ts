import type { Block } from 'payload'
import { lexicalEditor, HTMLConverterFeature, lexicalHTML } from '@payloadcms/richtext-lexical'

export const AboutBlock: Block = {
  slug: 'aboutBlock',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'mainText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
      admin: {
        description: 'Main body copy (add "about-styling" as the block name for about page special styling)',
      },
    },
    lexicalHTML('mainText', { name: 'mainText_html' }), // Stores HTML separately
    {
      name: 'sidebarTitle',
      type: 'text',
      admin: {
        description: 'Title for the sticky sidebar box',
      },
    },
    {
      name: 'sidebarText',
      type: 'textarea',
      admin: {
        description: 'Optional text/content for the sidebar',
      },
    },
    {
      name: 'sidebarLink',
      type: 'text',
      defaultValue: '/our-work',
      admin: {
        description: 'Link URL for the sidebar button',
      },
    },
    {
      name: 'sidebarButtonText',
      type: 'text',
      defaultValue: 'View our work',
      admin: {
        description: 'Text for the sidebar button',
      },
    },
  ],
}
