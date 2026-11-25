import type { Explainer, ParticlesEl, Tone } from '@/video/script.ts';
import { acidIonising } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 20 lesson 3.6 (acids, bases and neutral solutions): classify three
// solutions as acidic, basic or neutral, write the equation that forms the ion responsible, and
// predict the colour of bromothymol blue in each. OpenStax Chemistry 2e treats acids and bases with
// the Brønsted-Lowry theory, beyond this lesson, so Gradileo wrote this question in the style of a
// high-school chemistry unit test, with the indicator's colours given in the question. The
// answers: (a) HBr(aq) is acidic, HBr + H2O -> H3O+ + Br-, yellow; (b) Ba(OH)2(aq) is basic,
// Ba(OH)2(s) -> Ba2+ + 2OH-, blue; (c) KNO3(aq) is neutral, K+ and NO3- form neither ion, green.
//
// The pictures are simulated particles (src/video/particles.ts): hydrogen bromide molecules
// ionising among water molecules (the lesson's hydrogen chloride, renamed), barium hydroxide
// solution with two hydroxide ions for every barium ion, and potassium nitrate solution, whose
// ions are neither hydronium nor hydroxide.

/** Hydrogen bromide ionising: the lesson's hydrogen chloride, with bromine in place of chlorine. */
const bromide = ((): ParticlesEl => {
  const el = acidIonising('hb', 360);
  const [box] = el.boxes;
  const kinds = box.kinds!.map((k, i) => (i === 1 ? { ...k, name: 'bromine', size: 1.25 } : i === 5 ? { ...k, name: 'bromide ion', size: 1.25 } : k));
  return { ...el, boxes: [{ ...box, kinds, label: 'hydrogen bromide in water', tally: { kinds: [4], label: 'hydronium ions' } }], key: true };
})();

/** An ion or molecule moving freely in a solution. */
const free = (n: number, tone: Tone, name: string, size = 1) => ({ n, bond: 0.05, heavy: 0, size, tone, name });

/** A solution's ions moving among water molecules. */
const solution = (id: string, kinds: ReturnType<typeof free>[], label: string): ParticlesEl => ({
  kind: 'particles',
  id,
  boxes: [{ id: 's', state: 'gas', width: 12, height: 9, temp: 0.5, kinds: [...kinds, free(16, 'adj', 'water', 0.8)], label }],
  clips: {},
  seed: 2,
  key: true,
  height: 360,
});

const bariumHydroxide = solution('bh', [free(4, 'good', 'barium ion', 1.2), free(8, 'bad', 'hydroxide ion')], 'barium hydroxide solution');
const potassiumNitrate = solution('kn', [free(6, 'hyp', 'potassium ion'), free(6, 'opp', 'nitrate ion', 1.1)], 'potassium nitrate solution');

const QUESTION =
  'Bromothymol blue is yellow in acidic solutions, blue in basic solutions and green in neutral solutions. For each solution, state whether it is acidic, basic or neutral, write the equation that forms the ion responsible (if any), and predict the colour of bromothymol blue in it. (a) HBr(aq) (b) Ba(OH)2(aq) (c) KNO3(aq)';

const video: Explainer = {
  id: 'xq-c20-3-6',
  lessonId: '',
  exam: {
    lesson: 'c20-3-6',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Acidic, Basic or Neutral? Hydronium and Hydroxide Ions',
  thumbnailTitle: 'Acidic, Basic or Neutral?',
  thumbnail: 'hb',
  summary:
    'An exam-style question, solved one small step at a time: are hydrobromic acid, barium hydroxide and potassium nitrate solutions acidic, basic or neutral, and what colour is bromothymol blue in each? We look for the ion that forms in water, write its equation, and watch simulated particles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Acidic, Basic or Neutral?', subtitle: 'Hydronium and hydroxide ions, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about deciding whether a solution is acidic, basic or neutral. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry unit test.' },
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
            'Bromothymol blue is yellow in acidic solutions, blue in basic solutions and green in neutral solutions. For each solution, state whether it is acidic, basic or neutral, write the equation that forms the ion responsible (if any), and predict the colour of bromothymol blue in it.<br>(a) $\\ce{HBr(aq)}$ (b) $\\ce{Ba(OH)2(aq)}$ (c) $\\ce{KNO3(aq)}$',
          answer: '(a) acidic, yellow; (b) basic, blue; (c) neutral, green',
        },
      ],
      lines: [
        { say: 'Here is the question. Bromothymol blue is yellow in acidic solutions, blue in basic solutions and green in neutral solutions.', show: 'q' },
        { say: 'For each solution, state whether it is acidic, basic or neutral, write the equation that forms the ion responsible, if there is one, and predict the colour of bromothymol blue in it.' },
        { say: 'Part a is hydrobromic acid, H B r aqueous. Part b is barium hydroxide solution. Part c is potassium nitrate solution.', caption: '(a) HBr(aq) (b) Ba(OH)₂(aq) (c) KNO₃(aq)' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Does each substance form **hydronium** ions, **hydroxide** ions, or **neither**, in water?' }],
      lines: [
        { say: 'In plain words, we must decide what each substance forms when it is in water.', show: 'plain' },
        { say: 'That decides whether the solution is acidic, basic or neutral, and the indicator colour follows from that.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'k',
          head: ['Solution', 'It contains', 'Bromothymol blue'],
          rows: [
            ['**acidic**', 'hydronium ions, $\\ce{H3O+}$, from an acid reacting with water', '$\\thc{\\text{yellow}}$'],
            ['**basic**', 'hydroxide ions, $\\ce{OH-}$', '$\\adj{\\text{blue}}$'],
            ['**neutral**', 'neither of them', '$\\good{\\text{green}}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. An acid reacts with water to form hydronium ions, H three O plus, and they make a solution acidic. Bromothymol blue turns yellow.', show: ['k', 'k.0'], focus: 'k.0', caption: 'Here is what we need. An acid reacts with water to form hydronium ions (H₃O⁺), and they make a solution acidic. Bromothymol blue turns yellow.' },
        { say: 'A base forms hydroxide ions, O H minus, in water, and they make a solution basic. Bromothymol blue turns blue.', show: 'k.1', focus: 'k.1', caption: 'A base forms hydroxide ions (OH⁻) in water, and they make a solution basic. Bromothymol blue turns blue.' },
        { say: 'A solution with neither of these ions is neutral, even if it has other ions in it. Bromothymol blue stays green.', show: 'k.2', focus: 'k.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Identify** the kind of substance from its formula', 'Write the **equation** for what it does in water', 'Read off the **colour**'] }],
      lines: [
        { say: 'Here is the plan. For each one, we identify the kind of substance from its formula: an acid, a hydroxide, or a salt.', show: 'plan.0' },
        { say: 'Then we write the equation for what it does in water.', show: 'plan.1' },
        { say: 'Then we read off the indicator colour.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a), HBr',
      layout: 'center',
      main: [bromide, { kind: 'math', id: 'a', size: 'md', lines: ['\\ce{HBr(aq) + H2O(l) -> H3O+(aq) + Br-(aq)}', '\\text{acidic: bromothymol blue turns } \\thc{\\text{yellow}}'] }],
      lines: [
        { say: 'Step one, part a. Hydrogen bromide has its hydrogen written first and is named as an acid, so it is an acid. Here are its molecules among water molecules.', show: ['hb', 'hb.labels', 'hb.key', 'hb.tally'] },
        { say: 'Each molecule gives its hydrogen to a water molecule. That makes a hydronium ion, and leaves a bromide ion.', play: 'hb.go' },
        { say: 'The equation: H B r plus water gives H three O plus and B r minus.', show: 'a.0', caption: 'The equation: HBr(aq) + H₂O(l) → H₃O⁺(aq) + Br⁻(aq).' },
        { say: 'Hydronium ions make it acidic, so bromothymol blue turns yellow.', show: 'a.1', focus: 'a.1' },
      ],
    },
    {
      chapter: 'Step 2: Part (b), Ba(OH)₂',
      layout: 'center',
      main: [bariumHydroxide, { kind: 'math', id: 'b', size: 'md', lines: ['\\ce{Ba(OH)2(s) -> Ba^2+(aq) + 2OH-(aq)}', '\\text{basic: bromothymol blue turns } \\adj{\\text{blue}}'] }],
      lines: [
        { say: 'Step two, part b. Barium hydroxide is an ionic compound of a metal ion and the hydroxide ion, so it simply dissociates in water.', show: ['bh', 'bh.labels', 'bh.key'] },
        { say: 'Here is its solution. Look at the numbers: there are two hydroxide ions for every barium ion, because barium has a charge of two plus.', focus: 'bh.s' },
        { say: 'The equation: B a O H two solid gives B a two plus and two O H minus.', show: 'b.0', caption: 'The equation: Ba(OH)₂(s) → Ba²⁺(aq) + 2OH⁻(aq).' },
        { say: 'Hydroxide ions make it basic, so bromothymol blue turns blue.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Step 3: Part (c), KNO₃',
      layout: 'center',
      main: [potassiumNitrate, { kind: 'math', id: 'c', size: 'md', lines: ['\\ce{KNO3(s) -> K+(aq) + NO3-(aq)}', '\\text{no } \\ce{H3O+} \\text{ or } \\ce{OH-}: \\text{ neutral, } \\good{\\text{green}}'] }],
      lines: [
        { say: 'Step three, part c. Potassium nitrate is a salt: a metal ion with a negative ion that is not hydroxide.', show: ['kn', 'kn.labels', 'kn.key'] },
        { say: 'It dissociates into potassium ions and nitrate ions. The solution is full of ions, so it conducts, but none of them is hydronium or hydroxide.', show: 'c.0', caption: 'It dissociates: KNO₃(s) → K⁺(aq) + NO₃⁻(aq). The solution is full of ions, so it conducts, but none of them is hydronium or hydroxide.' },
        { say: 'So the solution is neutral, no equation forms either ion, and bromothymol blue stays green.', show: 'c.1', focus: 'c.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ans',
          head: ['', 'Type', 'Ion responsible', 'Bromothymol blue'],
          rows: [
            ['(a) $\\ce{HBr(aq)}$', 'acidic', '$\\ce{H3O+}$', '$\\thc{\\text{yellow}}$'],
            ['(b) $\\ce{Ba(OH)2(aq)}$', 'basic', '$\\ce{OH-}$', '$\\adj{\\text{blue}}$'],
            ['(c) $\\ce{KNO3(aq)}$', 'neutral', 'none', '$\\good{\\text{green}}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is the whole answer. Hydrobromic acid is acidic, because of its hydronium ions, and bromothymol blue turns yellow.', show: ['ans', 'ans.0'], focus: 'ans.0' },
        { say: 'Barium hydroxide is basic, because of its hydroxide ions, and the indicator turns blue.', focus: 'ans.1' },
        { say: 'Potassium nitrate is neutral, with neither ion, and the indicator stays green. As a check, the charges balance on both sides of every equation.', focus: 'ans.2' },
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
            ['$\\ce{HBr -> H- + Br+}$', 'The hydrogen leaves as a **positive** ion'],
            ['$\\ce{Ba(OH)2 -> Ba^2+ + (OH)2^2-}$', 'Each hydroxide ion is a separate $\\ce{OH-}$: write **2**$\\ce{OH-}$'],
            ['(c) basic, "because K is a metal"', 'A salt\'s ions are **neither** $\\ce{H3O+}$ nor $\\ce{OH-}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Putting the charges on the wrong ions. The hydrogen leaves the acid as a positive ion and joins a water molecule, so the bromine becomes a negative bromide ion.', focus: 'traps.0' },
        { say: 'Writing the two hydroxide ions as one ion with a charge of two minus. Each hydroxide ion is O H minus, and the two in front counts them.', focus: 'traps.1', caption: 'Writing the two hydroxide ions as one ion with a charge of 2−. Each hydroxide ion is OH⁻, and the 2 in front counts them.' },
        { say: 'And calling potassium nitrate basic because it contains a metal. Only hydroxide ions make a solution basic, and potassium nitrate forms none.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A solution turns red litmus paper blue. Which of these could it be?',
          choices: ['$\\ce{HNO3(aq)}$', '$\\ce{NH3(aq)}$', '$\\ce{C2H5OH(aq)}$', '$\\ce{KCl(aq)}$'],
          answer: 1,
          working: 'Red litmus turns blue in a basic solution. Ammonia reacts with water to form $\\ce{OH-}$ ions: $\\ce{NH3 + H2O -> NH4+ + OH-}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A solution turns red litmus paper blue. Which of these could it be? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Red litmus turns blue in a basic solution. Ammonia reacts with water to form hydroxide ions, so it is basic: choice B. Ethanol has an O H, but it never releases it as an ion.', show: 'q2.answer', caption: 'Red litmus turns blue in a basic solution. Ammonia reacts with water to form hydroxide ions, so it is basic: choice B. Ethanol has an OH, but it never releases it as an ion.' },
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
          items: ['Acids react with water to form **hydronium ions**: acidic', 'Hydroxides (and ammonia) form **hydroxide ions**: basic', 'Salts form **neither**: neutral, even though they conduct'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An acid reacts with water to form hydronium ions, which make a solution acidic.', show: 'sum.0' },
        { say: 'A metal hydroxide, or ammonia, forms hydroxide ions, which make a solution basic.', show: 'sum.1' },
        { say: 'A salt such as potassium nitrate forms neither, so its solution is neutral, even though it conducts. For more on acids and bases, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
