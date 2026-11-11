import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-25-2',
  lessonId: 'mx-25-2',
  title: 'Frustums',
  thumbnail: 'm',
  summary: 'A frustum is a cone with its top cut off parallel to the base. Its volume is the whole cone minus the cone removed, and similar triangles give the missing height: x/(x + h) = r/R. For radii 9 and 6 cm and height 5 cm, x = 10 and the volume is 1272.3450 − 376.9911 = 895.35 cm³. The curved surface area is π(R + r)l, with slant height l = √(h² + (R − r)²).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles, Solids and the Earth', title: 'Frustums', subtitle: 'A cone with its top cut off' }],
      lines: [
        { say: 'A bucket, a lampshade and a paper cup all have the same shape: a cone with its point sliced off.', show: 'title' },
        { say: 'In this video, you will learn to find the volume and the surface area of this shape by thinking about the cone it came from.' },
      ],
    },
    {
      chapter: 'What a frustum is',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'g',
          height: 440,
          points: { T: [0, 7.5], L: [-4.5, 0], R: [4.5, 0], l: [-3, 2.5], r: [3, 2.5], M: [0, 0], m: [0, 2.5] },
          items: [
            { kind: 'line', id: 'tl', from: 'l', to: 'T', tone: 'muted', dashed: true },
            { kind: 'line', id: 'tr', from: 'r', to: 'T', tone: 'muted', dashed: true },
            { kind: 'region', id: 'fr', points: ['L', 'R', 'r', 'l'], tone: 'brand', shade: 0.3 },
            { kind: 'line', id: 'base', from: 'L', to: 'R', weight: 3 },
            { kind: 'line', id: 'top', from: 'l', to: 'r', weight: 3 },
            { kind: 'line', id: 'sl', from: 'L', to: 'l', weight: 3 },
            { kind: 'line', id: 'sr', from: 'R', to: 'r', weight: 3, label: 'l' },
            { kind: 'line', id: 'bR', from: 'M', to: 'R', tone: 'opp', label: 'R', labelSide: 'left' },
            { kind: 'line', id: 'br', from: 'm', to: 'r', tone: 'opp', label: 'r', labelSide: 'left' },
            { kind: 'line', id: 'h', from: 'M', to: 'm', tone: 'opp', dashed: true, label: 'h' },
            { kind: 'line', id: 'x', from: 'm', to: 'T', tone: 'muted', dashed: true, label: 'x' },
          ],
        },
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Frustum', md: 'The solid left when the top of a cone or pyramid is cut off by a plane parallel to its base.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['V = \\dfrac{1}{3}\\pi R^2 (x + h) - \\dfrac{1}{3}\\pi r^2 x', '\\dfrac{x}{x + h} = \\dfrac{r}{R}'] },
      ],
      lines: [
        { say: 'A frustum is the solid left when the top of a cone is cut off by a plane parallel to its base. It has two circular ends with radii R and r.', show: ['g.fr', 'g.base', 'g.top', 'g.sl', 'g.sr', 'g.bR', 'g.br', 'g.h', 'def'] },
        { say: 'Put the missing cone back on top. It has height x, and it is similar to the whole cone.', show: ['g.tl', 'g.tr', 'g.x'] },
        { say: 'So the volume of the frustum is the volume of the whole cone minus the volume of the small cone.', show: 'm.0', focus: 'm.0' },
        { say: 'When only the frustum is given, similar triangles give the missing height: x over x plus h equals r over R.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding the volume',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A frustum has radii $9$ cm and $6$ cm and height $5$ cm. Find its volume.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x}{x + 5} = \\dfrac{6}{9} \\ \\Rightarrow \\ 9x = 6x + 30 \\ \\Rightarrow \\ x = 10', '\\dfrac{1}{3}\\pi \\times 9^2 \\times 15 \\approx 1272.3450', '\\dfrac{1}{3}\\pi \\times 6^2 \\times 10 \\approx 376.9911', 'V \\approx 895.35 \\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A frustum has a base radius of nine centimetres, a top radius of six centimetres and a height of five centimetres.', show: 'q' },
        { say: 'Similar triangles give x over x plus five equals six over nine. Cross-multiplying, nine x equals six x plus thirty, so x is ten.', show: 'm.0', focus: 'm.0' },
        { say: 'The whole cone has radius nine and height fifteen, so its volume is about one thousand two hundred and seventy-two point three four five.', show: 'm.1', focus: 'm.1' },
        { say: 'The small cone has radius six and height ten, so its volume is about three hundred and seventy-six point nine nine one one.', show: 'm.2', focus: 'm.2' },
        { say: 'The frustum is the difference, about eight hundred and ninety-five point three five cubic centimetres.', show: 'm.3', focus: 'm.3' },
        { say: 'A cylinder with the average radius would give a smaller, wrong answer. The volume must come from the two cones.' },
      ],
    },
    {
      chapter: 'Surface area',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{curved surface} = \\pi (R + r) l', 'l = \\sqrt{h^2 + (R - r)^2}', 'l = \\sqrt{8^2 + 6^2} = 10', '\\pi \\times 14 \\times 10 + \\pi \\times 10^2 + \\pi \\times 4^2 = 256\\pi \\approx 804.25'] },
      ],
      lines: [
        { say: 'Taking the small cone’s curved surface from the whole cone’s gives a neat result: the curved surface of a frustum is pi times R plus r, times the slant height l.', show: 'm.0', focus: 'm.0' },
        { say: 'When we know the vertical height instead, the slant height is the hypotenuse of a right-angled triangle with sides h and R minus r.', show: 'm.1', focus: 'm.1' },
        { say: 'For radii ten and four centimetres and a height of eight centimetres, the slant height is the square root of sixty-four plus thirty-six, which is ten.', show: 'm.2', focus: 'm.2' },
        { say: 'For a solid frustum, add the two circular ends. The total is two hundred and fifty-six pi, about eight hundred and four point two five square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A frustum has end radii $7$ cm and $4$ cm and slant height $5$ cm. Find its curved surface area.',
          choices: ['$47.12$ cm²', '$109.96$ cm²', '$172.79$ cm²', '$345.58$ cm²'],
          answer: 2,
          working: '$\\pi(R + r)l = \\pi \\times 11 \\times 5 = 55\\pi \\approx 172.79$ cm².',
        },
      ],
      lines: [
        { say: 'Your turn. A frustum has end radii of seven and four centimetres, and a slant height of five centimetres. Find its curved surface area. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Pi times eleven times five is fifty-five pi, about one hundred and seventy-two point seven nine square centimetres. Choice A uses the difference of the radii instead of the sum.', show: 'q.answer' },
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
          items: ['A frustum is a cone with its top cut off parallel to the base.', 'Volume $=$ whole cone $-$ cone removed.', 'Missing height: $\\dfrac{x}{x + h} = \\dfrac{r}{R}$.', 'Curved surface $= \\pi(R + r)l$; add the ends for the total.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A frustum is a cone or pyramid with its top cut off parallel to the base.', show: 'sum.0' },
        { say: 'Its volume is the whole cone minus the cone that was removed.', show: 'sum.1' },
        { say: 'Similar triangles give the height of the missing cone.', show: 'sum.2' },
        { say: 'And the curved surface area is pi times R plus r, times the slant height. Add the two ends for the total surface area. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
