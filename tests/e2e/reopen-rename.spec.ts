import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';


test('a teacher reopens a student’s submitted attempt, and the old one is kept for the record', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  const s = await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    type Sub = { id: string; classId: string; assignmentId: string | null; studentId: string; status: string; items: unknown[] };
    const subs = db.submissions as Sub[];
    return subs.find((x) => x.classId === 'c_math10a' && x.assignmentId && x.status !== 'in_progress' && x.items.length > 1 && !subs.some((y) => y.assignmentId === x.assignmentId && y.studentId === x.studentId && y.status === 'in_progress'))!;
  });
  await page.goto(`/t/c/c_math10a/submissions/${s.id}`);
  await page.getByRole('button', { name: /^Reopen .*attempt$/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText(/kept for the record/)).toBeVisible();
  await dialog.getByRole('button', { name: 'Reopen', exact: true }).click();
  await expect(page.getByText(/^Reopened for /)).toBeVisible();
  await expect(page.getByText(/kept for the record/).first()).toBeVisible();
  await expect(page.getByRole('button', { name: /^Reopen .*attempt$/ })).toHaveCount(0);

  const after = await page.evaluate((id) => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    type Sub = { id: string; assignmentId: string | null; studentId: string; status: string; seed: number; reopenedAt?: string | null };
    const subs = db.submissions as Sub[];
    const old = subs.find((x) => x.id === id)!;
    const fresh = subs.find((x) => x.assignmentId === old.assignmentId && x.studentId === old.studentId && x.status === 'in_progress');
    return { reopened: !!old.reopenedAt, fresh: !!fresh, newSeed: fresh ? fresh.seed !== old.seed : false };
  }, s.id);
  expect(after).toEqual({ reopened: true, fresh: true, newSeed: true });
  expect(errors).toEqual([]);
});

test('a teacher renames an assignment, and the editor shows an example of every generated question', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  const id = await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('educore-demo-db-v1')!);
    return (db.assignments as { id: string; title: string }[]).find((a) => a.title === 'Surface Area Homework')!.id;
  });
  await page.goto(`/t/c/c_math10a/assignments/${id}`);
  await page.getByRole('button', { name: 'More actions' }).click();
  await page.getByRole('button', { name: 'Rename' }).click();
  const name = page.getByRole('dialog').getByLabel('Name');
  await name.fill('Surface Area Homework (Week 3)');
  await page.getByRole('dialog').getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('heading', { name: 'Surface Area Homework (Week 3)' })).toBeVisible();

  await page.goto(`/t/c/c_math10a/assignments/${id}/edit`);
  const examples = page.getByLabel('Example questions');
  await expect(examples.first()).toBeVisible();
  await expect(examples.first().getByText(/^Q1/)).toBeVisible();
  await examples.first().getByRole('button', { name: /Show all/ }).click();
  await expect(examples.first().getByText(/^Q3/)).toBeVisible();
  expect(errors).toEqual([]);
});
