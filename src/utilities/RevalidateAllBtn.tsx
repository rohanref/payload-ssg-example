'use client'

import { useState } from 'react'

export default function RevalidateWebsite() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRevalidate = async () => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/revalidate-all', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to revalidate')
      }

      setMessage('✓ Website cache revalidated')
    } catch (error) {
      console.error(error)
      setMessage('Failed to revalidate website cache')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '4rem', marginBottom: '2rem', paddingLeft: '6px' }}>
      <button type="button" onClick={handleRevalidate} disabled={loading}>
        {loading ? 'Revalidating...' : 'Revalidate All Cache'}
      </button>

      {message && <span style={{ marginLeft: '12px' }}>{message}</span>}
    </div>
  )
}
