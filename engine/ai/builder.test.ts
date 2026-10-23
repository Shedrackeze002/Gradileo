import { afterEach, describe, expect, it, vi } from 'vitest';
import { checkValue, draftAssignment, draftContext, draftPrompt, normalizeDraftRequest, normalizeRegenerateRequest, offlineDraft, parseDraft, parseRegenerated, regenerateQuestion, regeneratePrompt, repairLatex, writtenFormatOf, type DraftRequest, type RegenerateRequest } from './builder.ts';

const request = (patch: Partial<DraftRequest> = {}): DraftRequest => ({
  type: 'homework',
  lessonIds: ['m8-1-3'],
  count: 8,
  difficulty: 'mixed',
  formats: ['generated', 'choice', 'short', 'written'],
  focusWeak: false,
  notes: '',
  ...patch,
});
const ctx = draftContext('math-8', ['m8-1-3'], new Map([['m8-pythagoras-leg', 0.3]]));
let n = 0;
const ids = (prefix: string) => `${prefix}${++n}`;

describe('a teacher’s request', () => {
  it('keeps only the course’s lessons and the formats it knows, within limits', () => {
    const r = normalizeDraftRequest({ type: 'quiz', lessonIds: ['m8-1-3', 'm10c-1-1', 'nope', 'm8-1-3'], count: 500, difficulty: 'odd', formats: ['choice', 'essay'], focusWeak: true, notes: 'x'.repeat(900) }, 'math-8');
    expect(r).toMatchObject({ type: 'quiz', lessonIds: ['m8-1-3'], count: 40, difficulty: 'mixed', formats: ['choice'], focusWeak: true });
    expect(r.notes).toHaveLength(600);
    expect(() => normalizeDraftRequest({ lessonIds: ['m10c-1-1'], formats: ['choice'] }, 'math-8')).toThrow(/lesson/);
    expect(() => normalizeDraftRequest({ lessonIds: ['m8-1-3'], formats: [] }, 'math-8')).toThrow(/kind of question/);
  });

  it('describes the lessons’ skills with the class’s mastery, and no student names', () => {
    expect(ctx.lessons[0].skills.map((s) => [s.id, s.mastery])).toEqual([['m8-pythagoras-hypotenuse', null], ['m8-pythagoras-leg', 0.3]]);
    const p = draftPrompt(request({ focusWeak: true }), ctx);
    expect(p.system).toMatch(/Exactly 8 questions in all/);
    expect(p.system).toMatch(/low class mastery/);
    expect(p.user).toContain('"id":"m8-pythagoras-leg"');
    expect(p.user).toContain('"mastery":0.3');
  });

  it('names the course’s subject', () => {
    expect(ctx.subject).toBe('Mathematics');
    expect(draftPrompt(request(), ctx).system).toMatch(/^You help a mathematics teacher/);
    expect(draftPrompt(request(), { ...ctx, subject: 'Chemistry' }).system).toMatch(/^You help a chemistry teacher/);
    const one: RegenerateRequest = { type: 'homework', format: 'short', skillId: 'm8-pythagoras-leg', lessonIds: ['m8-1-3'], current: 'A 10 m ladder…', notes: '' };
    expect(regeneratePrompt(one, { ...ctx, subject: 'Chemistry' }).system).toMatch(/^You help a chemistry teacher/);
  });
});

describe('the draft without the AI', () => {
  it('spreads the questions over the skills, the weakest first when asked', () => {
    const d = offlineDraft(request({ count: 5, focusWeak: true }), ctx);
    expect(d.sections).toEqual([
      { skillId: 'm8-pythagoras-leg', count: 3, difficulty: 'mixed' },
      { skillId: 'm8-pythagoras-hypotenuse', count: 2, difficulty: 'mixed' },
    ]);
    expect(d.title).toMatch(/^Homework: 1\.3 /);
    expect(offlineDraft(request({ count: 3, difficulty: 'harder' }), ctx).sections.every((s) => s.difficulty === 3)).toBe(true);
  });
});

describe('the AI’s draft', () => {
  const raw = {
    title: 'Homework: Right Triangles',
    instructions: 'Show your working.',
    rationale: 'Mostly generated practice, plus a word problem.',
    sections: [
      { skillId: 'm8-pythagoras-hypotenuse', count: 3, difficulty: 2 },
      { skillId: 'm8-pythagoras-leg', count: 2, difficulty: 'mixed' },
      { skillId: 'not-a-skill', count: 4, difficulty: 1 },
    ],
    questions: [
      { format: 'choice', skillId: 'm8-pythagoras-hypotenuse', prompt: 'Which side is the hypotenuse?', choices: ['$AB$', '$BC$', '$AC$', 'None'], correct: 2, solution: 'It is opposite the right angle. Therefore, choice $2$ is correct.' },
      { format: 'short', skillId: 'm8-pythagoras-leg', prompt: 'A ladder…', value: 8, check: 'sqrt(100-36)', solution: '…' },
      { format: 'short', prompt: 'Legs 6 and 8: the hypotenuse?', value: 10, check: '(6^2 + 8^2)^(1/2)', solution: '$\frac{1}{2}$' },
      { format: 'short', prompt: 'Wrong one', value: 12, check: '(6^2 + 8^2)^(1/2)' },
      { format: 'short', prompt: 'Name the longest side', accepted: ['hypotenuse', 'the hypotenuse'] },
      { format: 'written', prompt: 'Explain why 5, 12, 13 is a right triangle.', points: 3, solution: '25 + 144 = 169. 1 point for each square, 1 for the conclusion.' },
      { format: 'essay', prompt: 'Not asked for' },
    ],
  };

  it('keeps what checks out and says what it left out', () => {
    const { draft, dropped } = parseDraft(raw, request({ count: 9 }), ctx, ids);
    expect(draft.sections.map((s) => s.skillId)).toEqual(['m8-pythagoras-hypotenuse', 'm8-pythagoras-leg']);
    expect(draft.custom.map((q) => q.kind)).toEqual(['mc', 'numeric', 'text', 'manual']);
    const mc = draft.custom[0];
    expect(mc.correct).toBe(mc.choices![2].id);
    // "Choice 2" (an index from 0) would only confuse a student reading the solution.
    expect(mc.solution).toBe('It is opposite the right angle.');
    expect(draft.custom.every((q) => q.aiWritten)).toBe(true);
    expect(draft.custom[3].points).toBe(3);
    // "sqrt(…)" is not plain arithmetic, the 12 does not match its working, and the essay was not asked for.
    expect(dropped.join(' | ')).toMatch(/Question 2: no arithmetic check[\s\S]*Question 4: its answer \(12\) does not match its working \(10\)[\s\S]*Question 7: a format you did not ask for/);
    expect(draft.sections.reduce((t, s) => t + s.count, 0) + draft.custom.length).toBe(9);
  });

  it('trims or tops up to the number of questions asked for', () => {
    const trimmed = parseDraft(raw, request({ count: 4 }), ctx, ids).draft;
    expect(trimmed.sections.reduce((t, s) => t + s.count, 0) + trimmed.custom.length).toBe(4);
    const topped = parseDraft({ sections: [{ skillId: 'm8-pythagoras-leg', count: 1, difficulty: 1 }] }, request({ count: 6 }), ctx, ids).draft;
    expect(topped.sections.reduce((t, s) => t + s.count, 0)).toBe(6);
    expect(() => parseDraft({ sections: [] }, request({ formats: ['choice'] }), ctx, ids)).toThrow(/no usable questions/);
  });

  it('only uses generated questions when they are allowed', () => {
    const { draft } = parseDraft(raw, request({ count: 3, formats: ['choice', 'written'] }), ctx, ids);
    expect(draft.sections).toEqual([]);
    expect(draft.custom.map((q) => q.kind)).toEqual(['mc', 'manual']);
  });

  it('repairs LaTeX whose backslashes were not doubled, and checks plain arithmetic only', () => {
    expect(repairLatex('Find $\frac{1}{2} \times 4$, \\$5 each.')).toBe('Find $\\frac{1}{2} \\times 4$, \\$5 each.');
    expect(checkValue('(18 - 6) / 4')).toBe(3);
    expect(checkValue('3 × 4 − 2')).toBe(10);
    expect(checkValue('x + 1')).toBeNull();
  });
});

describe('drafting', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('uses MiniMax when it is set up, and the offline draft when it fails', async () => {
    const reply = { title: 'Quiz', instructions: '', rationale: 'Two skills.', sections: [{ skillId: 'm8-pythagoras-leg', count: 4, difficulty: 'mixed' }], questions: [] };
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ model: 'MiniMax-M3.1-Flash', choices: [{ message: { content: JSON.stringify(reply) } }] }))));
    const ok = await draftAssignment(request({ count: 4 }), ctx, { apiKey: 'k' }, ids);
    expect(ok.source).toBe('minimax');
    expect(ok.draft.sections).toEqual([{ skillId: 'm8-pythagoras-leg', count: 4, difficulty: 'mixed' }]);

    vi.stubGlobal('fetch', vi.fn(async () => new Response('busy', { status: 503 })));
    const down = await draftAssignment(request({ count: 4 }), ctx, { apiKey: 'k' }, ids);
    expect(down.source).toBe('offline');
    expect(down.error).toMatch(/503/);
    expect((await draftAssignment(request(), ctx, null)).source).toBe('offline');
  });
});

describe('regenerating one question', () => {
  afterEach(() => vi.unstubAllGlobals());
  const regen = (patch: Partial<RegenerateRequest> = {}): RegenerateRequest => ({ type: 'homework', format: 'short', skillId: 'm8-pythagoras-leg', lessonIds: ['m8-1-3'], current: 'A 10 m ladder…', notes: '', ...patch });

  it('keeps to the question’s skill and format, and needs something to draw on', () => {
    expect(writtenFormatOf({ kind: 'mc' })).toBe('choice');
    expect(writtenFormatOf({ kind: 'numeric' })).toBe('short');
    expect(writtenFormatOf({ kind: 'manual' })).toBe('written');
    expect(writtenFormatOf({ kind: 'multi' })).toBeNull();
    expect(normalizeRegenerateRequest({ format: 'written', skillId: 'm8-pythagoras-leg', lessonIds: ['m8-2-1'], points: 30, current: 'Old', notes: 'Use a sports context' }, 'math-8')).toEqual({
      type: 'homework', format: 'written', skillId: 'm8-pythagoras-leg', lessonIds: ['m8-1-3'], current: 'Old', notes: 'Use a sports context', points: 10,
    });
    expect(normalizeRegenerateRequest({ format: 'choice', skillId: 'm10c-nope', lessonIds: ['m8-1-3', 'm10c-1-1'] }, 'math-8')).toMatchObject({ skillId: undefined, lessonIds: ['m8-1-3'] });
    expect(() => normalizeRegenerateRequest({ format: 'multi', lessonIds: ['m8-1-3'] }, 'math-8')).toThrow(/cannot be regenerated/);
    expect(() => normalizeRegenerateRequest({ format: 'choice', lessonIds: [] }, 'math-8')).toThrow(/Link the question to a skill/);
  });

  it('asks for a different question on the same skill, with the teacher’s request', () => {
    const p = regeneratePrompt(regen({ notes: 'Make it harder' }), ctx);
    expect(p.system).toMatch(/format "short", for the skill with id "m8-pythagoras-leg"/);
    expect(p.system).toMatch(/clearly different/);
    expect(p.user).toContain('"replace":"A 10 m ladder…"');
    expect(p.user).toContain('"teacher":"Make it harder"');
    expect(p.user).not.toContain('m8-pythagoras-hypotenuse');
  });

  it('checks the new question like a drafted one, keeping the skill and the points', () => {
    const q = parseRegenerated({ question: { prompt: 'Legs 6 and 8?', value: 10, check: '(6^2 + 8^2)^(1/2)', solution: 'Ten.' } }, regen(), ctx, ids);
    expect(q).toMatchObject({ kind: 'numeric', value: 10, skillId: 'm8-pythagoras-leg', aiWritten: true });
    const w = parseRegenerated({ question: { prompt: 'Explain.', solution: 'Guide', points: 6 } }, regen({ format: 'written', points: 3 }), ctx, ids);
    expect(w).toMatchObject({ kind: 'manual', points: 3 });
    expect(() => parseRegenerated({ question: { prompt: 'x', value: 12, check: '2 * 5' } }, regen(), ctx, ids)).toThrow(/does not match its working/);
  });

  it('says why there is no new question when the AI is off or its question fails', async () => {
    expect((await regenerateQuestion(regen(), ctx, null)).problem).toMatch(/not available/);
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ question: { prompt: 'x', value: 3, check: '1 + 1' } }) } }] }))));
    expect((await regenerateQuestion(regen(), ctx, { apiKey: 'k' }, ids)).problem).toMatch(/did not pass the checks \(its answer \(3\) does not match its working \(2\)\)/);
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ model: 'MiniMax-M3.1-Flash', choices: [{ message: { content: JSON.stringify({ question: { prompt: 'Find $x$.', accepted: ['hypotenuse'], solution: 's' } }) } }] }))));
    const ok = await regenerateQuestion(regen(), ctx, { apiKey: 'k' }, ids);
    expect(ok.question).toMatchObject({ kind: 'text', accepted: ['hypotenuse'] });
    expect(ok.model).toBe('MiniMax-M3.1-Flash');
  });
});
