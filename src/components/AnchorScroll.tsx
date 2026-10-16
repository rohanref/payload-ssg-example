'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function AnchorScroll() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const hash = window.location.hash

    if (!hash) return

    const id = hash.replace('#', '')

    let attempts = 0
    const maxAttempts = 100

    const interval = setInterval(() => {
      const element = document.getElementById(id)

      console.log('Checking for anchor:', id, element)

      if (element) {
        clearInterval(interval)

        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      attempts++

      if (attempts >= maxAttempts) {
        clearInterval(interval)
        console.warn(`Anchor "${id}" not found`)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [pathname, searchParams])

  return null
}
