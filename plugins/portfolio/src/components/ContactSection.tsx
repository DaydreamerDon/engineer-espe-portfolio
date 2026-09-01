import { ArrowUpRight } from 'lucide-react'

import type { PortfolioData } from '../types'

export function ContactSection({
  contact,
  identity,
}: {
  contact: PortfolioData['contact']
  identity: PortfolioData['identity']
}) {
  return (
    <footer
      className="scroll-mt-[72px] bg-[var(--portfolio-navy)] text-white lg:scroll-mt-[88px]"
      id="contact"
    >
      <div className="mx-auto flex min-h-[190px] max-w-[1440px] flex-col justify-center gap-8 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-[72px] lg:py-8">
        <div>
          <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
            {contact?.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-[clamp(1.75rem,4vw,2.125rem)] font-bold leading-[1.08] tracking-[-0.035em]">
            {contact?.heading}
          </h2>
          <p className="mt-4 text-[12px] text-[var(--portfolio-meta-light)] sm:text-[13px]">
            {contact?.subheading}
          </p>
        </div>

        <a
          className="portfolio-focus flex min-h-[56px] max-w-full items-center justify-between gap-5 bg-[var(--portfolio-orange)] px-6 text-[10px] font-bold tracking-[0.06em] text-white transition-colors hover:bg-white hover:text-[var(--portfolio-navy)] sm:px-8 sm:text-[11px]"
          href={`mailto:${identity?.email ?? ''}`}
        >
          <span className="break-all">{identity?.email}</span>
          <ArrowUpRight aria-hidden="true" className="size-[18px] shrink-0" />
        </a>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex min-h-[70px] max-w-[1440px] flex-col justify-center gap-2 px-6 py-5 text-[10px] font-semibold tracking-[0.06em] text-[var(--portfolio-meta)] sm:px-10 md:flex-row md:items-center md:justify-between lg:px-[72px]">
          <p>
            © {new Date().getFullYear()} {identity?.fullName}
          </p>
          <p className="font-bold text-[var(--portfolio-nav-text)]">{contact?.footerMotto}</p>
        </div>
      </div>
    </footer>
  )
}
