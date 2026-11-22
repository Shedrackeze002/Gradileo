import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import electrolytes from '@/content/chem20/videos/c20-3-1-b.ts';
import { acidIonising } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 20 lesson 3.1 (solutions, electrolytes and dissociation): compare
// what happens when methanol, hydrogen chloride and sodium hydroxide dissolve in water, with
// equations and sketches. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 12, section 11.2, CC BY-NC-SA 4.0). The book gives no answer to
// even-numbered exercises, so the video works it out in full: methanol dissolves as whole
// molecules, CH3OH(l) -> CH3OH(aq), a non-electrolyte; hydrogen chloride ionises,
// HCl(g) + H2O(l) -> H3O+(aq) + Cl-(aq); sodium hydroxide dissociates, NaOH(s) -> Na+(aq) + OH-(aq).
// Both of the last two are electrolytes.
//
// The pictures are the lesson's conductivity testers, then simulated particles
// (src/video/particles.ts) for the "sketches": a drop of methanol mixing into water as whole
// molecules, hydrogen chloride molecules ionising (the lesson's own), and a lump of sodium
// hydroxide pulled apart into ions.

const WATER = { n: 44, heavy: 0.2, tone: 'adj', name: 'water' } as const;

/** A drop of methanol in water, held until the clip `drop` lets it go: its molecules stay whole. */
const methanolBox: ParticleBox = {
  id: 'm',
  state: 'liquid',
  kinds: [{ n: 14, bond: 1.5, heavy: 0.2, tone: 'theta', name: 'methanol molecule' }, { ...WATER }],
  lump: true,
  hold: true,
  cross: 1.8,
  width: 12,
  height: 9,
  temp: 0.7,
  label: 'methanol in water',
};

const methanol: ParticlesEl = {
  kind: 'particles',
  id: 'me',
  boxes: [methanolBox],
  clips: { drop: { phases: [{ dur: 1, release: ['m'] }, { dur: 11 }] } },
  key: true,
  speed: 4,
  height: 330,
};

/** A lump of sodium hydroxide in water (clip `drop`): water pulls it apart into separate ions. */
const hydroxide: ParticlesEl = {
  kind: 'particles',
  id: 'nh',
  boxes: [
    {
      id: 'n',
      state: 'liquid',
      kinds: [{ n: 16, bond: 2, heavy: 0.5, tone: 'brand', name: 'sodium ion' }, { ...WATER }, { n: 0, bond: 2, heavy: 0.5, tone: 'bad', name: 'hydroxide ion' }],
      lump: true,
      lumpMix: 2,
      hold: [0, 2],
      cross: 2.3,
      width: 12,
      height: 9,
      temp: 0.7,
      label: 'sodium hydroxide in water',
    },
  ],
  clips: { drop: { phases: [{ dur: 1, release: ['n'] }, { dur: 11 }] } },
  key: true,
  speed: 4,
  height: 330,
};

const QUESTION =
  'Compare the processes that occur when methanol (CH3OH), hydrogen chloride (HCl), and sodium hydroxide (NaOH) dissolve in water. Write equations and prepare sketches showing the form in which each of these compounds is present in its respective solution.';

const video: Explainer = {
  id: 'xq-c20-3-1',
  lessonId: '',
  exam: {
    lesson: 'c20-3-1',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 12, section 11.2, Electrolytes',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/11-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Methanol, Hydrogen Chloride and Sodium Hydroxide in Water. Electrolytes and Dissociation',
  thumbnailTitle: 'Three Ways to Dissolve',
  thumbnail: 'hi',
  summary:
    'A real test question, solved one small step at a time: what happens when methanol, hydrogen chloride and sodium hydroxide dissolve in water? We write an equation for each and watch simulated particles: methanol stays as whole molecules, hydrogen chloride ionises, and sodium hydroxide dissociates into ions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Three Ways to Dissolve', subtitle: 'Methanol, hydrogen chloride and sodium hydroxide in water' }],
      lines: [
        { say: 'In this video, we solve a real test question about what happens to three different substances when they dissolve in water. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Chemistry textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt:
            'Compare the processes that occur when methanol ($\\ce{CH3OH}$), hydrogen chloride ($\\ce{HCl}$), and sodium hydroxide ($\\ce{NaOH}$) dissolve in water. Write equations and prepare sketches showing the form in which each of these compounds is present in its respective solution.',
          answer: 'Methanol stays as molecules, HCl ionises, NaOH dissociates',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Compare the processes that occur when methanol, hydrogen chloride, and sodium hydroxide dissolve in water.', caption: 'Compare the processes that occur when methanol (CH₃OH), hydrogen chloride (HCl), and sodium hydroxide (NaOH) dissolve in water.' },
        { say: 'Write equations and prepare sketches showing the form in which each of these compounds is present in its respective solution.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'For each substance: what **particles** are in the water afterwards, **molecules** or **ions**?' }],
      lines: [
        { say: 'In plain words, the question asks what each substance turns into once it is in the water.', show: 'plain' },
        { say: 'Do its particles stay as whole molecules, or do they end up as ions? We show that with an equation and a sketch for each one.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'split',
      leftWidth: 620,
      left: [pick(electrolytes, 't')],
      right: [
        {
          kind: 'bullets',
          id: 'k',
          items: ['**Ionic** compounds **dissociate** into ions', '**Acids** **ionise**: they react with water to form ions', 'Other **molecular** compounds stay **whole**'],
        },
      ],
      lines: [
        { say: 'Here is what we need. A solution conducts electricity only when it contains ions that can move. Salt water lights the bulb.', show: ['t', 't.salt-glass', 't.salt-liquid', 't.salt-circuit', 't.salt-label', 't.salt-na', 't.salt-cl', 't.salt-glow'], focus: ['t.salt-na', 't.salt-cl'] },
        { say: 'Sugar water does not, because its sugar molecules stay whole and carry no charge.', show: ['t.sugar-glass', 't.sugar-liquid', 't.sugar-circuit', 't.sugar-label', 't.sugar-mol'] },
        { say: 'There are three cases. An ionic compound, made of a metal ion and a negative ion, dissociates: its ions separate.', show: 'k.0' },
        { say: 'An acid is molecular, but its molecules react with water and form ions. That is called ionisation.', show: 'k.1' },
        { say: 'Any other molecular compound, such as a sugar or an alcohol, dissolves as whole molecules.', show: 'k.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Sort** each substance into one of the three cases', 'Write its **equation**', '**Sketch** the particles in its solution'] }],
      lines: [
        { say: 'Here is the plan. For each substance, we first decide which of the three cases it is.', show: 'plan.0' },
        { say: 'Then we write its equation.', show: 'plan.1' },
        { say: 'Then we sketch the particles in its solution, and here we will watch them move.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Methanol',
      layout: 'center',
      main: [
        methanol,
        { kind: 'math', id: 'a', size: 'md', lines: ['\\ce{CH3OH(l) -> CH3OH(aq)}', '\\good{\\text{whole molecules: a non-electrolyte}}'] },
      ],
      lines: [
        { say: 'Step one, methanol. It is made only of non-metals, so it is molecular, and it is an alcohol, not an acid.', show: ['me', 'me.labels', 'me.key'] },
        { say: 'Watch a drop of it go into water. Its molecules spread out through the water, but each one stays whole.', play: 'me.drop' },
        { say: 'So the equation just shows the liquid becoming dissolved: C H three O H liquid gives C H three O H aqueous.', show: 'a.0', caption: 'So the equation just shows the liquid becoming dissolved: CH₃OH(l) → CH₃OH(aq).' },
        { say: 'There are no ions, so methanol is a non-electrolyte. Its O H is joined to carbon, so it is not a hydroxide ion.', show: 'a.1', focus: 'a.1', caption: 'There are no ions, so methanol is a non-electrolyte. Its OH is joined to carbon, so it is not a hydroxide ion.' },
      ],
    },
    {
      chapter: 'Step 2: Hydrogen chloride',
      layout: 'center',
      main: [
        acidIonising('hi', 330),
        { kind: 'math', id: 'b', size: 'md', lines: ['\\ce{HCl(g) + H2O(l) -> H3O+(aq) + Cl-(aq)}', '\\good{\\text{ions formed: an electrolyte}}'] },
      ],
      lines: [
        { say: 'Step two, hydrogen chloride. It is also made of non-metal atoms, so it is molecular, but it is an acid.', show: ['hi', 'hi.labels', 'hi.tally'] },
        { say: 'Here are its molecules among water molecules. When one meets a water molecule, its hydrogen moves across to the water, making a hydronium ion, and the chlorine is left as a chloride ion.', play: 'hi.go' },
        { say: 'The equation: H C l gas plus water gives H three O plus and C l minus, both aqueous.', show: 'b.0', caption: 'The equation: HCl(g) + H₂O(l) → H₃O⁺(aq) + Cl⁻(aq).' },
        { say: 'New ions form that were not there before, so this is ionisation, and hydrogen chloride is an electrolyte.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Step 3: Sodium hydroxide',
      layout: 'center',
      main: [
        hydroxide,
        { kind: 'math', id: 'c', size: 'md', lines: ['\\ce{NaOH(s) -> Na+(aq) + OH-(aq)}', '\\good{\\text{ions separate: an electrolyte}}'] },
      ],
      lines: [
        { say: 'Step three, sodium hydroxide. It starts with a metal, sodium, so it is ionic. The solid is already made of sodium ions and hydroxide ions.', show: ['nh', 'nh.labels', 'nh.key'] },
        { say: 'Drop it in. Water molecules crowd round the solid and pull its ions away, one by one, until they move freely through the water.', play: 'nh.drop' },
        { say: 'The equation: N a O H solid gives N a plus and O H minus, both aqueous.', show: 'c.0', caption: 'The equation: NaOH(s) → Na⁺(aq) + OH⁻(aq).' },
        { say: 'The ions were there all along and simply separate, so this is dissociation, and sodium hydroxide is an electrolyte.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['Substance', 'Process', 'In the solution', 'Conducts?'],
          rows: [
            ['methanol, $\\ce{CH3OH}$', 'dissolves as molecules', 'whole $\\ce{CH3OH}$ molecules', 'no'],
            ['hydrogen chloride, $\\ce{HCl}$', '**ionisation**', '$\\ce{H3O+}$ and $\\ce{Cl-}$ ions', 'yes'],
            ['sodium hydroxide, $\\ce{NaOH}$', '**dissociation**', '$\\ce{Na+}$ and $\\ce{OH-}$ ions', 'yes'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole comparison. Methanol dissolves as whole molecules, so its solution does not conduct.', show: ['ans', 'ans.0'], focus: 'ans.0' },
        { say: 'Hydrogen chloride ionises: its molecules react with water to make hydronium ions and chloride ions.', focus: 'ans.1', caption: 'Hydrogen chloride ionises: its molecules react with water to make hydronium ions (H₃O⁺) and chloride ions (Cl⁻).' },
        { say: 'Sodium hydroxide dissociates: its sodium ions and hydroxide ions separate. Both of these solutions conduct.', focus: 'ans.2', caption: 'Sodium hydroxide dissociates: its sodium ions (Na⁺) and hydroxide ions (OH⁻) separate. Both of these solutions conduct.' },
        { say: 'As a check, the charges on the right of each ionic equation add up to zero, and each equation has the same atoms on both sides.' },
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
            ['$\\ce{CH3OH -> CH3+ + OH-}$', 'The OH in an **alcohol** is bonded to carbon'],
            ['$\\ce{HCl(s) -> H+(aq) + Cl-(aq)}$ as dissociation', '$\\ce{HCl}$ is **molecular**: its ions form by reacting'],
            ['$\\ce{NaOH(s) -> NaOH(aq)}$ only', 'This shows dissolving, but **not the ions**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Splitting methanol into a hydroxide ion. Its O H group is held to carbon by a covalent bond, so methanol is not a base and releases no ions.', focus: 'traps.0' },
        { say: 'Treating hydrogen chloride as if it were ionic, with ions waiting to separate. It is molecular, and its ions only form when its molecules react with water.', focus: 'traps.1' },
        { say: 'And writing sodium hydroxide aqueous with no ions. That shows it dissolving, but the question wants the form it takes, and in water it is separate ions.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which particles does potassium nitrate, $\\ce{KNO3}$, form when it dissolves in water?',
          choices: [
            '$\\ce{K+}$ and $\\ce{NO3-}$ ions',
            'whole $\\ce{KNO3}$ molecules',
            '$\\ce{K+}$, $\\ce{N^5+}$ and $\\ce{O^2-}$ ions',
            '$\\ce{H3O+}$ and $\\ce{NO3-}$ ions',
          ],
          answer: 0,
          working: 'An ionic compound: the potassium ions and the nitrate ions separate, and the nitrate ion stays whole.',
        },
      ],
      lines: [
        { say: 'Your turn. Which particles does potassium nitrate form when it dissolves in water? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Which particles does potassium nitrate (KNO₃) form when it dissolves in water? Pause the video and try it.' },
        { say: 'Potassium nitrate is ionic, so it dissociates into potassium ions and nitrate ions, and the nitrate ion stays whole: choice A.', show: 'q2.answer' },
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
          items: ['Molecular compounds that are not acids stay as **whole molecules**', '**Acids ionise**: they react with water to form ions', '**Ionic compounds dissociate**: their ions separate'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A molecular compound that is not an acid, such as methanol, dissolves as whole molecules and does not conduct.', show: 'sum.0' },
        { say: 'An acid such as hydrogen chloride ionises: its molecules react with water to form ions.', show: 'sum.1' },
        { say: 'An ionic compound such as sodium hydroxide dissociates: its ions separate. For more on solutions and electrolytes, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
