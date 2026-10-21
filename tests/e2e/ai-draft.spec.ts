import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

/** What a stand-in MiniMax answers: two generated skills and three questions it wrote, one with a slip. */
const reply = {
  title: 'Homework: Measuring with Referents',
  instructions: 'Show your working.',
  rationale: 'Mostly generated practice, plus a short word problem and an explanation.',
  sections: [
    { skillId: 'm1-referents', count: 3, difficulty: 'mixed' },
    { skillId: 'm1-estimate', count: 2, difficulty: 2 },
  ],
  questions: [
    { format: 'short', skillId: 'm1-estimate', prompt: 'A pace is about $0.8$ m. About how far is $25$ paces, in metres?', value: 20, check: '25 * 0.8', solution: '$25 \\times 0.8 = 20$ m.' },
    { format: 'short', skillId: 'm1-estimate', prompt: 'A slip: $12$ paces of $0.5$ m?', value: 7, check: '12 * 0.5', solution: 'Wrong on purpose.' },
    { format: 'written', skillId: 'm1-referents', prompt: 'Explain which referent you would use to estimate the height of a door.', points: 3, solution: 'Any sensible referent, such as your own height (1 point), with a reason (2 points).' },
  ],
};

test('a teacher drafts homework with AI, checks the questions the AI wrote, and publishes it', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  // Demo mode calls MiniMax from the browser with the teacher's own key: give it a key and a stand-in API.
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    db.aiKey = 'test-key';
    localStorage.setItem('educore-demo-db-v1', JSON.stringify(db));
  });
  await page.route('https://api.minimax.io/**', (route) => route.fulfill({ json: { model: 'MiniMax-M3.1-Flash', choices: [{ message: { content: JSON.stringify(reply) } }] } }));

  await page.goto('/t/c/c_math10a/assignments/new?type=homework');
  await expect(page.getByRole('heading', { name: 'New assignment' })).toBeVisible();
  await page.getByRole('button', { name: 'Draft with AI' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('Draft homework with AI')).toBeVisible();
  await dialog.getByLabel('Unit').selectOption({ index: 0 });
  await dialog.getByLabel(/^1\.1 /).check();
  await dialog.getByLabel('Number of questions').fill('7');
  await dialog.getByText('Written response', { exact: true }).click();
  await dialog.getByRole('button', { name: 'Draft with AI' }).click();
  await expect(dialog).toBeHidden();

  // The draft is in the builder: two skills, and the questions that passed the checks, flagged for review.
  await expect(page.getByText('Suggested by the AI assistant')).toBeVisible();
  await expect(page.getByText(/1 question the AI wrote did not pass the checks/)).toBeVisible();
  await expect(page.getByText('Written by AI: check the answer')).toHaveCount(2);
  await expect(page.getByLabel('Title')).toHaveValue('Homework: Measuring with Referents');
  await page.getByRole('button', { name: 'Mark as checked' }).first().click();
  await expect(page.getByText('Written by AI: check the answer')).toHaveCount(1);

  await page.getByRole('button', { name: 'Publish & notify students' }).click();
  await page.waitForURL(/\/assignments\/a_/);
  await expect(page.getByRole('heading', { name: 'Homework: Measuring with Referents' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('without the AI, the draft uses the course’s generated questions', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments/new?type=quiz&lesson=m10c-1-2');
  await page.getByRole('button', { name: 'Draft with AI' }).click();
  const dialog = page.getByRole('dialog');
  // The lesson already in the assignment is chosen; replace its questions with a draft of 6.
  await expect(dialog.getByRole('button', { name: /Remove 1\.2 / })).toBeVisible();
  await dialog.getByLabel('Number of questions').fill('6');
  await dialog.getByRole('button', { name: 'Replace them' }).click();
  await dialog.getByRole('button', { name: 'Draft with AI' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText(/AI is not available right now/)).toBeVisible();
  await expect(page.getByText('Drafted: 6 questions')).toBeVisible();
  expect(errors).toEqual([]);
});
