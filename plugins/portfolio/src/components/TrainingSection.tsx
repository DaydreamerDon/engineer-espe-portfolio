import { Award, BadgeCheck, Check } from 'lucide-react'

import type { PortfolioData } from '../types'
import { PortfolioIcon } from './PortfolioIcon'

const cardStyles = {
  navy: 'bg-[var(--portfolio-navy)] text-white',
  pale: 'bg-[var(--portfolio-pale)] text-[var(--portfolio-ink)]',
  paper: 'bg-[var(--portfolio-paper)] text-[var(--portfolio-ink)]',
} as const

export function TrainingSection({ training }: { training: PortfolioData['training'] }) {
  return (
    <section className="bg-white py-12 text-[var(--portfolio-ink)] sm:py-[48px]" id="training">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-[72px]">
        <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
          04&nbsp; / &nbsp;PROFESSIONAL DEVELOPMENT
        </p>
        <h2 className="font-display mt-4 text-[clamp(2.25rem,4vw,2.375rem)] font-bold leading-[1.08] tracking-[-0.035em]">
          {training?.heading}
        </h2>

        <div className="mt-7 grid gap-[18px] lg:grid-cols-3">
          {training?.groups?.map((group) => {
            const isNavy = group.style === 'navy'
            const ItemIcon =
              group.style === 'navy' ? BadgeCheck : group.style === 'pale' ? Award : Check

            return (
              <article
                className={`min-h-[425px] p-7 sm:p-8 ${cardStyles[group.style]}`}
                key={group.id ?? group.title}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex size-10 items-center justify-center ${
                        isNavy
                          ? 'bg-[var(--portfolio-orange)] text-white'
                          : 'bg-[var(--portfolio-orange)]/10 text-[var(--portfolio-orange)]'
                      }`}
                    >
                      <PortfolioIcon className="size-[19px]" name={group.icon} />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
                        {group.eyebrow}
                      </p>
                      <h3 className="font-display mt-2 text-[20px] font-bold">{group.title}</h3>
                    </div>
                  </div>
                  {group.count ? (
                    <span className="font-display text-[28px] font-bold opacity-20">
                      {group.count}
                    </span>
                  ) : null}
                </div>

                <ul className="mt-7 space-y-4">
                  {group.items?.map((item) => (
                    <li
                      className={`flex items-start gap-3 text-[11px] leading-[1.45] ${
                        isNavy ? 'text-[var(--portfolio-card-copy)]' : 'text-[var(--portfolio-ink)]'
                      }`}
                      key={item.id ?? item.label}
                    >
                      <ItemIcon
                        aria-hidden="true"
                        className="mt-0.5 size-[15px] shrink-0 text-[var(--portfolio-orange)]"
                      />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
