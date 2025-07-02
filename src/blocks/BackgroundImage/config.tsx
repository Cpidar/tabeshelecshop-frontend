import { Block } from 'payload'

export const BackgroundImageBlock: Block = {
  slug: 'backgroundImageBlock',
  interfaceName: 'BackgroundImageBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
