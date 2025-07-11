import type { Block } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { editor } from '@/modules/footer/config'

export const PromoBlock: Block = {
  slug: 'promoBlock',
  interfaceName: 'PromoBlock',

  fields: [
    {
      name: "PromoType",
      type: 'select',
      options: [
        { label: 'Promo1', value: 'promo1' },
        { label: 'Promo2', value: 'promo2' },
        { label: 'Promo3', value: 'promo3' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            AlignFeature(),
          ]
        },
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageDark',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
