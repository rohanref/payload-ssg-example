import type { Block } from 'payload'

export const VimeoBlock: Block = {
  slug: 'vimeoBlock',
  interfaceName: 'VimeoBlock',
  fields: [
    {
      name: 'iframeID',
      type: 'text',
      admin: {
        description: 'Add an id to the iframe',
      },
    },
    {
      name: 'iframeSRC',
      type: 'text',
      required: true,
      admin: {
        description:
          'The full vimeo URL eg https://player.vimeo.com/video/1174234415?h=a0265900cc&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=0&loop=0&background=0&controls=1&muted=0',
      },
    },
    {
      name: 'iframeTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'paddingRatio',
      type: 'text',
      required: true,
      admin: {
        description: 'EG. 56.25% 0 0 0',
      },
    },
  ],
}
