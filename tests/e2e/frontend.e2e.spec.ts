import { expect, test } from '@playwright/test'

test.describe('Portfolio frontend', () => {
  test('matches the desktop content and interactions', async ({ page }) => {
    await page.setViewportSize({ height: 1000, width: 1440 })
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    await expect(page).toHaveTitle(/Esperidion Saquin/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('QUALITY BUILT')
    await expect(
      page.getByRole('heading', { name: 'Quality delivery in active construction.' }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Training & certifications' })).toBeVisible()
    await expect(page.locator('a[href^="mailto:"]').last()).toContainText(
      'ESPERIDIONSAQUINGALACIO@GMAIL.COM',
    )
    await expect(page.getByText('DOWNLOAD CV')).toHaveCount(0)

    await page.getByRole('link', { name: 'EXPERIENCE' }).click()
    await expect(page).toHaveURL(/#experience$/)

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(horizontalOverflow).toBe(false)
  })

  test('provides an accessible mobile menu without overflow', async ({ page }) => {
    await page.setViewportSize({ height: 812, width: 375 })
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    const menuButton = page.locator('button[aria-controls="mobile-navigation"]')
    await expect(menuButton).toBeVisible()
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()

    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', {
        name: 'PROJECTS',
      })
      .click()
    await expect(page).toHaveURL(/#projects$/)

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(horizontalOverflow).toBe(false)
  })

  test('stacks the portfolio cleanly at tablet width', async ({ page }) => {
    await page.setViewportSize({ height: 1024, width: 768 })
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#projects')).toBeVisible()
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#training')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(horizontalOverflow).toBe(false)
  })
})
