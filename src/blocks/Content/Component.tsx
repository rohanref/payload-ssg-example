import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { blockName, columns, maxWidth, paddingTop, paddingBottom, backgroundColor, textColor } =
    props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div
      style={{
        paddingTop: paddingTop ? `${paddingTop}px` : undefined,
        paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined,
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
      }}
      className={`${blockName}`}
    >
      <div className="container text-[18px]">
        <div
          className={cn(
            'gap-y-5 gap-x-16',
            maxWidth ? 'flex justify-center' : 'grid grid-cols-4 lg:grid-cols-12',
          )}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { links, richText, media, columnType, size } = col

              return (
                <div
                  key={index}
                  className={cn(
                    maxWidth ? 'w-full' : `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                    { 'md:col-span-2': !maxWidth && size !== 'full' },
                    maxWidth ? 'mx-auto' : '',
                  )}
                  style={maxWidth ? { maxWidth } : undefined}
                >
                  {columnType === 'media' && media && typeof media === 'object' && (
                    <Media resource={media} imgClassName="w-full" />
                  )}
                  {columnType !== 'media' && richText && (
                    <RichText
                      data={richText}
                      enableGutter={false}
                      className={cn(
                        '[&_blockquote]:text-[#33C7B7] [&_blockquote]:not-italic [&_blockquote]:border-s-[#33C7B7]',
                        !textColor && '[&_h2]:text-[#0082CA] [&_h2]:mb-5 [&_h2]:font-normal',
                        textColor && '[&_h2]:mb-5 [&_h2]:font-normal',
                      )}
                    />
                  )}
                  {links && links.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {links.map(({ link }, i) => (
                        <CMSLink
                          key={i}
                          {...link}
                          className={cn(
                            link.appearance === 'outline' && 'outlined',
                            link.appearance === 'default' && 'default-link',
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
