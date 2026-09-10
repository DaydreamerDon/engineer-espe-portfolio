import { Award, BadgeCheck, Check } from 'lucide-react'

import type { PortfolioData } from '../types'
import { PortfolioIcon } from './PortfolioIcon'

const cardStyles = {
  navy: 'bg-[var(--portfolio-navy)] text-white',
  pale: 'border border-[var(--portfolio-line)] bg-[var(--portfolio-pale)] text-[var(--portfolio-ink)]',
  paper:
    'border border-[var(--portfolio-line)] bg-[var(--portfolio-paper)] text-[var(--portfolio-ink)]',
} as const

export function TrainingSection({ training }: { training: PortfolioData['training'] }) {
  return (
    <section className="bg-white py-12 text-[var(--portfolio-ink)] xl:min-h-[620px]" id="training">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-[72px]">
        <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
          04&nbsp; / &nbsp;PROFESSIONAL DEVELOPMENT
        </p>
        <h2 className="font-display mt-2 text-[clamp(2.25rem,4vw,2.375rem)] font-bold leading-[1.2]">
          {training?.heading}
        </h2>

        <div className="mt-[30px] grid gap-[18px] lg:grid-cols-3">
          {training?.groups?.map((group) => {
            const isNavy = group.style === 'navy'
            const ItemIcon =
              group.style === 'navy' ? BadgeCheck : group.style === 'pale' ? Award : Check

            return (
              <article
                className={`min-w-0 p-[26px] lg:min-h-[425px] ${cardStyles[group.style]}`}
                key={group.id ?? group.title}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-[42px] shrink-0 items-center justify-center ${
                        group.style === 'paper'
                          ? 'bg-[var(--portfolio-ink)] text-[var(--portfolio-orange)]'
                          : 'bg-[var(--portfolio-orange)] text-white'
                      }`}
                    >
                      <PortfolioIcon className="size-[19px]" name={group.icon} />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
                        {group.eyebrow}
                      </p>
                      <h3 className="font-display mt-[3px] text-[20px] font-bold leading-[1.2]">
                        {group.title}
                      </h3>
                    </div>
                  </div>
                  {group.count ? (
                    <span className="font-display text-[28px] font-bold opacity-20">
                      {group.count}
                    </span>
                  ) : null}
                </div>

                <ul className="mt-[18px]">
                  {group.items?.map((item) => (
                    <li
                      className={`flex items-start gap-2.5 border-t py-[11px] text-[11px] leading-[1.35] ${
                        isNavy
                          ? 'border-white/15 font-semibold text-[var(--portfolio-card-copy)]'
                          : 'border-[var(--portfolio-line)] text-[var(--portfolio-ink)]'
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
