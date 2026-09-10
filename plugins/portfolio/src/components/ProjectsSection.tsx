import type { PortfolioData } from '../types'
import { PortfolioImage } from './PortfolioMedia'

export function ProjectsSection({ projects }: { projects: PortfolioData['projects'] }) {
  const featured = projects?.featured
  const additional = projects?.additional

  return (
    <section
      className="scroll-mt-[72px] bg-white py-[52px] text-[var(--portfolio-ink)] lg:scroll-mt-[88px] xl:min-h-[580px]"
      id="projects"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-[72px]">
        <div>
          <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
            02&nbsp; / &nbsp;SELECTED WORK
          </p>
          <h2 className="font-display mt-2 text-[clamp(2rem,4vw,2.25rem)] font-bold leading-[1.2]">
            {projects?.heading}
          </h2>
        </div>

        <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,820px)_minmax(0,448px)]">
          <article className="relative grid min-h-[384px] border border-[var(--portfolio-line)] bg-white md:grid-cols-[44%_56%]">
            <span className="absolute left-5 top-5 z-10 bg-[var(--portfolio-orange)] px-3 py-2 text-[9px] font-bold tracking-[0.08em] text-white">
              FEATURED
            </span>
            <div className="relative min-h-[300px] overflow-hidden md:min-h-full">
              <PortfolioImage
                alt="Construction professional in high-visibility safety gear holding project plans"
                className="object-cover"
                media={featured?.image}
                sizes="(min-width: 1280px) 360px, (min-width: 768px) 44vw, 100vw"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center gap-[18px] p-[30px]">
              <p className="text-[9px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)] sm:text-[10px]">
                {featured?.category}
              </p>
              <h3 className="font-display whitespace-pre-line text-[28px] font-bold leading-[1.05] sm:text-[30px]">
                {featured?.title}
              </h3>
              <p className="text-[12px] leading-[1.55] text-[var(--portfolio-muted)] sm:text-[13px]">
                {featured?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured?.tags?.map((tag) => (
                  <span
                    className="flex min-h-7 items-center bg-[var(--portfolio-pale)] px-2.5 py-1 text-[9px] font-bold tracking-[0.08em]"
                    key={tag.id ?? tag.label}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <p className="text-[10px] font-bold tracking-[0.07em] text-[var(--portfolio-orange)] sm:text-[11px]">
                {featured?.period}
              </p>
            </div>
          </article>

          <article className="flex min-h-[384px] flex-col bg-[var(--portfolio-navy)] p-7 text-white">
            <p className="font-display text-[40px] font-bold text-white/10">{additional?.code}</p>
            <p className="mt-[14px] text-[10px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
              {additional?.category}
            </p>
            <h3 className="font-display mt-[14px] whitespace-pre-line text-[25px] font-bold leading-[1.1]">
              {additional?.title}
            </h3>
            <p className="mt-auto pt-[18px] text-[12px] leading-[1.55] text-[var(--portfolio-light-copy)] sm:text-[13px]">
              {additional?.description}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
