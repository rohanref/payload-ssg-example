import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, maxWidth } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16 text-[18px]">
      <div
        className={cn(
          'gap-y-8 gap-x-16',
          maxWidth
            ? 'flex justify-center' // switch to flex if maxWidth is set
            : 'grid grid-cols-4 lg:grid-cols-12' // default grid
        )}
      >
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                key={index}
                className={cn(
                  maxWidth ? 'w-full' : `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  { 'md:col-span-2': !maxWidth && size !== 'full' },
                  maxWidth ? 'mx-auto' : '' // center the child in flex
                )}
                style={maxWidth ? { maxWidth: maxWidth } : undefined} // apply maxWidth inline
              >
                {richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}