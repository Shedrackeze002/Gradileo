import { expect, test } from '@playwright/test';
import { signInDemo, signOut, trackErrors } from './helpers';

const minimax = (content: unknown) => ({ json: { model: 'MiniMax-M3.1-Flash', choices: [{ message: { content: JSON.stringify(content) } }] } });

test('an essay is marked on a rubric: students see it, the AI suggests a level on each criterion, the teacher decides', async ({ page }) => {
  const errors = trackErrors(page);
  const title = `Essay ${Date.now() % 100000}`;

  // The teacher adds a written question and chooses the analytical essay rubric.
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments/new?type=homework');
  await page.getByLabel('Title').fill(title);
  await page.getByRole('button', { name: 'Written', exact: true }).click();
  await page.getByPlaceholder(/Explain why/).fill('In a short essay, argue what the ending of the story shows about its narrator.');
  await page.getByLabel('Points').fill('10');
  await page.getByLabel('Rubric', { exact: true }).selectOption('analytical-essay');
  await expect(page.getByLabel('Criterion 2')).toHaveValue('Evidence and analysis');
  await expect(page.getByText(/the total, out of 24, is scaled to the question's 10 points/)).toBeVisible();
  await page.getByRole('button', { name: 'Publish & notify students' }).click();
  await page.waitForURL(/\/assignments\/a_/);
  const assignmentId = page.url().split('/assignments/')[1];
  await signOut(page);

  // The student reads the rubric while writing.
  await signInDemo(page, 'Student');
  await page.goto(`/s/work/${assignmentId}`);
  await page.getByRole('button', { name: /^Start/ }).click();
  await page.waitForURL(/\/take$/);
  await page.getByText('How this is marked').click();
  await expect(page.getByText(/An insightful, arguable thesis/)).toBeVisible();
  await page.getByRole('tab', { name: 'Type' }).click();
  await page.getByLabel('Typed answer').fill('The narrator says he is calm, but his repeated denials show the opposite.');
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();
  await page.waitForURL(/\/s\/work\/a_[^/]+$/);
  const subId = await page.evaluate((id) => JSON.parse(localStorage.getItem('educore-demo-db-v1')!).submissions.find((s: { assignmentId: string }) => s.assignmentId === id).id as string, assignmentId);
  await signOut(page);

  // The teacher asks for a suggestion: the AI gets the rubric and gives a level on each criterion.
  await signInDemo(page, 'Teacher');
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    db.aiKey = 'test-key';
    localStorage.setItem('educore-demo-db-v1', JSON.stringify(db));
  });
  let sent = '';
  await page.route('https://api.minimax.io/**', (route) => {
    sent = route.request().postData() ?? '';
    return route.fulfill(
      minimax({
        criteria: [
          { id: 'thesis', level: 3, reason: 'A clear claim about the narrator.' },
          { id: 'evidence', level: 2, reason: 'No quotation is given.' },
          { id: 'organization', level: 2, reason: 'One paragraph.' },
          { id: 'style', level: 3, reason: 'Formal and clear.' },
          { id: 'conventions', level: 4, reason: 'No errors.' },
        ],
        reasons: 'A clear thesis, but the essay needs quotations and more paragraphs.',
        comment: 'Quote the narrator’s words to prove your point.',
        confidence: 'medium',
      }),
    );
  });
  await page.goto(`/t/c/c_math10a/submissions/${subId}`);
  await page.getByRole('button', { name: 'Suggest a mark' }).click();
  const suggestion = page.getByLabel('Suggested mark');
  // 3 + 2 × 2 + 2 + 3 + 4 = 16 of 24, scaled to 10 points.
  await expect(suggestion.getByText('Suggested: 6.7 / 10')).toBeVisible();
  await expect(suggestion.getByText('Evidence and analysis:')).toBeVisible();
  expect(sent).toContain('Evidence and analysis [id evidence] (counts 2×)');

  await suggestion.getByRole('button', { name: 'Use this mark' }).click();
  await expect(page.getByRole('radiogroup', { name: 'Evidence and analysis' }).getByRole('radio', { name: '2 Developing' })).toHaveAttribute('aria-checked', 'true');
  // The teacher raises one level before saving.
  await page.getByRole('radiogroup', { name: 'Organization' }).getByRole('radio', { name: '3 Proficient' }).click();
  await expect(page.getByText(/Rubric: 17 \/ 24 · 7.1 \/ 10 points/)).toBeVisible();
  await page.getByRole('button', { name: 'Save grade' }).click();
  await expect(page.getByText('Grade saved')).toBeVisible();
  await signOut(page);

  // The student sees the level on each criterion and what it means.
  await signInDemo(page, 'Student');
  await page.goto(`/s/work/${assignmentId}`);
  await page.getByRole('button', { name: 'Show', exact: true }).click();
  await page.getByRole('button', { name: /Q1/ }).click();
  const review = page.getByLabel('Rubric marks');
  await expect(review.getByText('17 / 24 · 7.1 / 10 points')).toBeVisible();
  await expect(review.getByText('3 · Proficient').first()).toBeVisible();
  await expect(review.getByText(/Some evidence, but quotations are dropped in/)).toBeVisible();
  expect(errors).toEqual([]);
});
