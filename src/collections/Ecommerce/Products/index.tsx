import type { Block, CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { anyone } from '@/access/anyone'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { BackgroundImageBlock } from '@/blocks/BackgroundImage/config'
import { SingleBlockOptions } from '@/blocks/BlockOptions'
import { Content } from '@/blocks/Content/config'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status', 'inventory_quantity'],
    group: 'Ecommerce',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Product Title',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Product Subtitle',
            },
            {
              name: 'status',
              type: 'select',
              label: 'Status',
              options: [
                {
                  label: 'Draft',
                  value: 'draft',
                },
                {
                  label: 'Proposed',
                  value: 'proposed',
                },
                {
                  label: 'Published',
                  value: 'published',
                },
                {
                  label: 'Rejected',
                  value: 'rejected',
                },
              ],
              defaultValue: 'draft',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              label: 'Product Type',
              options: [
                {
                  label: 'Regular',
                  value: 'regular',
                },
                {
                  label: 'Giftcard',
                  value: 'giftcard',
                },
              ],
              defaultValue: 'regular',
              required: true,
            },
            ...slugField('name'),
            {
              name: 'url',
              type: 'text',
              admin: {
                readOnly: true,
                position: 'sidebar',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryCategory',
                  label: {
                    singular: 'Primary Category',
                    plural: 'Primary Categories',
                  },
                  type: 'relationship',
                  relationTo: 'product-categories',
                  required: true,
                  admin: {
                    position: 'sidebar',
                  },
                },
                {
                  name: 'categories',
                  label: {
                    singular: 'Other Categories',
                    plural: 'Other Categories',
                  },
                  type: 'relationship',
                  relationTo: 'product-categories',
                  admin: {
                    position: 'sidebar',
                  },
                  hasMany: true,
                },
              ],
            },

            {
              name: 'handle',
              type: 'text',
              required: true,
              admin: {
                description: 'URL-friendly identifier that can be used in storefront',
              },
            },
            {
              name: 'discountable',
              type: 'checkbox',
              label: 'Discountable',
              defaultValue: true,
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              admin: {
                description: 'A description of the Product',
              },
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    BlocksFeature({
                      blocks: [
                        BackgroundImageBlock,
                        Content,
                        ...SingleBlockOptions.filter(
                          (block): block is Block =>
                            'fields' in block && 'slug' in block && block.slug !== 'contactSection',
                        ),
                      ],
                    }),
                  ]
                },
              }),
            },

            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'product-images',
              label: 'Thumbnail',
            },
            {
              name: 'images',
              type: 'upload',
              relationTo: 'product-images',
              label: 'Product Images',
              hasMany: true,
            },
            {
              name: 'weight',
              type: 'number',
              label: 'Weight (in grams)',
            },
            {
              name: 'length',
              type: 'number',
              label: 'Length (cm)',
            },
            {
              name: 'width',
              type: 'number',
              label: 'Width (cm)',
            },
            {
              name: 'height',
              type: 'number',
              label: 'Height (cm)',
            },
            {
              name: 'hs_code',
              type: 'text',
              label: 'HS Code',
              admin: {
                description: 'Harmonized System code for customs',
              },
            },
            {
              name: 'origin_country',
              type: 'text',
              label: 'Origin Country',
            },
            {
              name: 'mid_code',
              type: 'text',
              label: 'MID Code',
            },
            {
              name: 'material',
              type: 'text',
              label: 'Material',
            },
            {
              name: 'variants',
              type: 'array',
              label: 'Variants',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: true,
                },
                {
                  name: 'sku',
                  type: 'text',
                  label: 'SKU',
                  required: true,
                },
                {
                  name: 'ean',
                  type: 'text',
                  label: 'EAN',
                },
                {
                  name: 'upc',
                  type: 'text',
                  label: 'UPC',
                },
                {
                  name: 'barcode',
                  type: 'text',
                  label: 'Barcode',
                },
                {
                  name: 'inventory_quantity',
                  type: 'number',
                  label: 'Inventory Quantity',
                  required: true,
                },
                {
                  name: 'allow_backorder',
                  type: 'checkbox',
                  label: 'Allow Backorder',
                },
                {
                  name: 'manage_inventory',
                  type: 'checkbox',
                  label: 'Manage Inventory',
                  defaultValue: true,
                },
                {
                  name: 'weight',
                  type: 'number',
                  label: 'Weight (in grams)',
                },
                {
                  name: 'length',
                  type: 'number',
                  label: 'Length (cm)',
                },
                {
                  name: 'width',
                  type: 'number',
                  label: 'Width (cm)',
                },
                {
                  name: 'height',
                  type: 'number',
                  label: 'Height (cm)',
                },
                {
                  name: 'origin_country',
                  type: 'text',
                  label: 'Origin Country',
                },
                {
                  name: 'mid_code',
                  type: 'text',
                  label: 'MID Code',
                },
                {
                  name: 'material',
                  type: 'text',
                  label: 'Material',
                },
                {
                  name: 'metadata',
                  type: 'json',
                  label: 'Metadata',
                },
                {
                  name: 'prices',
                  type: 'array',
                  label: 'Prices',
                  fields: [
                    {
                      name: 'currency_code',
                      type: 'select',
                      options: [
                        { label: 'USD', value: 'usd' },
                        { label: 'EUR', value: 'eur' },
                        { label: 'GBP', value: 'gbp' },
                        { label: 'IRR', value: 'irr' },
                      ],
                      required: true,
                    },
                    {
                      name: 'amount',
                      type: 'number',
                      required: true,
                      admin: {
                        step: 1,
                        description: 'Amount in smallest currency unit (e.g., cents)',
                      },
                    },
                    {
                      name: 'min_quantity',
                      type: 'number',
                    },
                    {
                      name: 'max_quantity',
                      type: 'number',
                    },
                  ],
                },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  fields: [
                    {
                      name: 'option_id',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'options',
          label: 'Product Options',
          fields: [
            {
              name: 'options',
              type: 'array',
              label: 'Options',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'values',
                  type: 'array',
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'specifications',
          label: 'Additional Details',
          fields: [
            // {
            //   name: 'collection_id',
            //   type: 'relationship',
            //   relationTo: 'product-collections',
            //   label: 'Collection',
            // },
            {
              name: 'tags',
              type: 'array',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'sales_channels',
              type: 'array',
              fields: [
                {
                  name: 'id',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'metadata',
              type: 'json',
              label: 'Metadata',
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'product-images',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // If the product has a primaryCategory and a slug, build the URL.
        if (data.primaryCategory && data.slug) {
          // Look up the primary category using the Payload API.
          const category = await req.payload.findByID({
            collection: 'product-categories',
            id: data.primaryCategory,
          })
          // If the category has a URL, combine it with the product slug.
          if (category && category.url) {
            data.url = `${category.url}/${data.slug}`
          }
        }
        return data
      },
    ],
  },
}
