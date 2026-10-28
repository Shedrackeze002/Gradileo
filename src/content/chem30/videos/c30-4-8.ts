import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bufferPair } from './lib/c30-4b-figures.ts';

// An acetic acid–acetate buffer: added hydronium ions are taken up by the acetate ions, which
// become acetic acid; added hydroxide ions are taken up by the acetic acid, which becomes acetate.
const pair = figure('bp', [bufferPair({ acid: '\\ce{CH3COOH}', base: '\\ce{CH3COO-}' })], 390);

const video: Explainer = {
  id: 'c30-4-8',
  lessonId: 'c30-4-8',
  title: 'Buffers and Titration Curves, Part 1: How a Buffer Works',
  thumbnailTitle: 'How a Buffer Works',
  thumbnail: 'bp',
  summary:
    'A buffer keeps its pH nearly constant when a small amount of strong acid or base is added, because it holds a weak acid and its conjugate base in similar amounts: the base uses up added hydronium ions and the acid uses up added hydroxide ions, so only the ratio of the two changes, and only a little. A strong acid with its own salt is not a buffer, and a buffer has a limited capacity.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Chemical Equilibrium Focusing on Acid–Base Systems · Part 1', title: 'How a Buffer Works', subtitle: 'A weak acid and its conjugate base' }],
      lines: [
        {
          say: 'Your blood stays between a p H of about seven point three five and seven point four five, even though your muscles pour acids into it whenever you exercise.',
          caption: 'Your blood stays between a pH of about 7.35 and 7.45, even though your muscles pour acids into it whenever you exercise.',
          show: 'title',
        },
        { say: 'Blood carries a buffer: a mixture of carbonic acid and hydrogen carbonate ions that soaks up added acid or base.' },
        {
          say: 'This part shows what a buffer is and how it works. Later parts find its p H, and read titration curves.',
          caption: 'This part shows what a buffer is and how it works. Later parts find its pH, and read titration curves.',
        },
      ],
    },
    {
      chapter: 'What a buffer is',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Buffer',
          md: 'A solution that keeps its pH nearly constant when a small amount of a strong acid or a strong base is added. It contains a **weak acid and its conjugate base**, in similar amounts.',
        },
        {
          kind: 'table',
          id: 't',
          head: ['Weak acid', 'Conjugate base', 'Made from'],
          rows: [
            ['$\\ce{CH3COOH}$', '$\\ce{CH3COO-}$', 'acetic acid and sodium acetate'],
            ['$\\ce{NH4+}$', '$\\ce{NH3}$', 'ammonium chloride and ammonia'],
            ['$\\ce{H2PO4-}$', '$\\ce{HPO4^2-}$', '$\\ce{NaH2PO4}$ and $\\ce{Na2HPO4}$'],
            ['$\\ce{H2CO3}$', '$\\ce{HCO3-}$', 'carbonic acid and $\\ce{NaHCO3}$ (in blood)'],
          ],
        },
      ],
      lines: [
        {
          say: 'A buffer is a solution that keeps its p H nearly constant when a small amount of a strong acid or a strong base is added.',
          caption: 'A buffer is a solution that keeps its pH nearly constant when a small amount of a strong acid or a strong base is added.',
          show: 'def',
        },
        { say: 'Every buffer contains a weak acid and its conjugate base, in similar amounts: acetic acid with acetate ions, for example, or ammonium ions with ammonia.', show: 't' },
      ],
    },
    {
      chapter: 'Spotting a buffer',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Which of these, each with equal amounts of the two substances, is a buffer?' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Nitric acid and potassium nitrate: $\\ce{HNO3}$ is strong, and $\\ce{NO3-}$ is far too weak a base. **Not a buffer.**',
            'Hydrofluoric acid and sodium fluoride: a weak acid and its conjugate base, $\\ce{F-}$. **A buffer.**',
            'Sodium hydroxide and sodium chloride: no weak acid at all. **Not a buffer.**',
          ],
        },
      ],
      lines: [
        {
          say: 'Which of these is a buffer? Nitric acid and potassium nitrate is not: nitric acid is strong, and the nitrate ion is far too weak a base to take a proton from added acid.',
          show: ['q', 'b.0'],
        },
        { say: 'Hydrofluoric acid and sodium fluoride is: a weak acid and its conjugate base, the fluoride ion.', show: 'b.1', focus: 'b.1' },
        {
          say: 'Sodium hydroxide and sodium chloride is not: there is no weak acid at all. And two weak acids together are not a buffer either, with no base to react with added acid.',
          show: 'b.2',
        },
      ],
    },
    {
      chapter: 'How it works',
      layout: 'center',
      main: [pair, { kind: 'math', id: 'm', size: 'md', lines: ['\\ce{CH3COO-(aq) + H3O+(aq) -> CH3COOH(aq) + H2O(l)}', '\\ce{CH3COOH(aq) + OH-(aq) -> CH3COO-(aq) + H2O(l)}'] }],
      lines: [
        { say: 'Here is an acetic acid and acetate buffer. Each part of it deals with one kind of addition.', show: 'bp.pair' },
        {
          say: 'Added acid, as hydronium ions, is used up by the base of the buffer: acetate ions take its protons and become acetic acid.',
          show: ['bp.add-acid', 'm.0'],
          focus: ['bp.add-acid', 'm.0'],
        },
        {
          say: 'Added base, as hydroxide ions, is used up by the acid of the buffer: acetic acid gives them protons and becomes acetate ions.',
          show: ['bp.add-base', 'm.1'],
          focus: ['bp.add-base', 'm.1'],
        },
        {
          say: 'Both reactions go almost to completion, so the added ion disappears. All that changes is the ratio of acid to conjugate base, and only a little, so the p H hardly changes.',
          caption: 'Both reactions go almost to completion, so the added ion disappears. All that changes is the ratio of acid to conjugate base, and only a little, so the pH hardly changes.',
          focus: 'bp.pair',
        },
      ],
    },
    {
      chapter: 'Not a wall',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'A buffer is not a wall',
          md: 'A buffer reduces a change in pH; it does not prevent it, and it can be used up. The amount of acid or base it can absorb is its **capacity**: more concentrated buffers have a larger capacity.',
        },
      ],
      lines: [
        {
          say: 'A buffer reduces a change in p H; it does not prevent it. And it can be used up: once nearly all its base has reacted with added acid, the next addition changes the p H sharply.',
          caption: 'A buffer reduces a change in pH; it does not prevent it. And it can be used up: once nearly all its base has reacted with added acid, the next addition changes the pH sharply.',
          show: 'oops',
        },
        { say: 'The amount of acid or base a buffer can absorb is its capacity. More concentrated buffers have a larger capacity.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each solution contains equal amounts of the two substances. Which solution is a buffer?',
          choices: ['Hydrochloric acid and sodium chloride', 'Nitrous acid, $\\ce{HNO2}$, and sodium nitrite, $\\ce{NaNO2}$', 'Acetic acid and hydrofluoric acid', 'Sodium hydroxide and ammonia'],
          answer: 1,
          working: '$\\ce{HNO2}$ is a weak acid, and $\\ce{NO2-}$ is its conjugate base. The other mixtures lack a weak acid with its conjugate base.',
        },
      ],
      lines: [
        { say: 'Your turn. Each solution has equal amounts of two substances. Which one is a buffer? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B. Nitrous acid is a weak acid, and the nitrite ion is its conjugate base. Choice C has two weak acids, but no base to react with added acid.',
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
            'A **buffer** is a weak acid and its conjugate base, in similar amounts.',
            'Its base uses up added $\\ce{H3O+}$; its acid uses up added $\\ce{OH-}$.',
            'The pH changes only a little, until the buffer’s capacity is used up.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A buffer is a weak acid and its conjugate base, in similar amounts.', show: 'sum.0' },
        { say: 'Its base uses up added hydronium ions, and its acid uses up added hydroxide ions.', show: 'sum.1' },
        {
          say: 'So the p H changes only a little, until the buffer’s capacity is used up. In part two, you will calculate the p H of a buffer. See you there!',
          caption: 'So the pH changes only a little, until the buffer’s capacity is used up. In part two, you will calculate the pH of a buffer. See you there!',
          show: 'sum.2',
        },
      ],
    },
  ],
};

export default video;
