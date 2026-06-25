'use client'

import { useEffect, useRef, useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'err'; msg: string }

export default function ContactForm() {
  const [emailErr, setEmailErr] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const loadedAt = useRef<number>(0)
  useEffect(() => {
    loadedAt.current = Date.now()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const honey = String(fd.get('website') ?? '')
    const email = String(fd.get('email') ?? '')

    // Silent success on honeypot or sub-3s submits — bots don't get a tell.
    if (honey || Date.now() - loadedAt.current < 3000) {
      setStatus({ kind: 'ok' })
      form.reset()
      return
    }

    if (!EMAIL_RE.test(email)) {
      setEmailErr(true)
      return
    }
    setEmailErr(false)
    setStatus({ kind: 'sending' })

    const payload = {
      firstName: String(fd.get('firstName') ?? ''),
      lastName: String(fd.get('lastName') ?? ''),
      email,
      message: String(fd.get('message') ?? ''),
    }

    try {
      const res = await fetch('https://n8n.811mapleton.com/webhook/600a9966-580c-4a2d-bb77-bc493552a0ab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      setStatus({ kind: 'ok' })
      form.reset()
    } catch {
      setStatus({ kind: 'err', msg: 'Something went wrong. Please try again.' })
    }
  }

  const sending = status.kind === 'sending'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}
      >
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First name</label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            required
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last name</label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            required
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          onBlur={(e) => setEmailErr(Boolean(e.target.value) && !EMAIL_RE.test(e.target.value))}
          className={`rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${emailErr ? 'border-red-500' : 'border-gray-200'}`}
        />
        {emailErr && <p className="text-xs text-red-600">Please enter a valid email address.</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="self-start rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium px-6 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending…' : 'Send message'}
      </button>

      {status.kind === 'ok' && (
        <p className="text-sm text-green-600">Message sent! I&apos;ll get back to you soon.</p>
      )}
      {status.kind === 'err' && <p className="text-sm text-red-600">{status.msg}</p>}
    </form>
  )
}
