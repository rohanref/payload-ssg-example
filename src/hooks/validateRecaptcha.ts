export const validateRecaptcha = async ({ data }: any) => {
  const token = data.recaptchaToken
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!token) {
    throw new Error('Missing reCAPTCHA token.')
  }

  if (!secret) {
    throw new Error('Missing reCAPTCHA secret key.')
  }

  const bypassToken = process.env.RECAPTCHA_TEST_BYPASS_TOKEN
  if (bypassToken && token === bypassToken) {
    return data
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  const json = await res.json()

  // For v3, json.success is still true/false, but we also have json.score
  if (!json.success) {
    console.error('reCAPTCHA verification failed', {
      errors: json['error-codes'],
      action: json.action,
      hostname: json.hostname,
    })
    throw new Error('Failed reCAPTCHA verification.')
  }

  // Optional: enforce a minimum score threshold
  // if (json.score !== undefined && json.score < 0.5) {
  //   console.error('reCAPTCHA score too low', {
  //     score: json.score,
  //     action: json.action,
  //     hostname: json.hostname,
  //   })
  //   throw new Error('Failed reCAPTCHA verification (low score).')
  // }

  return data
}
