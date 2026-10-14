'use client'
import React, { useState } from 'react'

const REBUILD_URL =
  'https://api.vercel.com/v1/integrations/deploy/prj_iej4H9XnUrX3SXARSJI5SvZAkEl2/dJxg1JOqGV'
// Get this from Vercel > Settings > Git > Deploy Hooks

const RebuildButton: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleClick = async () => {
    setStatus('loading')
    try {
      const res = await fetch(REBUILD_URL, { method: 'POST' })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      <p style={{ margin: '0 0 1rem 0' }}>
        Pushed something via git or just want to redeploy? Click the button below.
      </p>
      <button
        onClick={handleClick}
        disabled={status === 'loading'}
        style={{
          padding: '0.6rem 1.2rem',
          fontSize: '1rem',
          backgroundColor: '#f5f5f5',
          color: 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: status === 'loading' ? 0.6 : 1,
        }}
      >
        {status === 'loading' ? 'Triggering...' : 'Trigger Site Rebuild'}
      </button>
      {status === 'done' && <p style={{ color: 'green' }}>✅ Deploy triggered!</p>}
      {status === 'error' && <p style={{ color: 'red' }}>❌ Failed to trigger deploy</p>}
    </div>
  )
}

export default RebuildButton
