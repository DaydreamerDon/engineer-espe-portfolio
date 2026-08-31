import type { Config, Plugin } from 'payload'

import { createPortfolioGlobal } from './global'
import { seedPortfolio } from './seed'
import type { PortfolioPluginOptions } from './types'

export const portfolioPlugin = (options: PortfolioPluginOptions): Plugin => {
  return (incomingConfig: Config): Config => {
    const mediaCollection = incomingConfig.collections?.find(
      (collection) => collection.slug === options.mediaCollection,
    )

    if (!mediaCollection) {
      throw new Error(
        `Portfolio plugin could not find the configured media collection "${options.mediaCollection}".`,
      )
    }

    if (incomingConfig.globals?.some((global) => global.slug === 'portfolio')) {
      throw new Error('Portfolio plugin cannot register the duplicate global slug "portfolio".')
    }

    const incomingOnInit = incomingConfig.onInit
    const config: Config = {
      ...incomingConfig,
      globals: [...(incomingConfig.globals ?? []), createPortfolioGlobal(options)],
    }

    if (options.disabled || options.seed?.enabled === false) return config

    config.onInit = async (payload) => {
      if (incomingOnInit) await incomingOnInit(payload)

      await seedPortfolio({
        mediaCollection: options.mediaCollection,
        payload,
      })
    }

    return config
  }
}
