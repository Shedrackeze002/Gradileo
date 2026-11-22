import type { Explainer, ParticlesEl } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import solubility from '@/content/chem20/videos/c20-3-2-b.ts';
import { precipitate } from '@/content/chem20/videos/lib/c20-particles.ts';

// Exam question for Chemistry 20 lesson 3.2 (solubility and precipitates): use solubility rules
// stated in the question to predict whether a precipitate forms in two mixtures. OpenStax Chemistry
// 2e's precipitation exercises rely on equations and tables printed elsewhere in the book, so
// Gradileo wrote this one in the style of a high-school chemistry unit test, with every rule it
// needs inside the question. The answers: (a) barium nitrate and sodium sulfate give a precipitate
// of barium sulfate, BaSO4(s), while sodium nitrate stays dissolved; (b) magnesium nitrate and
// potassium chloride give no precipitate, because potassium nitrate and magnesium chloride both
// have high solubility.
//
// The pictures are simulated particles (src/video/particles.ts): the lesson's soluble and
// insoluble crystals, then barium and sulfate ions locking together and sinking as barium sulfate
// while sodium and nitrate ions keep moving, then the four ions of part (b) moving freely with
// nothing forming.

/** Barium nitrate and sodium sulfate just mixed (clip `mix`): barium sulfate forms and sinks. */
const bariumSulfate = ((): ParticlesEl => {
  const el = precipitate(
    'bs',
    {
      cation: { name: 'barium ion', tone: 'good', size: 1.1 },
      anion: { name: 'sulfate ion', tone: 'hyp', size: 1.1 },
      withCation: { name: 'nitrate ion', tone: 'opp', size: 1.1 },
      withAnion: { name: 'sodium ion', tone: 'brand' },
    },
    { n: 5, label: 'barium nitrate + sodium sulfate', solid: 'barium sulfate', seed: 3 },
    360,
  );
  // Each barium ion came with two nitrate ions, and each sulfate ion with two sodium ions.
  const [box] = el.boxes;
  const kinds = box.kinds!.map((k, i) => (i === 1 || i === 2 ? { ...k, n: 10 } : k));
  return { ...el, boxes: [{ ...box, kinds }] };
})();

/** An ion moving freely in water, held so loosely that it never clumps. */
const free = (n: number, tone: 'hyp' | 'opp' | 'brand' | 'good' | 'adj', name: string, size = 1) => ({ n, bond: 0.05, heavy: 0, size, tone, name });

/** Magnesium nitrate and potassium chloride just mixed: every pair is soluble, so nothing forms. */
const noSolid: ParticlesEl = {
  kind: 'particles',
  id: 'ns',
  boxes: [
    {
      id: 'n',
      state: 'gas',
      width: 12,
      height: 9,
      temp: 0.5,
      kinds: [free(4, 'hyp', 'magnesium ion'), free(8, 'opp', 'nitrate ion', 1.1), free(6, 'brand', 'potassium ion'), free(6, 'good', 'chloride ion', 1.1), free(16, 'adj', 'water', 0.8)],
      label: 'part (b): nothing forms',
    },
  ],
  clips: {},
  seed: 1,
  key: true,
  height: 360,
};

const RULES =
  'Use these rules: all nitrates and all compounds of group 1 ions have high solubility. Chlorides have high solubility, except those of Ag+, Pb2+ and Cu+. Sulfates have high solubility, except those of Ca2+, Sr2+, Ba2+, Pb2+ and Ag+.';

const video: Explainer = {
  id: 'xq-c20-3-2',
  lessonId: '',
  exam: {
    lesson: 'c20-3-2',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: "Gradileo's own question",
    question: `${RULES} Predict whether a precipitate forms when each pair of solutions is mixed. If one forms, name it and write its formula. (a) barium nitrate and sodium sulfate (b) magnesium nitrate and potassium chloride`,
  },
  title: 'Exam Question: Will a Precipitate Form? Solubility and Precipitates',
  thumbnailTitle: 'Will a Precipitate Form?',
  thumbnail: 'bs',
  summary:
    'An exam-style question, solved one small step at a time: does a precipitate form when barium nitrate is mixed with sodium sulfate, or magnesium nitrate with potassium chloride? We swap the ions\' partners, check each new compound against the solubility rules, and watch simulated ions lock together into solid barium sulfate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Will a Precipitate Form?', subtitle: 'Using the solubility rules, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about predicting precipitates. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry unit test. Every rule you need is given in the question.' },
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
            'Rules: all nitrates and all compounds of group 1 ions have high solubility. Chlorides have high solubility, except those of $\\ce{Ag+}$, $\\ce{Pb^2+}$ and $\\ce{Cu+}$. Sulfates have high solubility, except those of $\\ce{Ca^2+}$, $\\ce{Sr^2+}$, $\\ce{Ba^2+}$, $\\ce{Pb^2+}$ and $\\ce{Ag+}$.<br>Predict whether a precipitate forms when each pair of solutions is mixed. If one forms, name it and write its formula.<br>(a) barium nitrate and sodium sulfate<br>(b) magnesium nitrate and potassium chloride',
          answer: '(a) barium sulfate, BaSO₄; (b) no precipitate',
        },
      ],
      lines: [
        { say: 'Here is the question. First, the rules it gives us.', show: 'q' },
        { say: 'All nitrates and all compounds of group 1 ions have high solubility. Chlorides have high solubility, except those of silver, lead two and copper one ions.', caption: 'All nitrates and all compounds of group 1 ions have high solubility. Chlorides have high solubility, except those of Ag⁺, Pb²⁺ and Cu⁺.' },
        { say: 'Sulfates have high solubility, except those of calcium, strontium, barium, lead two and silver ions.', caption: 'Sulfates have high solubility, except those of Ca²⁺, Sr²⁺, Ba²⁺, Pb²⁺ and Ag⁺.' },
        { say: 'Predict whether a precipitate forms when each pair of solutions is mixed, and if one forms, name it and write its formula. Part a: barium nitrate and sodium sulfate. Part b: magnesium nitrate and potassium chloride.', caption: 'Predict whether a precipitate forms when each pair of solutions is mixed. If one forms, name it and write its formula. (a) barium nitrate and sodium sulfate (b) magnesium nitrate and potassium chloride' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'When the two solutions mix, can any **new pair of ions** make a compound with **low solubility**?' }],
      lines: [
        { say: 'A precipitate is a solid that forms when two solutions are mixed.', show: 'plain' },
        { say: 'So for each mixture, we ask whether the ions can pair up in a new way that makes a compound with low solubility. That compound is the precipitate.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(solubility, 'sn')],
      lines: [
        { say: 'Here is what we need. These are two ionic crystals in water: sodium chloride on the left, and silver chloride on the right.', show: ['sn', 'sn.labels', 'sn.key'], play: 'sn.drop' },
        { say: 'Water pulls the sodium chloride apart, so it has high solubility.', focus: 'sn.a' },
        { say: 'The ions of silver chloride hold on to each other too tightly, so it stays solid. It has low solubility. When ions like these meet in a mixture, they come out of solution as a precipitate.', focus: 'sn.b' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**List** the ions in each solution', '**Swap partners** to make the two new compounds', '**Check** each new compound against the rules'] }],
      lines: [
        { say: 'Here is the plan. First, we list the ions in each solution.', show: 'plan.0' },
        { say: 'Then we swap partners, writing the formulas of the two new compounds the ions could make.', show: 'plan.1' },
        { say: 'Then we check each new compound against the rules. A compound with low solubility is a precipitate.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Part (a), swap partners',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'a',
          size: 'lg',
          lines: [
            '\\ce{Ba(NO3)2}: \\quad \\good{\\ce{Ba^2+}} \\text{ and } \\opp{\\ce{NO3-}}',
            '\\ce{Na2SO4}: \\quad \\brand{\\ce{Na+}} \\text{ and } \\hyp{\\ce{SO4^2-}}',
            '\\text{new: } \\ce{BaSO4} \\text{ and } \\ce{NaNO3}',
          ],
        },
      ],
      lines: [
        { say: 'Step one, part a. Barium nitrate solution holds barium ions, with a charge of two plus, and nitrate ions.', show: 'a.0', caption: 'Step one, part (a). Barium nitrate solution holds barium ions (Ba²⁺) and nitrate ions (NO₃⁻).' },
        { say: 'Sodium sulfate solution holds sodium ions and sulfate ions, with a charge of two minus.', show: 'a.1', caption: 'Sodium sulfate solution holds sodium ions (Na⁺) and sulfate ions (SO₄²⁻).' },
        { say: 'Now swap partners. Barium meets sulfate: two plus and two minus balance one to one, so the formula is B a S O four. Sodium meets nitrate: N a N O three.', show: 'a.2', focus: 'a.2', caption: 'Now swap partners. Barium meets sulfate: 2+ and 2− balance one to one, so the formula is BaSO₄. Sodium meets nitrate: NaNO₃.' },
      ],
    },
    {
      chapter: 'Step 2: Part (a), check the rules',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'ra',
          head: ['New compound', 'Rule', 'Solubility'],
          rows: [
            ['$\\ce{NaNO3}$', 'all nitrates are high', 'high: stays dissolved'],
            ['$\\ce{BaSO4}$', 'sulfates high, **except** $\\ce{Ba^2+}$', '**low: precipitate**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Sodium nitrate is a nitrate, and all nitrates have high solubility, so it stays dissolved.', show: ['ra', 'ra.0'], focus: 'ra.0' },
        { say: 'Barium sulfate is a sulfate. Most sulfates have high solubility, but barium is one of the exceptions, so barium sulfate has low solubility. It is the precipitate.', show: 'ra.1', focus: 'ra.1' },
      ],
    },
    {
      chapter: 'Step 3: Watch part (a)',
      layout: 'center',
      main: [bariumSulfate, { kind: 'math', id: 'pa', size: 'md', lines: ['\\good{\\ce{Ba^2+(aq)}} + \\hyp{\\ce{SO4^2-(aq)}} \\ce{->} \\ce{BaSO4(s)}'] }],
      lines: [
        { say: 'Step three. Here are the four kinds of ion just after the solutions are mixed, among water molecules.', show: ['bs', 'bs.labels', 'bs.key', 'bs.tally'] },
        { say: 'Watch the barium ions and the sulfate ions. Wherever they meet, they lock together and sink as solid barium sulfate.', play: 'bs.mix' },
        { say: 'The sodium and nitrate ions keep moving about, exactly as before. So a precipitate of barium sulfate forms: B a S O four, solid.', show: 'pa.0', focus: 'pa.0', caption: 'The sodium and nitrate ions keep moving about, exactly as before. So a precipitate of barium sulfate forms: BaSO₄(s).' },
      ],
    },
    {
      chapter: 'Step 4: Part (b)',
      layout: 'split',
      leftWidth: 600,
      left: [noSolid],
      right: [
        {
          kind: 'math',
          id: 'b',
          size: 'md',
          lines: ['\\ce{Mg^2+}, \\ce{NO3-}, \\ce{K+}, \\ce{Cl-}', '\\ce{KNO3}: \\text{ a nitrate, high}', '\\ce{MgCl2}: \\text{ a chloride, high}', '\\good{\\text{no precipitate}}'],
        },
      ],
      lines: [
        { say: 'Step four, part b. Magnesium nitrate gives magnesium ions and nitrate ions. Potassium chloride gives potassium ions and chloride ions.', show: ['ns', 'ns.labels', 'ns.key', 'b.0'], caption: 'Step four, part (b). Magnesium nitrate gives Mg²⁺ and NO₃⁻ ions. Potassium chloride gives K⁺ and Cl⁻ ions.' },
        { say: 'Swap partners. Potassium meets nitrate: K N O three. It is a nitrate, so it has high solubility.', show: 'b.1', caption: 'Swap partners. Potassium meets nitrate: KNO₃. It is a nitrate, so it has high solubility.' },
        { say: 'Magnesium meets chloride. Two chloride ions balance one magnesium ion, so the formula is M g C l two. It is a chloride, and magnesium is not an exception, so it has high solubility too.', show: 'b.2', caption: 'Magnesium meets chloride. Two Cl⁻ balance one Mg²⁺, so the formula is MgCl₂. It is a chloride, and magnesium is not an exception, so it has high solubility too.' },
        { say: 'Watch the ions. They meet all the time, but no pair locks together. So no precipitate forms.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'ans',
          tone: 'key',
          title: 'The answer',
          md: '**(a)** A precipitate of **barium sulfate**, $\\ce{BaSO4(s)}$, forms. The sodium nitrate stays dissolved.<br>**(b)** **No precipitate**: potassium nitrate and magnesium chloride both have high solubility.',
        },
      ],
      lines: [
        { say: 'Here is the whole answer. In part a, a precipitate of barium sulfate forms, B a S O four, while sodium nitrate stays dissolved.', show: 'ans', caption: 'Here is the whole answer. In part (a), a precipitate of barium sulfate (BaSO₄) forms, while sodium nitrate stays dissolved.' },
        { say: 'In part b, no precipitate forms, because both new compounds have high solubility.', caption: 'In part (b), no precipitate forms, because both new compounds have high solubility.' },
        { say: 'As a check, each formula balances its charges: two plus with two minus in barium sulfate, and two plus with two one minus ions in magnesium chloride.' },
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
            ['(a) no precipitate', 'Most sulfates are high, but $\\ce{Ba^2+}$ is an **exception**'],
            ['(a) $\\ce{Ba(SO4)2}$ or $\\ce{Ba2SO4}$', 'Charges of **2+ and 2−** pair one to one'],
            ['(b) a precipitate of $\\ce{Mg(NO3)2}$', 'That is a **starting** compound; **swap** partners first'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Saying part a gives no precipitate, because most sulfates have high solubility. Always check the exceptions: barium is one of them.', focus: 'traps.0', caption: 'Saying part (a) gives no precipitate, because most sulfates have high solubility. Always check the exceptions: barium is one of them.' },
        { say: 'Getting the formula wrong. A two plus ion and a two minus ion balance one to one, so the formula is B a S O four.', focus: 'traps.1', caption: 'Getting the formula wrong. A 2+ ion and a 2− ion balance one to one, so the formula is BaSO₄.' },
        { say: 'And checking the compounds you started with. They were dissolved to begin with, so only the new pairs can form a precipitate.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Using the same rules, which precipitate forms when solutions of lead(II) nitrate, $\\ce{Pb(NO3)2}$, and sodium chloride, $\\ce{NaCl}$, are mixed?',
          choices: ['$\\ce{NaNO3}$', '$\\ce{PbCl2}$', 'no precipitate', '$\\ce{PbNa}$'],
          answer: 1,
          working: 'The new compounds are $\\ce{NaNO3}$ (a nitrate, high) and $\\ce{PbCl2}$ (a chloride of $\\ce{Pb^2+}$, an exception, low).',
        },
      ],
      lines: [
        { say: 'Your turn. Using the same rules, which precipitate forms when solutions of lead two nitrate and sodium chloride are mixed? Pause the video and try it.', show: 'q2', wait: 6, caption: 'Your turn. Using the same rules, which precipitate forms when solutions of lead(II) nitrate and sodium chloride are mixed? Pause the video and try it.' },
        { say: 'The new compounds are sodium nitrate, which stays dissolved, and lead two chloride. Lead two is an exception for chlorides, so lead two chloride is the precipitate: choice B.', show: 'q2.answer', caption: 'The new compounds are sodium nitrate, which stays dissolved, and lead(II) chloride. Pb²⁺ is an exception for chlorides, so PbCl₂ is the precipitate: choice B.' },
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
          items: ['**List** the ions and **swap partners**', 'Find each new compound\'s **anion row**, then check the **exceptions**', 'A new compound with **low solubility** is the **precipitate**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. List the ions in each solution and swap partners, balancing the charges.', show: 'sum.0' },
        { say: 'Find each new compound\'s rule from its anion, then check whether its cation is an exception.', show: 'sum.1' },
        { say: 'A new compound with low solubility is the precipitate; if both have high solubility, nothing forms. For more on solubility, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
