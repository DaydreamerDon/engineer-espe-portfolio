import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { Config, Payload } from 'payload'
import { describe, expect, it, vi } from 'vitest'

import { portfolioPlugin } from '../../plugins/portfolio/src/index'
import { PortfolioPage } from '../../plugins/portfolio/src/exports/rsc'
import { portfolioDefaults, PORTFOLIO_SEED_VERSION } from '../../plugins/portfolio/src/defaults'
import { PortfolioIcon } from '../../plugins/portfolio/src/components/PortfolioIcon'
import type { PortfolioData } from '../../plugins/portfolio/src/types'

const createConfig = (overrides: Partial<Config> = {}): Config =>
  ({
    collections: [{ fields: [], slug: 'media' }],
    globals: [],
    ...overrides,
  }) as Config

describe('portfolio plugin', () => {
  it('registers the portfolio global and preserves incoming config', async () => {
    const existingGlobal = { fields: [], slug: 'settings' }
    const transformed = await portfolioPlugin({ mediaCollection: 'media' })(
      createConfig({ globals: [existingGlobal] }),
    )

    expect(transformed.globals?.map((global) => global.slug)).toEqual(['settings', 'portfolio'])
    expect(transformed.collections?.[0]?.slug).toBe('media')
  })

  it('configures public reads, authenticated updates, drafts, and preview', async () => {
    const transformed = await portfolioPlugin({
      mediaCollection: 'media',
      previewURL: 'http://localhost:3000/next/preview?path=%2F',
      seed: { enabled: false },
    })(createConfig())
    const global = transformed.globals?.find(({ slug }) => slug === 'portfolio')

    expect(global?.access?.read?.({ req: {} } as never)).toBe(true)
    expect(global?.access?.update?.({ req: { user: null } } as never)).toBe(false)
    expect(global?.access?.update?.({ req: { user: { id: 1 } } } as never)).toBe(true)
    expect(global?.versions).toMatchObject({ drafts: expect.any(Object), max: 50 })
    expect(global?.admin?.livePreview).toBeDefined()
  })

  it('seeds media and content once while preserving the incoming onInit', async () => {
    const incomingOnInit = vi.fn()
    const findGlobal = vi.fn().mockResolvedValue({ seedVersion: null })
    const find = vi.fn().mockResolvedValue({ docs: [] })
    const create = vi.fn().mockResolvedValueOnce({ id: 101 }).mockResolvedValueOnce({ id: 102 })
    const updateGlobal = vi.fn().mockResolvedValue({})
    const payload = {
      create,
      find,
      findGlobal,
      logger: { info: vi.fn() },
      updateGlobal,
    } as unknown as Payload

    const transformed = await portfolioPlugin({ mediaCollection: 'media' })(
      createConfig({ onInit: incomingOnInit }),
    )

    await transformed.onInit?.(payload)

    expect(incomingOnInit).toHaveBeenCalledOnce()
    expect(create).toHaveBeenCalledTimes(2)
    expect(updateGlobal).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ seedVersion: PORTFOLIO_SEED_VERSION }),
        draft: false,
        slug: 'portfolio',
      }),
    )
  })

  it('does not reseed initialized or editor-authored content', async () => {
    const create = vi.fn()
    const updateGlobal = vi.fn()
    const logger = { info: vi.fn() }
    const transformed = await portfolioPlugin({ mediaCollection: 'media' })(createConfig())

    await transformed.onInit?.({
      create,
      findGlobal: vi.fn().mockResolvedValue({ seedVersion: PORTFOLIO_SEED_VERSION }),
      logger,
      updateGlobal,
    } as unknown as Payload)

    await transformed.onInit?.({
      create,
      findGlobal: vi.fn().mockResolvedValue({
        hero: { headline: 'Editor content' },
        seedVersion: null,
      }),
      logger,
      updateGlobal,
    } as unknown as Payload)

    expect(create).not.toHaveBeenCalled()
    expect(updateGlobal).not.toHaveBeenCalled()
  })

  it('reuses bundled media records by filename', async () => {
    const create = vi.fn()
    const updateGlobal = vi.fn().mockResolvedValue({})
    const transformed = await portfolioPlugin({ mediaCollection: 'media' })(createConfig())

    await transformed.onInit?.({
      create,
      find: vi
        .fn()
        .mockResolvedValueOnce({ docs: [{ id: 41 }] })
        .mockResolvedValueOnce({ docs: [{ id: 42 }] }),
      findGlobal: vi.fn().mockResolvedValue({ seedVersion: null }),
      logger: { info: vi.fn() },
      updateGlobal,
    } as unknown as Payload)

    expect(create).not.toHaveBeenCalled()
    expect(updateGlobal).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          hero: expect.objectContaining({ image: 41 }),
          projects: expect.objectContaining({
            featured: expect.objectContaining({ image: 42 }),
          }),
        }),
      }),
    )
  })

  it('renders the semantic portfolio and omits the unavailable resume action', () => {
    const html = renderToStaticMarkup(createElement(PortfolioPage, { data: portfolioDefaults }))

    expect(html).toContain('QUALITY BUILT')
    expect(html).toContain('Quality delivery in active construction.')
    expect(html).toContain('Training &amp; certifications')
    expect(html).toContain('mailto:ESPERIDIONSAQUINGALACIO@GMAIL.COM')
    expect(html).not.toContain('DOWNLOAD CV')
    expect(html).toContain('role="img"')
  })

  it('renders the resume action only when a PDF is available', () => {
    const data: PortfolioData = {
      ...portfolioDefaults,
      identity: {
        ...portfolioDefaults.identity,
        resume: {
          id: 99,
          mimeType: 'application/pdf',
          url: '/api/media/file/esperidion-saquin-cv.pdf',
        },
      },
    }
    const html = renderToStaticMarkup(createElement(PortfolioPage, { data }))

    expect(html).toContain('DOWNLOAD CV')
    expect(html).toContain('/api/media/file/esperidion-saquin-cv.pdf')
  })

  it('ignores icon values outside the supported Lucide map', () => {
    const html = renderToStaticMarkup(
      createElement(PortfolioIcon, { name: 'unexpected-icon' as never }),
    )

    expect(html).toBe('')
  })
})
