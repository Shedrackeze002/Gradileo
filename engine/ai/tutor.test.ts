import { describe, expect, it } from 'vitest';
import {
  answerTutorQuestion,
  mathToWords,
  normalizeChunk,
  normalizeQuestion,
  offlineScript,
  OFFLINE_ANSWER,
  parseAnswer,
  parseScript,
  questionPrompt,
  scriptPrompt,
  speakable,
  writeTutorScript,
  type TutorChunk,
} from './tutor.ts';

const chunk: TutorChunk = {
  lessonTitle: 'Area of Triangles',
  unit: 'Unit 9 · Area',
  slides: [
    { id: 'title', kind: 'title', title: 'Area of Triangles', steps: ['Area of Triangles'] },
    { id: 's0-0', kind: 'content', title: 'Half a parallelogram', steps: ['A triangle is half of a parallelogram.', 'So $A = \\frac{1}{2}bh$.'] },
    { id: 's0-1', kind: 'check', title: 'Your turn', steps: ['[YOUR TURN] Area of a triangle'] },
    { id: 'end', kind: 'end', title: 'Lesson complete', steps: ['Lesson complete'] },
  ],
};

describe('maths in words', () => {
  it('reads fractions, powers, roots and signs', () => {
    expect(mathToWords('\\frac{3}{4}')).toBe('3 over 4');
    expect(mathToWords('x^2 + 3x - 5 = 0')).toBe('x squared plus 3x minus 5 equals 0');
    expect(mathToWords('-5 + (-3)')).toBe('negative 5 plus ( negative 3)');
    expect(mathToWords('\\sqrt{16} = 4')).toBe('the square root of 16 equals 4');
    expect(mathToWords('\\sqrt[3]{27}')).toBe('the cube root of 27');
    expect(mathToWords('30^\\circ')).toBe('30 degrees');
    expect(mathToWords('2^{5}')).toBe('2 to the power of 5');
    expect(mathToWords('6 \\times 4 \\div 3')).toBe('6 times 4 divided by 3');
    expect(mathToWords('\\text{area} = 12\\text{ cm}^2')).toBe('area equals 12 cm squared');
  });

  it('turns Markdown with maths into sentences', () => {
    expect(speakable('**Area** is $A = lw$')).toBe('Area is A equals lw.');
    expect(speakable('- one\n- two')).toBe('one two.');
    expect(speakable('It costs \\$5.')).toBe('It costs $5.');
    expect(speakable('| Side | Length |\n|---|---|\n| a | 3 |')).toBe('Side, Length. a, 3.');
    expect(speakable('First.\n\nSecond')).toBe('First. Second.');
  });
});

describe('checking what a browser sends', () => {
  it('trims a chunk and refuses an empty one', () => {
    const c = normalizeChunk({ lessonTitle: ' Area ', slides: [{ id: 'a', kind: 'nope', title: 'T', steps: ['x', 7] }] });
    expect(c.lessonTitle).toBe('Area');
    expect(c.slides[0]).toEqual({ id: 'a', kind: 'content', title: 'T', steps: ['x', ''] });
    expect(() => normalizeChunk({ slides: [] })).toThrow();
    expect(() => normalizeChunk({ slides: Array.from({ length: 13 }, (_, i) => ({ id: `s${i}`, steps: ['x'] })) })).toThrow();
  });

  it('needs a question and keeps the last six messages', () => {
    expect(() => normalizeQuestion({ question: '  ' })).toThrow();
    const q = normalizeQuestion({ question: 'Why?', history: Array.from({ length: 9 }, (_, i) => ({ role: i % 2 ? 'tutor' : 'student', text: `m${i}` })) });
    expect(q.history).toHaveLength(6);
    expect(q.history[0].text).toBe('m3');
  });
});

describe('offline narration', () => {
  it('gives one beat per step, inviting the student at a question', () => {
    const s = offlineScript(chunk);
    expect(s.slides.map((x) => x.beats.length)).toEqual([1, 2, 1, 1]);
    expect(s.slides[0].beats[0]).toContain('Area of Triangles');
    expect(s.slides[1].beats[1]).toBe('So A equals 1 over 2 bh.');
    expect(s.slides[2].beats[0]).toMatch(/^Your turn!/);
  });

  it('is what the tutor says without a key', async () => {
    const res = await writeTutorScript(chunk, null);
    expect(res.source).toBe('offline');
    expect(res.script).toEqual(offlineScript(chunk));
    expect((await answerTutorQuestion(normalizeQuestion({ question: 'Why?' }), null)).answer).toEqual(OFFLINE_ANSWER);
  });
});

describe("the model's output", () => {
  it('keeps good beats and fills what is missing from the offline narration', () => {
    const raw = { slides: [{ id: 'title', beats: ['Hi there!'] }, { id: 's0-0', beats: ['Picture a parallelogram.'] }, { id: 'end', beats: ['Well done, $x^2$ and all.'] }] };
    const s = parseScript(raw, chunk);
    expect(s.slides[0].beats).toEqual(['Hi there!']);
    // The second step was missing, so it comes from the slide text.
    expect(s.slides[1].beats).toEqual(['Picture a parallelogram.', 'So A equals 1 over 2 bh.']);
    // A slide the model left out comes from the offline narration.
    expect(s.slides[2].beats[0]).toMatch(/^Your turn!/);
    // Maths that slipped into a beat is put in words.
    expect(s.slides[3].beats[0]).toBe('Well done, x squared and all.');
    expect(() => parseScript({ nothing: true }, chunk)).toThrow();
  });

  it('reads an answer, with spoken words for the voice', () => {
    expect(parseAnswer({ show: 'Use $\\frac{1}{2}bh$.', say: 'Use one half of base times height.' })).toEqual({ show: 'Use $\\frac{1}{2}bh$.', say: 'Use one half of base times height.' });
    expect(parseAnswer({ show: 'Use $\\frac{1}{2}bh$.' }).say).toBe('Use 1 over 2 bh.');
    expect(() => parseAnswer({})).toThrow();
  });

  it('tells the model the rules that matter for a young listener', () => {
    const p = scriptPrompt(chunk);
    expect(p.system).toMatch(/exactly one beat per step/);
    expect(p.system).toMatch(/\[YOUR TURN\][\s\S]*Never give or hint at its answer/);
    expect(p.system).toMatch(/never LaTeX/);
    expect(p.user).toContain('"id":"s0-1"');
    const q = questionPrompt(normalizeQuestion({ question: 'What is the answer?', slideText: 'x' }));
    expect(q.system).toMatch(/don't give the final answer/);
  });
});
