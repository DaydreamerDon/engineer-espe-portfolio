'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navigation = [
  { href: '#about', id: 'about', label: 'ABOUT' },
  { href: '#projects', id: 'projects', label: 'PROJECTS' },
  { href: '#experience', id: 'experience', label: 'EXPERIENCE' },
  { href: '#contact', id: 'contact', label: 'CONTACT' },
] as const

export function PortfolioNavigation({
  brandName,
  monogram,
  resumeLabel,
  resumeURL,
}: {
  brandName: string
  monogram: string
  resumeLabel: string
  resumeURL?: null | string
}) {
  const [activeSection, setActiveSection] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.15, 0.4],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const links = navigation.map(({ href, id, label }) => (
    <a
      aria-current={activeSection === id ? 'location' : undefined}
      className={`portfolio-focus text-[11px] font-bold tracking-[0.09em] transition-colors hover:text-[var(--portfolio-orange)] ${
        activeSection === id ? 'text-[var(--portfolio-orange)]' : 'text-[var(--portfolio-nav-text)]'
      }`}
      href={href}
      key={id}
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </a>
  ))

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-white/5 bg-[var(--portfolio-navy)] lg:h-[88px]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-[72px]">
        <a
          aria-label={`${brandName} home`}
          className="portfolio-focus flex items-center gap-[14px] text-white"
          href="#about"
        >
          <span className="font-display flex size-[42px] items-center justify-center bg-[var(--portfolio-orange)] text-[16px] font-bold">
            {monogram}
          </span>
          <span className="font-display text-[13px] font-bold tracking-[0.14em] sm:text-[16px]">
            {brandName}
          </span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-[34px] lg:flex">
          {links}
          {resumeURL ? (
            <a
              className="portfolio-focus flex h-[42px] items-center border border-white/40 px-[18px] text-[10px] font-bold tracking-[0.09em] text-white transition-colors hover:border-[var(--portfolio-orange)] hover:bg-[var(--portfolio-orange)]"
              download
              href={resumeURL}
            >
              {resumeLabel}
            </a>
          ) : null}
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="portfolio-focus flex size-11 items-center justify-center text-white lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        aria-label="Mobile navigation"
        className={`absolute inset-x-0 top-full border-t border-white/10 bg-[var(--portfolio-navy)] px-6 py-7 shadow-2xl lg:hidden ${
          menuOpen ? 'flex flex-col gap-6' : 'hidden'
        }`}
        id="mobile-navigation"
      >
        {links}
        {resumeURL ? (
          <a
            className="portfolio-focus flex h-11 w-fit items-center border border-white/40 px-5 text-[10px] font-bold tracking-[0.09em] text-white"
            download
            href={resumeURL}
            onClick={() => setMenuOpen(false)}
          >
            {resumeLabel}
          </a>
        ) : null}
      </nav>
    </header>
  )
}
