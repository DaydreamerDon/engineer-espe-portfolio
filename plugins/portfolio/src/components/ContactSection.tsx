import type { PortfolioData } from '../types'
import { ContactForm } from './ContactForm'

export function ContactSection({
  contact,
  identity,
}: {
  contact: PortfolioData['contact']
  identity: PortfolioData['identity']
}) {
  const heading =
    !contact?.heading || contact.heading === 'Need an engineer who sweats the details?'
      ? 'Let’s discuss your next project.'
      : contact.heading

  return (
    <footer
      className="scroll-mt-[72px] bg-[var(--portfolio-navy)] text-white lg:scroll-mt-[88px]"
      id="contact"
    >
      <div className="mx-auto grid min-h-[360px] max-w-[1440px] items-center gap-8 px-6 py-9 sm:px-10 lg:grid-cols-[minmax(0,500px)_minmax(0,620px)] lg:justify-between lg:gap-12 lg:px-[72px]">
        <div className="max-w-[500px]">
          <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
            {contact?.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-[clamp(1.75rem,4vw,2.125rem)] font-bold leading-[1.2]">
            {heading}
          </h2>
          <p className="mt-2 text-[12px] leading-[1.5] text-[#9eabb5] sm:text-[13px]">
            {contact?.subheading}
          </p>
        </div>

        {identity?.email ? <ContactForm email={identity.email} /> : null}
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
