import { link } from '@/fields/link'
import { Block } from 'payload'

export const LinkBlock: Block = {
  slug: 'linkBlock',
  labels: {
    singular: 'Link',
    plural: 'Links',
  },
  fields: [link()],
}
