import { expect, test, type Page } from '@playwright/test';
import { signInDemo, signOut, trackErrors } from './helpers';

/** Demo mode calls MiniMax from the browser with the teacher's own key: give it a key. */
async function useAiKey(page: Page) {
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    db.aiKey = 'test-key';
    localStorage.setItem('educore-demo-db-v1', JSON.stringify(db));
  });
}

const minimax = (content: unknown) => ({ json: { model: 'MiniMax-M3.1-Flash', choices: [{ message: { content: JSON.stringify(content) } }] } });

test('a teacher regenerates one question and takes the suggested quiz settings', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await useAiKey(page);
  const asked: string[] = [];
  await page.route('https://api.minimax.io/**', (route) => {
    asked.push(route.request().postData() ?? '');
    return route.fulfill(minimax({ question: { prompt: 'A hallway is $40$ paces of $0.75$ m. How long is it, in metres?', value: 30, check: '40 * 0.75', solution: '$40 \\times 0.75 = 30$ m.' } }));
  });

  await page.goto('/t/c/c_math10a/assignments/new?type=quiz&lesson=m10c-1-1');
  await expect(page.getByRole('heading', { name: 'New assignment' })).toBeVisible();
  await page.getByRole('button', { name: 'Number', exact: true }).click();
  await page.getByPlaceholder(/Explain why/).fill('A pace is $0.8$ m. How far is $10$ paces?');

  // Regenerate it, saying what should change: the new question replaces it, flagged for checking.
  await page.getByRole('button', { name: 'Regenerate' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('Regenerate this question')).toBeVisible();
  await dialog.getByLabel('What should change? (optional)').fill('Use a hallway');
  await dialog.getByRole('button', { name: 'Regenerate' }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByPlaceholder(/Explain why/)).toHaveValue(/A hallway is \$40\$ paces/);
  await expect(page.getByText('Written by AI: check the answer')).toBeVisible();
  expect(asked[0]).toContain('Use a hallway');
  expect(asked[0]).toContain('How far is $10$ paces?');

  // Suggested settings: with no time limit, the quiz gets one that fits its questions.
  await page.getByLabel('Time limit').selectOption('0');
  await page.getByRole('button', { name: 'Suggest settings' }).click();
  const advice = page.getByLabel('Suggested settings');
  await expect(advice.getByText(/About \d+ minutes of work for a typical student/)).toBeVisible();
  await expect(advice.getByText(/^Time limit \d+ min:/)).toBeVisible();
  await advice.getByRole('button', { name: 'Use these settings' }).click();
  await expect(advice).toBeHidden();
  await expect(page.getByLabel('Time limit')).not.toHaveValue('0');
  expect(errors).toEqual([]);
});

test('a teacher asks the AI for a mark on a canvas answer, and decides it', async ({ page }) => {
  const errors = trackErrors(page);
  const title = `Common multiples ${Date.now() % 100000}`;

  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments/new?type=homework');
  await page.getByLabel('Title').fill(title);
  await page.getByRole('button', { name: 'Written', exact: true }).click();
  await page.getByPlaceholder(/Explain why/).fill('Three groups meet every $4$, $6$ and $10$ days. After how many days will they next meet together? Show your method.');
  await page.getByRole('button', { name: 'Publish & notify students' }).click();
  await page.waitForURL(/\/assignments\/a_/);
  const assignmentId = page.url().split('/assignments/')[1];
  await signOut(page);

  // The student works on the canvas and types a sentence.
  await signInDemo(page, 'Student');
  await page.goto(`/s/work/${assignmentId}`);
  await page.getByRole('button', { name: /^Start/ }).click();
  await page.waitForURL(/\/take$/);
  const box = (await page.getByRole('img', { name: 'Answer canvas, page 1' }).boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.3);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(box.x + box.width * (0.2 + i * 0.05), box.y + box.height * (i % 2 ? 0.5 : 0.3), { steps: 3 });
  await page.mouse.up();
  await page.getByRole('tab', { name: 'Type' }).click();
  await page.getByLabel('Typed answer').fill('The LCM of 4, 6 and 10 is 60, so after 60 days.');
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();
  await page.waitForURL(/\/s\/work\/a_[^/]+$/);
  const { subId, studentName } = await page.evaluate((id) => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    const sub = db.submissions.find((s: { assignmentId: string }) => s.assignmentId === id);
    return { subId: sub.id as string, studentName: db.users.find((u: { id: string }) => u.id === sub.studentId).fullName as string };
  }, assignmentId);
  await signOut(page);

  // The teacher asks for a suggested mark: MiniMax gets the working as a picture, and no name.
  await signInDemo(page, 'Teacher');
  await useAiKey(page);
  let sent = '';
  await page.route('https://api.minimax.io/**', (route) => {
    sent = route.request().postData() ?? '';
    return route.fulfill(minimax({ points: 3.2, reasons: 'The LCM of $60$ is right and clearly found.', comment: 'Clear method. Show how you found the LCM next time.', confidence: 'high', readCanvas: true }));
  });
  await page.goto(`/t/c/c_math10a/submissions/${subId}`);
  await page.getByRole('button', { name: 'Suggest a mark' }).click();
  const suggestion = page.getByLabel('Suggested mark');
  await expect(suggestion.getByText('Suggested: 3 / 4')).toBeVisible();
  await expect(suggestion.getByText('High confidence')).toBeVisible();
  expect(sent).toContain('data:image/png;base64,');
  expect(sent).toContain('The LCM of 4, 6 and 10 is 60');
  expect(sent).not.toContain(studentName);

  // Nothing is saved until the teacher chooses: "Use this mark" fills in the mark and the comment.
  await suggestion.getByRole('button', { name: 'Use this mark' }).click();
  await expect(page.getByRole('radiogroup', { name: 'Points' }).getByRole('radio', { name: '3', exact: true })).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByPlaceholder('Comment for the student (optional)')).toHaveValue('Clear method. Show how you found the LCM next time.');
  await page.getByRole('button', { name: 'Save grade' }).click();
  await expect(page.getByText('Grade saved')).toBeVisible();
  expect(errors).toEqual([]);
});
