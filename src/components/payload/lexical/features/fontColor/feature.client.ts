'use client'

import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'

import { DropdownColorPicker } from './components/DropdownColorPicker'

export const ColorPickerClient = createClientFeature({
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'fontColor',
          label: 'Color Text',
          // Explicitly type as any if ToolbarGroupItem is not exported, or import and use the correct type
          Component: DropdownColorPicker as any,
        },
      ]),
    ],
  },
})

export default ColorPickerClient
