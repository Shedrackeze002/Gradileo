import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pick } from './lib/pick.ts';
import standard from '@/content/chem30/videos/c30-2-7.ts';
import { potentials } from '@/content/chem30/videos/lib/c30-2b-figures.ts';

// Exam question for Chemistry 30 lesson 2.7 (standard cell potentials): a cadmium anode in 1 M
// cadmium nitrate and an aluminum cathode in 1 M aluminum nitrate. Find the cell reaction, the
// standard cell potential and whether it is spontaneous. The question is OpenStax Chemistry 2e's
// own, word for word (end-of-chapter exercise 25, section 17.3, CC BY-NC-SA 4.0). The potentials
// are from the book's table (Appendix L): Al3+/Al -1.662 V and Cd2+/Cd -0.4030 V. The answer,
// which matches the book's: 3Cd + 2Al3+ -> 3Cd2+ + 2Al, E = -1.662 - (-0.4030) = -1.259 V,
// nonspontaneous.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's zinc-copper cell
// running; and the two reduction potentials on a scale (src/video/solids.ts), with the cell
// potential as the drop from the anode down to the cathode.

const QUESTION = 'Determine the cell reaction and standard cell potential at 25 °C for a cell made from an anode half-cell containing a cadmium electrode in 1 M cadmium nitrate and a cathode half-cell consisting of an aluminum electrode in 1 M aluminum nitrate solution. Is the reaction spontaneous at standard conditions?';

const scale = figure(
  'p',
  [
    potentials({
      min: -2,
      max: 0.5,
      per: 2.4,
      step: 0.5,
      points: [
        { id: 'h', value: 0, tex: '\\ce{H+/H2}\\quad {0.00}\\ \\text{V}', tone: 'muted' },
        { id: 'cd', value: -0.403, tex: '\\ce{Cd^2+/Cd}\\quad {-0.403}\\ \\text{V}', tone: 'opp' },
        { id: 'al', value: -1.662, tex: '\\ce{Al^3+/Al}\\quad {-1.662}\\ \\text{V}', tone: 'adj' },
      ],
      spans: [{ id: 'e', from: -0.403, to: -1.662, tex: '{-1.259}\\ \\text{V}', tone: 'bad' }],
    }),
  ],
  520,
);

const video: Explainer = {
  id: 'xq-c30-2-7',
  lessonId: '',
  exam: {
    lesson: 'c30-2-7',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 25, section 17.3, Electrode and Cell Potentials',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/17-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Can Cadmium Push Electrons onto Aluminum? Standard Cell Potentials',
  thumbnailTitle: 'Cadmium and Aluminum Cell',
  thumbnail: 've',
  summary:
    'A real test question, solved one small step at a time: a cell is built with cadmium as the anode and aluminum as the cathode. We write the half-reactions, match the electrons to get 3Cd + 2Al³⁺ → 3Cd²⁺ + 2Al, and find the standard cell potential, E°cathode − E°anode = −1.259 V. The negative sign tells us the reaction is not spontaneous.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Cadmium and Aluminum Cell', subtitle: 'A cell potential, and what its sign means' }],
      lines: [
        { say: 'In this video, we solve a real test question about standard cell potentials. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '3Cd + 2Al³⁺ → 3Cd²⁺ + 2Al; −1.259 V; not spontaneous' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed. Determine the cell reaction and standard cell potential at twenty five degrees Celsius for a cell made from an anode half-cell containing a cadmium electrode in one molar cadmium nitrate and a cathode half-cell consisting of an aluminum electrode in one molar aluminum nitrate solution. Is the reaction spontaneous at standard conditions?', show: 'q', caption: 'Here is the question, exactly as it was printed. Determine the cell reaction and standard cell potential at 25 °C for a cell made from an anode half-cell containing a cadmium electrode in 1 M cadmium nitrate and a cathode half-cell consisting of an aluminum electrode in 1 M aluminum nitrate solution. Is the reaction spontaneous at standard conditions?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'The question **names** the anode and cathode. Does the cell actually run **that way**?' }],
      lines: [
        { say: 'This time the question tells us which electrode is the anode and which is the cathode. We write the reaction that way, find its cell potential, and the sign tells us whether it would really run that way on its own.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(standard, 've'), { kind: 'math', id: 'k', size: 'md', lines: ['E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} \\qquad E^\\circ_{\\text{cell}} > 0 \\Rightarrow \\text{spontaneous}'] }],
      lines: [
        { say: 'Here is what we need. A zinc and copper cell. Watch which way the electrons go on their own.', show: ['ve', 've.labels', 've.key', 've.tally'], play: 've.run' },
        { say: 'Zinc gives up electrons and dissolves, and copper ions take them and plate out. Copper two ions pull on electrons harder than zinc ions do, and that difference in pull is the cell potential.', caption: 'Zinc gives up electrons and dissolves, and copper(II) ions take them and plate out. Copper(II) ions pull on electrons harder than zinc ions do, and that difference in pull is the cell potential.' },
        { say: 'So the standard cell potential is the cathode\'s reduction potential minus the anode\'s. If it is positive, the reaction runs on its own: it is spontaneous.', show: 'k.0', caption: 'So E°cell = E°cathode − E°anode. If it is positive, the reaction runs on its own: it is spontaneous.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **oxidation** of Cd and the **reduction** of $\\ce{Al^3+}$', 'Match the **electrons** and add', '$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$, then read the **sign**'] }],
      lines: [
        { say: 'Here is the plan. First, write the oxidation of cadmium at the anode and the reduction of aluminum ions at the cathode.', show: 'plan.0' },
        { say: 'Then match the electrons and add the halves.', show: 'plan.1' },
        { say: 'Then subtract the anode\'s potential from the cathode\'s, and read the sign.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The cell reaction',
      layout: 'center',
      main: [{ kind: 'math', id: 'r', size: 'lg', lines: ['\\times 3:\\ \\ce{3Cd -> 3Cd^2+ + 6e^-}', '\\times 2:\\ \\ce{2Al^3+ + 6e^- -> 2Al}', '\\good{\\ce{3Cd(s) + 2Al^3+(aq) -> 3Cd^2+(aq) + 2Al(s)}}'] }],
      lines: [
        { say: 'Step one. At the anode, cadmium loses two electrons to become cadmium two plus. At the cathode, an aluminum three plus ion gains three electrons to become aluminum.', caption: 'Step one. At the anode, Cd → Cd²⁺ + 2e⁻. At the cathode, Al³⁺ + 3e⁻ → Al.' },
        { say: 'Six is the smallest number both go into, so multiply the cadmium half by three and the aluminum half by two.', show: ['r.0', 'r.1'] },
        { say: 'Add them, and the six electrons cancel: three cadmium plus two aluminum three plus ions give three cadmium two plus ions and two aluminum.', show: 'r.2', focus: 'r.2', caption: 'Add them, and the six electrons cancel: 3Cd(s) + 2Al³⁺(aq) → 3Cd²⁺(aq) + 2Al(s).' },
      ],
    },
    {
      chapter: 'Step 2: The cell potential',
      layout: 'split',
      leftWidth: 560,
      left: [scale],
      right: [{ kind: 'math', id: 'e', size: 'md', lines: ['E^\\circ_{\\text{cell}} = -1.662 - (-0.403)', '= \\bad{-1.259\\ \\text{V}}'] }],
      lines: [
        { say: 'Step two. From the book\'s table of standard reduction potentials, cadmium two plus is minus zero point four zero three volts, and aluminum three plus is minus one point six six two volts, far lower.', caption: 'Step two. From the book\'s table of standard reduction potentials, Cd²⁺/Cd is −0.403 V, and Al³⁺/Al is −1.662 V, far lower.', show: ['p.axis', 'p.h', 'p.cd', 'p.al'] },
        { say: 'The cathode is aluminum and the anode is cadmium. Minus one point six six two minus minus zero point four zero three is minus one point two five nine volts. On the scale, that is a drop from the anode down to the cathode.', caption: 'The cathode is Al and the anode is Cd. E°cell = −1.662 − (−0.403) = −1.259 V. On the scale, that is a drop from the anode down to the cathode.', show: ['p.e', 'e.0', 'e.1'], focus: 'e.1' },
      ],
    },
    {
      chapter: 'Step 3: Spontaneous?',
      layout: 'center',
      main: [{ kind: 'math', id: 's', size: 'lg', lines: ['E^\\circ_{\\text{cell}} < 0 \\Rightarrow \\bad{\\text{not spontaneous}}'] }],
      lines: [
        { say: 'Step three. The cell potential is negative, so the reaction is not spontaneous at standard conditions. Aluminum three plus ions pull on electrons far more weakly than cadmium two plus ions, so cadmium cannot push its electrons onto them.', show: 's.0', focus: 's.0', caption: 'Step three. E°cell is negative, so the reaction is not spontaneous at standard conditions. Al³⁺ pulls on electrons far more weakly than Cd²⁺, so cadmium cannot push its electrons onto it.' },
        { say: 'The reverse would run on its own: aluminum metal would give electrons to cadmium ions, with a cell potential of plus one point two five nine volts.', caption: 'The reverse would run on its own: Al metal would give electrons to Cd²⁺ ions, with E°cell = +1.259 V.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'x', size: 'md', lines: ['\\text{cathode lower on the table than the anode} \\Rightarrow E^\\circ_{\\text{cell}} < 0'] },
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '$\\ce{3Cd(s) + 2Al^3+(aq) -> 3Cd^2+(aq) + 2Al(s)}$, $E^\\circ_{\\text{cell}} = -1.259\\ \\text{V}$, so it is **not spontaneous**.' },
      ],
      lines: [
        { say: 'Does it make sense? Whenever the cathode sits lower on the table than the anode, the cell potential comes out negative, and here aluminum is much lower.', show: 'x.0' },
        { say: 'So the cell reaction is three cadmium plus two aluminum three plus ions giving three cadmium two plus ions and two aluminum, the standard cell potential is minus one point two five nine volts, and it is not spontaneous. That matches the book.', show: 'ans', caption: 'So the cell reaction is 3Cd(s) + 2Al³⁺(aq) → 3Cd²⁺(aq) + 2Al(s), E°cell = −1.259 V, and it is not spontaneous. That matches the book.' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Wrong answer', 'Where it comes from'],
          rows: [
            ['$+1.259\\ \\text{V}$', 'Subtracted **cathode** from **anode**'],
            ['$-2.065\\ \\text{V}$', '**Added** the two potentials'],
            ['$-2.115\\ \\text{V}$', 'Multiplied each potential by its **coefficient**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Plus one point two five nine comes from subtracting the wrong way round. It is always the cathode minus the anode, using the electrodes the question names.', focus: 'traps.0', caption: '+1.259 V comes from subtracting the wrong way round. It is always the cathode minus the anode, using the electrodes the question names.' },
        { say: 'Minus two point zero six five adds the two potentials. Both are reduction potentials, so one is subtracted from the other.', focus: 'traps.1', caption: '−2.065 V adds the two potentials. Both are reduction potentials, so one is subtracted from the other.' },
        { say: 'And minus two point one one five multiplies by the three and the two. A potential is a push per electron, so it does not change when a half-reaction is multiplied.', focus: 'traps.2', caption: 'And −2.115 V multiplies by the 3 and the 2. A potential is a push per electron, so it does not change when a half-reaction is multiplied.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A cell has a zinc anode and a silver cathode. $E^\\circ(\\ce{Ag+/Ag}) = +0.80\\ \\text{V}$ and $E^\\circ(\\ce{Zn^2+/Zn}) = -0.76\\ \\text{V}$. What is $E^\\circ_{\\text{cell}}$?',
          choices: ['$+0.04\\ \\text{V}$', '$-1.56\\ \\text{V}$', '$+1.56\\ \\text{V}$', '$+2.36\\ \\text{V}$'],
          answer: 2,
          working: '$E^\\circ_{\\text{cell}} = 0.80 - (-0.76) = +1.56\\ \\text{V}$. The silver potential is not doubled, even though the equation has $\\ce{2Ag+}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cell has a zinc anode and a silver cathode. The reduction potential of silver ions is plus zero point eight zero volts, and of zinc ions minus zero point seven six volts. What is the standard cell potential? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. A cell has a zinc anode and a silver cathode. E°(Ag⁺/Ag) = +0.80 V and E°(Zn²⁺/Zn) = −0.76 V. What is E°cell? Pause the video and try it.' },
        { say: 'Cathode minus anode: zero point eight zero minus minus zero point seven six is plus one point five six volts, and we do not double the silver potential: choice C.', show: 'q2.answer', caption: 'Cathode minus anode: 0.80 − (−0.76) = +1.56 V, and we do not double the silver potential: choice C.' },
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
          items: ['$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$', 'Never multiply a potential by a **coefficient**', 'Positive means **spontaneous**; negative means **not**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The standard cell potential is the cathode\'s reduction potential minus the anode\'s.', show: 'sum.0' },
        { say: 'Multiplying a half-reaction to match electrons never changes its potential.', show: 'sum.1' },
        { say: 'A positive cell potential means the reaction is spontaneous, and a negative one means it is not. For more on standard cell potentials, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
