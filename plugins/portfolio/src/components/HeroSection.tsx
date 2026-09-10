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
        <div className="flex min-w-0 flex-col justify-center px-6 py-20 sm:px-10 lg:px-[72px] lg:pb-16 lg:pt-[72px]">
          <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.125em] text-[var(--portfolio-orange)] sm:text-[12px]">
            <span
              aria-hidden="true"
              className="h-[3px] w-11 shrink-0 bg-[var(--portfolio-orange)]"
            />
            {hero?.eyebrow}
          </p>
          <h1 className="font-display mt-[26px] whitespace-pre-line text-[clamp(2.75rem,6vw,4rem)] font-bold leading-[1.02] tracking-[-0.028em]">
            {hero?.headline}
          </h1>
          <p className="mt-[26px] max-w-[560px] text-[15px] leading-[1.55] text-[var(--portfolio-hero-copy)] sm:text-[18px]">
            {hero?.description}
          </p>

          <div className="mt-[26px] flex flex-wrap gap-[14px]">
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
          <div className="absolute inset-0 bg-[var(--portfolio-navy)]/35" />
          <div className="absolute bottom-8 left-6 flex min-h-[116px] w-[calc(100%-3rem)] max-w-[280px] flex-col gap-1.5 bg-[var(--portfolio-paper)]/95 p-[18px] text-[var(--portfolio-ink)] sm:bottom-[54px] sm:left-12">
            <p className="text-[8px] font-bold tracking-[0.08em] text-[var(--portfolio-orange)]">
              {project?.category}
            </p>
            <p className="font-display text-[15px] font-bold">{project?.title}</p>
            <p className="text-[11px] text-[var(--portfolio-muted)]">
              {project?.role} <span aria-hidden="true">·</span> {project?.period}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
