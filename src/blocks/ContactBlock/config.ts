import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Wow, you’re keen.',
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: 'What do you want to talk about?',
    },
    {
      name: 'buttons',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'id',
          type: 'text',
          admin: {
            description: 'Optional ID for anchor or JS hooks',
          },
        },
      ],
      defaultValue: [
        { label: "Let's start a project", id: 'start-project' },
        { label: 'I need help', id: 'start-chat' },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '(+61) 3 9533 6293',
    },
    {
      name: 'phoneHref',
      type: 'text',
      defaultValue: 'tel:+61395336293',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'hello@therefinery.com.au',
    },
    {
      name: 'emailHref',
      type: 'text',
      defaultValue: 'mailto:hello@therefinery.com.au',
    },
    {
      name: 'mapUrl',
      type: 'text',
      admin: {
        description:
          'Google Maps iframe embed URL (Add to show standard map embed), e.g: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.217992867442!2d144.9929516!3d-37.8317822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6682fe4195445%3A0xf894299e29143ebc!2sThe%20Refinery!5e0!3m2!1sen!2sau!4v1747027182860!5m2!1sen!2sau',
      },
    },
    {
      name: 'mapLat',
      type: 'number',
      defaultValue: '-37.83177531504164',
      admin: {
        description: 'Add lat and long values to show the Google Maps api option',
      },
    },
    {
      name: 'mapLong',
      type: 'number',
      defaultValue: '144.99294891779996',
      admin: {
        description: 'Add lat and long values to show the Google Maps api option',
      },
    },
  ],
}
