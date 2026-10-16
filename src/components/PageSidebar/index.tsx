'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { Header, Footer, Media } from '@/payload-types'

type Props = {
  navSection: string | null
  headerData: Header
  footerData: Footer
}

export const PageSidebar: React.FC<Props> = ({ navSection, headerData, footerData }) => {
  const navItems = headerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const section = navItems.find(
    (item) => item.link?.label?.toLowerCase().replace(/\s+/g, '-') === navSection,
  )

  const children = section?.children || []
  const headingChild = children[0]
  const listChildren = children.slice(1)

  return (
    <div className="flex flex-col gap-8">
      {section && (
        <nav className="">
          {/* Section heading */}
          {headingChild?.link?.url ? (
            <Link
              href={headingChild.link.url}
              className="block pb-4 font-bold text-4xl text-[#33C7B7]"
            >
              {section.link?.label}
            </Link>
          ) : (
            <p className="block pb-4 font-bold text-4xl text-[#33C7B7]">{section.link?.label}</p>
          )}

          <ul className="flex flex-col">
            {listChildren.map((child, i) => {
              const hasSubChildren = !!child.subChildren?.length
              const isOpen = openIndex === i

              return (
                <li key={i} className="border-b border-[#33C7B7]">
                  <div className="flex items-center justify-between py-2">
                    {hasSubChildren ? (
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="flex-1 text-left"
                      >
                        {child.link?.label}
                      </button>
                    ) : child.link?.url ? (
                      <Link href={child.link.url} className="flex-1 hover:text-[#0082CA]">
                        {child.link.label}
                      </Link>
                    ) : (
                      <span className="">{child.link?.label}</span>
                    )}
                    {hasSubChildren && (
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className={`font-bold text-xl leading-none ml-2 w-6 text-center ${isOpen ? 'text-[#0082CA]' : 'text-[#33C7B7]'}`}
                        aria-label={isOpen ? 'Collapse' : 'Expand'}
                      >
                        {isOpen ? '−' : '+'}
                      </button>
                    )}
                  </div>

                  {hasSubChildren && isOpen && (
                    <ul className="flex flex-col">
                      {child.subChildren!.map((grandchild, j) => (
                        <li key={j} className="">
                          <div className="px-2 py-2">
                            {grandchild.link?.url ? (
                              <Link href={grandchild.link.url} className="hover:text-[#0082CA]">
                                {grandchild.link.label}
                              </Link>
                            ) : (
                              <span className="">{grandchild.link?.label}</span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      )}

      {/* Social links */}
      {socialLinks.length > 0 && (
        <div>
          <p className="font-bold text-lg mb-1">Follow us</p>
          <div className="flex gap-2">
            {socialLinks.map(({ label, url, icon }, i) => {
              const iconMedia = icon as Media | null
              return (
                <a
                  key={i}
                  href={url}
                  aria-label={`Visit ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-10 h-10"
                >
                  {iconMedia?.url && (
                    <img
                      src={iconMedia.url}
                      alt={iconMedia.alt || label}
                      className="w-full h-full object-contain"
                    />
                  )}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
