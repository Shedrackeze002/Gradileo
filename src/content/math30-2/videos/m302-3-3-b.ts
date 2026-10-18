import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { deckCells, deckGrid, vennBox } from './lib/m302-3-figures.ts';

const t = (s: string) => `\\text{${s}}`;

const video: Explainer = {
  id: 'm302-3-3-b',
  lessonId: 'm302-3-3',
  title: 'Mutually Exclusive Events, Part 2: Events That Overlap',
  thumbnailTitle: 'Events That Overlap',
  thumbnail: 'v',
  summary: 'Why adding P(A) and P(B) counts the outcomes in both events twice, the general addition rule P(A or B) = P(A) + P(B) − P(A and B), and drawing a heart or a face card (13/52 + 12/52 − 3/52 = 22/52 = 11/26), checked with a Venn diagram. Part 3 works backward and finds the probability of neither.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Events That Overlap', subtitle: '$P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)$' }],
      lines: [
        { say: 'A card can be a heart and a face card at the same time. When two events overlap like this, simply adding their probabilities counts some outcomes twice.', show: 'title' },
        { say: 'In this video, you will see why, and use the general addition rule to find the probability that one event or the other happens.' },
      ],
    },
    {
      chapter: 'Counting twice',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'One card is drawn from a standard deck. What is the probability that it is a heart or a face card (J, Q or K)?' },
        figure('deck', [deckGrid({ marks: [{ id: 'hearts', cells: deckCells({ rows: [1] }), tone: 'bad', shade: 0.4 }, { id: 'face', cells: deckCells({ cols: [10, 11, 12] }), tone: 'theta', shade: 0.4 }, { id: 'both', cells: deckCells({ only: { rows: [1], cols: [10, 11, 12] } }), tone: 'good', shade: 0.6 }] })], 260),
        { kind: 'math', id: 'm', size: 'md', lines: ['13 + 12 - 3 = 22 \\text{ cards}'] },
      ],
      lines: [
        { say: 'One card is drawn from a standard deck. What is the probability that it is a heart or a face card? The face cards are the jacks, queens and kings.', show: ['p', 'deck.grid', 'deck.heads'] },
        { say: 'There are thirteen hearts.', show: 'deck.hearts', focus: 'deck.hearts' },
        { say: 'And there are twelve face cards: a jack, a queen and a king in each of the four suits.', show: 'deck.face', focus: 'deck.face' },
        { say: 'But three cards are in both groups: the jack, queen and king of hearts. If you add thirteen and twelve, those three cards are counted twice.', show: 'deck.both', focus: 'deck.both' },
        { say: 'So the number of cards that are hearts or face cards is thirteen plus twelve, minus three, which is twenty-two.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The general addition rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Subtract the overlap once', md: 'Adding $P(A)$ and $P(B)$ counts the outcomes in both events twice, so subtract $P(A \\text{ and } B)$ once. For mutually exclusive events, $P(A \\text{ and } B) = 0$, and the rule becomes $P(A) + P(B)$.' },
      ],
      lines: [
        { say: 'The same idea works for any two events. When they are not mutually exclusive, adding P of A and P of B counts the outcomes in both events twice. So subtract them once.', show: 'm' },
        { say: 'P of A or B equals P of A, plus P of B, minus P of A and B. This is the same idea as counting the elements in the union of two sets: add the two sets, then subtract the overlap.', focus: 'm', show: 'key' },
        { say: 'When the events are mutually exclusive, there is no overlap. P of A and B is zero, and the rule becomes the simple sum from part one.' },
      ],
    },
    {
      chapter: 'A heart or a face card',
      layout: 'split',
      leftWidth: 580,
      left: [figure('v', [vennBox({ titles: [t('Hearts'), t('Face cards')], values: { a: '10', both: '3', b: '9', out: '30' } })], 440)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['P(\\text{heart}) = \\dfrac{13}{52}', 'P(\\text{face}) = \\dfrac{12}{52}', 'P(\\text{both}) = \\dfrac{3}{52}', 'P = \\dfrac{13}{52} + \\dfrac{12}{52} - \\dfrac{3}{52}', '\\phantom{P} = \\dfrac{22}{52} = \\dfrac{11}{26}'],
        },
      ],
      lines: [
        { say: 'Now use the rule. P of heart is thirteen over fifty-two, and P of face card is twelve over fifty-two.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'P of both, the jack, queen and king of hearts, is three over fifty-two.', show: 'm.2', focus: 'm.2' },
        { say: 'So P of heart or face card is thirteen plus twelve minus three, all over fifty-two. That is twenty-two over fifty-two, which is eleven over twenty-six.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
        { say: 'The Venn diagram shows the same count. Ten hearts are not face cards, three cards are both, and nine face cards are not hearts.', show: ['v.box', 'v.a', 'v.b', 'v.va', 'v.vab', 'v.vb'], focus: ['v.va', 'v.vab', 'v.vb'] },
        { say: 'Ten plus three plus nine is twenty-two cards in the two circles, and the other thirty cards are outside both.', show: ['v.sunion', 'v.vout'], focus: ['v.sunion', 'v.vout'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting the overlap twice', md: '$\\dfrac{13}{52} + \\dfrac{12}{52} = \\dfrac{25}{52}$ is too big: the jack, queen and king of hearts were counted once as hearts and again as face cards.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{25}{52}} \\qquad \\good{\\dfrac{25}{52} - \\dfrac{3}{52} = \\dfrac{22}{52}}'] },
      ],
      lines: [
        { say: 'The most common mistake is to add P of A and P of B, and stop. Thirteen over fifty-two plus twelve over fifty-two is twenty-five over fifty-two.', show: 'oops' },
        { say: 'That is too big, because the jack, queen and king of hearts were counted once as hearts, and again as face cards. Subtract them once, to get twenty-two over fifty-two.', show: 'm', focus: 'm' },
        { say: 'So before you add, always ask: can both events happen at once? If they can, subtract the overlap.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'One card is drawn from a standard deck of 52. What is the probability that it is a king or a club?',
          choices: ['$\\dfrac{17}{52}$', '$\\dfrac{1}{52}$', '$\\dfrac{4}{13}$', '$\\dfrac{1}{4}$'],
          answer: 2,
          working: '$P(\\text{king or club}) = \\dfrac{4}{52} + \\dfrac{13}{52} - \\dfrac{1}{52} = \\dfrac{16}{52} = \\dfrac{4}{13}$. The king of clubs is in both events.',
        },
      ],
      lines: [
        { say: 'Your turn. One card is drawn from a standard deck. What is the probability that it is a king or a club? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, four thirteenths. There are four kings and thirteen clubs, and one card, the king of clubs, is both. So P is four plus thirteen minus one, over fifty-two: sixteen over fifty-two, which is four thirteenths. Choice A, seventeen over fifty-two, counts the king of clubs twice.', show: 'q.answer' },
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
          items: ['For overlapping events, $P(A) + P(B)$ counts the overlap twice.', '$P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)$', 'A Venn diagram shows the count in each region.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When two events overlap, adding their probabilities counts the overlap twice.', show: 'sum.0' },
        { say: 'So P of A or B is P of A, plus P of B, minus P of A and B.', show: 'sum.1' },
        { say: 'And a Venn diagram shows the count in each region, to check your answer. In part three, we work backward with the rule, and find the probability of neither event. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
