import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'c20-2-4-b',
  lessonId: 'c20-2-4',
  title: "Charles's Law and Gay-Lussac's Law, Part 2: Using Charles's Law",
  thumbnailTitle: "Using Charles's Law",
  thumbnail: false,
  summary:
    "Solve Charles's law for the new volume, V₂ = V₁ × T₂/T₁, with both temperatures in kelvins: 3.50 L at 20 °C becomes 4.28 L at 85 °C. Using Celsius temperatures instead gives 14.9 L, which is far too large, because Celsius temperatures do not start at absolute zero.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 2', title: 'Using Charles’s Law', subtitle: 'Kelvins in, volumes out' }],
      lines: [
        { say: 'Warm the air in a balloon, and it swells. By how much? Charles’s law gives the answer, as long as the temperatures are in kelvins.', show: 'title' },
        { say: 'In this part, you will use Charles’s law to find a new volume, from temperatures in kelvins and in degrees Celsius, and see what goes wrong without kelvins.' },
      ],
    },
    {
      chapter: 'Kelvin temperatures',
      layout: 'center',
      main: [
        { kind: 'math', id: 'law', size: 'lg', lines: ['V_2 = V_1 \\times \\dfrac{T_2}{T_1} \\qquad T_2 = T_1 \\times \\dfrac{V_2}{V_1}'] },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A balloon holds $2.40\\ \\text{L}$ of gas at $300\\ \\text{K}$. At the same pressure, what is its volume at $360\\ \\text{K}$, to the nearest hundredth?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{360}{300} = 1.2', 'V_2 = 2.40 \\times \\dfrac{360}{300} = 2.88\\ \\text{L}'] },
      ],
      lines: [
        { say: 'Solve Charles’s law for the unknown. V two equals V one times T two over T one. Or, for a temperature, T two equals T one times V two over V one. Both temperatures must be in kelvins.', caption: 'Solve Charles’s law for the unknown. V₂ = V₁ × T₂/T₁. Or, for a temperature, T₂ = T₁ × V₂/V₁. Both temperatures must be in kelvins.', show: 'law' },
        { say: 'A balloon holds two point four zero litres of gas at three hundred kelvins. At the same pressure, what is its volume at three hundred sixty kelvins, to the nearest hundredth?', show: 'q' },
        { say: 'The Kelvin temperature is multiplied by three hundred sixty over three hundred, which is one point two. So the volume is multiplied by one point two as well.', show: 'm.0', focus: 'm.0' },
        { say: 'V two equals two point four zero times three hundred sixty over three hundred, which is two point eight eight litres.', caption: 'V₂ = 2.40 × 360/300, which is 2.88 L.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Celsius temperatures',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A gas has a volume of $3.50\\ \\text{L}$ at $20^\\circ\\text{C}$. The pressure stays the same. What is its volume at $85^\\circ\\text{C}$, to the nearest hundredth? Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['T_1 = 20 + 273.15 = 293.15\\ \\text{K}', 'T_2 = 85 + 273.15 = 358.15\\ \\text{K}', 'V_2 = 3.50 \\times \\dfrac{358.15}{293.15} = 4.276\\ldots = 4.28\\ \\text{L}'] },
      ],
      lines: [
        { say: 'Most temperatures are measured in degrees Celsius, so change them to kelvins first. A gas has a volume of three point five zero litres at twenty degrees Celsius. At the same pressure, what is its volume at eighty-five degrees Celsius?', show: 'q' },
        { say: 'T one is twenty plus two hundred seventy-three point one five: two hundred ninety-three point one five kelvins.', show: 'm.0', focus: 'm.0' },
        { say: 'T two is eighty-five plus two hundred seventy-three point one five: three hundred fifty-eight point one five kelvins.', show: 'm.1', focus: 'm.1' },
        { say: 'V two equals three point five zero, times three hundred fifty-eight point one five over two hundred ninety-three point one five. That is four point two seven six, or four point two eight litres to the nearest hundredth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using degrees Celsius',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{3.50 \\times \\dfrac{85}{20} = 14.9\\ \\text{L}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using degrees Celsius', md: 'Celsius temperatures do not start at absolute zero, so the volume is **not proportional** to them. A gas at $0^\\circ\\text{C}$ would even mean dividing by zero. Always change to **kelvins** first.' },
      ],
      lines: [
        { say: 'Here is the mistake to avoid. With Celsius temperatures, three point five zero times eighty-five over twenty is fourteen point nine litres.', show: 'm' },
        { say: 'That is more than four times the volume, when the Kelvin temperature rose by only about a fifth.' },
        { say: 'Celsius temperatures do not start at absolute zero, so the volume is not proportional to them. A gas at zero degrees Celsius would even mean dividing by zero. Always change to kelvins first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gas has a volume of $5.00\\ \\text{L}$ at $15^\\circ\\text{C}$. The pressure stays the same. What is its volume at $75^\\circ\\text{C}$, to the nearest hundredth? Use $T(\\text{K}) = T(^\\circ\\text{C}) + 273.15$.',
          choices: ['$25.00\\ \\text{L}$', '$4.14\\ \\text{L}$', '$6.04\\ \\text{L}$', '$1.00\\ \\text{L}$'],
          answer: 2,
          working: '$T_1 = 288.15\\ \\text{K}$ and $T_2 = 348.15\\ \\text{K}$. $V_2 = 5.00 \\times \\dfrac{348.15}{288.15} = 6.04\\ \\text{L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A gas has a volume of five point zero zero litres at fifteen degrees Celsius. The pressure stays the same. What is its volume at seventy-five degrees Celsius, to the nearest hundredth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, six point zero four litres. In kelvins, the temperatures are two hundred eighty-eight point one five and three hundred forty-eight point one five. Choice A uses the Celsius temperatures, and five times the volume is far too much.', show: 'q.answer' },
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
          items: [
            'Charles’s law: $V_2 = V_1 \\times \\dfrac{T_2}{T_1}$.',
            'Change Celsius temperatures to kelvins first: add $273.15$.',
            'Using Celsius temperatures gives a wrong answer, or even a division by zero.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Charles’s law gives the new volume: V two equals V one times T two over T one.', caption: 'Let’s sum up. Charles’s law gives the new volume: V₂ = V₁ × T₂/T₁.', show: 'sum.0' },
        { say: 'Change Celsius temperatures to kelvins first, by adding two hundred seventy-three point one five.', show: 'sum.1' },
        { say: 'Using Celsius temperatures gives a wrong answer, or even a division by zero. In part three, you will heat a gas that cannot expand, with Gay-Lussac’s law. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
