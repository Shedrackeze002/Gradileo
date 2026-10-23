import { describe, expect, it } from 'vitest';
import { extractJson, validateInsight } from './parse.ts';
import { subjectName } from './prompt.ts';
import { generateInsight } from './index.ts';
import type { AnalystInput } from './context.ts';
import { emptySkillState } from '../mastery.ts';

const known = { skillIds: new Set(['a1-gcf', 'r10-distance']), studentIds: new Set(['s1', 's2']), lessonIds: new Set(['m10c-3-1']) };

describe('model output parsing', () => {
  it('strips think tags and fences and drops unknown references', () => {
    const raw = `<think>reasoning about {braces}</think>\n\`\`\`json\n{"headline":"Good","summary":"Fine.","riskLevel":"watch","strengths":[{"skillId":"a1-gcf","text":"ok"},{"skillId":"made-up","text":"x"}],"weaknesses":[],"misconceptions":[],"growth":[],"actions":[{"type":"assign_practice","title":"Practice","skillIds":["a1-gcf","nope"],"studentIds":["s1","ghost"],"questionCount":50,"rationale":"r"},{"type":"bogus","title":"x","skillIds":[],"studentIds":[]}],"nextSteps":[{"text":"Do it","actionIndex":0}]}\n\`\`\``;
    const data = validateInsight(extractJson(raw), 'class', known);
    expect(data.strengths[1].skillId).toBeUndefined();
    expect(data.actions).toHaveLength(1);
    expect(data.actions[0].skillIds).toEqual(['a1-gcf']);
    expect(data.actions[0].studentIds).toEqual(['s1']);
    expect(data.actions[0].questionCount).toBe(20);
    expect(data.nextSteps[0].actionId).toBe(data.actions[0].id);
  });
});

describe('offline analyst', () => {
  it('produces student and class insights without an API key', async () => {
    const now = new Date();
    const weak = { ...emptySkillState('a1-gcf'), attempts: 5, correct: 1, pKnown: 0.2, level: 'attempted' as const, lastPracticedAt: now.toISOString() };
    const strong = { ...emptySkillState('a1-lcm'), attempts: 8, correct: 8, pKnown: 0.97, level: 'mastered' as const, sessions: 2, lastPracticedAt: now.toISOString() };
    const input: AnalystInput = {
      courseId: 'math-10c',
      className: 'Math 10C — Block A',
      students: [{ id: 's1', name: 'Ava Chen' }, { id: 's2', name: 'Ben Okafor' }],
      taughtLessonIds: ['m10c-3-1'],
      mastery: [{ ...weak, studentId: 's1' }, { ...strong, studentId: 's1' }, { ...weak, studentId: 's2' }],
      events: [{ studentId: 's1', skillId: 'a1-gcf', correct: false, assisted: false, at: now.toISOString(), prompt: 'GCF of 12 and 18', answer: '3', expected: '6' }],
      assignments: [{ id: 'a', title: 'HW 1', type: 'homework', dueAt: new Date(now.getTime() - 86400000).toISOString(), assignedTo: 'all', status: 'published' }],
      submissions: [],
    };
    const s = await generateInsight(input, { scope: 'student', studentId: 's1' });
    expect(s.source).toBe('offline');
    expect(s.data.weaknesses[0].skillId).toBe('a1-gcf');
    expect(s.data.actions.some((a) => a.type === 'assign_practice')).toBe(true);
    const c = await generateInsight(input, { scope: 'class' });
    expect(c.data.actions.length).toBeGreaterThan(0);
    expect(c.data.headline).toBeTruthy();
  });
});

describe('MiniMax request', () => {
  it('sends only first names and last initials, and falls back offline on errors', async () => {
    const now = new Date();
    const input: AnalystInput = {
      courseId: 'math-10c',
      className: 'Math 10C',
      students: [{ id: 's1', name: 'Ava Chen' }, { id: 's2', name: 'Ben Okafor' }],
      taughtLessonIds: ['m10c-3-1'],
      mastery: [{ ...emptySkillState('a1-gcf'), attempts: 4, correct: 1, pKnown: 0.2, level: 'attempted', lastPracticedAt: now.toISOString(), studentId: 's1' }],
      events: [],
      assignments: [],
      submissions: [],
    };
    const bodies: string[] = [];
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async (_url: unknown, init?: { body?: unknown }) => {
      bodies.push(String(init?.body ?? ''));
      return new Response('{"error":"unavailable"}', { status: 503 });
    }) as typeof fetch;
    try {
      const res = await generateInsight(input, { scope: 'class' }, { apiKey: 'test-key' });
      expect(bodies).toHaveLength(1);
      expect(bodies[0]).toContain('Ava C.');
      expect(bodies[0]).not.toContain('Chen');
      expect(bodies[0]).not.toContain('Okafor');
      expect(res.source).toBe('offline');
      expect(res.error).toMatch(/503/);
    } finally {
      globalThis.fetch = realFetch;
    }
  });
});

describe('the subject in the prompts', () => {
  it('names it in lower case, a language with its capital, and mathematics by default', () => {
    expect(subjectName('Chemistry')).toBe('chemistry');
    expect(subjectName('English Language Arts')).toBe('English Language Arts');
    expect(subjectName(undefined)).toBe('mathematics');
    expect(subjectName(' ')).toBe('mathematics');
  });
});
