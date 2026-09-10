'use client'

import { AtSign, BriefcaseBusiness, Mail, Send, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { createContactEmail } from './contactEmail'

export function ContactForm({ email }: { email: string }) {
  const [emailPrepared, setEmailPrepared] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.href = createContactEmail(email, new FormData(event.currentTarget))
    setEmailPrepared(true)
  }

  return (
    <form
      aria-labelledby="contact-form-title"
      className="flex w-full min-w-0 flex-col gap-2 border border-white/15 bg-white p-4 text-[var(--portfolio-ink)] lg:max-w-[620px]"
      onChange={() => setEmailPrepared(false)}
      onSubmit={handleSubmit}
    >
      <div className="flex min-h-[30px] flex-col justify-center gap-0.5">
        <h3 className="text-[10px] font-extrabold tracking-[0.1em]" id="contact-form-title">
          SEND A DIRECT MESSAGE
        </h3>
        <p className="text-[10px] text-[var(--portfolio-muted)]">
          Opens your email app with your message ready to send.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="portfolio-contact-field">
          <User aria-hidden="true" className="size-[14px] shrink-0 text-[var(--portfolio-muted)]" />
          <span className="min-w-0 flex-1">
            <span className="portfolio-contact-label">YOUR NAME</span>
            <input
              autoComplete="name"
              maxLength={100}
              name="name"
              placeholder="Full name"
              required
            />
          </span>
        </label>
        <label className="portfolio-contact-field">
          <Mail aria-hidden="true" className="size-[14px] shrink-0 text-[var(--portfolio-muted)]" />
          <span className="min-w-0 flex-1">
            <span className="portfolio-contact-label">EMAIL ADDRESS</span>
            <input
              autoComplete="email"
              maxLength={254}
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />
          </span>
        </label>
      </div>

      <label className="portfolio-contact-field">
        <BriefcaseBusiness
          aria-hidden="true"
          className="size-[14px] shrink-0 text-[var(--portfolio-muted)]"
        />
        <span className="min-w-0 flex-1">
          <span className="portfolio-contact-label">PROJECT OR OPPORTUNITY</span>
          <input
            maxLength={200}
            name="subject"
            placeholder="What would you like to discuss?"
            required
          />
        </span>
      </label>

      <label className="portfolio-contact-field flex-col items-stretch gap-1 py-2">
        <span className="portfolio-contact-label">YOUR MESSAGE</span>
        <textarea
          className="min-h-[38px] resize-y"
          maxLength={3000}
          name="message"
          placeholder="Tell me about your project, role, timeline, or how I can help…"
          required
          rows={2}
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          className="portfolio-focus flex min-w-0 items-center gap-1.5 text-[10px] font-semibold text-[var(--portfolio-muted)] hover:text-[var(--portfolio-ink)]"
          href={`mailto:${email}`}
        >
          <AtSign aria-hidden="true" className="size-[13px] shrink-0" />
          <span className="break-all">{email}</span>
        </a>
        <button
          className="portfolio-focus flex min-h-10 items-center justify-center gap-[9px] bg-[var(--portfolio-orange)] px-4 text-[9px] font-extrabold tracking-[0.08em] text-white transition-colors hover:bg-[var(--portfolio-ink)]"
          type="submit"
        >
          SEND MESSAGE
          <Send aria-hidden="true" className="size-[14px]" />
        </button>
      </div>
      <p aria-live="polite" className="text-[11px] text-[var(--portfolio-muted)]" role="status">
        {emailPrepared
          ? 'Your email app was requested. Review the draft there and press Send. If it did not open, use the email address above.'
          : null}
      </p>
    </form>
  )
}
