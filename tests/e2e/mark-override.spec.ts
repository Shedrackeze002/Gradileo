import { expect, test, type Page } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

/** A submitted attempt in the demo class that lost marks on auto-graded questions, and its percent. */
const attempt = (page: Page, id?: string) =>
  page.evaluate((id) => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    type Sub = { id: string; classId: string; assignmentId: string | null; status: string; percent: number | null; pendingManual: number; items: unknown[] };
    const subs = db.submissions as Sub[];
    const s = id ? subs.find((x) => x.id === id)! : subs.find((x) => x.classId === 'c_math10a' && x.assignmentId && x.status === 'graded' && (x.percent ?? 100) < 100 && !x.pendingManual && x.items.length > 1)!;
    return { id: s.id, percent: s.percent };
  }, id);

test('a teacher changes the mark on an auto-graded question, and can put the automatic mark back', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  const before = await attempt(page);
  await page.goto(`/t/c/c_math10a/submissions/${before.id}`);

  // The first question marked wrong is open; its automatic mark can be changed to full marks.
  await page.getByRole('button', { name: 'Change the mark' }).click();
  const points = page.getByRole('radiogroup', { name: 'Points' });
  await points.getByRole('radio').last().click();
  await page.getByPlaceholder(/Comment for the student/).fill('The answer key was wrong; your answer is right.');
  await page.getByRole('button', { name: 'Save mark' }).click();
  await expect(page.getByText('Mark changed')).toBeVisible();
  await expect(page.getByText(/Correct · marked by the teacher/).first()).toBeVisible();
  await expect(page.getByText(/The teacher changed the mark on this question to 100% \(it was marked (incorrect|partly correct) automatically\)/)).toBeVisible();
  await expect(page.getByText('The answer key was wrong; your answer is right.').first()).toBeVisible();
  const changed = await attempt(page, before.id);
  expect(changed.percent!).toBeGreaterThan(before.percent!);

  // "Use the automatic mark" puts the score back as it was.
  await page.getByRole('button', { name: 'Use the automatic mark' }).click();
  await expect(page.getByText('Automatic mark restored')).toBeVisible();
  await expect(page.getByText(/marked by the teacher/)).toHaveCount(0);
  expect((await attempt(page, before.id)).percent).toBe(before.percent);
  expect(errors).toEqual([]);
});
