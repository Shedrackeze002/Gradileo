import type { DiagramEl, Explainer } from '@/video/script.ts';

/** The frequency tree for 80 museum visitors: adults and children, then bought a ticket or not. */
const tree = (id: string, height: number): DiagramEl => ({
  kind: 'diagram',
  id,
  height,
  points: { PAD: [10.8, 4], R: [0, 4], A: [4, 6], C: [4, 2], AB: [8.4, 7], AN: [8.4, 5], CB: [8.4, 3], CN: [8.4, 1] },
  items: [
    { kind: 'label', id: 'root', at: 'R', tex: '80', place: 'left', dot: true },
    { kind: 'line', id: 'ra', from: 'R', to: 'A', tone: 'muted', group: 'adults' },
    { kind: 'label', id: 'a', at: 'A', tex: '\\text{Adults: } 50', place: 'above', dot: true, tone: 'adj', group: 'adults' },
    { kind: 'line', id: 'rc', from: 'R', to: 'C', tone: 'muted', group: 'children' },
    { kind: 'label', id: 'c', at: 'C', tex: '\\text{Children: } 30', place: 'below', dot: true, tone: 'opp', group: 'children' },
    { kind: 'line', id: 'aab', from: 'A', to: 'AB', tone: 'muted', group: 'ab' },
    { kind: 'label', id: 'abl', at: 'AB', tex: '\\text{Bought: } 20', place: 'right', dot: true, group: 'ab' },
    { kind: 'line', id: 'aan', from: 'A', to: 'AN', tone: 'muted', group: 'an' },
    { kind: 'label', id: 'anl', at: 'AN', tex: '\\text{Did not: } 30', place: 'right', dot: true, group: 'an' },
    { kind: 'line', id: 'ccb', from: 'C', to: 'CB', tone: 'muted', group: 'cb' },
    { kind: 'label', id: 'cbl', at: 'CB', tex: '\\text{Bought: } 18', place: 'right', dot: true, group: 'cb' },
    { kind: 'line', id: 'ccn', from: 'C', to: 'CN', tone: 'muted', group: 'cn' },
    { kind: 'label', id: 'cnl', at: 'CN', tex: '\\text{Did not: } 12', place: 'right', dot: true, group: 'cn' },
  ],
});

const whole = (id: string) => ['root', 'adults', 'children', 'ab', 'an', 'cb', 'cn'].map((p) => `${id}.${p}`);

const video: Explainer = {
  id: 'mx-11-1',
  lessonId: 'mx-11-1',
  title: 'Frequency Trees',
  thumbnail: 't',
  summary: 'A frequency tree splits a total into groups, then splits each group again, and the branches from each point add up to the number there. Of 80 museum visitors, 50 adults (20 bought a ticket) and 30 children (18 bought one): P(adult who bought) = 20/80 = 1/4, and P(child, given they bought) = 18/38 = 9/19.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency Trees, Histograms and Cumulative Frequency', title: 'Frequency Trees', subtitle: 'Sorting a group twice' }],
      lines: [
        { say: 'When a group of people is sorted twice, first one way and then another, a frequency tree keeps track of every count at once.', show: 'title' },
        { say: 'In this video, you will learn to complete a frequency tree, and to read probabilities from it.' },
      ],
    },
    {
      chapter: 'What a frequency tree is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Frequency tree', md: 'Shows how a total splits into groups, and how each group splits again. Each number is a count, and the branches from each point **add up** to the number at that point.' },
      ],
      lines: [
        { say: 'A frequency tree shows how a total splits into groups, and how each group splits again. Each number is a count, and the branches coming out of a point always add up to the number at that point.', show: 'def' },
      ],
    },
    {
      chapter: 'Completing a tree',
      layout: 'split',
      leftWidth: 820,
      left: [tree('t', 480)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['80 - 30 = 50', '50 - 20 = 30', '30 - 18 = 12'] },
      ],
      lines: [
        { say: 'Eighty people visited a museum, and thirty of them were children. Twenty of the adults and eighteen of the children bought a ticket for a special exhibition. Let’s complete the tree.', show: ['t.root', 't.children'] },
        { say: 'The first split is adults and children. Eighty take away thirty gives fifty adults.', show: ['t.adults', 'm.0'], focus: ['t.a', 'm.0'] },
        { say: 'Then each group splits by whether they bought a ticket. Twenty adults bought one, so fifty take away twenty, which is thirty, did not.', show: ['t.ab', 't.an', 'm.1'], focus: ['t.anl', 'm.1'] },
        { say: 'Eighteen children bought one, so thirty take away eighteen, which is twelve, did not.', show: ['t.cb', 't.cn', 'm.2'], focus: ['t.cnl', 'm.2'] },
      ],
    },
    {
      chapter: 'Fractions and percentages',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{3}{5} \\text{ of } 80 = \\tfrac{80}{5} \\times 3 = 48', '25\\% \\text{ of } 48 = 0.25 \\times 48 = 12'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Counts are whole numbers', md: 'Work out each count before you put it on the tree. Every number on a frequency tree must be a whole number.' },
      ],
      lines: [
        { say: 'Sometimes the information is a fraction or a percentage. Work out the count first. Three fifths of eighty is eighty divided by five, times three, which is forty eight.', show: 'm.0', focus: 'm.0' },
        { say: 'And twenty five percent of forty eight is zero point two five times forty eight, which is twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Every number on a frequency tree is a count, so it must be a whole number. If you get a decimal, check your working.', show: 'tip' },
      ],
    },
    {
      chapter: 'Probabilities',
      layout: 'split',
      leftWidth: 820,
      left: [tree('p', 480)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\frac{20}{80} = \\frac{1}{4}', '20 + 18 = 38', '\\frac{18}{38} = \\frac{9}{19}'] },
      ],
      lines: [
        { say: 'The probability of choosing someone from a group is the count for that group, divided by the total we are choosing from.', show: whole('p') },
        { say: 'A visitor is chosen at random. What is the probability that they are an adult who bought a ticket? Twenty of the eighty visitors are, so it is twenty over eighty, which is one quarter.', show: 'm.0', focus: ['p.abl', 'm.0'] },
        { say: 'Now one of the visitors who bought a ticket is chosen. We are choosing only from them, so the total changes. Twenty plus eighteen, which is thirty eight, bought a ticket.', show: 'm.1', focus: ['p.abl', 'p.cbl', 'm.1'] },
        { say: 'Eighteen of them are children, so the probability that it is a child is eighteen over thirty eight, which simplifies to nine nineteenths.', show: 'm.2', focus: ['p.cbl', 'm.2'] },
      ],
    },
    {
      chapter: 'The right total',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the wrong total', md: '"One of the visitors **who bought a ticket**" means we choose from the $38$ who bought one, not from all $80$.' },
      ],
      lines: [
        { say: 'Read the question carefully to see which group we choose from. One of the visitors who bought a ticket means the total is thirty eight, not eighty. Dividing by eighty is a common mistake.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$80$ people visited a museum, and $30$ of them were children. $18$ of the children bought a ticket. One of the children is chosen at random. What is the probability that they did **not** buy a ticket?',
          choices: ['$\\dfrac{2}{5}$', '$\\dfrac{3}{5}$', '$\\dfrac{3}{20}$', '$\\dfrac{2}{3}$'],
          answer: 0,
          working: '$30 - 18 = 12$ children did not buy a ticket, and we choose from the $30$ children: $\\dfrac{12}{30} = \\dfrac{2}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Eighty people visited a museum, and thirty of them were children. Eighteen of the children bought a ticket. One of the children is chosen at random. What is the probability that they did not buy a ticket? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A. Thirty take away eighteen is twelve children who did not buy one, and we choose from the thirty children, so it is twelve over thirty, which is two fifths. Choice B is the children who did buy one, and choice C divides by all eighty visitors.', show: 'q.answer' },
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
          items: ['A frequency tree splits a total into groups, then splits each group again.', 'The branches from each point add up to the number at that point.', 'Probability $= \\dfrac{\\text{count we want}}{\\text{count we choose from}}$.', 'If we are told something first, choose only from that group.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A frequency tree splits a total into groups, then splits each group again.', show: 'sum.0' },
        { say: 'The branches from each point add up to the number at that point.', show: 'sum.1' },
        { say: 'A probability is the count we want, divided by the count we are choosing from.', show: 'sum.2' },
        { say: 'And if we are told something about the person first, choose only from that group. In the next lesson, we draw histograms with unequal class widths. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
