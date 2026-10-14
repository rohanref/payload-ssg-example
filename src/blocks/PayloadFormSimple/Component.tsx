'use client'

import React, { useEffect, useState } from 'react'

interface PayloadField {
  name: string
  label: string
  blockType: string
  required?: boolean
}

interface PayloadForm {
  id: number
  fields: PayloadField[]
  submitButtonLabel?: string
}

interface Props {
  formId: number
  formMaxWidth?: number
  fieldMaxWidth: number
  statusId?: string
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

const PayloadFormSimple: React.FC<Props> = ({ formId, fieldMaxWidth, formMaxWidth, statusId }) => {
  const [form, setForm] = useState<PayloadForm | null>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string>('')

  // Load reCAPTCHA script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return

    const scriptId = 'recaptcha-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
      script.id = scriptId
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  useEffect(() => {
    async function fetchForm() {
      const res = await fetch(`/api/forms/${formId}`)
      if (!res.ok) return
      const json = await res.json()
      setForm(json)
    }

    fetchForm()
  }, [formId])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!form) return

    const formEl = e.currentTarget

    setLoading(true)
    setStatus('')

    const formData = new FormData(formEl)
    const submissionData = Array.from(formData.entries()).map(([field, value]) => ({
      field,
      value,
    }))

    try {
      let recaptchaToken = ''
      if (RECAPTCHA_SITE_KEY && (window as any).grecaptcha) {
        recaptchaToken = await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: 'submit',
        })
      }
      // To prove it's actually working snce it's invisible
      // console.log('reCAPTCHA token:', recaptchaToken)

      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: form.id,
          submissionData,
          recaptchaToken,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.errors?.[0]?.message || 'Submission failed')
      }

      // SUCCESS
      setStatus('Thanks! Your message has been sent.')
      // TRACK
      if (typeof window !== 'undefined') {
        const gtag = (window as any).gtag

        if (typeof gtag === 'function') {
          gtag('event', 'form_submission', {
            form_title: formEl.getAttribute('data-form-id'),
            success: true,
          })

          gtag('event', 'conversion', {
            send_to: 'AW-1017740444/HJglCIyA5vcbEJz5peUD',
          })
        }
      }
      formEl.reset()
    } catch (err: any) {
      setStatus(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (!form) return null

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full mx-auto ${formMaxWidth ? 'px-5' : ''}`}
      data-form-id={form.id}
      style={{ maxWidth: formMaxWidth }}
    >
      {form.fields.map((field) => (
        <div
          key={field.name}
          className={`w-full !max-sm:max-w-full mb-2`}
          style={{ maxWidth: fieldMaxWidth }}
        >
          <label htmlFor={field.name} className="text-[0px] h-0 block">
            {field.label}
          </label>

          {field.blockType === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.label}
              rows={3}
              className="border-b border-[#ccc] py-2 block w-full bg-transparent"
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.blockType === 'email' ? 'email' : 'text'}
              required={field.required}
              placeholder={field.label}
              className="border-b border-[#ccc] py-2 block w-full bg-transparent"
            />
          )}
        </div>
      ))}

      <p className="text-xs text-[#807f80]" style={{ maxWidth: fieldMaxWidth }}>
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black cursor-pointer shadow-lg px-6 py-4 mt-6 rounded-full flex items-center justify-center gap-2"
      >
        <span className="btn-label">
          {loading ? 'Sending…' : form.submitButtonLabel || 'Submit'}
        </span>

        {!loading && (
          <svg
            className="w-[12px] inline-block ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        )}
      </button>

      {status && (
        <p id={statusId} className="ignore-effect mt-4 text-sm">
          {status}
        </p>
      )}
    </form>
  )
}

export default PayloadFormSimple
