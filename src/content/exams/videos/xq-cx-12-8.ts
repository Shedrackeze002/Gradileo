import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import nmr from '@/content/chemmore/videos/cx-12-8.ts';

// Exam question for More Chemistry Topics lesson 12.8 (NMR and chromatography): an Rf value from a
// TLC plate, counting proton NMR peaks for propanone and propanal, and the n + 1 rule for
// chloroethane. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's paper chromatogram running (src/video/particles.ts).

const QUESTION = 'This question is about chromatography and NMR spectroscopy. (a) On a TLC plate, a spot moved 3.6 cm from the start line while the solvent front moved 8.0 cm. Calculate the Rf value. (b) Predict the number of peaks in the ¹H NMR spectrum of propanone, CH₃COCH₃, and of propanal, CH₃CH₂CHO. (c) In the ¹H NMR spectrum of chloroethane, CH₃CH₂Cl, the CH₃ peak is a triplet. Explain why, and predict the splitting of the CH₂ peak.';

const video: Explainer = {
  id: 'xq-cx-12-8',
  lessonId: '',
  exam: {
    lesson: 'cx-12-8',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: An Rf Value, Counting NMR Peaks and a Triplet. NMR and Chromatography',
  thumbnailTitle: 'NMR and TLC',
  thumbnail: 'ch',
  summary:
    'A test-style question, solved one small step at a time: what is the Rf value of a spot, how many proton NMR peaks do propanone and propanal give, and why is the CH₃ peak of chloroethane a triplet? Rf = 3.6 ÷ 8.0 = 0.45; propanone has one hydrogen environment and propanal three; and the CH₃ hydrogens have two neighbouring hydrogens, so n + 1 = 3 gives a triplet, while the CH₂ peak, with three neighbours, is a quartet.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'NMR and TLC', subtitle: 'Rf values, peaks and splitting' }],
      lines: [
        { say: 'In this video, we solve a test-style question about chromatography and NMR. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Rf = 0.45; 1 and 3 peaks; two neighbouring H, quartet' }],
      lines: [
        { say: 'Here is the question. This question is about chromatography and N M R spectroscopy. Part a: on a T L C plate, a spot moved 3.6 centimetres from the start line while the solvent front moved 8.0 centimetres. Calculate the R f value. Part b: predict the number of peaks in the proton N M R spectrum of propanone, and of propanal. Part c: in the proton N M R spectrum of chloroethane, the C H three peak is a triplet. Explain why, and predict the splitting of the C H two peak.', caption: 'Here is the question. This question is about chromatography and NMR spectroscopy. Part a: on a TLC plate, a spot moved 3.6 cm from the start line while the solvent front moved 8.0 cm. Calculate the Rf value. Part b: predict the number of peaks in the ¹H NMR spectrum of propanone, CH₃COCH₃, and of propanal, CH₃CH₂CHO. Part c: in the ¹H NMR spectrum of chloroethane, CH₃CH₂Cl, the CH₃ peak is a triplet. Explain why, and predict the splitting of the CH₂ peak.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'A **ratio** of distances, then **count** hydrogen environments and their **neighbours**' }],
      lines: [
        { say: 'An R f value compares two distances. In N M R, each set of equivalent hydrogens gives one peak, and the hydrogens next door decide how the peak splits.', caption: 'An Rf value compares two distances. In NMR, each set of equivalent hydrogens gives one peak, and the hydrogens next door decide how the peak splits.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(nmr, 'ch')],
      lines: [
        { say: 'Here is what we need for part a. Here is paper chromatography up close: an ink and two dyes, spotted on a pencil line.', show: ['ch', 'ch.labels'] },
        { say: 'As the solvent moves up, each dye travels at its own speed, depending on how strongly it is held back. A T L C plate works the same way, and we measure how far each spot moves compared with the solvent.', caption: 'As the solvent moves up, each dye travels at its own speed, depending on how strongly it is held back. A TLC plate works the same way, and we measure how far each spot moves compared with the solvent.', play: 'ch.run' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Rf** = spot distance ÷ solvent front distance', 'One peak per hydrogen **environment**', '**n** neighbouring H split a peak into **n + 1**'] }],
      lines: [
        { say: 'Here is the plan. The R f value is the distance moved by the spot divided by the distance moved by the solvent front.', caption: 'Here is the plan. Rf is the distance moved by the spot divided by the distance moved by the solvent front.', show: 'plan.0' },
        { say: 'In proton N M R, each hydrogen environment gives one peak.', caption: 'In ¹H NMR, each hydrogen environment gives one peak.', show: 'plan.1' },
        { say: 'And hydrogens on the next carbon split the peak: n neighbours give n plus 1 lines.', caption: 'And hydrogens on the next carbon split the peak: n neighbours give n + 1 lines.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The Rf value',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['R_f = \\dfrac{3.6 \\text{ cm}}{8.0 \\text{ cm}}', '\\good{R_f = 0.45}'] }],
      lines: [
        { say: 'Step one. The spot moved 3.6 centimetres, and the solvent front 8.0 centimetres.', caption: 'Step one. The spot moved 3.6 cm, and the solvent front 8.0 cm.', show: 'm.0' },
        { say: '3.6 divided by 8.0 is 0.45. An R f value has no units, because it is a ratio of two lengths. That is part a.', caption: '3.6 ÷ 8.0 = 0.45. An Rf value has no units, because it is a ratio of two lengths. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Counting peaks',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Compound', 'Hydrogen environments', 'Peaks'],
          rows: [
            ['propanone, CH₃COCH₃', 'two CH₃ groups, **identical**', '**1**'],
            ['propanal, CH₃CH₂CHO', 'CH₃, CH₂ and CHO, **all different**', '**3**'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Propanone is symmetrical: its two methyl groups are both bonded to the C double bond O carbon, so all six hydrogens are in the same environment. It gives one peak.', caption: 'Step two. Propanone is symmetrical: its two CH₃ groups are both bonded to the C=O carbon, so all six hydrogens are in the same environment. It gives one peak.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'Propanal has hydrogens in three different places: the C H three, the C H two, and the C H O. It gives three peaks. That is part b.', caption: 'Propanal has hydrogens in three different places: the CH₃, the CH₂ and the CHO. It gives three peaks. That is part b.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Step 3: The splitting',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 's',
          head: ['Peak', 'Neighbouring H (n)', 'n + 1', 'Splitting'],
          rows: [
            ['CH₃', '2, on the CH₂', '3', '**triplet**'],
            ['CH₂', '3, on the CH₃', '4', '**quartet**'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. The C H three hydrogens sit next to the C H two carbon, which has two hydrogens. By the n plus 1 rule, two neighbours give three lines, a triplet.', caption: 'Step three. The CH₃ hydrogens sit next to the CH₂ carbon, which has two hydrogens. By the n + 1 rule, two neighbours give three lines, a triplet.', show: ['s', 's.0'], focus: 's.0' },
        { say: 'The C H two hydrogens sit next to the C H three, with three hydrogens. Three neighbours give four lines, so the C H two peak is a quartet. That is part c.', caption: 'The CH₂ hydrogens sit next to the CH₃, with three hydrogens. Three neighbours give four lines, so the CH₂ peak is a quartet. That is part c.', show: 's.1', focus: 's.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Rf = 0.45**. (b) Propanone **1** peak; propanal **3** peaks. (c) The CH₃ has **2 neighbouring H**, so n + 1 = **3**: a triplet. The CH₂ peak is a **quartet**.' },
      ],
      lines: [
        { say: 'Does it make sense? An R f value must lie between 0 and 1, because a spot can never move further than the solvent. And the triplet and quartet pair is the classic sign of an ethyl group.', caption: 'Does it make sense? An Rf value must lie between 0 and 1, because a spot can never move further than the solvent. And the triplet and quartet pair is the classic sign of an ethyl group.', show: 'ans' },
        { say: 'So the R f value is 0.45, propanone gives one peak and propanal three, and the n plus 1 rule gives a triplet and a quartet.', caption: 'So the Rf value is 0.45, propanone gives one peak and propanal three, and the n + 1 rule gives a triplet and a quartet.' },
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
            ['Rf = 8.0 ÷ 3.6 = **2.2**', 'Spot ÷ solvent: Rf is **below 1**'],
            ['Propanone has **2** peaks', 'Its two CH₃ groups are **identical**'],
            ['CH₃ is a **quartet**: it has 3 H', 'Count the **neighbours**, not its own H'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'The spot distance goes on top, so the answer is always less than 1.', focus: 'traps.0' },
        { say: 'Both methyl groups of propanone are in exactly the same environment, so they share one peak.', focus: 'traps.1' },
        { say: 'And the splitting comes from the hydrogens on the neighbouring carbon, not from the hydrogens of the group itself.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Why is TMS, Si(CH₃)₄, used as the reference in ¹H NMR?',
          choices: ['it is a strong acid', 'it dissolves in water', 'it gives three peaks', 'it gives one strong peak'],
          answer: 3,
          working: 'All 12 hydrogens of TMS are in the same environment, so it gives one strong peak, set at δ = 0.',
        },
      ],
      lines: [
        { say: 'Your turn. Why is T M S used as the reference in proton N M R? Pause the video and try it.', caption: 'Your turn. Why is TMS, Si(CH₃)₄, used as the reference in ¹H NMR? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'All 12 hydrogens of T M S are in the same environment, so it gives one strong peak, set at delta equals 0: choice D.', caption: 'All 12 hydrogens of TMS are in the same environment, so it gives one strong peak, set at δ = 0: choice D.', show: 'q2.answer' },
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
          items: ['**Rf** = spot ÷ solvent front, between 0 and 1', 'One ¹H NMR peak per **environment**', '**n** neighbouring H: **n + 1** lines'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The R f value is the spot distance divided by the solvent front distance.', caption: 'Here is what to remember. Rf is the spot distance divided by the solvent front distance.', show: 'sum.0' },
        { say: 'Each hydrogen environment gives one peak in proton N M R.', caption: 'Each hydrogen environment gives one peak in ¹H NMR.', show: 'sum.1' },
        { say: 'And n neighbouring hydrogens split a peak into n plus 1 lines. For more, watch this lesson\'s explainer video on Gradileo.', caption: 'And n neighbouring hydrogens split a peak into n + 1 lines. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
