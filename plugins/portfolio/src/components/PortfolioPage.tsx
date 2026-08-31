import type { PortfolioData } from '../types'
import { ContactSection } from './ContactSection'
import { ExperienceSection } from './ExperienceSection'
import { HeroSection } from './HeroSection'
import { PortfolioNavigation } from './PortfolioNavigation'
import { getPortfolioMediaURL } from './PortfolioMedia'
import { ProjectsSection } from './ProjectsSection'
import { TrainingSection } from './TrainingSection'

export function PortfolioPage({ data }: { data: PortfolioData }) {
  const identity = data.identity

  return (
    <>
      <a
        className="portfolio-focus fixed left-4 top-4 z-[100] -translate-y-24 bg-white px-4 py-3 text-sm font-bold text-[var(--portfolio-navy)] transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <PortfolioNavigation
        brandName={identity?.fullName ?? 'ESPERIDION SAQUIN'}
        monogram={identity?.monogram ?? 'ES'}
        resumeLabel={identity?.resumeLabel ?? 'DOWNLOAD CV ↗'}
        resumeURL={getPortfolioMediaURL(identity?.resume)}
      />
      <main id="main-content">
        <HeroSection hero={data.hero} identity={identity} />
        <ProjectsSection projects={data.projects} />
        <ExperienceSection capabilities={data.capabilities} experience={data.experience} />
        <TrainingSection training={data.training} />
      </main>
      <ContactSection contact={data.contact} identity={identity} />
    </>
  )
}
