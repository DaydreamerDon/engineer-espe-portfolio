import type { PortfolioData } from '../types'
import { PortfolioIcon } from './PortfolioIcon'

export function ExperienceSection({
  capabilities,
  experience,
}: {
  capabilities: PortfolioData['capabilities']
  experience: PortfolioData['experience']
}) {
  return (
    <section
      className="scroll-mt-[72px] bg-[var(--portfolio-navy)] py-12 text-white lg:scroll-mt-[88px]"
      id="experience"
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 sm:px-10 lg:px-[72px] xl:grid-cols-[minmax(0,760px)_minmax(0,480px)] xl:gap-14">
        <div>
          <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
            03&nbsp; / &nbsp;EXPERIENCE
          </p>
          <h2 className="font-display mt-5 whitespace-pre-line text-[clamp(2.25rem,4vw,2.375rem)] font-bold leading-[1.08] tracking-[-0.035em]">
            {experience?.heading}
          </h2>

          <div className="mt-6">
            {experience?.entries?.map((entry) => (
              <article
                className="grid gap-5 border-t border-white/10 py-6 sm:grid-cols-[132px_1fr]"
                key={entry.id ?? `${entry.dateRange}-${entry.title}`}
              >
                <p className="whitespace-pre-line text-[10px] font-bold leading-[1.45] tracking-[0.06em] text-[var(--portfolio-orange)] sm:text-[11px]">
                  {entry.dateRange}
                </p>
                <div>
                  <h3 className="font-display text-[20px] font-bold tracking-[-0.02em] sm:text-[21px]">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-semibold text-[var(--portfolio-meta-light)] sm:text-[12px]">
                    {entry.company}
                  </p>
                  {entry.summary ? (
                    <p className="mt-3 max-w-[570px] text-[11px] leading-[1.55] text-[var(--portfolio-light-copy)]">
                      {entry.summary}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
            CORE CAPABILITIES
          </p>
          <div className="mt-4">
            {capabilities?.items?.map((item) => (
              <div
                className="flex items-center gap-4 border-b border-white/10 py-[14px]"
                key={item.id ?? item.title}
              >
                <PortfolioIcon
                  className="size-[19px] shrink-0 text-[var(--portfolio-orange)]"
                  name={item.icon}
                />
                <div>
                  <h3 className="font-display text-[16px] font-bold">{item.title}</h3>
                  <p className="mt-1 text-[11px] text-[var(--portfolio-meta-light)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-b border-white/10 pb-6">
            <p className="text-[10px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
              TOOLS &amp; WORKFLOW
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {capabilities?.tools?.map((tool) => (
                <span
                  className="border border-white/15 px-3 py-2 text-[9px] font-bold tracking-[0.08em] text-[var(--portfolio-nav-text)]"
                  key={tool.id ?? tool.label}
                >
                  {tool.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 bg-white/5 p-5">
            <p className="text-[10px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
              PROJECT EXPOSURE
            </p>
            <p className="font-display mt-3 whitespace-pre-line text-[16px] font-semibold leading-[1.55]">
              {capabilities?.exposure}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
