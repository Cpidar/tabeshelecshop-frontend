import { cn } from '@/utils/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import RenderSingleBlocks from '@/blocks/RenderSingleBlocks'
import type { IconGroupValue } from '@/fields/IconSelector/RenderIcon'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
    quarter: '3',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-y-8 gap-x-8">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, contentType, block } = col as typeof col & {
              size: 'full' | 'half' | 'oneThird' | 'twoThirds' | 'quarter' | null | undefined
            }

            const icon = link?.icon

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-6': size === 'full' || size === 'twoThirds',
                  'md:col-span-3': size === 'quarter' || size === 'oneThird' || size === 'half',
                  // 'md:col-span-4': size === 'oneThird',
                })}
                key={index}
              >
                {contentType === 'text' && richText && (
                  <RichText data={richText} enableGutter={false} />
                )}

                {contentType === 'block' && block && (
                  <RenderSingleBlocks
                    blocks={block as any}
                    excludeBlockTypes={['tabsBlock']}
                    excludeMargin
                  />
                )}

                {enableLink && icon?.name && (
                  <CMSLink
                    {...{
                      ...link,
                      appearance:
                        link?.appearance === 'dark'
                          ? 'default'
                          : link?.appearance,
                    }}
                    icon={icon as IconGroupValue}
                  />
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
