import { expect, type Page, test } from '@playwright/test'

import { cleanupTestUser, seedTestUser, testUser } from '../helpers/seedUser'
import { login } from '../helpers/login'

test.describe('Payload admin', () => {
  let adminPage: Page

  test.beforeAll(async ({ browser }) => {
    await seedTestUser()

    const context = await browser.newContext()
    adminPage = await context.newPage()
    await login({ page: adminPage, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('shows only the focused portfolio content model', async () => {
    await adminPage.goto('http://localhost:3000/admin')
    await expect(adminPage.locator('span[title="Dashboard"]').first()).toBeVisible()
    await expect(adminPage.getByText('Portfolio', { exact: true }).first()).toBeVisible()
    await expect(adminPage.getByText('Posts', { exact: true })).toHaveCount(0)
    await expect(adminPage.getByText('Pages', { exact: true })).toHaveCount(0)
  })

  test('opens the editable portfolio global', async () => {
    await adminPage.goto('http://localhost:3000/admin/globals/portfolio')
    await expect(adminPage).toHaveURL(/\/admin\/globals\/portfolio/)
    await expect(adminPage.getByText('Identity', { exact: true }).first()).toBeVisible()
    await expect(adminPage.getByText('Hero & Projects', { exact: true }).first()).toBeVisible()
  })
})
