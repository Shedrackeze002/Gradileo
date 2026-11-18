import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('a teacher makes a Grade 10 Physics class from the Physics tab and teaches Ohm’s law and reflection', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await expect(page.getByRole('button', { name: /^Grade 10 Physics/ })).toHaveCount(0);
  await page.getByRole('tab', { name: 'Physics' }).click();
  // The tab opens on the first physics course, with Grade 11 and Grade 12 Physics beside it.
  await expect(page.getByRole('button', { name: /^Grade 11 Physics/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Grade 12 Physics/ })).toBeVisible();
  await expect(page.getByLabel('Class name')).toHaveValue('Physics 10');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 10 Physics').first()).toBeVisible();
  const classUrl = page.url().replace(/\/$/, '');
  // A lesson with a graph: current against voltage for a resistor.
  await page.goto(`${classUrl}/lessons/p10-5-2`);
  await expect(page.getByRole('heading', { name: 'Voltage, Resistance and Ohm’s Law', exact: true })).toBeVisible();
  await expect(page.locator('svg[role="img"][aria-label*="current through a resistor"]').first()).toBeVisible();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  // A lesson with ray diagrams.
  await page.goto(`${classUrl}/lessons/p10-4-4`);
  await expect(page.getByRole('heading', { name: 'Reflection and Refraction', exact: true })).toBeVisible();
  await expect(page.locator('svg.figure-svg[role="img"]').first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 10 student who chooses physics is recommended Grade 10 Physics with no placement check, and finds its topics', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Isaac Learner');
  await page.getByLabel('Email').fill(`isaac.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  // Physics asks only for the grade, from the year before its first course.
  await page.getByRole('button', { name: 'Physics', exact: true }).click();
  await page.getByLabel('Country or curriculum').selectOption('ca');
  await expect(page.getByRole('button', { name: 'Grade 8', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Grade 9', exact: true })).toBeVisible();
  await expect(page.getByText('How does mathematics feel right now?')).toHaveCount(0);
  await page.getByRole('button', { name: 'Grade 10', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 10 Physics', exact: true })).toBeVisible();
  await expect(page.getByText('If you have already studied motion, forces, energy, waves and circuits.')).toBeVisible();
  await expect(page.getByText('Physics 10 is the first course, so there is no placement check.')).toBeVisible();
  await page.getByRole('button', { name: 'Start Physics 10' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Grade 10 Physics · Self-paced with your AI tutor')).toBeVisible();

  // Browse by topic has a Physics tab, with the units and lessons of all three courses under its topics.
  await page.goto('/s/topics');
  await page.getByRole('tab', { name: 'Physics' }).click();
  await expect(page.getByRole('region', { name: 'Motion, forces and energy' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Forces and Newton’s laws/ })).toContainText('Grades 10–11');
  await expect(page.getByRole('button', { name: /Circuits and electrical power/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Gravitation, circular motion and orbits/ })).toContainText('Grade 11');
  await expect(page.getByRole('button', { name: /Oscillations: springs and pendulums/ })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Fields, atoms and nuclei' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Momentum, impulse and collisions/ })).toContainText('Grade 12');
  await expect(page.getByRole('button', { name: /The nucleus, radioactivity and nuclear energy/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher makes a Grade 11 Physics class and opens lessons with a graph and a standing wave', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'Physics' }).click();
  await page.getByRole('button', { name: /^Grade 11 Physics/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Physics 11');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 11 Physics').first()).toBeVisible();
  const classUrl = page.url().replace(/\/$/, '');
  // A lesson with force-displacement graphs.
  await page.goto(`${classUrl}/lessons/p20-3-4`);
  await expect(page.getByRole('heading', { name: 'Work and Force-Displacement Graphs', exact: true })).toBeVisible();
  await expect(page.locator('svg.figure-svg[role="img"]').first()).toBeVisible();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  // A lesson with a diagram drawn on the plane: a standing wave with its nodes and antinodes.
  await page.goto(`${classUrl}/lessons/p20-4-6`);
  await expect(page.getByRole('heading', { name: 'Standing Waves and Resonance', exact: true })).toBeVisible();
  await expect(page.locator('svg[role="img"][aria-label*="standing wave with three loops"]').first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 11 student who chooses physics is recommended Grade 11 Physics, with a placement check on Physics 10', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Emmy Learner');
  await page.getByLabel('Email').fill(`emmy.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  await page.getByRole('button', { name: 'Physics', exact: true }).click();
  await page.getByLabel('Country or curriculum').selectOption('ca');
  await page.getByRole('button', { name: 'Grade 11', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 11 Physics', exact: true })).toBeVisible();
  await expect(page.getByText('Start here if physics is new to you.')).toBeVisible();
  // The check asks one question from each of the five units of Grade 10 Physics.
  await expect(page.getByText(/A short placement check \(5 questions on Physics 10 skills\)/)).toBeVisible();
  await page.getByRole('button', { name: 'Take the placement check' }).click();
  await expect(page.getByText('Placement check · Physics 10')).toBeVisible();
  for (let i = 0; i < 5; i++) await page.getByRole('button', { name: 'I have not learned this yet' }).click();
  await expect(page.getByText('Start earlier')).toBeVisible();
  await page.getByRole('button', { name: 'Start Physics 11 anyway' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Grade 11 Physics · Self-paced with your AI tutor')).toBeVisible();
  await expect(page.getByText('Review from Physics 10')).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher makes a Grade 12 Physics class and opens lessons with scattering paths and a decay curve', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('tab', { name: 'Physics' }).click();
  await page.getByRole('button', { name: /^Grade 12 Physics/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Physics 12');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 12 Physics').first()).toBeVisible();
  const classUrl = page.url().replace(/\/$/, '');
  // A lesson with a diagram drawn on the plane: alpha particles turned aside by a nucleus.
  await page.goto(`${classUrl}/lessons/p30-4-2`);
  await expect(page.getByRole('heading', { name: 'Rutherford’s Nucleus', exact: true })).toBeVisible();
  await expect(page.locator('svg[role="img"][aria-label*="alpha particles past a nucleus"]').first()).toBeVisible();
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  // A lesson with a graph: the decay curve of a radioactive sample.
  await page.goto(`${classUrl}/lessons/p30-4-6`);
  await expect(page.getByRole('heading', { name: 'Half-Life', exact: true })).toBeVisible();
  await expect(page.locator('svg[role="img"][aria-label*="decay curve"]').first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  // The first lesson of the course, with its momentum questions.
  await page.goto(`${classUrl}/lessons/p30-1-1`);
  await expect(page.getByRole('heading', { level: 1, name: 'Momentum', exact: true })).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 12 student who chooses physics is recommended Grade 12 Physics, with a placement check on Physics 11', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Lise Learner');
  await page.getByLabel('Email').fill(`lise.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  await page.getByRole('button', { name: 'Physics', exact: true }).click();
  await page.getByLabel('Country or curriculum').selectOption('ca');
  await page.getByRole('button', { name: 'Grade 12', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 12 Physics', exact: true })).toBeVisible();
  await expect(page.getByText('Start here if vectors, projectiles, circular motion and waves are new to you.')).toBeVisible();
  // The check asks one question from each of the four units of Grade 11 Physics.
  await expect(page.getByText(/A short placement check \(4 questions on Physics 11 skills\)/)).toBeVisible();
  await page.getByRole('button', { name: 'Take the placement check' }).click();
  await expect(page.getByText('Placement check · Physics 11')).toBeVisible();
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'I have not learned this yet' }).click();
  await expect(page.getByText('Start earlier')).toBeVisible();
  await page.getByRole('button', { name: 'Start Physics 12 anyway' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Grade 12 Physics · Self-paced with your AI tutor')).toBeVisible();
  await expect(page.getByText('Review from Physics 11')).toBeVisible();
  expect(errors).toEqual([]);
});
