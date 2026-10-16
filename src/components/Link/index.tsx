import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  secondaryLabel?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    secondaryLabel,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' &&
    typeof reference?.value === 'object' &&
    reference.value !== null &&
    'slug' in reference.value &&
    reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  if (secondaryLabel) {
    return (
      <Link
        className={cn('group', className)}
        href={href || url || ''}
        {...newTabProps}
      >
        <span>{label}</span>
        <span className="max-sm:hidden mt-2 block text-base font-normal opacity-0 transition-opacity duration-600 group-hover:opacity-100">
          {secondaryLabel}
        </span>
      </Link>
    )
  }


  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn('self-start cursor-pointer !shadow-lg !px-6 !py-4 !rounded-full !bg-white !text-black !text-base !mt-3 !h-auto', className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
        <svg className="!w-[12px] inline-block ml-1 mt-[4px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
      </Link>
    </Button>
  )
}
