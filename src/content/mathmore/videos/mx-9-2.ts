import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'mx-9-2',
  lessonId: 'mx-9-2',
  title: 'Density and Pressure',
  thumbnail: 'bx',
  summary: 'Density = mass ÷ volume and pressure = force ÷ area are compound measures. A 5 cm by 4 cm by 2 cm block of metal with density 7.8 g/cm³ has a mass of 7.8 × 40 = 312 g, and a crate pushing with 1,200 N on 0.8 m² exerts 1,500 N/m². Remember 1 m² = 10,000 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Proportion and Compound Measures', title: 'Density and Pressure', subtitle: 'Dividing one quantity by another' }],
      lines: [
        { say: 'Speed compares a distance with a time. Density and pressure work the same way. Each is a compound measure, made by dividing one quantity by another.', show: 'title' },
        { say: 'In this video, you will learn to use the formulas for density and pressure, rearrange them, and get the units right.' },
      ],
    },
    {
      chapter: 'Density',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Density', md: 'The mass of each unit of volume. With mass in grams and volume in cm³, density is in g/cm³.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{density} = \\frac{\\text{mass}}{\\text{volume}}', '\\frac{540}{200} = 2.7\\text{ g/cm}^3'] },
      ],
      lines: [
        { say: 'The density of a material is its mass for each unit of volume. A material with a high density, like lead, is heavy for its size.', show: 'def' },
        { say: 'Density equals mass divided by volume. With mass in grams and volume in cubic centimetres, density is in grams per cubic centimetre.', show: 'm.0', focus: 'm.0' },
        { say: 'A piece of stone has a mass of five hundred forty grams and a volume of two hundred cubic centimetres. Its density is five hundred forty divided by two hundred, which is two point seven grams per cubic centimetre.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding a mass',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bx', [box({ l: 5, w: 4, h: 2, labels: { l: '5\\text{ cm}', w: '4\\text{ cm}', h: '2\\text{ cm}' } })], 420)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{mass} = \\text{density} \\times \\text{volume}', 'V = 5 \\times 4 \\times 2 = 40\\text{ cm}^3', '7.8 \\times 40 = 312\\text{ g}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing two metals', md: 'The density of a mix is **not** the average of the two densities. Divide the total mass by the total volume.' },
      ],
      lines: [
        { say: 'The formula rearranges, just like the one for speed. Mass equals density times volume, and volume equals mass divided by density.', show: 'm.0', focus: 'm.0' },
        { say: 'A block of metal is a cuboid five centimetres by four centimetres by two centimetres. Its density is seven point eight grams per cubic centimetre. Find its mass.', show: 'bx' },
        { say: 'First the volume: five times four times two is forty cubic centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Then the mass: seven point eight times forty is three hundred twelve grams.', show: 'm.2', focus: 'm.2' },
        { say: 'When two metals are melted together, the density of the mix is not the average of their densities. Find the total mass and the total volume, then divide.', show: 'oops' },
      ],
    },
    {
      chapter: 'Pressure',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pressure', md: 'The force pushing on each unit of area. Force is measured in **newtons** (N); with area in m², pressure is in N/m², also called pascals.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{pressure} = \\frac{\\text{force}}{\\text{area}}', '\\frac{1{,}200}{0.8} = 1{,}500\\text{ N/m}^2'] },
      ],
      lines: [
        { say: 'Pressure is the force pushing on each unit of area. Force is measured in newtons.', show: 'def' },
        { say: 'Pressure equals force divided by area. With the force in newtons and the area in square metres, pressure is in newtons per square metre, which are also called pascals.', show: 'm.0', focus: 'm.0' },
        { say: 'A crate pushes on the floor with a force of one thousand two hundred newtons, over an area of zero point eight square metres. The pressure is one thousand two hundred divided by zero point eight, which is one thousand five hundred newtons per square metre.', caption: 'A crate pushes on the floor with a force of 1,200 newtons, over an area of 0.8 square metres. The pressure is 1,200 divided by 0.8, which is 1,500 newtons per square metre.', show: 'm.1', focus: 'm.1' },
        { say: 'The same force spread over a bigger area gives a smaller pressure. That is why snowshoes stop you sinking into snow.' },
      ],
    },
    {
      chapter: 'Square centimetres to square metres',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\text{ m}^2 = 100\\text{ cm} \\times 100\\text{ cm} = 10{,}000\\text{ cm}^2', '20\\text{ cm} \\times 50\\text{ cm} = 1{,}000\\text{ cm}^2 = 0.1\\text{ m}^2', '\\frac{300}{0.1} = 3{,}000\\text{ N/m}^2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Divide by 10,000', md: 'To change cm² to m², divide by $10{,}000$, not by $100$.' },
      ],
      lines: [
        { say: 'Areas are often measured in square centimetres, but pressure needs square metres. A square one metre by one metre is one hundred centimetres by one hundred centimetres, so one square metre is ten thousand square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'A box weighing three hundred newtons rests on a face twenty centimetres by fifty centimetres. That face is one thousand square centimetres. Divide by ten thousand: zero point one square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'So the pressure is three hundred divided by zero point one, which is three thousand newtons per square metre.', show: 'm.2', focus: 'm.2' },
        { say: 'To change square centimetres to square metres, divide by ten thousand, not by one hundred.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A piece of wood has a mass of $360$ g and a density of $0.6$ g/cm³. What is its volume?',
          choices: ['$216$ cm³', '$600$ cm³', '$0.0017$ cm³', '$60$ cm³'],
          answer: 1,
          working: 'Volume $= \\dfrac{\\text{mass}}{\\text{density}} = \\dfrac{360}{0.6} = 600$ cm³.',
        },
      ],
      lines: [
        { say: 'Your turn. A piece of wood has a mass of three hundred sixty grams and a density of zero point six grams per cubic centimetre. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Volume is mass divided by density: three hundred sixty divided by zero point six is six hundred cubic centimetres. Choice A multiplies instead.', show: 'q.answer' },
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
          items: ['Density $= \\dfrac{\\text{mass}}{\\text{volume}}$, in g/cm³.', 'Pressure $= \\dfrac{\\text{force}}{\\text{area}}$, in N/m².', 'Rearrange each formula to find the other two quantities.', '$1$ m² $= 10{,}000$ cm².'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Density is mass divided by volume.', show: 'sum.0' },
        { say: 'Pressure is force divided by area.', show: 'sum.1' },
        { say: 'Each formula rearranges to find the other two quantities.', show: 'sum.2' },
        { say: 'And one square metre is ten thousand square centimetres, so check the units before you divide. In the next lesson, we give directions as bearings. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
