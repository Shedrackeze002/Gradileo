import { describe, expect, it } from 'vitest';
import { buildItemRefs, gradeSubmission, itemFromRef, type AssignmentContent } from './assemble.ts';
import { canonicalResponses } from './answers.ts';
import { processSubmission, validateRefs } from './submit.ts';
import { dueReminders } from './reminders.ts';
import { draftFromAction } from './actions.ts';

const content: AssignmentContent = {
  sections: [
    { skillId: 'm1-referents', count: 2, difficulty: 'mixed' },
    { skillId: 'a2-approximate', count: 2, difficulty: 2 },
  ],
  custom: [{ id: 'q1', prompt: 'Which is larger?', kind: 'mc', choices: [{ id: 'a', md: '$\\frac{3}{4}$' }, { id: 'b', md: '$0.7$' }], correct: 'a' }],
};

describe('submission processing', () => {
  it('rejects items outside the assignment', () => {
    const refs = buildItemRefs(content, 42);
    expect(validateRefs(refs, content)).toBeNull();
    expect(validateRefs([...refs, { skillId: 'm1-referents', seed: 1, difficulty: 1 }], content)).toMatch(/./);
    expect(validateRefs([{ skillId: 'a4-area-model', seed: 1, difficulty: 1 }], content)).toMatch(/not part/);
    expect(validateRefs([{ custom: 5 }], content)).toMatch(/custom/);
  });

  it('grades canonical answers as fully correct and records readable events', () => {
    const refs = buildItemRefs(content, 7);
    const responses = Object.fromEntries(refs.map((r, i) => [i, { answers: canonicalResponses(itemFromRef(r, content, 'a')!), hintsUsed: 0 }]));
    const out = processSubmission({ assignmentId: 'a', content, dueAt: null, submissionId: 's', items: refs, responses, mastery: new Map(), now: new Date().toISOString() });
    expect(out.summary.percent).toBe(100);
    expect(out.status).toBe('graded');
    expect(out.events.length).toBe(4);
    expect(out.events.every((e) => e.correct)).toBe(true);
    for (const e of out.events) {
      expect(e.expected).not.toMatch(/\\frac|\$/);
      expect(e.prompt).not.toMatch(/\$/);
    }
  });

  it('records choice text, not choice ids, for multiple-choice answers', () => {
    const mc: AssignmentContent = { sections: [{ skillId: 'm1-referents', count: 1, difficulty: 1 }], custom: [] };
    const refs = buildItemRefs(mc, 3);
    const item = itemFromRef(refs[0], mc, 'a')!;
    const spec = item.parts[0].answer;
    if (spec.kind !== 'mc') return;
    const wrong = spec.choices.find((c) => c.id !== spec.correct)!;
    const out = processSubmission({ assignmentId: 'a', content: mc, dueAt: null, submissionId: 's', items: refs, responses: { 0: { answers: [wrong.id], hintsUsed: 0 } }, mastery: new Map(), now: new Date().toISOString() });
    expect(out.events[0].correct).toBe(false);
    expect(out.events[0].answer).not.toBe(wrong.id);
    expect(out.events[0].answer.length).toBeGreaterThan(0);
  });

  it('marks late submissions', () => {
    const refs = buildItemRefs(content, 9);
    const out = processSubmission({ assignmentId: 'a', content, dueAt: new Date(Date.now() - 3600_000).toISOString(), submissionId: 's', items: refs, responses: {}, mastery: new Map(), now: new Date().toISOString() });
    expect(out.late).toBe(true);
  });
});

describe('deadline reminders', () => {
  const now = new Date('2026-03-10T12:00:00Z');
  const base = { id: 'a1', classId: 'c', title: 'Homework 1', type: 'homework', reminderHours: [24, 2], assignedTo: 'all' as const, status: 'published' };
  const roster = new Map([['c', ['s1', 's2', 's3']]]);

  it('reminds only students who have not submitted', () => {
    const { reminders } = dueReminders({ now, assignments: [{ ...base, dueAt: '2026-03-11T08:00:00Z' }], roster, done: new Set(['a1:s2']), sent: new Set() });
    expect(reminders.map((r) => r.studentId).sort()).toEqual(['s1', 's3']);
    expect(reminders[0].hours).toBe(24);
  });

  it('sends nothing before the first threshold or after the deadline', () => {
    expect(dueReminders({ now, assignments: [{ ...base, dueAt: '2026-03-13T12:00:00Z' }], roster, done: new Set(), sent: new Set() }).reminders).toHaveLength(0);
    expect(dueReminders({ now, assignments: [{ ...base, dueAt: '2026-03-10T11:00:00Z' }], roster, done: new Set(), sent: new Set() }).reminders).toHaveLength(0);
  });

  it('sends only the most urgent reminder and suppresses skipped ones', () => {
    const { reminders, suppressed } = dueReminders({ now, assignments: [{ ...base, dueAt: '2026-03-10T13:00:00Z' }], roster, done: new Set(), sent: new Set() });
    expect(reminders.every((r) => r.hours === 2)).toBe(true);
    expect(suppressed).toContain('a1:s1:24');
  });

  it('does not repeat a reminder that was already sent', () => {
    const sent = new Set(['a1:s1:24', 'a1:s2:24', 'a1:s3:24']);
    expect(dueReminders({ now, assignments: [{ ...base, dueAt: '2026-03-11T08:00:00Z' }], roster, done: new Set(), sent }).reminders).toHaveLength(0);
  });

  it('respects assignments targeted at specific students and drafts', () => {
    const r1 = dueReminders({ now, assignments: [{ ...base, assignedTo: ['s3'], dueAt: '2026-03-11T08:00:00Z' }], roster, done: new Set(), sent: new Set() });
    expect(r1.reminders.map((r) => r.studentId)).toEqual(['s3']);
    const r2 = dueReminders({ now, assignments: [{ ...base, status: 'draft', dueAt: '2026-03-11T08:00:00Z' }], roster, done: new Set(), sent: new Set() });
    expect(r2.reminders).toHaveLength(0);
  });
});

describe('AI actions to assignments', () => {
  it('turns a practice suggestion into a targeted practice draft', () => {
    const d = draftFromAction({ id: 'x', type: 'assign_practice', title: 'Practise radicals', rationale: 'r', studentIds: ['s1'], skillIds: ['a2-approximate'], status: 'proposed', questionCount: 6 });
    expect(d?.type).toBe('practice');
    expect(d?.assignedTo).toEqual(['s1']);
    expect(d?.content.sections[0].count).toBe(6);
  });
  it('returns null for check-ins', () => {
    expect(draftFromAction({ id: 'x', type: 'check_in', title: 't', rationale: 'r', studentIds: ['s1'], skillIds: [], status: 'proposed' })).toBeNull();
  });
});

describe('a teacher’s mark on an auto-graded question', () => {
  // An answer key that worked a tangent as a sine: 24 / 30 instead of 24 / 18.
  const wrongKey: AssignmentContent = { sections: [], custom: [{ id: 'q1', prompt: 'Opposite 24, hypotenuse 30: find $\\tan\\theta$.', kind: 'numeric', value: 0.8, tolerance: 0.05, points: 2 }] };
  const refs = [{ custom: 0 }];

  it('replaces the automatic mark, and leaves the automatic mark when there is none', () => {
    const auto = gradeSubmission(refs, { 0: { answers: ['1.33'], hintsUsed: 0 } }, wrongKey, 'a');
    expect(auto.score).toBe(0);
    const changed = gradeSubmission(refs, { 0: { answers: ['1.33'], hintsUsed: 1, manualScore: 1 } }, wrongKey, 'a', { hintPenalty: true });
    expect(changed).toMatchObject({ score: 2, maxScore: 2, percent: 100, pendingManual: 0 });
    expect(changed.items[0]).toMatchObject({ manual: false, result: { correct: true } });
    expect(gradeSubmission(refs, { 0: { answers: ['1.33'], hintsUsed: 0, manualScore: 0.5 } }, wrongKey, 'a').score).toBe(1);
    expect(gradeSubmission(refs, { 0: { answers: ['1.33'], hintsUsed: 0, manualScore: null } }, wrongKey, 'a').score).toBe(0);
  });
});
