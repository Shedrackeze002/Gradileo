import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { chain } from './lib/c20-2b-figures.ts';

const NODES = { m: '\\begin{gathered}\\text{mass}\\\\ m\\end{gathered}', n: '\\begin{gathered}\\text{amount}\\\\ n\\end{gathered}', v: '\\begin{gathered}\\text{volume}\\\\ V\\end{gathered}' };

// Mass to volume: divide by the molar mass, then multiply by the molar volume (25.0 g of CO₂ at STP).
const forward = figure(
  'c',
  [
    chain({
      nodes: [
        { id: 'm', tex: NODES.m, tone: 'opp', value: '25.0\\ \\text{g}' },
        { id: 'n', tex: NODES.n, tone: 'brand', value: '0.5681\\ \\text{mol}' },
        { id: 'v', tex: NODES.v, tone: 'adj', value: '12.7\\ \\text{L}' },
      ],
      arrows: [
        { id: 'a1', from: 'm', to: 'n', tex: '\\div M' },
        { id: 'a2', from: 'n', to: 'v', tex: '\\times V_m' },
      ],
    }),
  ],
  250,
);

// Volume to mass: the same path backwards (5.00 L of NH₃ at SATP).
const backward = figure(
  'c',
  [
    chain({
      nodes: [
        { id: 'm', tex: NODES.m, tone: 'opp', value: '3.44\\ \\text{g}' },
        { id: 'n', tex: NODES.n, tone: 'brand', value: '0.2016\\ \\text{mol}' },
        { id: 'v', tex: NODES.v, tone: 'adj', value: '5.00\\ \\text{L}' },
      ],
      arrows: [
        { id: 'b2', from: 'v', to: 'n', tex: '\\div V_m' },
        { id: 'b1', from: 'n', to: 'm', tex: '\\times M' },
      ],
    }),
  ],
  250,
);

const video: Explainer = {
  id: 'c20-2-6-d',
  lessonId: 'c20-2-6',
  title: "Avogadro's Law and Molar Volume, Part 4: Using Molar Volume",
  thumbnailTitle: 'Using Molar Volume',
  thumbnail: 'c',
  summary:
    'Multiply an amount by the molar volume to get litres, V = n × Vm, and divide a volume by it to get moles, n = V/Vm, using 22.4 L/mol at STP and 24.8 L/mol at SATP. Moles connect mass and volume: divide a mass by the molar mass, then multiply by the molar volume, or go the other way to find a mass from a volume.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 4', title: 'Using Molar Volume', subtitle: 'Amount, volume and mass' }],
      lines: [
        { say: 'In part three, you met the molar volume: twenty-two point four litres per mole at S T P, and twenty-four point eight at S A T P.', caption: 'In part three, you met the molar volume: 22.4 L/mol at STP, and 24.8 L/mol at SATP.', show: 'title' },
        { say: 'In this part, you will use it to change between the amount, the volume and the mass of a gas.' },
      ],
    },
    {
      chapter: 'Moles and litres',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['V = n \\times V_m \\qquad n = \\dfrac{V}{V_m}'] },
        {
          kind: 'table',
          id: 'ex',
          head: ['Question', 'Molar volume', 'Working', 'Answer'],
          rows: [
            ['volume of $1.75\\ \\text{mol}$ of $\\ce{N2}$ at STP', '$22.4\\ \\text{L/mol}$', '$1.75 \\times 22.4$', '$39.2\\ \\text{L}$'],
            ['moles in $50.0\\ \\text{L}$ of $\\ce{CO2}$ at SATP', '$24.8\\ \\text{L/mol}$', '$\\dfrac{50.0}{24.8} = 2.016$', '$2.02\\ \\text{mol}$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Let the units decide', md: 'Multiply when you want litres: $\\text{mol} \\times \\text{L/mol} = \\text{L}$. Divide when you want moles: $\\text{L} \\div \\text{L/mol} = \\text{mol}$.' },
      ],
      lines: [
        { say: 'The volume is the amount times the molar volume, and the amount is the volume divided by the molar volume.', show: 'f' },
        { say: 'What volume does one point seven five moles of nitrogen occupy at S T P? Multiply by twenty-two point four litres per mole: thirty-nine point two litres.', caption: 'What volume does 1.75 mol of nitrogen occupy at STP? Multiply by 22.4 L/mol: 39.2 L.', show: 'ex.0', focus: 'ex.0' },
        { say: 'How many moles of carbon dioxide are in fifty point zero litres at S A T P? Divide by twenty-four point eight litres per mole: two point zero two moles.', caption: 'How many moles of carbon dioxide are in 50.0 L at SATP? Divide by 24.8 L/mol: 2.02 mol.', show: 'ex.1', focus: 'ex.1' },
        { say: 'Let the units decide. Moles times litres per mole gives litres, and litres divided by litres per mole gives moles.', show: 'tip', focus: 'ex' },
      ],
    },
    {
      chapter: 'The wrong molar volume',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The wrong molar volume', md: '$22.4\\ \\text{L/mol}$ belongs to STP only. Read the conditions before you choose.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{at SATP: } \\dfrac{50.0}{24.8} = \\good{2.02\\ \\text{mol}}', '\\text{not } \\bad{\\dfrac{50.0}{22.4} = 2.23\\ \\text{mol}}'] },
      ],
      lines: [
        { say: 'Twenty-two point four litres per mole belongs to S T P only. Using it at S A T P would give two point two three moles instead of two point zero two.', caption: '22.4 L/mol belongs to STP only. Using it at SATP would give 2.23 mol instead of 2.02 mol.', show: ['oops', 'm'] },
        { say: 'So read the conditions before you choose a molar volume.' },
      ],
    },
    {
      chapter: 'Mass to volume',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What volume does $25.0\\ \\text{g}$ of carbon dioxide, $\\ce{CO2}$, occupy at STP, to the nearest tenth? At STP the molar volume of a gas is $22.4\\ \\text{L/mol}$. Use C $12.01\\ \\text{g/mol}$, O $16.00\\ \\text{g/mol}$.' },
        forward,
        { kind: 'math', id: 'm', size: 'md', lines: ['M = 12.01 + 2 \\times 16.00 = 44.01\\ \\text{g/mol}', 'n = \\dfrac{25.0}{44.01} = 0.5681\\ \\text{mol} \\qquad V = 0.5681 \\times 22.4 = \\good{12.7\\ \\text{L}}'] },
      ],
      lines: [
        { say: 'Moles connect mass and volume. Divide a mass by the molar mass to get moles, then multiply by the molar volume to get litres.', show: ['c.m', 'c.a1', 'c.n', 'c.a2', 'c.v'] },
        { say: 'What volume does twenty-five point zero grams of carbon dioxide occupy at S T P?', caption: 'What volume does 25.0 g of carbon dioxide occupy at STP?', show: ['q', 'c.m-value'] },
        { say: 'The molar mass of carbon dioxide is twelve point zero one plus two times sixteen point zero zero: forty-four point zero one grams per mole.', caption: 'The molar mass of carbon dioxide is 12.01 + 2 × 16.00: 44.01 g/mol.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-five point zero divided by forty-four point zero one is zero point five six eight one moles. Times twenty-two point four, that is twelve point seven litres.', caption: '25.0 ÷ 44.01 = 0.5681 mol. Times 22.4, that is 12.7 L.', show: ['m.1', 'c.n-value', 'c.v-value'], focus: ['m.1', 'c.v-value'] },
      ],
    },
    {
      chapter: 'Volume to mass',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'What is the mass of $5.00\\ \\text{L}$ of ammonia, $\\ce{NH3}$, at SATP, to the nearest hundredth? At SATP the molar volume of a gas is $24.8\\ \\text{L/mol}$. Use N $14.01\\ \\text{g/mol}$, H $1.01\\ \\text{g/mol}$.' },
        backward,
        { kind: 'math', id: 'm', size: 'md', lines: ['M = 14.01 + 3 \\times 1.01 = 17.04\\ \\text{g/mol}', 'n = \\dfrac{5.00}{24.8} = 0.2016\\ \\text{mol} \\qquad m = 0.2016 \\times 17.04 = \\good{3.44\\ \\text{g}}'] },
      ],
      lines: [
        { say: 'The same path works backwards. What is the mass of five point zero zero litres of ammonia at S A T P?', caption: 'The same path works backwards. What is the mass of 5.00 L of ammonia at SATP?', show: ['q', 'c.v', 'c.v-value'] },
        { say: 'The molar mass of ammonia is fourteen point zero one plus three times one point zero one: seventeen point zero four grams per mole.', caption: 'The molar mass of ammonia is 14.01 + 3 × 1.01: 17.04 g/mol.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the volume by the molar volume: zero point two zero one six moles. Then multiply by the molar mass: three point four four grams.', caption: 'Divide the volume by the molar volume: 0.2016 mol. Then multiply by the molar mass: 3.44 g.', show: ['c.b2', 'c.n', 'c.n-value', 'c.b1', 'c.m', 'c.m-value', 'm.1'], focus: ['m.1', 'c.m-value'] },
        { say: 'Keep the unrounded amount in your calculator between steps, and round only the final answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What volume does $8.00\\ \\text{g}$ of methane, $\\ce{CH4}$, occupy at SATP, to the nearest tenth? At SATP the molar volume of a gas is $24.8\\ \\text{L/mol}$. Use C $12.01\\ \\text{g/mol}$, H $1.01\\ \\text{g/mol}$.',
          choices: ['$11.2\\ \\text{L}$', '$12.4\\ \\text{L}$', '$15.2\\ \\text{L}$', '$198.4\\ \\text{L}$'],
          answer: 1,
          working: '$M = 12.01 + 4 \\times 1.01 = 16.05\\ \\text{g/mol}$, $n = \\dfrac{8.00}{16.05} = 0.4984\\ \\text{mol}$, and $V = 0.4984 \\times 24.8 = 12.4\\ \\text{L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What volume does eight point zero zero grams of methane, C H four, occupy at S A T P? Pause the video and try it.', caption: 'Your turn. What volume does 8.00 g of methane, CH₄, occupy at SATP? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B, twelve point four litres. Methane is sixteen point zero five grams per mole, so there are zero point four nine eight four moles, each filling twenty-four point eight litres. Choice A uses the molar volume at S T P.',
          caption: 'The answer is B, 12.4 L. Methane is 16.05 g/mol, so there are 0.4984 mol, each filling 24.8 L. Choice A uses the molar volume at STP.',
          show: 'q.answer',
        },
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
            '$V = n \\times V_m$ and $n = \\dfrac{V}{V_m}$, with the molar volume for the conditions given.',
            'Mass to volume: divide by $M$, then multiply by $V_m$.',
            'Volume to mass: divide by $V_m$, then multiply by $M$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Multiply an amount by the molar volume to get litres, and divide a volume by it to get moles.', show: 'sum.0' },
        { say: 'Mass to volume: divide by the molar mass, then multiply by the molar volume.', show: 'sum.1' },
        { say: 'Volume to mass: divide by the molar volume, then multiply by the molar mass. Next, the ideal gas law brings all four quantities together.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
