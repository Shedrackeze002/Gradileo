import { describe, expect, it } from 'vitest';
import {
  answerTutorQuestion,
  hash53,
  mathToWords,
  normalizeChunk,
  normalizeQuestion,
  offlineScript,
  OFFLINE_ANSWER,
  parseAnswer,
  parseScript,
  parseTutorVoice,
  PRAISE_PHRASES,
  questionPrompt,
  sayUnits,
  scriptPrompt,
  slideProblems,
  speakable,
  TUTOR_PHRASES,
  TUTOR_PROMPT_VERSION,
  TUTOR_VOICE_VERSION,
  tutorSlideKey,
  writeTutorScript,
  type TutorChunk,
  type TutorSlide,
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
    expect(mathToWords('\\text{area} = 12\\text{ cm}^2')).toBe('area equals 12 centimetres squared');
  });

  it('turns Markdown with maths into sentences', () => {
    expect(speakable('**Area** is $A = lw$')).toBe('Area is A equals lw.');
    expect(speakable('- one\n- two')).toBe('one two.');
    expect(speakable('It costs \\$5.')).toBe('It costs $5.');
    expect(speakable('| Side | Length |\n|---|---|\n| a | 3 |')).toBe('Side, Length. a, 3.');
    expect(speakable('First.\n\nSecond')).toBe('First. Second.');
  });

  it('says a big number as one number, and points at working set out in columns', () => {
    // With its spaces, "4 572 306" would be said as three numbers.
    expect(speakable('The chart shows $4\\,572\\,306$ and $70\\,000$.')).toBe('The chart shows 4572306 and 70000.');
    expect(speakable('$$\\begin{array}{r}4\\,\\overset{1}{5}\\,6 \\\\ +\\ 2\\,3\\,4 \\\\ \\hline 6\\,9\\,0\\end{array}$$')).toBe('Look at how the working is set out.');
    expect(mathToWords('f(x) = \\begin{cases} x^2 & x < 0 \\\\ 2x & x \\ge 0 \\end{cases}')).toBe('f(x) equals x squared when x is less than 0; 2x when x is greater than or equal to 0');
    expect(mathToWords('\\overset{4}{\\cancel{5}}\\phantom{0}3')).toBe('5 3');
  });

  it('says units in full, as the owner heard "3 M" for 3 m and "C" for °C', () => {
    expect(speakable('It was $-3^\\circ\\text{C}$, with $1\\text{ m}$ of snow on a $12\\text{ m}$ by $7\\text{ m}$ roof: $84\\text{ m}^2$.')).toBe(
      'It was negative 3 degrees Celsius, with 1 metre of snow on a 12 metres by 7 metres roof: 84 square metres.',
    );
    expect(speakable('Rain: $5\\text{ in}$. Speed: $60\\text{ km/h}$ and $\\text{km}/\\text{h}$.')).toBe('Rain: 5 inches. Speed: 60 kilometres per hour and kilometres per hour.');
    expect(sayUnits('Tariq worked 6 h 45 min at 14 °C. He is 6 ft 1 in tall, and 250 mL is 0.25 L.')).toBe(
      'Tariq worked 6 hours 45 minutes at 14 degrees Celsius. He is 6 feet 1 inch tall, and 250 millilitres is 0.25 litres.',
    );
    // In prose "in" is a word, and in algebra 2m is two times m.
    expect(sayUnits('Hours over 8 in a day.')).toBe('Hours over 8 in a day.');
    expect(speakable('Solve $2m + 3 = 7$.')).toBe('Solve 2m plus 3 equals 7.');
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

  it('places numbered beats by their step, and reads a slide from the slide when its lines fail the checks', () => {
    const numbered = parseScript({ slides: [{ id: 's0-0', beats: [{ n: 2, say: 'So the area is one half of b times h.' }, { n: 1, say: 'A triangle is exactly half of a parallelogram.' }] }] }, chunk);
    expect(numbered.slides[1]).toEqual({ id: 's0-0', beats: ['A triangle is exactly half of a parallelogram.', 'So the area is one half of b times h.'] });
    // A number the slide does not have, and a line one step early.
    const wrong = parseScript({ slides: [{ id: 's0-0', beats: ['A triangle is a third of a parallelogram, about 30 of them.', 'Next we find the area.'] }] }, chunk);
    expect(wrong.slides[1].beats).toEqual(offlineScript(chunk).slides[1].beats);
    expect(wrong.slides[1].rejected?.join()).toMatch(/30 is not on the slide.*line 2 is not about its step|line 2 is not about its step.*30 is not on the slide/);
    expect(slideProblems(chunk.slides[1], chunk.lessonTitle, ['A triangle is half of a parallelogram.', 'So A equals one half b h.'])).toEqual([]);
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
    expect(p.system).toMatch(/Beat n is said while step n appears/);
    expect(p.system).toMatch(/Never say "and" inside a whole number/);
    expect(p.user).toContain('"id":"s0-1"');
    expect(p.user).toContain('{"n":2,"show":"So $A = \\\\frac{1}{2}bh$."}');
    const q = questionPrompt(normalizeQuestion({ question: 'What is the answer?', slideText: 'x' }));
    expect(q.system).toMatch(/don't give the final answer/);
  });
});

describe('the recorded voice', () => {
  const slide = chunk.slides[1];
  const manifest = {
    v: TUTOR_VOICE_VERSION,
    lessonId: 'm6-9-2',
    audio: 'm6-9-2.abc123.mp3',
    voice: { name: 'af_heart', speed: 0.85 },
    hash: 'abc123',
    slides: {
      [tutorSlideKey(slide)]: { beats: ['A triangle is half of a parallelogram.', 'So the area is one half of base times height.'], clips: [[0.5, 3.2], [3.7, 7]], ai: true },
      broken: { beats: ['one'], clips: [] },
    },
    phrases: { 'praise-1': [7.5, 9], wrong: [9.5, 9], nonsense: [1, 2] },
  };

  it('keys a slide by what it shows', () => {
    const elsewhere: TutorSlide = { ...slide, id: 'another-id' };
    expect(tutorSlideKey(slide)).toBe(tutorSlideKey(elsewhere));
    expect(tutorSlideKey(slide)).not.toBe(tutorSlideKey({ ...slide, steps: [...slide.steps, 'More.'] }));
    expect(tutorSlideKey(slide)).not.toBe(tutorSlideKey({ ...slide, kind: 'summary' }));
    expect(hash53('abc')).toBe(hash53('abc'));
    expect(hash53('abc')).not.toBe(hash53('abd'));
  });

  it('reads a manifest and drops what is malformed', () => {
    const v = parseTutorVoice(JSON.parse(JSON.stringify(manifest)), 'm6-9-2')!;
    expect(v.audio).toBe('m6-9-2.abc123.mp3');
    expect(v.slides[tutorSlideKey(slide)].clips[1]).toEqual([3.7, 7]);
    expect(v.slides.broken).toBeUndefined();
    // A clip that ends before it starts, and a phrase the app does not know, are left out.
    expect(v.phrases).toEqual({ 'praise-1': [7.5, 9] });
    expect(v.prompt).toBeUndefined();
    expect(parseTutorVoice({ ...manifest, prompt: TUTOR_PROMPT_VERSION }, 'm6-9-2')?.prompt).toBe(TUTOR_PROMPT_VERSION);
  });

  it('refuses a manifest for another lesson or version, or with an odd file name', () => {
    expect(parseTutorVoice(manifest, 'm6-9-3')).toBeNull();
    expect(parseTutorVoice({ ...manifest, v: TUTOR_VOICE_VERSION + 1 }, 'm6-9-2')).toBeNull();
    expect(parseTutorVoice({ ...manifest, audio: '../secret.mp3' }, 'm6-9-2')).toBeNull();
    expect(parseTutorVoice('<!doctype html>', 'm6-9-2')).toBeNull();
    expect(parseTutorVoice(null, 'm6-9-2')).toBeNull();
  });

  it('has a recorded line for every phrase the tutor uses', () => {
    for (const p of PRAISE_PHRASES) expect(TUTOR_PHRASES[p]).toMatch(/Let’s keep going\.$/);
    expect(Object.values(TUTOR_PHRASES).every((t) => t.length > 10 && !/[$\\]/.test(t))).toBe(true);
  });

  it('welcomes the student with the title said once', () => {
    const beat = offlineScript({ ...chunk, lessonTitle: 'Area of Triangles.' }).slides[0].beats[0];
    expect(beat).toContain('Today’s lesson is Area of Triangles. I’m your AI tutor');
  });
});
