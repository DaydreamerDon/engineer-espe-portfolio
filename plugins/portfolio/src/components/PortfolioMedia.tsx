import Image from 'next/image'

import type { PortfolioMedia } from '../types'

export const getPortfolioMediaURL = (media?: PortfolioMedia): null | string => {
  if (!media || typeof media !== 'object') return null
  return media.url || null
}

export function PortfolioImage({
  alt,
  className,
  media,
  priority = false,
  sizes,
}: {
  alt: string
  className: string
  media?: PortfolioMedia
  priority?: boolean
  sizes: string
}) {
  const src = getPortfolioMediaURL(media)

  if (!src) {
    return (
      <div
        aria-label={alt}
        className={`${className} bg-[linear-gradient(135deg,var(--portfolio-pale),var(--portfolio-muted))]`}
        role="img"
      />
    )
  }

  return (
    <Image
      alt={(media && typeof media === 'object' && media.alt) || alt}
      className={className}
      fill
      priority={priority}
      sizes={sizes}
      src={src}
    />
  )
}
