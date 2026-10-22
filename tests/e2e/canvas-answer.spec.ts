import { expect, test, type Page } from '@playwright/test';
import { signInDemo, signOut, trackErrors } from './helpers';

/** Draws a short zig-zag across the answer canvas with the mouse. */
async function draw(page: Page) {
  const box = (await page.getByRole('img', { name: 'Answer canvas, page 1' }).boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.3);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) await page.mouse.move(box.x + box.width * (0.2 + i * 0.04), box.y + box.height * (i % 2 ? 0.5 : 0.3), { steps: 3 });
  await page.mouse.up();
}

const storedSubmission = (page: Page, assignmentId: string) =>
  page.evaluate((id) => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    return db.submissions.find((s: { assignmentId: string }) => s.assignmentId === id) as { id: string; status: string; responses: Record<number, { answers: string[]; canvas?: string }> } | undefined;
  }, assignmentId);

test('a student solves a written question on the canvas, and the teacher sees the working and grades it', async ({ page }) => {
  const errors = trackErrors(page);
  const title = `Meeting days ${Date.now() % 100000}`;

  // The teacher sets homework with one written question.
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments/new?type=homework');
  await page.getByLabel('Title').fill(title);
  await page.getByRole('button', { name: 'Written', exact: true }).click();
  await page.getByPlaceholder(/Explain why/).fill('Three groups meet every $4$, $6$ and $10$ days. If they all meet today, after how many days will they next meet together? Show your method.');
  await page.getByRole('button', { name: 'Publish & notify students' }).click();
  await page.waitForURL(/\/assignments\/a_/);
  const assignmentId = page.url().split('/assignments/')[1];
  await signOut(page);

  // The student works it out on the canvas and adds a typed sentence.
  await signInDemo(page, 'Student');
  await page.goto(`/s/work/${assignmentId}`);
  await page.getByRole('button', { name: /^Start/ }).click();
  await page.waitForURL(/\/take$/);
  await expect(page.getByRole('tab', { name: 'Solve on the canvas' })).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('radio', { name: 'Lined paper' }).click();
  await draw(page);
  await expect(page.getByRole('button', { name: 'Undo (Ctrl+Z)' })).toBeEnabled();
  await page.getByRole('button', { name: 'Full screen' }).click();
  await expect(page.getByRole('dialog', { name: 'Answer canvas' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Answer canvas' })).toBeHidden();
  await page.getByRole('tab', { name: 'Type' }).click();
  await page.getByLabel('Typed answer').fill('They meet again after 60 days.');
  await expect(page.getByText('Your working on the canvas is kept too. Your teacher sees both.')).toBeVisible();

  // The working is saved with the attempt as compact text.
  await expect.poll(async () => (await storedSubmission(page, assignmentId))?.responses[0]?.canvas ?? '').toMatch(/^l;pk6:\d+,\d+,5( -?\d+,-?\d+,5)+$/);

  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByText('You’ve answered every question.')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();
  await page.waitForURL(/\/s\/work\/a_[^/]+$/);
  const sub = (await storedSubmission(page, assignmentId))!;
  expect(sub.responses[0].answers[0]).toBe('They meet again after 60 days.');
  await signOut(page);

  // The teacher sees the page of working above the typed sentence, and grades it.
  await signInDemo(page, 'Teacher');
  await page.goto(`/t/c/c_math10a/submissions/${sub.id}`);
  await expect(page.getByRole('img', { name: 'The student’s working, page 1' })).toBeVisible();
  await expect(page.getByText('They meet again after 60 days.')).toBeVisible();
  await page.getByRole('radiogroup', { name: 'Points' }).getByRole('radio', { name: '4', exact: true }).click();
  await page.getByRole('button', { name: 'Save grade' }).click();
  await expect(page.getByText('Grade saved')).toBeVisible();
  expect(errors).toEqual([]);
});
