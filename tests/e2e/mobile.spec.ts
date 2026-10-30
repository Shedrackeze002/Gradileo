import { expect, test } from '@playwright/test';
import { expectNoHorizontalScroll, signInDemo } from './helpers';

test('student pages fit a phone screen', async ({ page }) => {
  await signInDemo(page, 'Student');
  for (const path of ['/s', '/s/learn', '/s/work', '/s/progress', '/s/learn/m10c-3-4', '/s/live', '/s/welcome', '/s/topics']) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expectNoHorizontalScroll(page);
  }
  await expect(page.getByRole('navigation', { name: 'Main' }).last()).toBeVisible();
});

test('landing page fits a phone screen', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expectNoHorizontalScroll(page);
});

test('teacher pages fit a phone screen', async ({ page }) => {
  await signInDemo(page, 'Teacher');
  for (const path of ['', '/curriculum', '/assignments', '/assignments/new', '/assignments/a_1', '/students', '/gradebook', '/mastery', '/insights', '/settings']) {
    await page.goto(`/t/c/c_math10a${path}`);
    await page.waitForLoadState('networkidle');
    await expectNoHorizontalScroll(page);
  }
});

test('admin pages fit a phone screen', async ({ page }) => {
  await signInDemo(page, 'Teacher');
  for (const path of ['/admin', '/admin/users', '/admin/classes', '/admin/settings', '/admin/audit', '/admin/videos']) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expectNoHorizontalScroll(page);
  }
});
