import type { VimeoBlock as VimeoBlockProps } from '@/payload-types'

type Props = VimeoBlockProps & { className?: string }

export const VimeoBlock: React.FC<Props> = ({
  iframeID,
  iframeSRC,
  iframeTitle,
  paddingRatio,
  className,
}) => {
  return (
    <div className="max-w-[1200px] mx-auto pt-6 px-4">
      <div
        className={`w-full overflow-hidden rounded-[24px] mb-12 ${className || ''}`}
        style={{
          padding: paddingRatio || '56.25% 0 0 0',
          position: 'relative',
        }}
      >
        <iframe
          id={iframeID || undefined}
          src={iframeSRC}
          title={iframeTitle}
          frameBorder="0"
          allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  )
}
