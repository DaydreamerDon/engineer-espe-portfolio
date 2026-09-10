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
    await expect(
      page.getByRole('heading', { name: 'Let’s discuss your next project.' }),
    ).toBeVisible()
    await expect(page.getByRole('form', { name: 'SEND A DIRECT MESSAGE' })).toBeVisible()
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
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({ path: 'test-results/portfolio-desktop.png', fullPage: true })
    await page.locator('#contact').screenshot({ path: 'test-results/portfolio-contact.png' })
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
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({ path: 'test-results/portfolio-mobile.png', fullPage: true })
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
    await page.screenshot({ path: 'test-results/portfolio-tablet.png', fullPage: true })
  })

  test('requires contact details before preparing an email', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const form = page.getByRole('form', { name: 'SEND A DIRECT MESSAGE' })
    await form.getByRole('button', { name: 'SEND MESSAGE' }).click()
    await expect(form.getByLabel('YOUR NAME')).toBeFocused()
    await expect(form.getByRole('status')).toBeEmpty()

    await form.getByLabel('YOUR NAME').fill('Jane Smith')
    await form.getByLabel('EMAIL ADDRESS').fill('invalid-email')
    await form.getByLabel('PROJECT OR OPPORTUNITY').fill('A new construction project')
    await form.getByLabel('YOUR MESSAGE').fill('I would like to discuss quality inspections.')
    await form.getByRole('button', { name: 'SEND MESSAGE' }).click()
    await expect(form.getByLabel('EMAIL ADDRESS')).toBeFocused()
    await expect(form.getByRole('status')).toBeEmpty()
  })
})
