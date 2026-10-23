// Usage: npx tsx video/tools/screens.ts [shot…]
//
// Takes the pictures of Gradileo that a video shows with a `screen` element (the introduction
// video), from the demo: it serves the app, signs in as the demo teacher or student, opens each
// page and saves <shot>.png in video/out/screens/, with <shot>.json giving the picture's size and
// where each named spot (a button, a panel) is on it, so a script can point at it by name and the
// spot follows the page when the design changes. Run it before building a video that has screens.
// MiniMax is stood in for, so the AI features show without a key. Name shots to take only those.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium, type Locator, type Page } from '@playwright/test';
import { createServer } from 'vite';

const ROOT = path.resolve(import.meta.dirname, '../..');
const OUT = path.join(ROOT, 'video/out/screens');
const DB = 'educore-demo-db-v1';
const CLASS = 'c_math10a';
/** The browser window the pictures are taken in; at 2× they stay sharp when a video zooms in. */
const VIEW = { width: 1280, height: 800 };
const SCALE = 2;

type Spots = Record<string, (p: Page) => Locator>;
interface Shot {
  /** Opens the page and gets it ready for its picture. */
  open: (p: Page, base: string) => Promise<void>;
  spots?: Spots;
  /** A taller window, for a page whose parts should all be in one picture. */
  height?: number;
}

const signIn = async (p: Page, base: string, who: 'Teacher' | 'Student') => {
  await p.goto(`${base}login`);
  await p.getByRole('button', { name: `${who} demo` }).click();
  await p.waitForURL(who === 'Teacher' ? /\/t\/c\// : /\/s$/);
};

const signOut = async (p: Page) => {
  await p.getByRole('button', { name: 'Account menu' }).click();
  await p.getByRole('button', { name: 'Sign out' }).click();
  await p.waitForURL(/\/login/);
};

/** The card (a `.card` panel) around some text. */
const card = (p: Page, text: string | RegExp) =>
  p.getByText(text, { exact: typeof text === 'string' }).first().locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " card ")][1]');

/** A stand-in MiniMax that answers with `content`, and the demo's own key so the app calls it. */
async function minimax(p: Page, content: unknown) {
  await p.evaluate((key) => {
    const db = JSON.parse(localStorage.getItem(key)!);
    db.aiKey = 'video-key';
    localStorage.setItem(key, JSON.stringify(db));
  }, DB);
  await p.unrouteAll();
  await p.route('https://api.minimax.io/**', (route) =>
    route.fulfill({ json: { model: 'MiniMax-M3.1-Flash', choices: [{ message: { content: JSON.stringify(content) } }] } }),
  );
}

/**
 * Draws strokes on a canvas; each stroke is a list of points as fractions of its width and of the
 * part of it in the window (a tall canvas runs below the window, where the mouse cannot draw).
 */
async function draw(p: Page, canvas: Locator, strokes: Array<Array<[number, number]>>) {
  await canvas.scrollIntoViewIfNeeded();
  const box = (await canvas.boundingBox())!;
  // Clear of a bar fixed along the bottom of the window.
  const height = Math.min(box.height, p.viewportSize()!.height - box.y - 110);
  for (const stroke of strokes) {
    const at = ([x, y]: [number, number]) => [box.x + box.width * x, box.y + height * y] as const;
    await p.mouse.move(...at(stroke[0]));
    await p.mouse.down();
    for (const pt of stroke.slice(1)) await p.mouse.move(...at(pt), { steps: 12 });
    await p.mouse.up();
  }
}

/** A right triangle leaning like a ladder on a wall, with a height marked: the student's sketch. */
const LADDER: Array<Array<[number, number]>> = [
  [
    [0.12, 0.8],
    [0.42, 0.8],
    [0.42, 0.2],
    [0.12, 0.8],
  ],
  [
    [0.4, 0.76],
    [0.38, 0.76],
    [0.38, 0.8],
  ],
  [
    [0.2, 0.8],
    [0.19, 0.74],
    [0.17, 0.7],
  ],
];

/** What the stand-in MiniMax drafts: homework on referents, with questions it wrote. */
const DRAFT = {
  title: 'Homework: Measuring with Referents',
  instructions: 'Show your working.',
  rationale: 'Most of the class is still building this skill, so generated practice comes first, then a word problem and an explanation.',
  sections: [
    { skillId: 'm1-referents', count: 3, difficulty: 'mixed' },
    { skillId: 'm1-estimate', count: 2, difficulty: 2 },
  ],
  questions: [
    { format: 'short', skillId: 'm1-estimate', prompt: 'A pace is about $0.8$ m. About how far is $25$ paces, in metres?', value: 20, check: '25 * 0.8', solution: '$25 \\times 0.8 = 20$ m.' },
    { format: 'written', skillId: 'm1-referents', prompt: 'Explain which referent you would use to estimate the height of a door, and why.', points: 3, solution: 'Any sensible referent, such as your own height (1 point), with a reason (2 points).' },
  ],
};

/** A report card the stand-in MiniMax drafts, written with {name} and grounded in the demo's data. */
const REPORT = {
  summary: '{name} has made steady progress this term and is secure in nine of the skills taught so far. {name} hands in every piece of work on time, and the average score on graded work is 76%.',
  strengths: ['Converting between SI and imperial units, with most answers correct.', 'Rewriting entire radicals as mixed radicals.', 'Hands in every piece of work on time.'],
  nextSteps: ['Practise the surface area of right prisms, drawing the net first.', 'Review the volume of pyramids and cones before the unit test.'],
  studentTips: ['Spend ten minutes a day on surface area questions.', 'Read the worked solution whenever an answer is wrong, then try a similar question.'],
  parentTips: ['Ask {name} to explain one thing they learned this week, in their own words.', 'Measure a box at home together and work out how much paper would wrap it.'],
  feedback: '{name}, your steady effort this term is paying off. Keep practising a little every day, and you will be ready for the next unit.',
};

/** Forum posts for the demo class: a question asked without a name, answered and pinned, and others. */
async function seedForum(p: Page) {
  // Built here, not in the page: tsx adds helpers to named functions that the page does not have.
  const db = JSON.parse((await p.evaluate((key) => localStorage.getItem(key), DB))!) as {
    classes: Array<{ id: string; teacherId: string }>;
    users: Array<{ id: string; fullName: string }>;
    forumPosts?: unknown[];
  };
  const teacher = db.classes.find((c) => c.id === CLASS)!.teacherId;
  const student = (name: string) => db.users.find((u) => u.fullName === name)!.id;
  const at = (minutesAgo: number) => new Date(Date.now() - minutesAgo * 60_000).toISOString();
  const post = (id: string, authorId: string, topicId: string | null, title: string | null, body: string, visibility: string, minutesAgo: number, flags = {}) => ({
    id, classId: CLASS, authorId, topicId, title, body, visibility, pinned: false, answered: false, hidden: false, createdAt: at(minutesAgo), ...flags,
  });
  db.forumPosts = [
    post('fp_v1', teacher, null, 'Unit 2 test on Friday: what to review', 'The test covers lessons 2.1 to 2.4. Practise finding sides and angles with sine, cosine and tangent.', 'class', 2900, { pinned: true }),
    post('fp_v2', student('Hannah Kim'), null, 'How do I know which ratio to use?', 'In a right triangle, how do I decide between sine, cosine and tangent?', 'class', 1500),
    post('fp_v3', student('Liam Chen'), 'fp_v2', null, 'Label the sides from the angle first: opposite, adjacent, hypotenuse. Then pick the ratio that uses the two sides you have.', 'class', 1440),
    post('fp_v4', teacher, 'fp_v2', null, 'Exactly right, Liam. SOH CAH TOA helps you remember which two sides each ratio uses.', 'class', 1400),
    post('fp_v5', student('Daniel Mensah'), null, 'Why does dividing by a negative flip the sign?', 'When I divide both sides of $-2x > 6$ by $-2$, why does $>$ become $<$?', 'anonymous', 300, { answered: true }),
    post('fp_v6', teacher, 'fp_v5', null, 'Multiplying or dividing by a negative reverses the order of numbers: $2 < 3$, but $-2 > -3$.', 'anonymous', 240),
    post('fp_v7', student('Maya Patel'), null, 'I missed Tuesday’s class', 'Which practice should I do to catch up?', 'teacher', 60),
  ];
  await p.evaluate(([key, value]) => localStorage.setItem(key, value), [DB, JSON.stringify(db)] as const);
}

/** The AI drafts homework on referents in the builder, with the stand-in MiniMax. */
async function draftWithAi(p: Page, base: string) {
  await signIn(p, base, 'Teacher');
  await minimax(p, DRAFT);
  await p.goto(`${base}t/c/${CLASS}/assignments/new?type=homework`);
  await p.getByRole('button', { name: 'Draft with AI' }).click();
  const dialog = p.getByRole('dialog');
  await dialog.getByLabel('Unit').selectOption({ index: 0 });
  await dialog.getByLabel(/^1\.1 /).check();
  await dialog.getByLabel('Number of questions').fill('7');
  await dialog.getByText('Written response', { exact: true }).click();
  await dialog.getByRole('button', { name: 'Draft with AI' }).click();
  await dialog.waitFor({ state: 'hidden' });
  await p.getByText('Suggested by the AI assistant').waitFor();
}

/** A written homework question the student answers on the canvas: made by the teacher, then answered. */
async function canvasAnswer(p: Page, base: string): Promise<string> {
  await signIn(p, base, 'Teacher');
  await p.goto(`${base}t/c/${CLASS}/assignments/new?type=homework`);
  await p.getByLabel('Title').fill('Trigonometry in context');
  await p.getByRole('button', { name: 'Written', exact: true }).click();
  await p.getByPlaceholder(/Explain why/).fill('A $5$ m ladder leans against a wall at $70°$ to the ground. How high up the wall does it reach? Sketch it and show your working.');
  await p.getByRole('button', { name: 'Publish & notify students' }).click();
  await p.waitForURL(/\/assignments\/a_/);
  const assignmentId = p.url().split('/assignments/')[1];
  await signOut(p);
  await signIn(p, base, 'Student');
  await p.goto(`${base}s/work/${assignmentId}`);
  await p.getByRole('button', { name: /^Start/ }).click();
  await p.waitForURL(/\/take$/);
  return assignmentId;
}

const SHOTS: Record<string, Shot> = {
  // ---------------------------------------------------------------- students
  'student-home': {
    open: async (p, base) => {
      await signIn(p, base, 'Student');
      await p.getByRole('heading', { name: /Amara/ }).waitFor();
    },
    spots: {
      due: (p) => p.getByText('Radicals Classwork', { exact: true }).first().locator('xpath=ancestor::*[contains(@class,"rounded")][1]'),
      mastery: (p) => card(p, 'Course mastery'),
      coach: (p) => card(p, 'Your study coach'),
      todo: (p) => card(p, 'To do'),
    },
  },
  'student-lesson': {
    open: async (p, base) => {
      await signIn(p, base, 'Student');
      await p.goto(`${base}s/learn/m10c-2-1`);
      await p.getByRole('heading', { name: 'The Tangent Ratio' }).first().waitFor();
    },
    spots: {
      tutor: (p) => p.getByRole('link', { name: 'Start with your AI tutor' }),
      practise: (p) => p.getByRole('link', { name: 'Practise this lesson' }),
      goals: (p) => card(p, 'By the end of this lesson you can'),
      contents: (p) => p.getByText('In this lesson', { exact: true }).locator('xpath=..'),
    },
  },
  'student-tutor': {
    open: async (p, base) => {
      await signIn(p, base, 'Student');
      await p.goto(`${base}s/learn/m10c-2-1/tutor`);
      const aloud = p.getByLabel('Read the lesson aloud');
      if (await aloud.count()) await aloud.uncheck();
      await p.getByRole('button', { name: 'Start the lesson' }).click();
      await p.getByRole('button', { name: 'Pause' }).click();
      for (let i = 0; i < 4; i++) await p.getByRole('button', { name: 'Next' }).click();
    },
    spots: {
      caption: (p) => p.locator('footer p[aria-live="polite"]'),
      ask: (p) => p.getByRole('button', { name: /Ask your tutor/ }),
    },
  },
  'student-practice': {
    open: async (p, base) => {
      await signIn(p, base, 'Student');
      await p.goto(`${base}s/practice?skills=m1-referents`);
      // Answer until one is right, so the picture shows a correct answer.
      for (let i = 0; i < 12; i++) {
        await p.getByRole('radio').first().click();
        await p.getByRole('button', { name: 'Check answer' }).click();
        await p.getByText(/^(Correct!|Not quite)/).first().waitFor();
        if (await p.getByText('Correct!').count()) break;
        await p.getByRole('button', { name: /Next question/ }).click();
      }
    },
    spots: {
      question: (p) => p.locator('.card').first(),
      feedback: (p) => p.getByText(/^(Correct!|Not quite|Incorrect)/).first().locator('xpath=..'),
      solution: (p) => p.getByRole('button', { name: /worked solution/ }),
      streak: (p) => p.getByRole('button', { name: 'Finish' }).locator('xpath=..'),
    },
  },
  'student-progress': {
    open: async (p, base) => {
      await signIn(p, base, 'Student');
      await p.goto(`${base}s/progress`);
      await p.getByRole('heading', { name: 'My progress' }).waitFor();
    },
    spots: {
      ring: (p) => p.locator('.card').first(),
      weekly: (p) => card(p, 'Weekly accuracy'),
      units: (p) => card(p, 'Measurement'),
    },
  },
  'student-canvas': {
    open: async (p, base) => {
      await canvasAnswer(p, base);
      const canvas = p.getByRole('img', { name: 'Answer canvas, page 1' });
      await draw(p, canvas, LADDER);
      await p.getByRole('tab', { name: 'Type' }).click();
      await p.getByLabel('Typed answer').fill('sin 70° = h / 5, so h = 5 sin 70° ≈ 4.7 m up the wall.');
      await p.getByRole('tab', { name: 'Solve on the canvas' }).click();
    },
    spots: {
      canvas: (p) => p.getByRole('img', { name: 'Answer canvas, page 1' }),
    },
  },
  'student-forum': {
    open: async (p, base) => {
      await signIn(p, base, 'Student');
      await seedForum(p);
      await p.goto(`${base}s/forum`);
      await p.getByRole('heading', { name: 'Class forum' }).waitFor();
      await p.getByRole('button', { name: 'Ask a question' }).click();
      await p.getByLabel('Your question').fill('How do I find an angle from two sides?');
      await p.getByRole('radio', { name: /My class, without my name/ }).check();
    },
    spots: {
      who: (p) => p.getByRole('radio', { name: /Only my teacher/ }).locator('xpath=ancestor::fieldset[1]'),
      anonymous: (p) => p.getByText('Why does dividing by a negative flip the sign?').locator('xpath=ancestor::a[1]'),
    },
  },

  // ---------------------------------------------------------------- teachers
  'teacher-class': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}t/c/${CLASS}`);
      await p.getByRole('heading', { name: /Math 10/ }).first().waitFor();
    },
    spots: {
      stats: (p) => p.getByText('Mastery of taught skills').locator('xpath=ancestor::*[contains(@class,"grid")][1]'),
      next: (p) => card(p, /Teach next/i),
      assistant: (p) => card(p, 'AI teaching assistant'),
      join: (p) => p.getByText(/Join code/).first(),
    },
  },
  'teacher-students': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}t/c/${CLASS}/students`);
      await p.getByRole('button', { name: 'Add students' }).first().click();
      await p.getByLabel('Student names').fill('Noor Haddad\nTomás Silva\nGrace Mwangi\nOliver Brown');
    },
    spots: {
      names: (p) => p.getByLabel('Student names'),
      link: (p) => p.getByText('Share class link'),
    },
  },
  present: {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}present/${CLASS}/m10c-2-1`);
      await p.locator('[aria-roledescription="slide"]').waitFor();
      for (let i = 0; i < 4; i++) await p.keyboard.press('ArrowRight');
    },
    spots: {
      slide: (p) => p.locator('[aria-roledescription="slide"]'),
      tools: (p) => p.getByRole('button', { name: 'Exit presentation' }).locator('xpath=..'),
      next: (p) => p.getByRole('button', { name: 'Next' }),
    },
  },
  whiteboard: {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}present/${CLASS}/m10c-2-1`);
      await p.locator('[aria-roledescription="slide"]').waitFor();
      await p.keyboard.press('w');
      const board = p.getByRole('dialog', { name: 'Whiteboard' });
      await board.waitFor();
      await draw(p, board.getByRole('img', { name: /Whiteboard, page 1/ }), [
        [
          [0.2, 0.75],
          [0.55, 0.75],
          [0.55, 0.3],
          [0.2, 0.75],
        ],
        [
          [0.52, 0.75],
          [0.52, 0.71],
          [0.55, 0.71],
        ],
      ]);
    },
    spots: {
      board: (p) => p.getByRole('img', { name: /Whiteboard, page 1/ }),
      save: (p) => p.getByRole('button', { name: 'Save to lesson' }),
    },
  },
  'live-results': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}present/${CLASS}/m10c-2-1`);
      await p.locator('[aria-roledescription="slide"]').waitFor();
      await p.keyboard.press('o');
      await p.getByRole('dialog', { name: 'All slides' }).getByRole('button', { name: /Your turn/ }).first().click();
      await p.getByRole('button', { name: 'Ask the class on their devices' }).click();
      await p.getByRole('button', { name: /Add the sample class/ }).click();
      await p.getByRole('button', { name: 'Stop and show results' }).click();
      await p.getByLabel('Answers by choice').waitFor();
    },
    spots: {
      chart: (p) => p.getByLabel('Answers by choice'),
    },
  },
  'builder-draft': {
    open: draftWithAi,
    spots: {
      suggested: (p) => p.getByText('Suggested by the AI assistant').locator('xpath=ancestor::*[contains(@class,"rounded")][1]'),
      summary: (p) => p.getByRole('button', { name: 'Publish & notify students' }).locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " card ")][1]'),
    },
  },
  'builder-questions': {
    open: async (p, base) => {
      await draftWithAi(p, base);
      const check = p.getByText('Written by AI: check the answer').first();
      await check.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    },
    spots: {
      question: (p) => p.getByText('Written by AI: check the answer').first().locator('xpath=ancestor::div[.//textarea][1]'),
      check: (p) => p.getByText('Written by AI: check the answer').first(),
      regenerate: (p) => p.getByRole('button', { name: 'Regenerate' }).first(),
    },
  },
  'builder-dialog': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}t/c/${CLASS}/assignments/new?type=homework`);
      await p.getByRole('button', { name: 'Draft with AI' }).click();
      const dialog = p.getByRole('dialog');
      await dialog.getByLabel('Unit').selectOption({ index: 1 });
      await dialog.getByLabel(/^2\.1 /).check();
      await dialog.getByLabel(/^2\.2 /).check();
      await dialog.getByLabel('Number of questions').fill('8');
      await dialog.getByText('Written response', { exact: true }).click();
    },
    spots: {
      dialog: (p) => p.getByRole('dialog'),
      go: (p) => p.getByRole('dialog').getByRole('button', { name: 'Draft with AI' }),
    },
  },
  'builder-settings': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}t/c/${CLASS}/assignments/new?type=quiz&lesson=m10c-2-1`);
      await p.getByLabel('Time limit').selectOption('0');
      await p.getByRole('button', { name: 'Suggest settings' }).click();
      const advice = p.getByLabel('Suggested settings');
      await advice.waitFor();
      await advice.scrollIntoViewIfNeeded();
    },
    spots: {
      advice: (p) => p.getByLabel('Suggested settings'),
    },
  },
  'builder-exam': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}t/c/${CLASS}/assignments/new?type=exam&lesson=m10c-2-1`);
      const exam = p.getByText('Exam mode', { exact: true }).first();
      await exam.click();
      await exam.scrollIntoViewIfNeeded();
      await p.mouse.wheel(0, 200);
    },
    spots: {
      exam: (p) => p.getByText('Exam mode', { exact: true }).first().locator('xpath=ancestor::*[contains(@class,"rounded")][1]'),
    },
  },
  'teacher-mark': {
    height: 1150,
    open: async (p, base) => {
      const assignmentId = await canvasAnswer(p, base);
      await draw(p, p.getByRole('img', { name: 'Answer canvas, page 1' }), LADDER);
      await p.getByRole('tab', { name: 'Type' }).click();
      await p.getByLabel('Typed answer').fill('sin 70° = h / 5, so h = 5 sin 70° ≈ 4.7 m up the wall.');
      await p.getByRole('button', { name: 'Finish' }).click();
      await p.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();
      await p.waitForURL(/\/s\/work\/a_[^/]+$/);
      const subId = await p.evaluate(
        ([key, id]) => (JSON.parse(localStorage.getItem(key)!).submissions as Array<{ id: string; assignmentId: string }>).find((s) => s.assignmentId === id)!.id,
        [DB, assignmentId] as const,
      );
      await signOut(p);
      await signIn(p, base, 'Teacher');
      await minimax(p, {
        points: 3,
        reasons: 'The sketch shows the right triangle with the $70°$ angle, sine is used with the $5$ m hypotenuse, and $4.7$ m is correct.',
        comment: 'Clear sketch and method. Next time, label the height h on your sketch too.',
        confidence: 'high',
        readCanvas: true,
      });
      await p.goto(`${base}t/c/${CLASS}/submissions/${subId}`);
      await p.getByRole('button', { name: 'Suggest a mark' }).click();
      await p.getByLabel('Suggested mark').getByText(/Clear sketch/).waitFor();
      await p.evaluate(() => window.scrollTo(0, 0));
    },
    spots: {
      working: (p) => p.getByRole('img', { name: /canvas|working/i }).first(),
      suggestion: (p) => p.getByLabel('Suggested mark'),
    },
  },
  'teacher-gradebook': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}t/c/${CLASS}/gradebook`);
      await p.getByRole('heading', { name: 'Gradebook' }).first().waitFor();
    },
    spots: {
      table: (p) => p.getByRole('table').first(),
      export: (p) => p.getByRole('button', { name: /Export CSV/ }),
    },
  },
  'teacher-mastery': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}t/c/${CLASS}/mastery`);
      await p.getByRole('heading', { name: 'Mastery map' }).first().waitFor();
    },
    spots: {
      grid: (p) => card(p, /Hover a square to see/),
      hardest: (p) => card(p, 'Hardest skills right now'),
    },
  },
  'teacher-insights': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await p.goto(`${base}t/c/${CLASS}/insights`);
      await p.getByRole('button', { name: 'Analyse class' }).first().click();
      await p.getByText('Recommended next steps').waitFor();
      await p.getByText('Class report', { exact: true }).first().scrollIntoViewIfNeeded();
    },
    spots: {
      report: (p) => card(p, 'Class report'),
      gaps: (p) => p.getByText('Gaps to address').locator('xpath=..'),
      misconceptions: (p) => p.getByText('Likely misconceptions').locator('xpath=..'),
    },
  },
  'teacher-report': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await minimax(p, REPORT);
      await p.goto(`${base}t/c/${CLASS}/reports`);
      await p.getByLabel('Period').fill('Term 1');
      await p.getByRole('button', { name: /^Write .*report card$/ }).first().click();
      await p.waitForURL(/\/reports\/rc_/);
      await p.getByRole('article').first().waitFor();
    },
    spots: {
      editor: (p) => p.getByText('How they are doing', { exact: true }).locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " card ")][1]'),
      card: (p) => p.getByRole('article').first(),
      pdf: (p) => p.getByRole('button', { name: 'Print or save as PDF' }),
    },
  },
  'teacher-forum': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await seedForum(p);
      await p.goto(`${base}t/c/${CLASS}/forum`);
      await p.getByRole('heading', { name: 'Class forum' }).waitFor();
      await p.getByText('Why does dividing by a negative flip the sign?').waitFor();
    },
    spots: {
      anonymous: (p) => p.getByText('Why does dividing by a negative flip the sign?').locator('xpath=ancestor::a[1]'),
      private: (p) => p.getByText('I missed Tuesday’s class').locator('xpath=ancestor::a[1]'),
      pinned: (p) => p.getByText('Unit 2 test on Friday: what to review').locator('xpath=ancestor::a[1]'),
    },
  },

  // ---------------------------------------------------------------- parents
  'parent-report': {
    open: async (p, base) => {
      await signIn(p, base, 'Teacher');
      await minimax(p, REPORT);
      await p.goto(`${base}t/c/${CLASS}/reports`);
      await p.getByLabel('Period').fill('Term 1');
      await p.getByRole('button', { name: /^Write .*report card$/ }).first().click();
      await p.waitForURL(/\/reports\/rc_/);
      await p.getByRole('button', { name: /Share with the student/ }).click();
      await p.getByText('Shared with the student', { exact: true }).first().waitFor();
      await p.getByRole('button', { name: 'Make a private link' }).click();
      const link = await p.getByLabel('Private link').inputValue();
      await signOut(p);
      await p.goto(`${base}${new URL(link).pathname.slice(1)}`);
      await p.getByRole('article').first().waitFor();
    },
    spots: {
      card: (p) => p.getByRole('article').first(),
      stats: (p) => p.getByText('Course progress').locator('xpath=ancestor::*[contains(@class,"grid")][1]'),
      parents: (p) => p.getByText(/^For parents and carers$/i).locator('xpath=..'),
      pdf: (p) => p.getByRole('button', { name: 'Print or save as PDF' }),
    },
  },
  landing: {
    open: async (p, base) => {
      await p.goto(base);
      await p.getByRole('heading', { level: 1 }).first().waitFor();
    },
    spots: {
      demo: (p) => p.getByRole('button', { name: 'Try the teacher demo' }).locator('xpath=..'),
    },
  },
};

/** Hides what only the demo shows ("Demo mode", the offline analyst's label). */
async function tidy(p: Page) {
  await p.evaluate(() => {
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      const own = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent ?? '')
        .join('')
        .trim();
      if (own === 'Demo mode' || own === 'Offline analyst') el.style.visibility = 'hidden';
    }
  });
}

async function main() {
  const only = process.argv.slice(2);
  const names = only.length ? only : Object.keys(SHOTS);
  for (const n of names) if (!SHOTS[n]) throw new Error(`No shot "${n}". Shots: ${Object.keys(SHOTS).join(', ')}`);
  mkdirSync(OUT, { recursive: true });
  const server = await createServer({ root: ROOT, configFile: path.join(ROOT, 'vite.config.ts'), logLevel: 'error', server: { port: 5198, strictPort: false, hmr: false, watch: null } });
  await server.listen();
  const base = server.resolvedUrls?.local[0] ?? 'http://localhost:5198/';
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  let failed = 0;
  try {
    for (const name of names) {
      // A fresh browser for each picture, so each starts from the demo's own data.
      const viewport = { ...VIEW, height: SHOTS[name].height ?? VIEW.height };
      const context = await browser.newContext({ viewport, deviceScaleFactor: SCALE, colorScheme: 'light', reducedMotion: 'reduce' });
      const page = await context.newPage();
      try {
        await SHOTS[name].open(page, base);
        await page.waitForLoadState('networkidle');
        await page.evaluate(() => document.fonts.ready);
        await page.mouse.move(viewport.width - 1, viewport.height - 1);
        // Slides and panels finish moving in.
        await page.waitForTimeout(1500);
        await tidy(page);
        const spots: Record<string, [number, number, number, number]> = {};
        for (const [id, find] of Object.entries(SHOTS[name].spots ?? {})) {
          const box = await find(page).first().boundingBox();
          if (!box) throw new Error(`spot "${id}" is not on the page`);
          spots[id] = [box.x, box.y, box.width, box.height].map((v) => Math.round(v)) as [number, number, number, number];
        }
        await page.screenshot({ path: path.join(OUT, `${name}.png`) });
        writeFileSync(path.join(OUT, `${name}.json`), `${JSON.stringify({ width: viewport.width, height: viewport.height, spots }, null, 2)}\n`);
        console.log(`${name}: done`);
      } catch (e) {
        failed++;
        await page.screenshot({ path: path.join(OUT, `${name}.failed.png`) }).catch(() => {});
        console.error(`${name}: ${e instanceof Error ? e.message.split('\n')[0] : e}`);
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }
  if (failed) process.exitCode = 1;
}

void main();
