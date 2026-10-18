import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { signChart } from './lib/m31-6-graphs.ts';

const video: Explainer = {
  id: 'm31-6-4-d',
  lessonId: 'm31-6-4',
  title: 'Motion Along a Line, Part 4: Speeding Up or Slowing Down',
  thumbnailTitle: 'Speeding Up or Slowing Down',
  thumbnail: false,
  summary: 'An object speeds up when its velocity and acceleration have the same sign, and slows down when they have opposite signs, so negative acceleration does not always mean slowing down. For s(t) = t³ − 9t² + 24t, comparing the sign charts of v(t) = 3(t − 2)(t − 4) and a(t) = 6(t − 3) shows the particle speeding up on (2, 3) ∪ (4, ∞) and slowing down on [0, 2) ∪ (3, 4).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 4', title: 'Speeding Up or Slowing Down', subtitle: 'Compare the signs of velocity and acceleration' }],
      lines: [
        { say: 'Press the accelerator and a car speeds up. Press the brake and it slows down. But in reverse, pressing the accelerator pushes the car backward, faster and faster.', show: 'title' },
        { say: 'So whether an object speeds up depends on both its velocity and its acceleration. In this video, you will compare their signs.' },
      ],
    },
    {
      chapter: 'Same sign or opposite',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Speeding up and slowing down', md: 'An object is **speeding up** when $v(t)$ and $a(t)$ have the **same** sign, and **slowing down** when they have **opposite** signs.' },
        {
          kind: 'table',
          id: 't',
          head: ['$v$', '$a$', 'Motion'],
          rows: [
            ['$+$', '$+$', 'moving forward, pushed forward: **speeding up**'],
            ['$+$', '$-$', 'moving forward, pushed back: **slowing down**'],
            ['$-$', '$-$', 'moving backward, pushed backward: **speeding up**'],
            ['$-$', '$+$', 'moving backward, pushed forward: **slowing down**'],
          ],
        },
      ],
      lines: [
        { say: 'An object is speeding up when its velocity and acceleration have the same sign, and slowing down when they have opposite signs.', show: 'def' },
        { say: 'If it moves forward, and the acceleration pushes it forward too, it speeds up. If the acceleration pushes back, it slows down.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'If it moves backward, and the acceleration pushes backward too, both are negative, and it speeds up. If the acceleration pushes forward, it slows down.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'What matters is whether the push is in the same direction as the motion.', focus: 't' },
      ],
    },
    {
      chapter: 'Comparing sign charts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['v(t) = 3(t - 2)(t - 4) \\qquad a(t) = 6t - 18 = 6(t - 3)'] },
        figure('sc', [
          signChart({ name: 'v', title: 'v(t)', marks: ['2', '3', '4'], signs: ['+', '-', '-', '+'], width: 15 }),
          signChart({
            name: 'a',
            at: [0, -2.7],
            title: 'a(t)',
            marks: ['2', '3', '4'],
            signs: ['-', '-', '+', '+'],
            notes: ['\\text{slowing}', '\\text{speeding up}', '\\text{slowing}', '\\text{speeding up}'],
            noteTone: 'theta',
            width: 15,
          }),
        ]),
      ],
      lines: [
        { say: 'For the particle at s of t equals t cubed, minus nine t squared, plus 24 t, when is it speeding up? Its velocity is three times t minus two, times t minus four, and its acceleration is six times t minus three.', show: 'm' },
        { say: 'The velocity is positive before two seconds, negative between two and four, and positive after four.', show: ['sc.v-base', 'sc.v-mk0', 'sc.v-mk1', 'sc.v-mk2', 'sc.v-i0', 'sc.v-i1', 'sc.v-i2', 'sc.v-i3'] },
        { say: 'The acceleration is negative before three seconds, and positive after three.', show: ['sc.a-base', 'sc.a-mk0', 'sc.a-mk1', 'sc.a-mk2', 'sc.a-s0', 'sc.a-s1', 'sc.a-s2', 'sc.a-s3'] },
        { say: 'Now compare each interval. The signs match between two and three, both negative, and after four, both positive. So the particle is speeding up on those intervals.', show: ['sc.a-n1', 'sc.a-n3'], focus: ['sc.a-n1', 'sc.a-n3'] },
        { say: 'The signs are opposite before two, and between three and four, so the particle is slowing down there.', show: ['sc.a-n0', 'sc.a-n2'], focus: ['sc.a-n0', 'sc.a-n2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '"Negative acceleration means slowing down"', md: 'Between $2$ and $3$ seconds, the acceleration is negative, yet the particle is **speeding up**: it is moving in the negative direction, and being pushed harder that way. Always compare the signs of $v$ and $a$.' },
      ],
      lines: [
        { say: 'Watch out for a common mistake: thinking that negative acceleration always means slowing down.', show: 'oops' },
        { say: 'Between two and three seconds, the acceleration is negative, yet the particle is speeding up. It is moving in the negative direction, and the acceleration pushes it harder that way.' },
        { say: 'The sign of the acceleration alone does not tell you. Always compare the signs of the velocity and the acceleration.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A particle has position $s(t) = t^{3} - 6t^{2} + 9t$ metres after $t$ seconds, for $t \\ge 0$. When is it speeding up?',
          choices: ['$(1, 2) \\cup (3, \\infty)$', '$(2, \\infty)$', '$[0, 1) \\cup (2, 3)$', '$(3, \\infty)$ only'],
          answer: 0,
          working: '$v(t) = 3(t - 1)(t - 3)$ and $a(t) = 6(t - 2)$. Both are negative on $(1, 2)$ and both positive on $(3, \\infty)$.',
        },
      ],
      lines: [
        { say: 'Your turn. A particle has position s of t equals t cubed, minus six t squared, plus nine t, in metres, after t seconds. When is it speeding up? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The velocity is three times t minus one, times t minus three, and the acceleration is six times t minus two. Both are negative between one and two seconds, and both are positive after three. Choice B looks only at where the acceleration is positive.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$v$ and $a$ with the same sign: **speeding up**.', '$v$ and $a$ with opposite signs: **slowing down**.', 'Compare the sign charts of $v$ and $a$, interval by interval.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the velocity and acceleration have the same sign, the object is speeding up.', show: 'sum.0' },
        { say: 'When they have opposite signs, it is slowing down.', show: 'sum.1' },
        { say: 'So compare the sign charts of the velocity and the acceleration, interval by interval. In the next part, we find how far an object travels. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
