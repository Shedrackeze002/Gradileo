import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { container, tag } from './lib/c20-2b-figures.ts';

// The container before and after gas is added: the added molecules in green.
const adding = figure(
  'f',
  [
    container({ name: 'a', at: [0, 0], w: 3.2, h: 2.94, lid: 'piston', count: 6, seed: 4 }),
    tag('a-label', [1.6, -0.3], '\\begin{gathered} 0.40\\ \\text{mol} \\\\ 9.8\\ \\text{L} \\end{gathered}', { place: 'below' }),
    container({ name: 'b', at: [4.8, 0], w: 3.2, h: 4.95, lid: 'piston', count: 10, seed: 9, added: { count: 4, tone: 'good' } }),
    tag('b-label', [6.4, -0.3], '\\begin{gathered} 0.673\\ \\text{mol} \\\\ 16.5\\ \\text{L} \\end{gathered}', { place: 'below' }),
  ],
  500,
);

const video: Explainer = {
  id: 'c20-2-6-b',
  lessonId: 'c20-2-6',
  title: "Avogadro's Law and Molar Volume, Part 2: More or Less Gas",
  thumbnailTitle: 'More or Less Gas',
  thumbnail: 'f',
  summary:
    "Avogadro's law, V₂ = V₁ × n₂/n₁, works for any ratio of amounts: check that less gas takes up less room. To find how much gas to add to reach a new volume, find the new total amount first, then subtract the amount already in the container.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forms of Matter: Gases · Part 2', title: 'More or Less Gas', subtitle: "Using Avogadro's law" }],
      lines: [
        { say: 'In part one, you saw that at the same temperature and pressure, the volume of a gas is directly proportional to the amount of gas.', show: 'title' },
        { say: 'In this part, you will use Avogadro’s law when the amounts are not simple multiples, and find how much gas to add to reach a new volume.' },
      ],
    },
    {
      chapter: 'A smaller amount',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A flexible container holds $1.25\\ \\text{mol}$ of gas in $30.5\\ \\text{L}$. At the same temperature and pressure, what volume would $0.60\\ \\text{mol}$ of the gas occupy, to the nearest tenth?' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['V_2 = V_1 \\times \\dfrac{n_2}{n_1} = 30.5 \\times \\dfrac{0.60}{1.25} = 14.64\\ \\text{L}', '\\text{Check: } 0.60 < \\tfrac{1}{2} \\times 1.25 \\text{ and } 14.6 < \\tfrac{1}{2} \\times 30.5 \\ \\good{\\checkmark}', 'V_2 = \\good{14.6\\ \\text{L}}'],
        },
      ],
      lines: [
        {
          say: 'The ratio of the amounts need not be a whole number. A flexible container holds one point two five moles of gas in thirty point five litres. What volume would zero point six zero moles occupy, at the same temperature and pressure?',
          caption: 'The ratio of the amounts need not be a whole number. A flexible container holds 1.25 mol of gas in 30.5 L. What volume would 0.60 mol occupy, at the same temperature and pressure?',
          show: 'q',
        },
        { say: 'Use the same equation. Thirty point five, times zero point six zero over one point two five, is fourteen point six four litres.', caption: 'Use the same equation. 30.5 × 0.60/1.25 = 14.64 L.', show: 'm.0', focus: 'm.0' },
        {
          say: 'Check that the answer moves the right way: less gas must take up less room. Zero point six zero moles is less than half of one point two five, and fourteen point six litres is less than half of thirty point five.',
          caption: 'Check that the answer moves the right way: less gas must take up less room. 0.60 mol is less than half of 1.25 mol, and 14.6 L is less than half of 30.5 L.',
          show: 'm.1',
          focus: 'm.1',
        },
        { say: 'So the gas occupies fourteen point six litres, to the nearest tenth.', caption: 'So the gas occupies 14.6 L, to the nearest tenth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How much gas to add',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A flexible container holds $0.40\\ \\text{mol}$ of gas in $9.8\\ \\text{L}$. How many moles of gas must be **added** to make its volume $16.5\\ \\text{L}$ at the same temperature and pressure? Give the answer to the nearest thousandth.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['n_2 = n_1 \\times \\dfrac{V_2}{V_1} = 0.40 \\times \\dfrac{16.5}{9.8} = 0.673\\ \\text{mol}', '\\text{added} = 0.673 - 0.40 = \\good{0.273\\ \\text{mol}}'],
        },
      ],
      lines: [
        {
          say: 'Sometimes you need the amount of gas to add. A flexible container holds zero point four zero moles of gas in nine point eight litres. How many moles must be added to make its volume sixteen point five litres?',
          caption: 'Sometimes you need the amount of gas to add. A flexible container holds 0.40 mol of gas in 9.8 L. How many moles must be added to make its volume 16.5 L?',
          show: 'q',
        },
        { say: 'First, find the total amount the new volume needs. n two equals n one, times V two over V one. That is zero point six seven three moles.', caption: 'First, find the total amount the new volume needs. n₂ = n₁ × V₂/V₁. That is 0.673 mol.', show: 'm.0', focus: 'm.0' },
        { say: 'Then subtract what is already there. Zero point six seven three minus zero point four zero is zero point two seven three moles.', caption: 'Then subtract what is already there. 0.673 − 0.40 = 0.273 mol.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The total is not the amount added',
      layout: 'split',
      leftWidth: 600,
      left: [adding],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The total is not the amount added', md: '$0.673\\ \\text{mol}$ is what the container holds **after** the gas is added. Subtract the $0.40\\ \\text{mol}$ that was there to begin with: $0.273\\ \\text{mol}$ is added.' },
      ],
      lines: [
        { say: 'Here is the container before the gas is added: zero point four zero moles in nine point eight litres.', caption: 'Here is the container before the gas is added: 0.40 mol in 9.8 L.', show: ['f.a-box', 'f.a-piston', 'f.a-p', 'f.a-label'] },
        { say: 'Afterwards, it holds zero point six seven three moles in sixteen point five litres. That is the total, not the amount added.', caption: 'Afterwards, it holds 0.673 mol in 16.5 L. That is the total, not the amount added.', show: ['f.b-box', 'f.b-piston', 'f.b-p', 'f.b-new', 'f.b-label'], focus: ['f.b-p', 'f.b-new'] },
        { say: 'The question asks how much is added, so subtract the zero point four zero moles that were there to begin with.', caption: 'The question asks how much is added, so subtract the 0.40 mol that was there to begin with.', show: 'oops', focus: 'f.b-new' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A flexible container holds $0.50\\ \\text{mol}$ of gas in $12.0\\ \\text{L}$. How many moles of gas must be added to make its volume $18.0\\ \\text{L}$ at the same temperature and pressure? Give the answer to the nearest hundredth.',
          choices: ['$0.75\\ \\text{mol}$', '$0.33\\ \\text{mol}$', '$0.25\\ \\text{mol}$', '$1.25\\ \\text{mol}$'],
          answer: 2,
          working: 'The total needed is $n_2 = 0.50 \\times \\dfrac{18.0}{12.0} = 0.75\\ \\text{mol}$, so $0.75 - 0.50 = 0.25\\ \\text{mol}$ must be added.',
        },
      ],
      lines: [
        {
          say: 'Your turn. A flexible container holds zero point five zero moles of gas in twelve point zero litres. How many moles must be added to make its volume eighteen point zero litres? Pause the video and try it.',
          caption: 'Your turn. A flexible container holds 0.50 mol of gas in 12.0 L. How many moles must be added to make its volume 18.0 L? Pause the video and try it.',
          show: 'q',
          wait: 6,
        },
        { say: 'The answer is C, zero point two five moles. The new volume needs zero point seven five moles in total, and zero point five zero are already there. Choice A is the total, not the amount added.', caption: 'The answer is C, 0.25 mol. The new volume needs 0.75 mol in total, and 0.50 mol is already there. Choice A is the total, not the amount added.', show: 'q.answer' },
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
            '$V_2 = V_1 \\times \\dfrac{n_2}{n_1}$ works for any ratio of amounts.',
            'Check the direction: less gas takes up less room.',
            'To find the gas to add, find the new total amount, then subtract the amount already there.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. V two equals V one times n two over n one, for any ratio of amounts.', caption: 'Let’s sum up. V₂ = V₁ × n₂/n₁, for any ratio of amounts.', show: 'sum.0' },
        { say: 'Check the direction: less gas takes up less room.', show: 'sum.1' },
        { say: 'To find the gas to add, find the new total, then subtract what is already there. In part three, you will recap the mole and meet the molar volume. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
