import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--portfolio-navy)] px-6 text-white">
      <div className="max-w-xl text-center">
        <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
          404 / NOT FOUND
        </p>
        <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.04em]">
          This detail is missing.
        </h1>
        <p className="mt-5 text-[var(--portfolio-hero-copy)]">
          The page you requested does not exist or has moved.
        </p>
        <Link
          className="portfolio-focus mt-8 inline-flex h-12 items-center bg-[var(--portfolio-orange)] px-6 text-xs font-bold tracking-[0.08em]"
          href="/"
        >
          RETURN HOME →
        </Link>
      </div>
    </main>
  )
}
