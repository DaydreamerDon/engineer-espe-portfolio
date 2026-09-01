import { BriefcaseBusiness, MapPin } from 'lucide-react'

import type { PortfolioData } from '../types'
import { PortfolioImage } from './PortfolioMedia'

export function HeroSection({
  hero,
  identity,
}: {
  hero: PortfolioData['hero']
  identity: PortfolioData['identity']
}) {
  const project = hero?.currentProject

  return (
    <section
      className="scroll-mt-[72px] bg-[var(--portfolio-navy)] text-white lg:scroll-mt-[88px]"
      id="about"
    >
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[672px] lg:grid-cols-[52.78%_47.22%]">
        <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-[72px] lg:py-[80px]">
          <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)] sm:text-[12px]">
            {hero?.eyebrow}
          </p>
          <h1 className="font-display mt-[26px] whitespace-pre-line text-[clamp(2.75rem,6vw,4rem)] font-bold leading-[0.98] tracking-[-0.045em]">
            {hero?.headline}
          </h1>
          <p className="mt-[26px] max-w-[560px] text-[15px] leading-[1.7] text-[var(--portfolio-hero-copy)] sm:text-[18px]">
            {hero?.description}
          </p>

          <div className="mt-[26px] flex flex-wrap gap-3">
            <a
              className="portfolio-focus flex h-[52px] items-center bg-[var(--portfolio-orange)] px-6 text-[11px] font-bold tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[var(--portfolio-navy)] sm:text-[12px]"
              href="#projects"
            >
              {hero?.primaryActionLabel}
            </a>
            <a
              className="portfolio-focus flex h-[52px] items-center border border-white/35 px-6 text-[11px] font-bold tracking-[0.08em] text-white transition-colors hover:border-white hover:bg-white hover:text-[var(--portfolio-navy)] sm:text-[12px]"
              href={`mailto:${identity?.email ?? ''}`}
            >
              {hero?.secondaryActionLabel}
            </a>
          </div>

          <div className="mt-[26px] flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-semibold tracking-[0.08em] text-[var(--portfolio-meta)]">
            <span className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-[15px]" />
              {identity?.location}
            </span>
            <span className="flex items-center gap-2">
              <BriefcaseBusiness aria-hidden="true" className="size-[15px]" />
              {identity?.availability}
            </span>
          </div>
        </div>

        <div className="relative min-h-[500px] overflow-hidden lg:min-h-[672px]">
          <PortfolioImage
            alt="High-rise residential building under construction"
            className="object-cover"
            media={hero?.image}
            priority
            sizes="(min-width: 1024px) 47vw, 100vw"
          />
          <div className="absolute inset-0 bg-[var(--portfolio-navy)]/15" />
          <div className="absolute bottom-8 left-6 w-[calc(100%-3rem)] max-w-[280px] bg-[var(--portfolio-paper)] p-5 text-[var(--portfolio-ink)] sm:bottom-[54px] sm:left-12">
            <p className="text-[8px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
              {project?.category}
            </p>
            <p className="font-display mt-3 text-[15px] font-bold">{project?.title}</p>
            <p className="mt-2 text-[11px] text-[var(--portfolio-muted)]">
              {project?.role} <span aria-hidden="true">·</span> {project?.period}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
