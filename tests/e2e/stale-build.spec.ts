import { expect, test } from '@playwright/test';
import { signInDemo } from './helpers';

// After a deploy, a tab opened earlier asks for code files that are gone, and the host answers with
// the app's HTML page. A Try this question must then say so and offer a reload, not go blank.
test('a Try this question whose code cannot load reloads once, then offers a reload instead of showing nothing', async ({ page }) => {
  await signInDemo(page, 'Teacher');
  let requests = 0;
  await page.route(/math10c\/skills/, (route) => {
    requests++;
    return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Gradileo</title>' });
  });
  await page.goto('/present/c_math10a/m10c-6-1');
  const notice = page.getByText('This question could not load');
  for (let i = 0; i < 40 && !(await notice.isVisible()); i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);
  }
  await expect(notice).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reload the page' })).toBeVisible();
  // One automatic reload at most, so a real outage cannot loop.
  expect(requests).toBeGreaterThanOrEqual(1);
  expect(requests).toBeLessThanOrEqual(3);
});
