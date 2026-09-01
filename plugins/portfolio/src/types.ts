export type PortfolioIconName =
  | 'award'
  | 'badge-check'
  | 'blocks'
  | 'clipboard-check'
  | 'drafting-compass'
  | 'file-chart-column'
  | 'hard-hat'
  | 'shield-check'

export type PortfolioMedia =
  | number
  | string
  | {
      alt?: null | string
      filename?: null | string
      height?: null | number
      id: number | string
      mimeType?: null | string
      url?: null | string
      width?: null | number
    }
  | null

export type PortfolioArrayItem = {
  id?: null | string
}

export type PortfolioData = {
  _status?: 'draft' | 'published'
  capabilities?: {
    exposure?: null | string
    items?: null | Array<
      PortfolioArrayItem & {
        description: string
        icon: PortfolioIconName
        title: string
      }
    >
    tools?: null | Array<PortfolioArrayItem & { label: string }>
  }
  contact?: {
    eyebrow?: null | string
    footerMotto?: null | string
    heading?: null | string
    subheading?: null | string
  }
  experience?: {
    entries?: null | Array<
      PortfolioArrayItem & {
        company: string
        dateRange: string
        kind: 'education' | 'role'
        summary?: null | string
        title: string
      }
    >
    heading?: null | string
  }
  hero?: {
    currentProject?: {
      category?: null | string
      period?: null | string
      role?: null | string
      title?: null | string
    }
    description?: null | string
    eyebrow?: null | string
    headline?: null | string
    image?: PortfolioMedia
    primaryActionLabel?: null | string
    secondaryActionLabel?: null | string
  }
  id?: number | string
  identity?: {
    availability?: null | string
    email?: null | string
    fullName?: null | string
    location?: null | string
    monogram?: null | string
    profession?: null | string
    resume?: PortfolioMedia
    resumeLabel?: null | string
  }
  projects?: {
    additional?: {
      category?: null | string
      code?: null | string
      description?: null | string
      title?: null | string
    }
    featured?: {
      category?: null | string
      description?: null | string
      image?: PortfolioMedia
      period?: null | string
      tags?: null | Array<PortfolioArrayItem & { label: string }>
      title?: null | string
    }
    heading?: null | string
  }
  seedVersion?: null | number
  seo?: {
    description?: null | string
    image?: PortfolioMedia
    title?: null | string
  }
  training?: {
    groups?: null | Array<
      PortfolioArrayItem & {
        count?: null | string
        eyebrow: string
        icon: PortfolioIconName
        items?: null | Array<PortfolioArrayItem & { label: string }>
        style: 'navy' | 'pale' | 'paper'
        title: string
      }
    >
    heading?: null | string
  }
  updatedAt?: string
}

export type PortfolioSeedOptions = {
  enabled?: boolean
}

export type PortfolioPluginOptions = {
  disabled?: boolean
  mediaCollection: string
  previewURL?: string
  seed?: PortfolioSeedOptions
}
