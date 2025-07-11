import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { editor } from '@/modules/footer/config'

export const PromoSection02: Block = {
  slug: 'promoSection02',
  interfaceName: 'PromoSection02',

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
      required: true,
      localized: true,
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
