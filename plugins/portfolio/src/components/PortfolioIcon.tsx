import {
  Award,
  BadgeCheck,
  Blocks,
  ClipboardCheck,
  DraftingCompass,
  FileChartColumn,
  HardHat,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

import type { PortfolioIconName } from '../types'

const icons: Record<PortfolioIconName, LucideIcon> = {
  award: Award,
  'badge-check': BadgeCheck,
  blocks: Blocks,
  'clipboard-check': ClipboardCheck,
  'drafting-compass': DraftingCompass,
  'file-chart-column': FileChartColumn,
  'hard-hat': HardHat,
  'shield-check': ShieldCheck,
}

export function PortfolioIcon({
  className,
  name,
}: {
  className?: string
  name?: null | PortfolioIconName
}) {
  const Icon = name ? icons[name] : undefined
  if (!Icon) return null

  return <Icon aria-hidden="true" className={className} />
}
