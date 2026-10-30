import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('landing page renders', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Try the teacher demo' }).click();
  await page.waitForURL(/\/t\/c\//);
  expect(errors).toEqual([]);
});

test('every teacher page loads without errors', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  const pages: Array<[string, string | RegExp]> = [
    ['/t/c/c_math10a', 'Math 10'],
    ['/t/c/c_math10a/curriculum', 'Curriculum'],
    ['/t/c/c_math10a/lessons/m10c-2-1', 'The Tangent Ratio'],
    ['/t/c/c_math10a/assignments', 'Assignments'],
    ['/t/c/c_math10a/assignments/new', 'New assignment'],
    ['/t/c/c_math10a/students', 'Students'],
    ['/t/c/c_math10a/gradebook', 'Gradebook'],
    ['/t/c/c_math10a/mastery', 'Mastery map'],
    ['/t/c/c_math10a/insights', 'AI teaching assistant'],
    ['/t/c/c_math10a/settings', 'Class settings'],
    ['/notifications', 'Notifications'],
    ['/settings', 'Settings'],
  ];
  for (const [path, heading] of pages) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('every student page loads without errors', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  await expect(page.getByRole('heading', { name: /Amara/ })).toBeVisible();
  for (const [path, heading] of [
    ['/s/learn', /Learn|Lessons/],
    ['/s/learn/m10c-1-1', 'Referents, Estimation and Units'],
    ['/s/work', /Classwork|Work/],
    ['/s/progress', 'My progress'],
    ['/s/live', 'Class question'],
    ['/s/welcome', 'Find your course'],
    ['/s/topics', 'Browse by topic'],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('teacher can analyse the class with the AI assistant and approve a suggestion', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/c/c_math10a/insights');
  await page.getByRole('button', { name: 'Analyse class' }).first().click();
  await expect(page.getByText('Recommended next steps')).toBeVisible();
  const approve = page.getByRole('button', { name: 'Approve & assign' }).first();
  await approve.click();
  await expect(page.getByText('Assigned', { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('students practise a skill with instant feedback', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Student');
  await page.goto('/s/practice?skills=m1-referents');
  const choice = page.getByRole('radio').first();
  await choice.click();
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.getByText(/Correct|Not quite|Incorrect/).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('a teacher creates a Grade 10 Workplace class and teaches from its curriculum', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /^Grade 10 Mathematics: Workplace/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Math 10 Workplace');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 10 Mathematics: Workplace').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/curriculum`);
  await expect(page.getByText('Unit Pricing and Currency Exchange').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/curriculum$/, '')}/lessons/m103-6-3`);
  await expect(page.getByText('Parallel Lines and Transversals').first()).toBeVisible();
  await expect(page.getByText(/Check your understanding/i).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 11 lesson check takes a list of roots', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /^Grade 11 Mathematics: Pre-calculus/ }).click();
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/m201-4-2`);
  await expect(page.getByText('Solving Quadratic Equations by Graphing and Factoring').first()).toBeVisible();
  const check = page.locator('div.border-dashed', { hasText: 'Check your understanding · Roots from a graph' }).first();
  await check.getByRole('textbox', { name: 'Answer' }).first().fill('100, -100');
  await check.getByRole('button', { name: 'Check' }).click();
  await expect(check.getByText(/Not quite|Close/).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 12 Calculus lesson reads calculus answers', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /^Grade 12 Mathematics: Calculus/ }).click();
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/m31-4-3`);
  await expect(page.getByText('The Chain Rule').first()).toBeVisible();
  const check = page.locator('div.border-dashed', { hasText: 'Check your understanding' }).first();
  await check.getByRole('textbox', { name: 'Answer' }).first().fill('3sin^2 x cos x');
  // The live preview typesets what the student typed, functions included.
  await expect(check.locator('.katex', { hasText: 'sin' }).first()).toBeVisible();
  await check.getByRole('button', { name: 'Check' }).click();
  // The check is drawn at random: a derivative is graded, while an f'(a) value asks for a number.
  await expect(check.getByText(/Not quite|Correct|should be a number/).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 5 lesson loads its practice questions', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /Grade 5 Mathematics/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Math 5');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/m5-5-1`);
  await expect(page.getByText('Improper Fractions and Mixed Numbers').first()).toBeVisible();
  // The checks come from the Grade 5 generators, which load on demand.
  await expect(page.getByText(/Check your understanding · /).first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a Grade 8 lesson draws structures of cubes', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /Grade 8 Mathematics/ }).click();
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await page.goto(`${page.url().replace(/\/$/, '')}/lessons/m8-8-1`);
  await expect(page.getByText('Views of Three-Dimensional Objects').first()).toBeVisible();
  await expect(page.locator('svg[aria-label*="cube"]').first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a teacher creates a Grade 11 Essentials class and sees its graphs', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/t/new-class');
  await page.getByRole('button', { name: /^Grade 11 Mathematics: Essentials/ }).click();
  await expect(page.getByLabel('Class name')).toHaveValue('Math 11 Essentials');
  await page.getByRole('button', { name: 'Create class' }).click();
  await page.waitForURL(/\/t\/c\/c_/);
  await expect(page.getByText('Grade 11 Mathematics: Essentials').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/$/, '')}/curriculum`);
  await expect(page.getByText('Budgeting and Credit').first()).toBeVisible();
  await page.goto(`${page.url().replace(/\/curriculum$/, '')}/lessons/m204-9-1`);
  await expect(page.getByText('Displaying Data').first()).toBeVisible();
  await expect(page.locator('svg[role="img"][aria-label*="graph" i]').first()).toBeVisible();
  expect(await page.locator('.katex-error').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('a teacher presents a lesson as slides that build step by step, with a whiteboard', async ({ page }) => {
  const errors = trackErrors(page);
  await signInDemo(page, 'Teacher');
  await page.goto('/present/c_math10a/m10c-2-1');
  const slide = page.locator('[aria-roledescription="slide"]');
  await expect(slide).toHaveAttribute('aria-label', /^Slide 1 of \d+: The Tangent Ratio$/);
  await expect(page.getByRole('heading', { level: 1, name: 'The Tangent Ratio' })).toBeVisible();

  // Next reveals one piece at a time before moving on.
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(slide).toHaveAttribute('aria-label', /Naming the sides/);
  const waiting = slide.locator('.build-wait');
  const before = await waiting.count();
  expect(before).toBeGreaterThan(0);
  await page.keyboard.press('ArrowRight');
  await expect(waiting).toHaveCount(before - 1);

  // The whiteboard opens over the slide, saves to the lesson and closes back to the same slide.
  await page.keyboard.press('w');
  const board = page.getByRole('dialog', { name: 'Whiteboard' });
  await expect(board).toBeVisible();
  // On an iPad a resting palm must not select the page: it is locked while the board is open.
  await expect(page.locator('html')).toHaveClass(/ink-lock/);
  const canvas = board.getByRole('img', { name: /Whiteboard, page 1/ });
  const box = (await canvas.boundingBox())!;
  await page.mouse.move(box.x + 100, box.y + 100);
  await page.mouse.down();
  await page.mouse.move(box.x + 300, box.y + 200, { steps: 8 });
  // Nothing on the page can be selected while a stroke is drawn, and the lock lifts afterwards.
  await expect(page.locator('html')).toHaveClass(/ink-drawing/);
  await page.mouse.up();
  await expect(page.locator('html')).not.toHaveClass(/ink-drawing/);
  // On an iPad, Safari would select text instead of drawing: the board cancels the pencil's touches.
  await expect(board).toHaveCSS('user-select', 'none');
  const cancelled = await canvas.evaluate((c) => {
    const t = new Touch({ identifier: 1, target: c, clientX: 20, clientY: 20 });
    const e = new TouchEvent('touchstart', { cancelable: true, bubbles: true, touches: [t], targetTouches: [t], changedTouches: [t] });
    c.dispatchEvent(e);
    return e.defaultPrevented;
  });
  expect(cancelled).toBe(true);
  await board.getByRole('button', { name: 'Save to lesson' }).click();
  await expect(board.getByRole('button', { name: 'Saved' })).toBeVisible();
  await board.getByRole('button', { name: 'Back to slide' }).click();
  await expect(board).toBeHidden();
  await expect(page.locator('html')).not.toHaveClass(/ink-lock/);
  await expect(slide).toHaveAttribute('aria-label', /Naming the sides/);

  // The slide overview jumps to a "Your turn" slide with the lesson's interactive question.
  await page.keyboard.press('o');
  await page.getByRole('dialog', { name: 'All slides' }).getByRole('button', { name: /Your turn/ }).first().click();
  await expect(slide.locator('[data-question]')).toBeVisible();

  // The saved board is listed on the lesson page.
  await page.getByRole('button', { name: 'Exit presentation' }).click();
  await expect(page.getByText('Saved whiteboards')).toBeVisible();
  expect(errors).toEqual([]);
});

test('the teacher asks the class a live question and students answer on their own devices', async ({ context }) => {
  // Two tabs share the demo's storage but each signs in on its own, like two devices.
  const teacher = await context.newPage();
  const student = await context.newPage();
  const teacherErrors = trackErrors(teacher);
  const studentErrors = trackErrors(student);
  await signInDemo(teacher, 'Teacher');
  await teacher.goto('/present/c_math10a/m10c-2-1');
  await expect(teacher.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', /^Slide 1 of/);
  await teacher.keyboard.press('o');
  await teacher.getByRole('dialog', { name: 'All slides' }).getByRole('button', { name: /Your turn/ }).first().click();
  await teacher.getByRole('button', { name: 'Ask the class on their devices' }).click();
  await expect(teacher.getByText('Live · 0 answered')).toBeVisible();

  await signInDemo(student, 'Student');
  await student.getByRole('link', { name: /Answer now/ }).click();
  await expect(student.getByRole('heading', { name: 'Class question' })).toBeVisible();
  await student.locator('[data-question] button').first().click();
  await student.getByRole('button', { name: 'Send answer' }).click();
  await expect(student.getByText(/Answer sent/).first()).toBeVisible();

  await expect(teacher.getByText('Live · 1 answered')).toBeVisible();
  await teacher.getByRole('button', { name: /Add the sample class/ }).click();
  await teacher.getByRole('button', { name: 'Stop and show results' }).click();
  await expect(teacher.getByLabel('Answers by choice')).toBeVisible();
  await expect(teacher.getByText(/correct ·/)).toBeVisible();

  await expect(student.getByText(/Correct — well done!|Not quite/)).toBeVisible();
  await expect(student.getByText('Worked solution')).toBeVisible();
  expect([...teacherErrors, ...studentErrors]).toEqual([]);
});

test('students ask questions while the teacher presents; they pop up, and a Questions slide lists them', async ({ context }) => {
  const teacher = await context.newPage();
  const student = await context.newPage();
  const teacherErrors = trackErrors(teacher);
  const studentErrors = trackErrors(student);
  await signInDemo(teacher, 'Teacher');
  await teacher.goto('/present/c_math10a/m10c-2-1');
  await expect(teacher.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', /^Slide 1 of/);
  // Nobody has asked anything yet, so the deck has no Questions slide.
  await teacher.keyboard.press('o');
  const overview = teacher.getByRole('dialog', { name: 'All slides' });
  await expect(overview.getByRole('button', { name: /^Questions/ })).toHaveCount(0);
  await teacher.keyboard.press('Escape');

  const question = 'Why is the hypotenuse always the longest side?';
  await signInDemo(student, 'Student');
  await expect(student.getByText(/Your teacher is presenting Lesson 2\.1/)).toBeVisible();
  await student.getByRole('button', { name: 'Ask a question' }).click();
  await student.getByLabel('Your question').fill(question);
  await student.getByRole('button', { name: 'Send question' }).click();
  await expect(student.getByText('You asked one question.')).toBeVisible();

  // It pops up on the teacher's screen with the student's first name and last initial.
  const popup = teacher.getByRole('alertdialog', { name: 'A question from the class' });
  await expect(popup.getByText(question)).toBeVisible();
  await expect(popup.getByText('Amara O. asks')).toBeVisible();
  await expect(teacher.getByRole('button', { name: '1 new question' })).toBeVisible();
  await popup.getByRole('button', { name: 'Answer' }).click();
  const answering = teacher.getByRole('dialog', { name: 'Answering a question from the class' });
  await expect(answering.getByText(question)).toBeVisible();
  await answering.getByRole('button', { name: 'Back to the slide' }).click();
  await expect(popup).toHaveCount(0);

  // The student sees it was answered.
  await student.getByRole('button', { name: 'Ask a question' }).click();
  await expect(student.getByRole('dialog').getByText('Answered')).toBeVisible();

  // A student can keep their name off the class's screen; the teacher skips this one for now.
  await student.getByLabel('Your question').fill('Can you go over the example again?');
  await student.getByLabel('Hide my name from the class').check();
  await student.getByRole('button', { name: 'Send question' }).click();
  await expect(student.getByText('You asked 2 questions.')).toBeVisible();
  await expect(popup.getByText('A student asks')).toBeVisible();
  await popup.getByRole('button', { name: 'Skip' }).click();
  await expect(popup).toHaveCount(0);

  // The Questions slide comes before the end and lists what the class asked.
  await teacher.keyboard.press('o');
  await overview.getByRole('button', { name: /^Questions/ }).click();
  await expect(teacher.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', /: Questions$/);
  await expect(teacher.getByText(question)).toBeVisible();
  await teacher.keyboard.press('ArrowRight');
  await expect(teacher.locator('[aria-roledescription="slide"]')).toHaveAttribute('aria-label', /Lesson complete$/);

  // The lesson page keeps the questions, with who asked them.
  await teacher.getByRole('button', { name: 'Exit presentation' }).click();
  await expect(teacher.getByText('Questions from the class')).toBeVisible();
  await expect(teacher.getByText(question)).toBeVisible();
  await expect(teacher.getByText('Amara Okafor').first()).toBeVisible();
  await expect(teacher.getByText(/name kept off the class/)).toHaveCount(1);


  // Once the teacher stops presenting, the student can no longer ask.
  await expect(student.getByRole('button', { name: 'Ask a question' })).toHaveCount(0);
  expect([...teacherErrors, ...studentErrors]).toEqual([]);
});

test('a student signs up without a class code, is placed in a course and studies on their own', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Ada Learner');
  await page.getByLabel('Email').fill(`ada.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();

  // Onboarding: country and year, plans and how mathematics feels lead to a recommended course.
  await page.waitForURL(/\/s\/welcome$/);
  await page.getByLabel('Country or curriculum').selectOption('ca');
  await page.getByRole('button', { name: 'Grade 10', exact: true }).click();
  await page.getByRole('button', { name: /University: science/ }).click();
  await page.getByRole('button', { name: 'Okay, with some gaps' }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 10 Mathematics', exact: true })).toBeVisible();
  await expect(page.getByText(/keeps university and college options open/)).toBeVisible();

  // The placement check uses Math 9 skills; skipping every question suggests starting earlier.
  await page.getByRole('button', { name: 'Take the placement check' }).click();
  await expect(page.getByText('Placement check · Math 9')).toBeVisible();
  for (let i = 0; i < 6; i++) await page.getByRole('button', { name: 'I have not learned this yet' }).click();
  await expect(page.getByText('Start earlier')).toBeVisible();
  await page.getByRole('button', { name: 'Start Math 10 anyway' }).click();

  // A self-paced section opens with every lesson, the next one marked, and the skills to review.
  await page.waitForURL(/\/s$/);
  await expect(page.getByText(/Self-paced with your AI tutor/)).toBeVisible();
  await expect(page.getByText('Review from Math 9')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Announcements' })).toHaveCount(0);
  await page.goto('/s/learn');
  await expect(page.getByText('Next', { exact: true })).toBeVisible();

  // The course switcher adds another course.
  await page.getByRole('button', { name: 'Switch course' }).first().click();
  await page.getByRole('button', { name: 'Add a course' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  // The country chosen first is remembered on the profile.
  await expect(page.getByLabel('Country or curriculum')).toHaveValue('ca');
  await page.getByRole('button', { name: 'Grade 12', exact: true }).click();
  await page.getByRole('button', { name: /University: science/ }).click();
  await page.getByRole('button', { name: 'Yes', exact: true }).click();
  await page.getByRole('button', { name: 'Going well' }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await page.getByRole('button', { name: 'Skip the check and start' }).click();
  await page.waitForURL(/\/s$/);
  await expect(page.getByText('Grade 12 Mathematics: Pre-calculus · Self-paced with your AI tutor')).toBeVisible();
  await page.getByRole('button', { name: 'Switch course' }).first().click();
  await expect(page.getByRole('button', { name: /^Math 10 Self-paced/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Math 12 Pre-calculus.*Self-paced/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('a learner outside Canada gives their country and year, and sees the course in their own terms', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Bola Learner');
  await page.getByLabel('Email').fill(`bola.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  await page.getByLabel('Country or curriculum').selectOption('uk');
  await expect(page.getByText('Which year are you in?')).toBeVisible();
  await page.getByRole('button', { name: 'Year 11', exact: true }).click();
  await page.getByRole('button', { name: /University: science/ }).click();
  await page.getByRole('button', { name: 'Okay, with some gaps' }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 10 Mathematics', exact: true })).toBeVisible();
  await expect(page.getByText('Usually taken in Year 11.')).toBeVisible();

  // In Nigeria the same level is SS 1.
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByLabel('Country or curriculum').selectOption('ng');
  await expect(page.getByText('Which class are you in?')).toBeVisible();
  await page.getByRole('button', { name: 'SS 1', exact: true }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByRole('heading', { name: 'Grade 10 Mathematics', exact: true })).toBeVisible();
  await expect(page.getByText('Usually taken in SS 1.')).toBeVisible();
  expect(errors).toEqual([]);
});

test('a learner browses by topic, sees levels in their own years, and opens a lesson from another course', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/signup');
  await page.getByLabel('Full name').fill('Tobi Learner');
  await page.getByLabel('Email').fill(`tobi.${Date.now() % 100000}@example.ca`);
  await page.getByLabel('Password').fill('secret12');
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.waitForURL(/\/s\/welcome$/);
  await page.getByLabel('Country or curriculum').selectOption('uk');
  await page.getByRole('button', { name: 'Year 11', exact: true }).click();
  await page.getByRole('button', { name: /University: science/ }).click();
  await page.getByRole('button', { name: 'Going well' }).click();
  await page.getByRole('button', { name: 'See my recommendation' }).click();
  await expect(page.getByText('Usually taken in Year 11.')).toBeVisible();

  // Browse by topic: the subjects' topics in strands, each with its level in the learner's years.
  await page.getByRole('link', { name: 'Browse by topic' }).first().click();
  await expect(page.getByRole('heading', { name: 'Browse by topic' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Algebra' })).toBeVisible();
  const quadratics = page.getByRole('button', { name: /Quadratic functions and equations/ });
  await expect(quadratics).toContainText('Year 12');
  await page.getByRole('tab', { name: 'English' }).click();
  await expect(page.getByRole('button', { name: /Poetry/ })).toContainText('Years 11–13');

  // A search finds lessons in every subject; a lesson in a course the learner is not taking opens it self-paced.
  await page.getByLabel('Search topics and lessons').fill('quadratic formula');
  await page.getByRole('button', { name: 'Completing the Square and the Quadratic Formula' }).click();
  await page.waitForURL(/\/s\/learn\/m201-4-3$/);
  await expect(page.getByRole('heading', { name: 'Completing the Square and the Quadratic Formula' }).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('a student asks to join a class with its code and the teacher approves', async ({ context }) => {
  const teacher = await context.newPage();
  const student = await context.newPage();
  const teacherErrors = trackErrors(teacher);
  const studentErrors = trackErrors(student);

  // A new class asks for approval by default.
  await signInDemo(teacher, 'Teacher');
  await teacher.goto('/t/new-class');
  await teacher.getByRole('button', { name: /Grade 9 Mathematics/ }).click();
  await expect(teacher.getByText(/Approve students who join with the class code/)).toBeVisible();
  await teacher.getByRole('button', { name: 'Create class' }).click();
  await teacher.waitForURL(/\/t\/c\/c_/);
  const code = ((await teacher.getByRole('button', { name: /Join code/ }).textContent()) ?? '').replace('Join code', '').trim();
  expect(code).toMatch(/^[A-Z0-9]{6}$/);

  // The student signs up with the code: a request goes to the teacher instead of joining.
  await student.goto(`/signup?code=${code}`);
  await student.getByLabel('Full name').fill('Ada Learner');
  await student.getByLabel('Email').fill(`ada.j${Date.now() % 100000}@example.ca`);
  await student.getByLabel('Password').fill('secret12');
  await student.getByRole('button', { name: 'Create account' }).click();
  await student.waitForURL(/\/s$/);
  await expect(student.getByText('Waiting for your teacher')).toBeVisible();
  await expect(student.getByText('Waiting for approval')).toBeVisible();

  // The teacher sees the request on the class overview and approves it on the Students page.
  await teacher.reload();
  await teacher.getByRole('link', { name: /waiting for you to approve/ }).click();
  await expect(teacher.getByText('1 student wants to join')).toBeVisible();
  await expect(teacher.getByRole('checkbox', { name: 'Select Ada Learner' })).toBeChecked();
  await teacher.getByRole('button', { name: 'Approve 1 student' }).click();
  await expect(teacher.getByText('Student let in')).toBeVisible();
  await expect(teacher.getByRole('link', { name: /Ada Learner/ })).toBeVisible();

  // The student is now in the class.
  await student.reload();
  await expect(student.getByText(/Grade 9 Mathematics/).first()).toBeVisible();
  await expect(student.getByText('Waiting for your teacher')).toHaveCount(0);
  await student.goto('/s/join');
  await expect(student.getByText('Approved')).toBeVisible();
  expect([...teacherErrors, ...studentErrors]).toEqual([]);
});

test('a student requests a course and the administrator plans it through a GitHub issue', async ({ context }) => {
  const student = await context.newPage();
  const admin = await context.newPage();
  const studentErrors = trackErrors(student);
  const adminErrors = trackErrors(admin);

  await student.goto('/signup');
  await student.getByLabel('Full name').fill('Ada Learner');
  await student.getByLabel('Email').fill(`ada.r${Date.now() % 100000}@example.ca`);
  await student.getByLabel('Password').fill('secret12');
  await student.getByRole('button', { name: 'Create account' }).click();
  await student.waitForURL(/\/s\/welcome$/);
  await student.getByRole('button', { name: 'Request a course' }).click();
  const dialog = student.getByRole('dialog', { name: 'Request a course or topic' });
  await dialog.getByLabel('Course name').fill('AP Calculus BC');
  await dialog.getByLabel('Grade (optional)').selectOption('12');
  await dialog.getByLabel(/What should it cover/).fill('Series and polar curves for the AP exam.');
  await dialog.getByRole('button', { name: 'Send request' }).click();
  await expect(student.getByLabel('Your course requests').getByText('AP Calculus BC')).toBeVisible();
  await expect(student.getByLabel('Your course requests').getByText('Received')).toBeVisible();

  // The administrator approves it: GitHub's new-issue form opens prefilled, without the student's name.
  await admin.addInitScript(() => {
    window.open = ((url: string) => {
      (window as unknown as { opened: string }).opened = url;
      return null;
    }) as typeof window.open;
  });
  await signInDemo(admin, 'Teacher');
  await admin.goto('/admin');
  await admin.getByRole('link', { name: /1 new course request/ }).click();
  await expect(admin.getByText('Ada Learner (student)', { exact: false })).toBeVisible();
  await admin.getByRole('button', { name: 'Approve and open a GitHub issue' }).click();
  const opened = await admin.evaluate(() => (window as unknown as { opened?: string }).opened ?? '');
  expect(opened).toContain('https://github.com/Shedrackeze002/Gradileo/issues/new?');
  const issue = new URL(opened).searchParams;
  expect(issue.get('title')).toBe('Course request: AP Calculus BC');
  expect(issue.get('body')).toContain('Series and polar curves for the AP exam.');
  expect(issue.get('body')).not.toContain('Ada');
  await admin.getByRole('tab', { name: 'Planned' }).click();
  await admin.getByLabel('GitHub issue link').fill('https://github.com/Shedrackeze002/Gradileo/issues/99');
  await admin.getByRole('button', { name: 'Save link' }).click();
  await expect(admin.getByText('Issue link saved')).toBeVisible();
  await admin.getByRole('button', { name: 'Mark as built' }).click();
  await expect(admin.getByText(/Marked as built/)).toBeVisible();

  // The student sees where the request stands.
  await student.reload();
  await expect(student.getByLabel('Your course requests').getByText('Ready')).toBeVisible();
  expect([...studentErrors, ...adminErrors]).toEqual([]);
});

test('a teacher suggests a lesson edit, an administrator approves it and every class sees it', async ({ context }) => {
  const teacher = await context.newPage();
  const student = await context.newPage();
  const teacherErrors = trackErrors(teacher);
  const studentErrors = trackErrors(student);
  const sentence = 'Tip from your teacher: a doorway is about 2 m tall.';

  await signInDemo(teacher, 'Teacher');
  await teacher.goto('/t/c/c_math10a/lessons/m10c-1-1');
  await teacher.getByRole('button', { name: 'Suggest edits' }).click();
  await teacher.getByRole('button', { name: 'Suggest an edit to Two systems of measurement' }).click();
  const editor = teacher.getByRole('dialog', { name: /Suggest an edit: Two systems of measurement/ });
  const md = editor.getByLabel('Section Markdown');
  await md.fill(`${await md.inputValue()}\n\n${sentence}`);
  await expect(editor.getByLabel('Preview of the suggested section').getByText(sentence)).toBeVisible();
  await editor.getByLabel(/Why this change/).fill('A familiar referent helps.');
  await editor.getByRole('button', { name: 'Send for review' }).click();
  await expect(teacher.getByLabel('Your suggested edits').getByText('Waiting for review')).toBeVisible();

  // The administrator compares, previews and approves it.
  await teacher.goto('/admin/edits');
  await expect(teacher.getByLabel('Changes').getByText(sentence)).toBeVisible();
  await teacher.getByRole('tab', { name: 'Preview' }).click();
  await expect(teacher.getByLabel('Preview').getByText(sentence)).toBeVisible();
  await teacher.getByRole('button', { name: 'Approve' }).click();
  await expect(teacher.getByText('Edit approved. Every class now sees it.')).toBeVisible();

  // Every class sees the edited lesson.
  await signInDemo(student, 'Student');
  await student.goto('/s/learn/m10c-1-1');
  await expect(student.getByText(sentence)).toBeVisible();

  // Reverting brings the original back.
  await teacher.getByRole('tab', { name: 'Live' }).click();
  teacher.once('dialog', (d) => d.accept());
  await teacher.getByRole('button', { name: 'Revert to the original' }).click();
  await expect(teacher.getByText('Edit reverted')).toBeVisible();
  await student.reload();
  await expect(student.getByRole('heading', { name: 'Two systems of measurement' })).toBeVisible();
  await expect(student.getByText(sentence)).toHaveCount(0);
  expect([...teacherErrors, ...studentErrors]).toEqual([]);
});

test('the privacy policy and terms of service are public, and linked from the landing and sign-up pages', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '5. Google user data' })).toBeVisible();
  await expect(page.getByText(/Limited Use requirements/)).toBeVisible();
  await expect(page).toHaveTitle('Privacy Policy · Gradileo');
  await page.getByRole('main').getByRole('link', { name: 'Terms of Service' }).click();
  await expect(page).toHaveURL(/\/terms$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Terms of Service' })).toBeVisible();

  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Privacy Policy' }).click();
  await expect(page).toHaveURL(/\/privacy$/);

  await page.goto('/signup');
  await expect(page.getByText('By creating an account, you agree to the')).toBeVisible();
  await page.getByRole('link', { name: 'Terms of Service' }).first().click();
  await expect(page).toHaveURL(/\/terms$/);
  expect(errors).toEqual([]);
});
