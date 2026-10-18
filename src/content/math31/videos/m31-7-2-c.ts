import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { shadow, tank } from './lib/m31-7-figures.ts';

// A 6 m light, a 1.8 m walker at 1.4 m/s: s = (3/7)x, so ds/dt = 0.6 m/s.
// A cone (top radius 2 m, height 6 m) filling at 2 m³/min: V = πh³/27, so dh/dt = 2/π m/min at h = 3.
const light = () => figure('sh', [shadow({ pole: 6, person: 1.8, x: 7, labels: { pole: '6\\text{ m}', person: '1.8\\text{ m}', x: 'x', s: 's', walk: '1.4\\text{ m/s}' } })]);
const cone = () => figure('tk', [tank({ R: 2, H: 6, h: 3, labels: { R: '2\\text{ m}', H: '6\\text{ m}', r: 'r', h: 'h', flow: '2\\text{ m}^3/\\text{min}' } })]);

const video: Explainer = {
  id: 'm31-7-2-c',
  lessonId: 'm31-7-2',
  title: 'Related Rates, Part 3: Similar Triangles, a Shadow and a Tank',
  thumbnailTitle: 'A Shadow and a Filling Tank',
  thumbnail: 'tk',
  summary: 'Similar triangles link two quantities in a fixed ratio. A walker 1.8 m tall moving away from a 6 m street light at 1.4 m/s casts a shadow s = (3/7)x, which lengthens at 0.6 m/s wherever the walker is. In a conical tank with top radius 2 m and height 6 m, r = h/3, so V = πh³/27; filling at 2 m³/min, the level rises at 2/π ≈ 0.637 m/min when the water is 3 m deep.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Optimization and Related Rates · Part 3', title: 'A Shadow and a Filling Tank', subtitle: 'Similar triangles in related rates' }],
      lines: [
        { say: 'Walk away from a street light at night, and your shadow stretches out in front of you. Pour water into a cone-shaped tank, and the level rises, fast at first, then more slowly.', show: 'title' },
        { say: 'In this video, you will use similar triangles to find how fast a shadow lengthens, and how fast the water rises in a cone.' },
      ],
    },
    {
      chapter: 'A lengthening shadow',
      layout: 'split',
      leftWidth: 600,
      left: [light()],
      right: [{ kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A street light is at the top of a $6$ m pole. Dakota, who is $1.8$ m tall, walks away from the pole at $1.4$ m/s. How fast is Dakota’s shadow lengthening?' }],
      lines: [
        { say: 'A street light is at the top of a six metre pole. Dakota, who is 1.8 metres tall, walks away from the pole at 1.4 metres per second. How fast is Dakota’s shadow lengthening?', show: ['sh.ground', 'sh.pole', 'sh.pole-h', 'sh.walker', 'p'] },
        { say: 'The light’s ray passes just over Dakota’s head and meets the ground at the tip of the shadow.', show: 'sh.ray', focus: 'sh.ray' },
        { say: 'Two lengths change. Let x be Dakota’s distance from the pole, and s the length of the shadow. We know d x by d t is 1.4, and we want d s by d t.', show: ['sh.x', 'sh.s', 'sh.walk'], focus: ['sh.x', 'sh.s'] },
      ],
    },
    {
      chapter: 'Similar triangles',
      layout: 'split',
      leftWidth: 600,
      left: [light()],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{6}{x + s} = \\dfrac{1.8}{s}', '6s = 1.8x + 1.8s', '4.2s = 1.8x \\;\\Rightarrow\\; s = \\dfrac{3}{7}x', '\\dfrac{ds}{dt} = \\dfrac{3}{7}\\,\\dfrac{dx}{dt} = \\dfrac{3}{7}(1.4) = 0.6'] },
      ],
      lines: [
        { say: 'Look at the two triangles. The big one has the pole as its height, and its base runs from the pole to the tip of the shadow: x plus s. The small one has Dakota as its height, and the shadow, s, as its base.', show: ['sh', 'sh.big', 'sh.small'], focus: ['sh.big', 'sh.small'] },
        { say: 'Both triangles have a right angle, and they share the angle at the tip, so they are similar. Their heights and bases are in the same ratio: six over x plus s equals 1.8 over s.', show: 'm.0', focus: 'm.0' },
        { say: 'Cross-multiply: six s equals 1.8 x plus 1.8 s. Take 1.8 s from both sides: 4.2 s equals 1.8 x. So s equals 1.8 over 4.2 times x, which is three sevenths x.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Now differentiate with respect to t: d s by d t equals three sevenths of d x by d t. That is three sevenths of 1.4, which is 0.6.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'Answer', md: 'The shadow lengthens at $0.6$ m/s, however far Dakota is from the pole.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{tip of the shadow: } \\dfrac{d(x + s)}{dt} = 1.4 + 0.6 = 2'] },
      ],
      lines: [
        { say: 'So the shadow lengthens at 0.6 metres per second. The answer has no x in it, so the shadow lengthens at the same rate however far Dakota is from the pole.', show: 'ans' },
        { say: 'And the tip of the shadow is x plus s from the pole, so it moves at 1.4 plus 0.6: two metres per second, faster than Dakota walks.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Filling a conical tank',
      layout: 'split',
      leftWidth: 520,
      left: [cone()],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A tank is a cone, vertex down, with a top radius of $2$ m and a height of $6$ m. Water flows in at $2$ m³/min. How fast is the water level rising when the water is $3$ m deep?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = \\tfrac{1}{3}\\pi r^2 h', '\\dfrac{r}{h} = \\dfrac{2}{6} \\;\\Rightarrow\\; r = \\dfrac{h}{3}'] },
      ],
      lines: [
        { say: 'A tank is a cone with its vertex down. Its top radius is two metres, and its height is six metres. Water flows in at two cubic metres per minute. How fast is the water level rising when the water is three metres deep?', show: ['tk.tank', 'tk.axis', 'tk.R', 'tk.H', 'tk.flow', 'p'] },
        { say: 'The water itself is a smaller cone. Call its depth h and the radius of its surface r. We know d V by d t is two, and we want d h by d t when h is three.', show: ['tk.water', 'tk.r', 'tk.h'], focus: ['tk.r', 'tk.h'] },
        { say: 'The volume of a cone is one third pi r squared h. But that has two changing quantities, r and h, and we only know about h.', show: 'm.0', focus: 'm.0' },
        { say: 'Similar triangles link them. The water cone has the same shape as the tank, so r over h equals two over six. That means r equals h over three, at every depth.', show: 'm.1', focus: ['m.1', 'tk.r', 'tk.R'] },
      ],
    },
    {
      chapter: 'Eliminate, then differentiate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['V = \\tfrac{1}{3}\\pi\\left(\\dfrac{h}{3}\\right)^2 h = \\dfrac{\\pi}{27}h^3', '\\dfrac{dV}{dt} = \\dfrac{\\pi}{9}h^2\\,\\dfrac{dh}{dt}', '2 = \\dfrac{\\pi}{9}(3)^2\\,\\dfrac{dh}{dt} = \\pi\\,\\dfrac{dh}{dt}', '\\dfrac{dh}{dt} = \\dfrac{2}{\\pi} \\approx 0.637\\text{ m/min}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Eliminate before you differentiate', md: 'Replacing $r$ with $\\dfrac{h}{3}$ first leaves one variable to differentiate.' },
      ],
      lines: [
        { say: 'Replace r with h over three before differentiating. The volume becomes one third pi, times h over three squared, times h: pi over 27, times h cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate with respect to t. Three times pi over 27 is pi over nine, so d V by d t equals pi over nine, h squared, d h by d t.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute d V by d t equals two and h equals three. Pi over nine, times nine, is pi, so two equals pi times d h by d t.', show: 'm.2', focus: 'm.2' },
        { say: 'So d h by d t equals two over pi: the water level is rising at about 0.637 metres per minute.', show: 'm.3', focus: 'm.3' },
        { say: 'The key move was to eliminate r before differentiating, so only one variable was left. As the cone widens, the same flow spreads over a bigger surface, so the level rises more slowly as the tank fills.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A conical tank, vertex down, has a top radius of $3$ m and a height of $6$ m. Water flows in at $4$ m³/min. How fast is the level rising when the water is $2$ m deep?',
          choices: ['$\\dfrac{4}{\\pi}$ m/min', '$\\dfrac{1}{4\\pi}$ m/min', '$\\dfrac{2}{\\pi}$ m/min', '$\\pi$ m/min'],
          answer: 0,
          working: '$r = \\dfrac{h}{2}$, so $V = \\dfrac{\\pi}{12}h^3$ and $\\dfrac{dV}{dt} = \\dfrac{\\pi}{4}h^2\\dfrac{dh}{dt}$. Then $4 = \\dfrac{\\pi}{4}(4)\\dfrac{dh}{dt}$, so $\\dfrac{dh}{dt} = \\dfrac{4}{\\pi} \\approx 1.27$ m/min.',
        },
      ],
      lines: [
        { say: 'Your turn. A conical tank, vertex down, has a top radius of three metres and a height of six metres. Water flows in at four cubic metres per minute. How fast is the level rising when the water is two metres deep? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Similar triangles give r over h equals three over six, so r is h over two. Then V is one third pi, times h over two squared, times h, which is pi over twelve h cubed.', show: 'q.answer' },
        { say: 'Differentiate: d V by d t equals pi over four, h squared, d h by d t. With h equals two, four equals pi times d h by d t, so the level rises at four over pi, about 1.27 metres per minute. Choice B uses r equals two h: the ratio upside down.' },
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
          items: ['Similar triangles link two quantities in a fixed ratio.', 'Use the ratio to eliminate one variable **before** differentiating.', 'A shadow: $s = \\dfrac{3}{7}x$, so $\\dfrac{ds}{dt} = \\dfrac{3}{7}\\dfrac{dx}{dt}$.', 'A cone: $r = \\dfrac{h}{3}$, so $V = \\dfrac{\\pi}{27}h^3$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When two quantities stay in a fixed ratio, similar triangles give an equation that links them.', show: 'sum.0' },
        { say: 'Use that ratio to eliminate one variable before you differentiate.', show: 'sum.1' },
        { say: 'For the shadow, s was three sevenths of x, so it lengthened at three sevenths of Dakota’s speed.', show: 'sum.2' },
        { say: 'And for the cone, r was h over three, so the volume was pi over 27 h cubed. In the next part, we find how fast two cars move apart, and how fast an angle changes. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
