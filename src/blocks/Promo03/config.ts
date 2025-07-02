import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CategorySlider: Block = {
  slug: 'categorySlider',
  fields: [
    {
      name: 'promoType',
      type: 'select',
      options: [
        { label: 'Type 01', value: 'type01' },
        { label: 'Type 02', value: 'type02' },
        { label: 'Type 03', value: 'type03' },
      ],
      defaultValue: 'card01',
      required: true,
    },
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
    {
      name: 'subHeading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: false,
    },

    {
      name: 'data',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'product-categories',
          required: true,
          hasMany: true,
        },
      ]
    }

  ],
  interfaceName: 'CategorySlider',
}
