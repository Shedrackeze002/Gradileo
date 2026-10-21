// Usage: npx tsx --tsconfig tsconfig.json scripts/ai-draft-sample.ts
// Environment: MINIMAX_API_KEY (required), MINIMAX_MODEL, MINIMAX_BASE_URL, and the sample to draft:
// COURSE (e.g. math-8), LESSONS (space-separated lesson ids), COUNT, FORMATS (space-separated), TYPE,
// DIFFICULTY, NOTES.
//
// Drafts one assignment with "Draft with AI" (engine/ai/builder.ts) and prints it, with what the checks
// left out, so a change to the prompt can be tried against MiniMax before teachers see it. Run by the
// AI draft sample workflow (Actions → AI draft sample → Run workflow).
import { draftAssignment, draftContext, normalizeDraftRequest } from '../engine/ai/builder.ts';

const env = (k: string, d = '') => process.env[k]?.trim() || d;
const apiKey = env('MINIMAX_API_KEY');
if (!apiKey) throw new Error('MINIMAX_API_KEY is not set.');
const courseId = env('COURSE', 'math-8');
const req = normalizeDraftRequest(
  {
    type: env('TYPE', 'homework'),
    lessonIds: env('LESSONS', 'm8-1-3 m8-1-4').split(/\s+/),
    count: Number(env('COUNT', '10')),
    difficulty: env('DIFFICULTY', 'mixed'),
    formats: env('FORMATS', 'generated choice short written').split(/\s+/),
    focusWeak: false,
    notes: env('NOTES'),
  },
  courseId,
);
const started = Date.now();
const res = await draftAssignment(req, draftContext(courseId, req.lessonIds), { apiKey, model: env('MINIMAX_MODEL') || undefined, baseUrl: env('MINIMAX_BASE_URL') || undefined });
console.log(`source: ${res.source} (${res.model ?? 'no model'}), ${((Date.now() - started) / 1000).toFixed(0)} s`);
if (res.error) console.log(`fell back to the offline draft: ${res.error.slice(0, 300)}`);
const d = res.draft;
console.log(`\n# ${d.title}\n${d.instructions}\nrationale: ${d.rationale}\n`);
for (const s of d.sections) console.log(`generated: ${s.skillId} × ${s.count} (difficulty ${s.difficulty})`);
d.custom.forEach((q, i) => {
  console.log(`\nQ${i + 1} [${q.kind}${q.skillId ? `, ${q.skillId}` : ''}${q.points && q.points > 1 ? `, ${q.points} points` : ''}] ${q.prompt}`);
  q.choices?.forEach((c, k) => console.log(`   ${c.id === q.correct ? '*' : ' '}${'ABCDEF'[k]}) ${c.md}`));
  if (q.kind === 'numeric') console.log(`   answer: ${q.value} (± ${q.tolerance})`);
  if (q.kind === 'text') console.log(`   accepted: ${q.accepted?.join(' | ')}`);
  if (q.solution) console.log(`   solution: ${q.solution}`);
});
for (const x of res.dropped ?? []) console.log(`left out: ${x}`);
if (res.source !== 'minimax') process.exitCode = 1;
