import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers.ts';

test('a student starts a lesson with the AI tutor, which teaches it step by step and answers questions', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  await page.goto('/s/learn/m10c-1-1');
  await page.getByRole('link', { name: 'Start with your AI tutor' }).click();
  await page.waitForURL(/\/s\/learn\/m10c-1-1\/tutor$/);

  // The tutor waits for a tap (browsers allow speech only after one); the sound can be off.
  const aloud = page.getByLabel('Read the lesson aloud');
  if (await aloud.count()) await aloud.uncheck();
  await page.getByRole('button', { name: 'Start the lesson' }).click();

  // The demo has no AI key, so the tutor reads from the slides.
  const caption = page.locator('footer p[aria-live="polite"]');
  await expect(caption).toContainText('Today’s lesson is Referents, Estimation and Units');

  // Paused, the student steps through the slides and reads each step, up to the first question.
  await page.getByRole('button', { name: 'Pause' }).click();
  await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  for (let i = 0; i < 80 && !/Your turn!/.test((await caption.textContent()) ?? ''); i++) {
    await page.getByRole('button', { name: 'Next' }).click();
  }
  await expect(caption).toContainText('Your turn!');
  await expect(page.getByText(/Check your understanding/).first()).toBeVisible();

  // Asking the tutor: the demo answers offline.
  await page.getByRole('button', { name: /Ask your tutor/ }).click();
  await page.getByLabel('Your question').fill('Why do we use referents?');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByText('Why do we use referents?')).toBeVisible();
  await expect(page.getByText(/can’t answer new questions right now/).first()).toBeVisible();
  await page.getByRole('button', { name: 'Continue the lesson' }).click();

  // Leaving goes back to the lesson page.
  await page.getByRole('button', { name: 'Leave the lesson' }).click();
  await page.waitForURL(/\/s\/learn\/m10c-1-1$/);
  expect(errors).toEqual([]);
});
