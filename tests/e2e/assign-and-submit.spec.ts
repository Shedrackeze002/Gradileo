import { expect, test } from '@playwright/test';
import { signInDemo, signOut, trackErrors } from './helpers';

test('teacher assigns a quiz, the student is notified, completes it, and the teacher sees the result', async ({ page }) => {
  const errors = trackErrors(page);
  const title = `Checkpoint quiz ${Date.now() % 100000}`;

  // Teacher builds a quiz from Lesson 1.1 and publishes it.
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments/new?type=quiz&lesson=m10c-1-1');
  await expect(page.getByRole('heading', { name: 'New assignment' })).toBeVisible();
  await page.getByLabel('Title').fill(title);
  await page.getByRole('button', { name: 'Publish & notify students' }).click();
  await page.waitForURL(/\/assignments\/a_/);
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
  await expect(page.getByText('0/16')).toBeVisible();
  await signOut(page);

  // Student sees the notification and the work.
  await signInDemo(page, 'Student');
  await page.getByRole('button', { name: /Notifications/ }).click();
  await expect(page.getByText(`New quiz: ${title}`)).toBeVisible();
  await page.getByText(`New quiz: ${title}`).click();
  await page.waitForURL(/\/s\/work\/a_/);
  await page.getByRole('button', { name: /^Start/ }).click();
  await page.waitForURL(/\/take$/);

  // Submit is only offered on the last question, so moving on cannot submit by mistake.
  await expect(page.getByRole('button', { name: /Save & next/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit', exact: true })).toHaveCount(0);

  // Answer the first question if it is multiple choice, then move through to the end.
  const choice = page.getByRole('radio').first();
  if (await choice.isVisible().catch(() => false)) await choice.click();
  for (let i = 0; i < 12; i++) {
    const finish = page.getByRole('button', { name: 'Finish' });
    if (await finish.isVisible()) break;
    await page.getByRole('button', { name: /Save & next/ }).click();
  }
  await expect(page.getByRole('button', { name: 'Submit', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Finish' }).click();
  // The confirmation says plainly that submitting ends the quiz.
  const dialog = page.getByRole('dialog', { name: 'Submit your quiz?' });
  await expect(dialog.getByText(/cannot go back or change any of your answers/)).toBeVisible();
  await dialog.getByRole('button', { name: 'Keep working' }).click();
  await expect(dialog).toHaveCount(0);
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Yes, submit my quiz' }).click();
  await page.waitForURL(/\/s\/work\/a_[^/]+$/);
  await expect(page.getByText('Your best result')).toBeVisible();
  await signOut(page);

  // Teacher sees the submission.
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments');
  await page.getByRole('link', { name: new RegExp(title) }).click();
  await expect(page.getByText('1/16')).toBeVisible();
  await expect(page.getByRole('row', { name: /Amara Okafor/ }).getByText('Submitted')).toBeVisible();

  expect(errors).toEqual([]);
});

test('exam mode records exits, locks the attempt at the limit, and the teacher unlocks it', async ({ context }) => {
  const teacher = await context.newPage();
  const student = await context.newPage();
  const teacherErrors = trackErrors(teacher);
  const studentErrors = trackErrors(student);
  const title = `Exam mode quiz ${Date.now() % 100000}`;

  // The teacher turns on exam mode: lock after 2 exits.
  await signInDemo(teacher, 'Teacher');
  await teacher.goto('/t/c/c_math10a/assignments/new?type=quiz&lesson=m10c-1-1');
  await teacher.getByLabel('Title').fill(title);
  await teacher.getByRole('switch', { name: /Exam mode/ }).click();
  await teacher.getByLabel('Exits allowed').selectOption('2');
  await teacher.getByRole('button', { name: 'Publish & notify students' }).click();
  await teacher.waitForURL(/\/assignments\/a_/);
  const assignmentId = teacher.url().split('/assignments/')[1];

  // The student reads the notice, starts in full screen, and leaves it twice.
  await signInDemo(student, 'Student');
  await student.goto(`/s/work/${assignmentId}`);
  await expect(student.getByLabel('Exam mode').getByText(/After 2 exits, it locks until your teacher unlocks it/)).toBeVisible();
  await student.getByRole('button', { name: /^Start/ }).click();
  await student.waitForURL(/\/take$/);
  await student.getByRole('button', { name: 'Start in full screen' }).click();
  await expect.poll(() => student.evaluate(() => !!document.fullscreenElement)).toBe(true);
  await student.evaluate(() => document.exitFullscreen());
  await expect(student.getByRole('heading', { name: 'You left full screen' })).toBeVisible();
  await expect(student.getByText(/1 more exit and the quiz locks/)).toBeVisible();
  await student.getByRole('button', { name: 'Return to full screen' }).click();
  await student.waitForTimeout(1700);
  await student.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    delete (document as unknown as { visibilityState?: string }).visibilityState;
  });
  await expect(student.getByRole('heading', { name: 'This attempt is locked' })).toBeVisible();

  // The teacher sees the lock and unlocks the attempt; the student carries on and submits.
  await teacher.reload();
  await teacher.getByRole('button', { name: /^Unlock .*attempt/ }).click();
  await expect(teacher.getByText(/can carry on/)).toBeVisible();
  await expect(student.getByRole('heading', { name: 'This attempt is locked' })).toHaveCount(0, { timeout: 15_000 });
  for (let i = 0; i < 12; i++) {
    const finish = student.getByRole('button', { name: 'Finish' });
    if (await finish.isVisible()) break;
    await student.getByRole('button', { name: /Save & next/ }).click();
  }
  await student.getByRole('button', { name: 'Finish' }).click();
  await student.getByRole('dialog', { name: /^Submit your / }).getByRole('button', { name: 'Submit' }).click();
  await student.waitForURL(/\/s\/work\/a_[^/]+$/);

  await teacher.reload();
  await expect(teacher.getByText('Left exam mode 2×')).toBeVisible();
  expect([...teacherErrors, ...studentErrors]).toEqual([]);
});

test('accepted answers take commas, empty choices are left out, and an answer given just before leaving is kept', async ({ page }) => {
  const errors = trackErrors(page);
  const title = `Own questions ${Date.now() % 100000}`;

  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/assignments/new?type=homework');
  await page.getByLabel('Title').fill(title);
  // Typed key by key, as a teacher does: the box used to swallow every comma and space.
  await page.getByRole('button', { name: 'Short answer', exact: true }).click();
  await page.getByPlaceholder(/Explain why/).last().fill('Name the longest side of a right triangle.');
  await page.getByLabel('Accepted answers').pressSequentially('hypotenuse, the hypotenuse');
  await expect(page.getByLabel('Accepted answers')).toHaveValue('hypotenuse, the hypotenuse');
  // A choice question with two of its four choices left empty.
  await page.getByRole('button', { name: 'Choice', exact: true }).click();
  await page.getByPlaceholder(/Explain why/).last().fill('Which is larger?');
  await page.getByPlaceholder('Choice A').fill('one half');
  await page.getByPlaceholder('Choice B').fill('one third');
  await page.getByLabel('Mark choice 1 correct').click();
  await page.getByRole('button', { name: 'Publish & notify students' }).click();
  await page.waitForURL(/\/assignments\/a_/);
  const assignmentId = page.url().split('/assignments/')[1];
  await signOut(page);

  await signInDemo(page, 'Student');
  await page.goto(`/s/work/${assignmentId}`);
  await page.getByRole('button', { name: /^Start/ }).click();
  await page.waitForURL(/\/take$/);
  // Answer and leave at once with the X: the answer is saved, not lost with the pending autosave.
  await page.locator('main').getByRole('textbox').first().fill('The Hypotenuse');
  await page.getByRole('button', { name: 'Save and exit' }).click();
  await page.waitForURL(/\/s\/work\/a_[^/]+$/);
  await page.getByRole('button', { name: /^Continue/ }).click();
  await page.waitForURL(/\/take$/);
  await page.getByRole('button', { name: 'Question 1', exact: true }).click();
  await expect(page.locator('main').getByRole('textbox').first()).toHaveValue('The Hypotenuse');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.getByText('Correct!')).toBeVisible();
  // Only the two choices the teacher wrote are offered.
  await page.getByRole('button', { name: 'Question 2', exact: true }).click();
  await expect(page.getByRole('radio')).toHaveCount(2);

  expect(errors).toEqual([]);
});
