import React from 'react'
import type { AboutBlock as AboutBlockProps } from '@/payload-types'

type Props = AboutBlockProps & { className?: string }

export const AboutBlock: React.FC<Props> = ({
  blockName,
  mainText,
  mainText_html,
  sidebarTitle,
  sidebarText,
  sidebarLink,
  sidebarButtonText,
  className,
}) => {
  return (
    <div
      className={
        className ||
        `max-w-[1200px] mx-auto px-4 relative md:flex justify-between ${
          blockName !== 'no-top-padding' ? 'pt-12' : ''
        }`
      }
    >
      <div className="md:w-[calc(60%-2em)] max-w-[700px] mt-8 mb-16 md:mb-32">
        <div className={`mb-6 ${
          blockName === 'about-styling'
            ? 'text-xl sm:text-2xl font-bold space-y-4'
            : 'text-lg'
        }`} dangerouslySetInnerHTML={{ __html: mainText_html || '' }} />
      </div>

      {(sidebarTitle || sidebarText || sidebarLink) && (
        <div className="max-md:hidden w-[35%] flex flex-col">
          <div className="sticky ml-auto right-0 top-10 bg-[#fbfbfb] max-w-[350px] rounded-3xl shadow-lg p-6">
            {sidebarTitle && <p className="font-bold text-4xl mb-4">{sidebarTitle}</p>}
            {sidebarText && <p className="mb-4">{sidebarText}</p>}
            {sidebarLink && sidebarButtonText && (
              <a href={sidebarLink}>
                {sidebarButtonText}
                <svg
                  className="w-[12px] inline-block ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
