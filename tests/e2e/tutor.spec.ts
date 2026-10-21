import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { TUTOR_VOICE_VERSION, tutorSlideKey } from '../../engine/ai/tutor.ts';
import { lessonTutorSlides } from '../../video/lib/tutor-lessons.ts';
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

test('the tutor speaks a lesson’s recorded lines in the videos’ voice', async ({ page }) => {
  const errors = trackErrors(page);
  // A recording like the ones the Tutor voice workflow publishes, for the first two slides. The
  // keys come from the lesson as the recording tool builds it, so this also checks that the tool
  // and the app see the same slides.
  const [title, hook] = lessonTutorSlides('m10c-1-1').slides;
  // Long enough that reading it would take about twenty seconds: moving on sooner shows the
  // tutor followed the recording, which is under a second long.
  const welcome = `Welcome! ${'This line comes from the recording and is long. '.repeat(6)}`.trim();
  const manifest = {
    v: TUTOR_VOICE_VERSION,
    lessonId: 'm10c-1-1',
    audio: 'm10c-1-1.test.mp3',
    voice: { name: 'af_heart', speed: 0.85 },
    hash: 'test',
    slides: {
      [tutorSlideKey(title)]: { beats: [welcome], clips: [[0.2, 0.9]], ai: true },
      [tutorSlideKey(hook)]: { beats: hook.steps.map((_, k) => `Recorded hook line ${k + 1}.`), clips: hook.steps.map(() => [1.2, 1.9]), ai: true },
    },
    phrases: {},
  };
  await page.route('**/tutor/m10c-1-1.json', (r) => r.fulfill({ json: manifest }));
  await page.route('**/tutor/m10c-1-1.test.mp3', (r) => r.fulfill({ body: readFileSync('tests/e2e/fixtures/tutor-silence.mp3'), contentType: 'audio/mpeg' }));

  await signInDemo(page, 'Student');
  await page.goto('/s/learn/m10c-1-1/tutor');
  await expect(page.getByLabel('Read the lesson aloud')).toBeChecked();
  await page.getByRole('button', { name: 'Start the lesson' }).click();
  const caption = page.locator('footer p[aria-live="polite"]');
  await expect(caption).toContainText('Welcome! This line comes from the recording');
  await expect(caption).toContainText('Recorded hook line 1.', { timeout: 8000 });
  await page.getByRole('button', { name: 'Pause' }).click();
  await page.getByRole('button', { name: 'Turn the voice off' }).click();
  await expect(page.getByRole('button', { name: 'Turn the voice on' })).toBeVisible();
  expect(errors).toEqual([]);
});
