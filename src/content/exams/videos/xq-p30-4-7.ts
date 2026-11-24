import type { Explainer, ReactionEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 4.7 (mass defect, binding energy, fission and fusion): the
// binding energy for each nucleon of deuterium. The question is OpenStax College Physics 2e's
// own, word for word (a Problem for section 31.6, CC BY-NC-SA 4.0; Gradileo is non-commercial),
// with its figure named as the book numbers it (Figure 31.24, the graph of BE/A). The masses are
// the book's atomic masses (Appendix A), as its method uses them: ¹H 1.007825 u, n 1.008665 u,
// ²H 2.014102 u. Mass defect 1.007825 + 1.008665 − 2.014102 = 0.002388 u; BE = 0.002388 × 931.5
// = 2.224 MeV; BE/A = 2.224 ÷ 2 = 1.112 MeV, as in the book's answer, which agrees with the graph
// (about 1.1 MeV at A = 2).
//
// The pictures are src/video/reaction.ts: a proton and a neutron join into a deuteron while a
// gamma ray leaves, and the graph of the binding energy for each nucleon with its marker at A = 2.

const reaction = (id: string, height: number, clips: ReactionEl['clips'], more: Partial<ReactionEl> = {}): ReactionEl => ({ kind: 'reaction', id, height, clips, ...more });

/** A proton and a neutron come together into hydrogen-2. */
const deuteron = reaction('dj', 360, { a: { phases: [{ dur: 1.5 }, { dur: 8, join: true }] } }, { z: 1, n: 1, name: 'hydrogen', mass: 2.0136, scale: 60 });

/** The binding energy for each nucleon against the mass number: the marker slides from iron-56 to hydrogen-2. */
const curve = reaction('cv', 360, { a: { phases: [{ dur: 1 }, { dur: 5, to: 2 }, { dur: 1 }] } }, { picture: 'curve', at: 56, poster: 'a', posterAt: 1, thumb: ['names', 'value', 'peak'] });

const QUESTION =
  '²H is a loosely bound isotope of hydrogen. Called deuterium or heavy hydrogen, it is stable but relatively rare—it is 0.015% of natural hydrogen. Note that deuterium has Z = N, which should tend to make it more tightly bound, but both are odd numbers. Calculate BE/A, the binding energy per nucleon, for ²H and compare it with the approximate value obtained from the graph in Figure 31.24.';

const video: Explainer = {
  id: 'xq-p30-4-7',
  lessonId: '',
  exam: {
    lesson: 'p30-4-7',
    source: 'OpenStax, College Physics 2e, Problem for section 31.6, Binding Energy',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/31-6-binding-energy',
    question: QUESTION,
  },
  title: 'Exam Question: The Binding Energy of Deuterium (Mass Defect and Binding Energy)',
  thumbnailTitle: 'How Tightly Is Deuterium Bound?',
  thumbnail: 'cv',
  summary:
    'A real test question, solved one small step at a time: calculate BE/A, the binding energy per nucleon, for deuterium, ²H, and compare it with the graph of BE/A. A hydrogen-1 atom and a neutron weigh 1.007825 u + 1.008665 u = 2.016490 u, but a deuterium atom weighs only 2.014102 u, so the mass defect is 0.002388 u. At 931.5 MeV for each u the binding energy is 2.224 MeV, and shared between 2 nucleons it is 1.112 MeV for each nucleon, which agrees with the graph at A = 2 and is far below the 8 to 9 MeV of most nuclei. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Binding Energy of Deuterium', subtitle: 'Binding energy, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the energy that holds a nucleus together. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Physics textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
            '${}^{2}\\text{H}$ is a loosely bound isotope of hydrogen. Called deuterium or heavy hydrogen, it is stable but relatively rare—it is $0.015\\%$ of natural hydrogen. Note that deuterium has $Z = N$, which should tend to make it more tightly bound, but both are odd numbers. Calculate $\\text{BE}/A$, the binding energy per nucleon, for ${}^{2}\\text{H}$ and compare it with the approximate value obtained from the graph in Figure 31.24.',
          answer: '$1.112$ MeV, which agrees with the graph',
          working: '$(1.007825 + 1.008665 - 2.014102) \\times 931.5 = 2.224$ MeV, and $2.224 \\div 2 = 1.112$ MeV.',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Hydrogen-2, called deuterium or heavy hydrogen, is a loosely bound isotope of hydrogen. It is stable, but rare.' },
        { say: 'Calculate its binding energy per nucleon, and compare it with the value read from the book\'s graph of binding energy per nucleon.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [deuteron, { kind: 'text', id: 't', size: 'md', md: 'Deuterium: $1$ proton and $1$ neutron, so $A = 2$. The **binding energy** is the energy that would pull them apart again.' }],
      lines: [
        { say: 'A deuterium nucleus is one proton and one neutron. Watch them come together. As they join, energy leaves as a gamma ray.', show: ['dj', 'dj.names'], play: 'dj.a' },
        { say: 'To pull them apart again, we would have to put that energy back. That is the binding energy. Shared between the 2 nucleons, it is the binding energy per nucleon.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\Delta m = Z\\,m({}^{1}\\text{H}) + N\\,m_n - m({}^{A}\\text{X})', '\\text{BE} = \\Delta m \\times 931.5 \\text{ MeV/u}'] },
        { kind: 'table', id: 'mass', head: ['Particle', 'Mass (u)'], rows: [['${}^{1}\\text{H}$ atom', '$1.007825$'], ['neutron', '$1.008665$'], ['${}^{2}\\text{H}$ atom', '$2.014102$']] },
      ],
      lines: [
        { say: 'Here is what we need. The mass defect is the mass of the separate parts, minus the mass of the whole. The book uses the masses of whole atoms, so it counts each proton as a hydrogen-1 atom, and the electrons cancel.', caption: 'Here is what we need. The mass defect is the mass of the separate parts, minus the mass of the whole. The book uses the masses of whole atoms, so it counts each proton as a ¹H atom, and the electrons cancel.', show: 'f.0' },
        { say: 'Each atomic mass unit of missing mass is 931.5 mega electron volts of energy.', caption: 'Each atomic mass unit of missing mass is 931.5 MeV of energy.', show: 'f.1' },
        { say: 'And here are the masses, from the book\'s table of atomic masses.', show: 'mass' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **mass defect** $\\Delta m$', 'Turn it into **energy**: $\\times\\, 931.5$ MeV/u', '**Divide** by $A = 2$, and compare with the **graph**'] }],
      lines: [
        { say: 'Here is the plan. Find the mass defect.', show: 'plan.0' },
        { say: 'Turn it into energy, at 931.5 mega electron volts for each atomic mass unit.', caption: 'Turn it into energy, at 931.5 MeV for each u.', show: 'plan.1' },
        { say: 'Then divide by the 2 nucleons, and compare with the graph.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The mass defect',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1.007825 + 1.008665 = 2.016490 \\text{ u}', '\\Delta m = 2.016490 - 2.014102 = 0.002388 \\text{ u}'] }],
      lines: [
        { say: 'Step one. A hydrogen-1 atom and a neutron together weigh 1.007825 plus 1.008665, which is 2.016490 atomic mass units.', caption: 'Step one. A ¹H atom and a neutron together weigh 1.007825 + 1.008665 = 2.016490 u.', show: 'm.0' },
        { say: 'A deuterium atom weighs only 2.014102. So the mass defect is 0.002388 atomic mass units. That much mass went missing when the nucleus formed.', caption: 'A deuterium atom weighs only 2.014102 u. So the mass defect is 0.002388 u. That much mass went missing when the nucleus formed.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The binding energy',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{BE} = 0.002388 \\times 931.5 = 2.224 \\text{ MeV}', '\\dfrac{\\text{BE}}{A} = \\dfrac{2.224}{2} = \\good{1.112 \\text{ MeV}}'] }],
      lines: [
        { say: 'Step two. 0.002388 times 931.5 is 2.224 mega electron volts. That is the binding energy of deuterium.', caption: 'Step two. 0.002388 × 931.5 = 2.224 MeV. That is the binding energy of deuterium.', show: 'm.0' },
        { say: 'Deuterium has 2 nucleons, so the binding energy per nucleon is 2.224 over 2, which is 1.112 mega electron volts.', caption: 'Deuterium has 2 nucleons, so the binding energy per nucleon is 2.224 ÷ 2 = 1.112 MeV.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Compare with the graph',
      layout: 'center',
      main: [curve],
      lines: [
        { say: 'Step three. Here is the graph of binding energy per nucleon against mass number. Most nuclei sit between 8 and 9 mega electron volts, with iron-56 near the top.', caption: 'Step three. Here is the graph of binding energy per nucleon against mass number. Most nuclei sit between 8 and 9 MeV, with iron-56 near the top.', show: ['cv', 'cv.names', 'cv.peak', 'cv.value'] },
        { say: 'Slide down to a mass number of 2. The graph reads about 1.1 mega electron volts, which agrees with our 1.112. Deuterium is very loosely bound.', caption: 'Slide down to a mass number of 2. The graph reads about 1.1 MeV, which agrees with our 1.112 MeV. Deuterium is very loosely bound.', play: 'cv.a' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1.112 \\times 2 = 2.224 \\text{ MeV}', '\\dfrac{2.224}{931.5} = 0.002388 \\text{ u} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backwards. 1.112 times 2 is 2.224 mega electron volts.', caption: 'Let us check by working backwards. 1.112 × 2 = 2.224 MeV.', show: 'm.0' },
        { say: 'And 2.224 over 931.5 is 0.002388 atomic mass units, the mass defect we started with. It checks out.', caption: 'And 2.224 ÷ 931.5 = 0.002388 u, the mass defect we started with. It checks out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$2.224$ MeV', 'that is the **whole** BE: divide by $A = 2$'],
            ['$0.856$ MeV', 'used the **proton** mass $1.007276$: the electron no longer cancels'],
            ['$0.002388$', 'that is the mass defect in u: multiply by $931.5$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '2.224 mega electron volts is the binding energy of the whole nucleus. The question asks for it per nucleon, so divide by 2.', caption: '2.224 MeV is the binding energy of the whole nucleus. The question asks for it per nucleon, so divide by 2.' },
        { say: '0.856 mega electron volts uses the mass of a bare proton, 1.007276, with the mass of a whole deuterium atom. Then the electron of the deuterium atom is not cancelled. Use whole atoms on both sides.', caption: '0.856 MeV uses the mass of a bare proton, 1.007276 u, with the mass of a whole deuterium atom. Then the electron of the deuterium atom is not cancelled. Use whole atoms on both sides.' },
        { say: 'And 0.002388 is the mass defect, in atomic mass units. It is not an energy until we multiply by 931.5.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'The binding energy of helium-4 is $28.3$ MeV. What is its binding energy per nucleon?',
          choices: ['$14.15$ MeV', '$28.3$ MeV', '$113.2$ MeV', '$7.08$ MeV'],
          answer: 3,
          working: 'Helium-4 has $A = 4$ nucleons: $28.3 \\div 4 = 7.08$ MeV.',
        },
      ],
      lines: [
        { say: 'Your turn. The binding energy of helium-4 is 28.3 mega electron volts. What is its binding energy per nucleon? Pause the video and try it.', caption: 'Your turn. The binding energy of helium-4 is 28.3 MeV. What is its binding energy per nucleon? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Helium-4 has 4 nucleons. 28.3 over 4 is 7.08 mega electron volts, far more than deuterium\'s 1.112. Choice "D".', caption: 'Helium-4 has 4 nucleons. 28.3 ÷ 4 = 7.08 MeV, far more than deuterium\'s 1.112 MeV. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mass defect = parts $-$ whole', '$\\text{BE} = \\Delta m \\times 931.5$ MeV/u', '**Divide** by $A$ for the BE per nucleon', 'Deuterium: $1.112$ MeV, **very** loosely bound'] }],
      lines: [
        { say: 'Here is what to remember. The mass defect is the mass of the separate parts, minus the mass of the whole.', show: 'sum.0' },
        { say: 'The binding energy is the mass defect times 931.5 mega electron volts for each atomic mass unit.', caption: 'The binding energy is the mass defect × 931.5 MeV for each u.', show: 'sum.1' },
        { say: 'Divide by the mass number for the binding energy per nucleon.', show: 'sum.2' },
        { say: 'And deuterium, at 1.112 mega electron volts, is very loosely bound. For more on binding energy, watch this lesson\'s explainer video on Gradileo.', caption: 'And deuterium, at 1.112 MeV, is very loosely bound. For more on binding energy, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
