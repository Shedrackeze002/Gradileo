import { describe, expect, it } from 'vitest';
import { captions, chunk, toSrt, toVtt, wrap } from './captions.ts';
import { captionOf, checkScript, plainMarkdown, type Explainer } from './script.ts';
import { compile, ownPart, partShown, stateAt, TIMING, youtubeChapters } from './timeline.ts';

const script: Explainer = {
  id: 'demo-1',
  lessonId: 'demo-1',
  title: 'Demo',
  summary: 'A demo.',
  scenes: [
    {
      chapter: 'Start',
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Lesson', title: 'Demo' }],
      lines: [{ say: 'Hello there.', show: 'title' }],
    },
    {
      chapter: 'Steps',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 4, opp: 3 }],
      right: [
        { kind: 'math', id: 'eq', lines: ['a', 'b'] },
        { kind: 'try', id: 'q', prompt: 'What is [[opp:one]] + $\\thc{1}$?', choices: ['1', '2'], answer: 1, working: 'One and one.' },
      ],
      lines: [
        { say: 'First step.', show: ['tri', 'eq.0'], focus: 'tri.opp' },
        { say: 'Second step.', show: 'eq.1', focus: ['tri.adj', 'eq.1'] },
        { say: 'Your turn.', show: 'q', hide: 'eq', focus: 'tri', wait: 5 },
        { say: 'It is two.', show: 'q.answer' },
      ],
    },
  ],
};

const durations = { '0.0': 2, '1.0': 1.5, '1.1': 1.5, '1.2': 1, '1.3': 1 };

describe('compile', () => {
  const tl = compile(script, durations);

  it('times lines from their narration with gaps, waits and scene padding', () => {
    expect(tl.lines.map((l) => [l.key, l.start, l.end])).toEqual([
      ['0.0', 1, 3],
      ['1.0', 6.2, 7.7],
      ['1.1', 9.1, 10.6],
      ['1.2', 12, 13],
      ['1.3', 19.4, 20.4],
    ]);
    expect(tl.scenes[0]).toMatchObject({ start: 0, end: 5.2 });
    expect(tl.scenes[1]).toMatchObject({ start: 5.2, end: 22.6 });
    expect(tl.duration).toBe(22.6);
  });

  it('lists chapters and the cue where Gradileo pauses for the question', () => {
    expect(tl.chapters).toEqual([
      { title: 'Start', t: 0 },
      { title: 'Steps', t: 5.2 },
    ]);
    expect(tl.cues).toEqual([{ id: 'demo-1:q', t: 13.2, prompt: 'What is **one** + ${1}$?', choices: ['1', '2'], answer: 1, working: 'One and one.' }]);
  });

  it('needs every line to be narrated', () => {
    expect(() => compile(script, { ...durations, '1.3': 0 })).toThrow(/1\.3/);
  });
});

describe('stateAt', () => {
  const tl = compile(script, durations);

  it('fades scenes in and out', () => {
    expect(stateAt(tl, 0).fade).toBe(0);
    expect(stateAt(tl, 1).fade).toBe(1);
    expect(stateAt(tl, 5.2 - TIMING.fade / 2).fade).toBeCloseTo(0.5, 2);
    expect(stateAt(tl, 5.3).scene).toBe(1);
    expect(stateAt(tl, 99).scene).toBe(1);
  });

  it('reveals parts one at a time and the whole element at once', () => {
    const a = stateAt(tl, 7.1);
    expect(partShown(a.els.eq, '0')).toBeGreaterThan(0.5);
    expect(partShown(a.els.eq, '1')).toBe(0);
    expect(a.els.tri.whole).toBe(true);
    expect(partShown(a.els.tri, 'opp')).toBe(a.els.tri.p);
    const b = stateAt(tl, 10.55);
    expect(partShown(b.els.eq, '1')).toBe(1);
  });

  it('moves the emphasis and clears it', () => {
    expect(stateAt(tl, 7.1).els.tri.focus).toEqual({ opp: 1 });
    const mid = stateAt(tl, 9.1 + TIMING.focus / 2).els.tri.focus;
    expect(mid.opp).toBeCloseTo(0.5, 2);
    expect(mid.adj).toBeCloseTo(0.5, 2);
    expect(stateAt(tl, 10.55).els.tri.focus).toEqual({ adj: 1 });
    expect(stateAt(tl, 10.55).els.eq.focus).toEqual({ '1': 1 });
    expect(stateAt(tl, 13.2).els.tri.focus).toEqual({});
  });

  it('hides elements and counts down a question', () => {
    expect(stateAt(tl, 13.2).els.eq).toBeUndefined();
    expect(stateAt(tl, 13 + 2.5).els.q.timer).toBe(0.5);
    expect(ownPart(stateAt(tl, 17).els.q, 'answer')).toBe(0);
    expect(ownPart(stateAt(tl, 20.25).els.q, 'answer')).toBeGreaterThan(0.9);
  });

  it('is identical for frames where nothing moves', () => {
    expect(JSON.stringify(stateAt(tl, 17))).not.toBe(JSON.stringify(stateAt(tl, 17.1)));
    expect(JSON.stringify(stateAt(tl, 1.8))).toBe(JSON.stringify(stateAt(tl, 2.2)));
  });
});

describe('hiding a part', () => {
  const x: Explainer = {
    id: 'demo-2',
    lessonId: 'demo-2',
    title: 'Demo',
    summary: 'A demo.',
    scenes: [
      {
        layout: 'center',
        main: [
          {
            kind: 'diagram',
            id: 'd',
            points: { A: [0, 0], B: [4, 0], C: [4, 3] },
            items: [
              { kind: 'line', id: 'ab', from: 'A', to: 'B' },
              { kind: 'label', id: 'x', at: 'B', tex: 'x' },
              { kind: 'label', id: 'v', at: 'B', tex: '4' },
            ],
          },
          { kind: 'text', id: 't', md: 'Text' },
        ],
        lines: [
          { say: 'One.', show: ['d.ab', 'd.x', 't'] },
          { say: 'Two.', hide: 'd.x', show: 'd.v' },
          { say: 'Three.', show: 'd.x', hide: 't.0' },
        ],
      },
    ],
  };
  // The lines are spoken from 1 to 2, 3.4 to 4.4 and 5.8 to 6.8.
  const tl = compile(x, { '0.0': 1, '0.1': 1, '0.2': 1 });

  it('swaps one label for another, and can show it again', () => {
    expect(checkScript(x)).toEqual([]);
    expect(partShown(stateAt(tl, 3.35).els.d, 'x')).toBe(1);
    const swapped = stateAt(tl, 4.35).els.d;
    expect(partShown(swapped, 'x')).toBe(0);
    expect(partShown(swapped, 'v')).toBeGreaterThan(0.9);
    expect(partShown(swapped, 'ab')).toBe(1);
    expect(partShown(stateAt(tl, 6.8).els.d, 'x')).toBeGreaterThan(0.9);
  });

  it('hides the whole element when it was shown whole', () => {
    expect(stateAt(tl, 6.8).els.t).toBeUndefined();
  });
});

describe('youtubeChapters', () => {
  const tl = (chapters: Array<{ title: string; t: number }>, duration: number) => ({ ...compile(script, durations), chapters, duration });

  it('starts at 0:00 and keeps chapters of ten seconds or more', () => {
    expect(
      youtubeChapters(
        tl(
          [
            { title: 'A', t: 0 },
            { title: 'B', t: 4 },
            { title: 'C', t: 30 },
            { title: 'D', t: 60 },
            { title: 'E', t: 85 },
          ],
          90,
        ),
      ),
    ).toEqual([
      { title: 'B', t: 0 },
      { title: 'C', t: 30 },
      { title: 'D', t: 60 },
    ]);
    expect(youtubeChapters(tl([{ title: 'B', t: 20 }, { title: 'C', t: 40 }], 60))?.[0]).toEqual({ title: 'Introduction', t: 0 });
    expect(youtubeChapters(tl([{ title: 'A', t: 0 }], 60))).toBeNull();
  });
});

describe('checkScript', () => {
  it('accepts a good script and names problems', () => {
    expect(checkScript(script)).toEqual([]);
    const bad: Explainer = { ...script, scenes: [{ layout: 'center', main: [{ kind: 'text', id: 'a', md: 'x' }, { kind: 'text', id: 'a', md: 'y' }], lines: [{ say: ' ', show: 'b' }] }] };
    expect(checkScript(bad)).toEqual(['Scene 1: the id "a" is used twice.', 'Scene 1, line 1 says nothing.', 'Scene 1, line 1: no element "b".']);
  });

  it('asks for a comma in a four-digit whole number, which the voice would read like a year', () => {
    const say = (text: string): Explainer => ({ ...script, scenes: [{ layout: 'center', main: [{ kind: 'text', id: 'a', md: 'x' }], lines: [{ say: text }] }] });
    expect(checkScript(say('A mile is 5280 feet, and an hour is 3600 seconds.'))).toEqual([
      'Scene 1, line 1: write 5280 as 5,280 or in words, or it is read like a year.',
      'Scene 1, line 1: write 3600 as 3,600 or in words, or it is read like a year.',
    ]);
    expect(checkScript(say('A mile is 5,280 feet: about 3141.6, 0.3048 or 7.41666, and 12000 or 26.2.'))).toEqual([]);
  });

  it('asks for braces round a minus after a space or label in maths, which would be set as subtraction', () => {
    const maths = (line: string): Explainer => ({ ...script, scenes: [{ layout: 'center', main: [{ kind: 'math', id: 'm', lines: [line] }], lines: [{ say: 'Hi.', show: 'm' }] }] });
    expect(checkScript(maths('(-3)(-8) = 24 \\qquad -3 + (-8) = -11'))).toEqual(['Scene 1: maths "m.0" has a minus after a space or label; write it in braces ({-5}), or it is set as subtraction.']);
    expect(checkScript(maths('\\text{Last: } -5 \\cdot 4'))).toHaveLength(1);
    expect(checkScript(maths('24 \\qquad {-3} + (-8) = -11 \\quad x - 2'))).toEqual([]);
  });

  it('asks for the variable a in quotes, which the voice would read as the article', () => {
    const say = (text: string): Explainer => ({ ...script, scenes: [{ layout: 'center', main: [{ kind: 'text', id: 'a', md: 'x' }], lines: [{ say: text }] }] });
    expect(checkScript(say('So a to the zero is one.'))).toEqual(['Scene 1, line 1: write the variable a as "a" (in quotes), or it is read as the article.']);
    expect(checkScript(say('So "a" to the zero is one, for a base that is not zero, like a cube.'))).toEqual([]);
    expect(checkScript(say('General form is A x plus B y plus C equals zero.'))).toEqual(['Scene 1, line 1: write the variable A as "A" (in quotes), or it is read as the article.']);
    expect(checkScript(say('A line in general form has slope negative "A" over B.'))).toEqual([]);
  });

  it('asks for "the point at" before coordinates, which could be heard as a decimal', () => {
    const say = (text: string): Explainer => ({ ...script, scenes: [{ layout: 'center', main: [{ kind: 'text', id: 'a', md: 'x' }], lines: [{ say: text }] }] });
    expect(checkScript(say('So x is four: the point four, zero.'))).toEqual(['Scene 1, line 1: say "the point at" before coordinates, or "the point four" can be heard as a decimal.']);
    expect(checkScript(say('So x is four: the point at four, zero. The point is that it works.'))).toEqual([]);
  });

  it('checks that a line points at a screen’s own spots', () => {
    const shot: Explainer = {
      ...script,
      scenes: [
        {
          layout: 'center',
          main: [{ kind: 'screen', id: 'app', shot: 'student-home', url: 'gradileo.com/s', spots: ['due'] }],
          lines: [{ say: 'Hi.', show: 'app', focus: 'app.due' }, { say: 'There.', focus: 'app.coach' }],
        },
      ],
    };
    expect(checkScript(shot)).toEqual(['Scene 1, line 2: screen "app" has no part "coach".']);
  });

  it('checks the points and parts of a diagram', () => {
    const bad: Explainer = {
      ...script,
      scenes: [
        {
          layout: 'center',
          main: [
            {
              kind: 'diagram',
              id: 'd',
              points: { A: [0, 0] },
              items: [
                { kind: 'line', id: 'l', from: 'A', to: 'Z' },
                { kind: 'label', id: 'l', at: 'A', tex: 'a' },
              ],
            },
          ],
          lines: [{ say: 'Hi.', show: 'd.m' }],
        },
      ],
    };
    expect(checkScript(bad)).toEqual(['Scene 1: diagram "d", part "l" uses no point "Z".', 'Scene 1: diagram "d" uses the part id "l" twice.', 'Scene 1, line 1: diagram "d" has no part "m".']);
  });
});

describe('plainMarkdown', () => {
  it('turns tones into bold and drops the colour macros', () => {
    expect(plainMarkdown('The [[opp:opposite]] side, $\\tan\\thc{\\theta} = \\dfrac{\\opp{a}}{\\adj{b}}$')).toBe('The **opposite** side, $\\tan{\\theta} = \\dfrac{{a}}{{b}}$');
  });
});

describe('captions', () => {
  it('leaves out the quotes that make the voice name a letter', () => {
    expect(captionOf({ say: 'So "a" to the zero is one.' })).toBe('So a to the zero is one.');
    expect(captionOf({ say: 'S I units', caption: 'SI units' })).toBe('SI units');
  });

  it('splits long lines into timed two-line captions', () => {
    const text = 'In a right triangle, the side across from the right angle is the hypotenuse. It is always the longest side, and it never touches the right angle.';
    const parts = chunk(text);
    expect(parts.every((p) => p.length <= 84)).toBe(true);
    expect(parts.join(' ')).toBe(text);
    expect(parts[0].endsWith('hypotenuse.')).toBe(true);
    expect(wrap('Short line.')).toBe('Short line.');
    expect(wrap('It is always the longest side, and it never touches it.').split('\n')).toHaveLength(2);
    const cs = captions([{ key: '0.0', say: text, caption: text, start: 1, end: 9 }]);
    expect(cs[0].start).toBe(1);
    expect(cs[cs.length - 1].end).toBeCloseTo(9, 6);
  });

  it('writes WebVTT and SRT', () => {
    const cs = [{ start: 61.5, end: 63.25, text: 'Hello' }];
    expect(toVtt(cs)).toBe('WEBVTT\n\n1\n00:01:01.500 --> 00:01:03.250\nHello\n');
    expect(toSrt(cs)).toBe('1\n00:01:01,500 --> 00:01:03,250\nHello\n');
  });
});
