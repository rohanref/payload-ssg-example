import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React from 'react'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    className,
    enableGutter = true,
    imgClassName,
    media,
    position = 'default',
    staticImage,
    disableInnerContainer,
  } = props

  const isFullscreen = position === 'fullscreen'

  return (
    <div
      className={cn(
        {
          container: enableGutter && !isFullscreen,
          'w-full': isFullscreen,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media imgClassName={cn('', imgClassName)} resource={media} src={staticImage} />
      )}
    </div>
  )
}
