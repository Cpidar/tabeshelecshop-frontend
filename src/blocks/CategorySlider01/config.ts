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
      name: 'categoryCardType',
      type: 'select',
      options: [
        { label: 'Card 01', value: 'card01' },
        { label: 'Card 02', value: 'card02' },
        { label: 'Card 03', value: 'card03' },
        { label: 'Card 04', value: 'card04' },
        { label: 'Card 05', value: 'card05' },
        { label: 'Card 06', value: 'card06' },
        { label: 'Card 07', value: 'card07' },
      ],
      defaultValue: 'card07',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      // editor: lexicalEditor({
      //   features: ({ rootFeatures }) => {
      //     return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
      //   },
      // }),
      label: false,
      required: true,
    },
    {
      name: 'subHeading',
      type: 'text',
      // editor: lexicalEditor({
      //   features: ({ rootFeatures }) => {
      //     return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
      //   },
      // }),
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
