import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('a row’s menu opens over the page, not under the cards after it', async ({ page }) => {
  const errors = trackErrors(page);
  await page.setViewportSize({ width: 1280, height: 800 });
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments');
  // The last row's menu would be clipped by its card, and has no room below near the window's edge.
  const more = page.getByRole('button', { name: 'More actions' });
  await expect(more.first()).toBeVisible();
  await more.last().scrollIntoViewIfNeeded();
  await more.last().click();
  const del = page.getByRole('button', { name: 'Delete' });
  await expect(del).toBeVisible();
  // Keyboard users start on the first item.
  await expect(page.getByRole('button', { name: 'Edit' })).toBeFocused();
  // Nothing covers it: the topmost element at its middle is the menu item itself.
  const onTop = await del.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!hit && (hit === el || el.contains(hit)) && r.bottom <= window.innerHeight && r.top >= 0;
  });
  expect(onTop).toBe(true);
  // Escape closes it; clicking outside does too.
  await page.keyboard.press('Escape');
  await expect(del).toBeHidden();
  await more.first().click();
  await expect(page.getByRole('button', { name: 'Duplicate' })).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(page.getByRole('button', { name: 'Duplicate' })).toBeHidden();
  expect(errors).toEqual([]);
});

test('the builder numbers the generated questions before the teacher’s own', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments/a_1/edit');
  const generated = page.getByText(/^Generated questions · Questions 1–(\d+)$/);
  await expect(generated).toBeVisible();
  const total = Number(/1–(\d+)/.exec((await generated.textContent()) ?? '')![1]);
  await expect(page.getByText(/^Q1–\d+$/).first()).toBeVisible();
  // A question of the teacher's own comes next, and says where questions 1 to n went.
  await page.getByRole('button', { name: 'Number', exact: true }).click();
  await expect(page.getByText(`Your own questions · Question ${total + 1}`)).toBeVisible();
  await expect(page.getByText(`They come after the generated questions (questions 1–${total}, above).`, { exact: false })).toBeVisible();
  await expect(page.getByText(`Q${total + 1}`, { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});
