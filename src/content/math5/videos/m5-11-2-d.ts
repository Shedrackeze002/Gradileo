import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from './lib/m5-11-figures.ts';

// Spiders and their legs: 8 legs for each spider.
const spiders = () => figure('sp', [valueTable({ x: { title: '\\text{Spiders}', values: [1, 2, 3, 4] }, y: { title: '\\text{Legs}', values: [8, 16, 24, 32] }, dy: ['+8', '+8', '+8'], titleW: 2.8, cellW: 1.5 })], 320);

const video: Explainer = {
  id: 'm5-11-2-d',
  lessonId: 'm5-11-2',
  title: 'Rules and Missing Terms, Part 4: Working Forward and Backward',
  thumbnailTitle: 'Forward and Backward',
  thumbnail: 'sp',
  summary: 'Spiders have 8 legs, so the number of legs for n spiders is 8n. Working forward, 15 spiders have 8 × 15 = 120 legs; working backward, 96 legs belong to 96 ÷ 8 = 12 spiders. To go back, undo the rule: divide if it multiplies, subtract if it adds.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Arithmetic Sequences · Part 4', title: 'Working Forward and Backward', subtitle: 'Solving problems with sequences' }],
      lines: [
        { say: 'Let’s go back to the spiders. How many legs do fifteen spiders have? And how many spiders have ninety-six legs altogether?', show: 'title' },
        { say: 'In this video, you will use a rule to work forward, from a position to its term, and backward, from a term to its position.' },
      ],
    },
    {
      chapter: 'Spiders and legs',
      layout: 'split',
      leftWidth: 660,
      left: [spiders()],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{position} = \\text{spiders}', '\\text{term} = \\text{legs}', '\\text{legs} = 8 \\times \\text{spiders}', '8n'] }],
      lines: [
        { say: 'A spider has eight legs. One spider has eight legs, two spiders have sixteen, and three spiders have twenty-four.', show: ['sp.frame', 'sp.xs', 'sp.ys', 'sp.dys'] },
        { say: 'This is a sequence as well, in disguise. The number of spiders is the position, and the number of legs is the term.', show: ['m.0', 'm.1'], focus: ['sp.xs', 'sp.ys'] },
        { say: 'Compare each term with its own position. Eight is eight times one, sixteen is eight times two, and so on. So the number of legs is eight times the number of spiders.', show: 'm.2', focus: 'm.2' },
        { say: 'As an expression, that is eight n, where n is the number of spiders.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Working forward',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '(a) How many legs do $15$ spiders have?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['8n \\;\\to\\; 8 \\times 15', '8 \\times 10 = 80, \\quad 8 \\times 5 = 40', '80 + 40 = 120 \\text{ legs}'] },
      ],
      lines: [
        { say: 'First question: how many legs do fifteen spiders have? Here we know the position, fifteen, and we want the term.', show: 'q' },
        { say: 'Use the rule, with n equal to fifteen. That gives eight times fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Split fifteen into ten and five. Eight times ten is eighty, and eight times five is forty.', show: 'm.1', focus: 'm.1' },
        { say: 'Eighty plus forty is one hundred and twenty. So fifteen spiders have one hundred and twenty legs. That is working forward.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '(b) How many spiders have $96$ legs in all?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['8 \\times n = 96', 'n = 96 \\div 8', '8 \\times 10 = 80, \\quad 96 - 80 = 16, \\quad 8 \\times 2 = 16', 'n = 12 \\quad \\text{Check: } 8 \\times 12 = 96 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Second question: how many spiders have ninety-six legs in all? This time we know the term, ninety-six, and we want the position.', show: 'q' },
        { say: 'The rule says eight times the number of spiders is ninety-six. To go back, undo multiplying by eight. Divide by eight.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Divide in friendly chunks. Eight tens are eighty, and that leaves sixteen. Sixteen is two more eights.', show: 'm.2', focus: 'm.2' },
        { say: 'Ten plus two is twelve. So twelve spiders have ninety-six legs. Check: eight times twelve is ninety-six. That is working backward.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Undo the rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Work backwards', md: 'If the rule **multiplies**, divide to go back. If the rule **adds**, subtract to go back.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['8n = 96 \\;\\to\\; 96 \\div 8 = 12', 'n + 10 = 45 \\;\\to\\; 45 - 10 = 35'] },
      ],
      lines: [
        { say: 'Here is the big idea. To work backward, undo the rule. If the rule multiplies, divide to go back.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'If the rule adds, subtract to go back. For example, with the rule n plus ten, which position has the term forty-five?', show: 'm.1', focus: 'm.1' },
        { say: 'Undo adding ten by subtracting ten. Forty-five minus ten is thirty-five. Check: thirty-five plus ten is forty-five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The terms of a sequence follow the rule $n + 9$. Which position has the term $30$?',
          choices: ['$39$', '$21$', '$270$', '$20$'],
          answer: 1,
          working: 'The rule adds $9$, so subtract $9$ to go back: $30 - 9 = 21$. Check: $21 + 9 = 30$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. The terms of a sequence follow the rule n plus nine. Which position has the term thirty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, position twenty-one. The rule adds nine, so subtract nine to go back: thirty minus nine is twenty-one. Check: twenty-one plus nine is thirty. Choice A adds nine instead of undoing it.', show: 'q.answer' },
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
          items: ['Working forward: put the position in the rule to find the term.', 'Working backward: undo the rule to find the position.', 'If the rule multiplies, divide. If it adds, subtract. Then check.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To work forward, put the position into the rule, and you get the term.', show: 'sum.0' },
        { say: 'To work backward, undo the rule, and you get the position.', show: 'sum.1' },
        { say: 'If the rule multiplies, divide. If it adds, subtract. And always check your answer. Great work with sequences!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
