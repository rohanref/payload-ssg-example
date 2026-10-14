import type { Block } from 'payload'

export const NewsBlock: Block = {
  slug: 'newsBlock',
  interfaceName: 'NewsBlock',
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
      name: 'initialLimit',
      type: 'number',
      defaultValue: 3,
      admin: {
        description: 'Number of posts to show initially before "Show More"',
      },
    },
    {
      name: 'showSidebar',
      type: 'checkbox',
      label: 'Show floating sidebar?',
      defaultValue: true,
    },
    {
      name: 'sidebarTitle',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.showSidebar,
      },
      defaultValue: "We're even nicer in person.",
    },
    {
      name: 'sidebarButtonText',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.showSidebar,
      },
      defaultValue: 'Get in touch',
    },
    {
      name: 'sidebarButtonLink',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.showSidebar,
      },
      defaultValue: '/contact',
    },
  ],
}