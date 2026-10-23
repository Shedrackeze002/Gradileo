import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanReportCard, fillName, offlineReportCard, parseReportCard, reportCardPrompt, reportStats, writeReportCard } from './reportCard.ts';
import type { StudentContext } from './types.ts';

const ctx: StudentContext = {
  student: { id: 's1', name: 'Amara Okafor' },
  courseTitle: 'Math 8',
  taughtLessons: [{ id: 'm8-1-3', title: 'The Pythagorean Theorem' }],
  skills: [
    { skillId: 'a', name: 'Finding the hypotenuse in SI units', outcomes: [], lessonId: 'm8-1-3', level: 'mastered', pKnown: 0.97, attempts: 12, correct: 11, lastPracticedAt: null },
    { skillId: 'b', name: 'Finding a leg', outcomes: [], lessonId: 'm8-1-3', level: 'developing', pKnown: 0.4, attempts: 8, correct: 3, lastPracticedAt: null },
    { skillId: 'c', name: 'Pythagorean triples', outcomes: [], lessonId: 'm8-1-3', level: 'not_started', pKnown: 0, attempts: 0, correct: 0, lastPracticedAt: null },
  ],
  recentErrors: [{ skillId: 'b', prompt: 'A ladder…', studentAnswer: '13', correctAnswer: '5', at: '2026-10-20' }],
  assignments: [
    { id: 'a1', title: 'Homework 1', type: 'homework', dueAt: '2026-10-10', status: 'submitted', percent: 90 },
    { id: 'a2', title: 'Quiz 1', type: 'quiz', dueAt: '2026-10-15', status: 'late', percent: 70 },
    { id: 'a3', title: 'Homework 2', type: 'homework', dueAt: '2026-10-18', status: 'missing', percent: null },
    { id: 'a4', title: 'Homework 3', type: 'homework', dueAt: '2026-11-01', status: 'upcoming', percent: null },
  ],
  trend: { last7Accuracy: 70, prev7Accuracy: 50, hintRate: 45, questionsLast7: 20 },
  coursePercent: 18,
};

describe('a report card’s numbers', () => {
  it('come from the data', () => {
    expect(reportStats(ctx)).toEqual({ coursePercent: 18, skillsSecure: 1, skillsTaught: 3, averageScore: 80, workDone: 2, workDue: 3 });
  });
});

describe('the card without the AI', () => {
  it('names real skills and work, with {name} for the student', () => {
    const c = offlineReportCard(ctx, 'Term 1');
    expect(c.summary).toMatch(/^\{name\} has worked on 2 skills in Math 8 and is secure in 1 of the 3 taught so far\. The average score on graded work is 80%\. 2 of 3 pieces of work due were handed in, 1 of them late\. Accuracy has risen/);
    expect(c.strengths[0]).toBe('Secure in finding the hypotenuse in SI units (11 of 12 correct).');
    expect(c.nextSteps).toEqual(['Practise finding a leg until it feels easy.', 'Hand in the 1 missing piece of work.', 'Try each question before opening a hint.']);
    expect(fillName(c.feedback, 'Amara Okafor')).toBe('Amara, keep going: steady practice is what makes a skill stick.');
  });
});

describe('the prompt', () => {
  it('has the data and no name', () => {
    const p = reportCardPrompt({ ...ctx, student: { id: '', name: '' } }, 'Term 1', 'Very kind to classmates');
    expect(p.system).toMatch(/Never use or invent a name\. Write \{name\}/);
    expect(p.user).toContain('"skill":"Finding a leg"');
    expect(p.user).toContain('"teacherNotes":"Very kind to classmates"');
    expect(p.user).not.toContain('Amara');
  });

  it('names the course’s subject in the parents’ tips', () => {
    expect(reportCardPrompt(ctx, 'Term 1', '').system).toContain('without needing to know the mathematics');
    expect(reportCardPrompt({ ...ctx, subject: 'Chemistry' }, 'Term 1', '').system).toContain('without needing to know the chemistry');
  });
});

describe('the AI’s card', () => {
  afterEach(() => vi.unstubAllGlobals());
  const base = offlineReportCard(ctx, 'Term 1');

  it('is checked, keeps the data’s numbers, and falls back to the offline card', async () => {
    const c = parseReportCard({ summary: '{name} is doing well.', strengths: ['Hypotenuse'], nextSteps: ['Legs'], feedback: 'Well done, {name}.', stats: { coursePercent: 99 } }, base);
    expect(c.stats.coursePercent).toBe(18);
    expect(c.studentTips).toEqual(base.studentTips);
    expect(() => parseReportCard({ summary: 'x', strengths: [] }, base)).toThrow(/incomplete/);

    const fetch = vi.fn(async () => new Response(JSON.stringify({ model: 'MiniMax-M3.1-Flash', choices: [{ message: { content: JSON.stringify({ summary: '{name} has grown.', strengths: ['a'], nextSteps: ['b'], studentTips: ['c'], parentTips: ['d'], feedback: 'e' }) } }] })));
    vi.stubGlobal('fetch', fetch);
    const ok = await writeReportCard(ctx, { period: 'Term 1' }, { apiKey: 'k' });
    expect(ok.source).toBe('minimax');
    expect((fetch.mock.calls[0] as unknown as [string, { body: string }])[1].body).not.toContain('Amara');

    vi.stubGlobal('fetch', vi.fn(async () => new Response('busy', { status: 503 })));
    const down = await writeReportCard(ctx, { period: 'Term 1' }, { apiKey: 'k' });
    expect(down).toMatchObject({ source: 'offline', content: { summary: base.summary } });
  });

  it('keeps a teacher’s edits to the card’s shape', () => {
    const c = cleanReportCard({ period: 'T1', summary: '  Hi  ', strengths: ['x', 5, ''], nextSteps: 'nope', stats: { coursePercent: 100 } }, base.stats);
    expect(c).toMatchObject({ period: 'T1', summary: 'Hi', strengths: ['x'], nextSteps: [], stats: { coursePercent: 18 } });
  });
});
