import type { Explainer, LevelsEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 4.3 (the Bohr model and spectra): which level is the electron
// of a hydrogen atom in, if 0.850 eV can ionize it? The question is OpenStax College Physics 2e's
// own, word for word (a Problem for section 30.3, CC BY-NC-SA 4.0; Gradileo is non-commercial).
// To free the electron from level n it must be lifted from Eₙ = −13.6 ÷ n² eV to 0, which takes
// 13.6 ÷ n² eV; so 13.6 ÷ n² = 0.850, n² = 16 and n = 4, as in the book's answer.
//
// The pictures are the hydrogen atom of src/video/levels.ts (levels −13.6 ÷ n² eV to three
// figures, so level 4 is at −0.850 eV): a 0.850 eV photon passes straight through an atom in its
// ground state, and frees the electron of an atom in level 4.

const atom = (id: string, start: number, clips: LevelsEl['clips']): LevelsEl => ({ kind: 'levels', id, height: 380, start, clips });

/** An atom in its ground state: the 0.850 eV photon matches no jump, and passes. */
const ground = atom('g', 1, { a: { phases: [{ dur: 6 }] }, b: { phases: [{ dur: 1.5 }, { dur: 6, photon: 0.85 }] } });

/** An atom with its electron in level 4: the same photon is just enough to free it. */
const four: LevelsEl = { ...atom('ex', 4, { a: { phases: [{ dur: 8 }] }, b: { phases: [{ dur: 1.5 }, { dur: 6, photon: 0.85 }] } }), poster: 'b', posterAt: 0.6, thumb: ['names', 'energies', 'photon'] };

const QUESTION = 'A hydrogen atom in an excited state can be ionized with less energy than when it is in its ground state. What is n for a hydrogen atom if 0.850 eV of energy can ionize it?';

const video: Explainer = {
  id: 'xq-p30-4-3',
  lessonId: '',
  exam: {
    lesson: 'p30-4-3',
    source: 'OpenStax, College Physics 2e, Problem for section 30.3, Bohr’s Theory of the Hydrogen Atom',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/30-3-bohrs-theory-of-the-hydrogen-atom',
    question: QUESTION,
  },
  title: 'Exam Question: Which Level Can 0.850 eV Ionize? (The Bohr Model)',
  thumbnailTitle: 'Which Level Is the Electron In?',
  thumbnail: 'ex',
  summary:
    'A real test question, solved one small step at a time: a hydrogen atom in an excited state can be ionized with less energy than in its ground state. What is n if 0.850 eV of energy can ionize it? To free the electron from level n, it must be lifted from −13.6/n² eV up to zero, which takes 13.6/n² eV. Setting that equal to 0.850 eV gives n² = 16, so n = 4. Then we watch a 0.850 eV photon pass straight through an atom in its ground state but free the electron from level 4, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Which Level Is the Electron In?', subtitle: 'The Bohr model, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the Bohr model of the hydrogen atom. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A hydrogen atom in an excited state can be ionized with less energy than when it is in its ground state. What is $n$ for a hydrogen atom if $0.850$ eV of energy can ionize it?',
          answer: '$n = 4$',
          working: '$\\dfrac{13.6}{n^2} = 0.850$, so $n^2 = 16$ and $n = 4$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'A hydrogen atom in an excited state can be ionized with less energy than when it is in its ground state. What is n for a hydrogen atom if 0.850 electron volts of energy can ionize it?', caption: 'A hydrogen atom in an excited state can be ionized with less energy than when it is in its ground state. What is n for a hydrogen atom if 0.850 eV of energy can ionize it?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [ground, { kind: 'text', id: 'plain', size: 'md', md: 'Which level $n$ is the electron in, if $0.850$ eV is **just enough** to free it?' }],
      lines: [
        { say: 'Here is a hydrogen atom, with its electron in the ground state, level 1. To ionize the atom means to free the electron completely, by lifting it all the way up to zero energy.', show: ['g', 'g.names', 'g.energies'], play: 'g.a' },
        { say: 'Send in a photon of 0.850 electron volts. It matches no jump, and it is far too small to free the electron, so it passes straight through.', caption: 'Send in a photon of 0.850 eV. It matches no jump, and it is far too small to free the electron, so it passes straight through.', show: 'g.photon', play: 'g.b' },
        { say: 'But an electron in a higher level sits much closer to zero, so less energy sets it free. The question asks which level it is in, if 0.850 electron volts is just enough.', caption: 'But an electron in a higher level sits much closer to zero, so less energy sets it free. The question asks which level it is in, if 0.850 eV is just enough.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['E_n = -\\dfrac{13.6}{n^2}\\ \\text{eV}'] },
        {
          kind: 'callout',
          id: 'c',
          tone: 'key',
          title: 'The energy that frees the electron',
          md: 'To free the electron from level $n$, lift it from $E_n$ up to $0$. That takes $0 - E_n = \\dfrac{13.6}{n^2}$ eV. From the ground state, $n = 1$, it is $13.6$ eV.',
        },
      ],
      lines: [
        { say: 'Here is what we need. For hydrogen, the energy of level n is negative 13.6 over n squared, in electron volts.', caption: 'Here is what we need. For hydrogen, the energy of level n is −13.6 ÷ n², in electronvolts.', show: 'f' },
        { say: 'A free electron has zero energy. So to free the electron from level n, we lift it from E n up to zero, and that takes 13.6 over n squared electron volts. From the ground state, that is the full 13.6.', caption: 'A free electron has zero energy. So to free the electron from level n, we lift it from Eₙ up to zero, and that takes 13.6 ÷ n² eV. From the ground state, that is the full 13.6 eV.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the energy that frees the electron from level $n$', 'Set it equal to $0.850$ eV', 'Solve for $n^2$, then **square root**'] }],
      lines: [
        { say: 'Here is the plan. Write the energy that frees the electron from level n.', show: 'plan.0' },
        { say: 'Set it equal to 0.850 electron volts.', caption: 'Set it equal to 0.850 eV.', show: 'plan.1' },
        { say: 'Then solve for n squared, and take the square root.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The energy to free it',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0 - E_n = 0 - \\left(-\\dfrac{13.6}{n^2}\\right) = \\dfrac{13.6}{n^2}\\ \\text{eV}'] }],
      lines: [
        { say: 'Step one. The energy needed is zero minus E n. Minus a negative is a plus, so it is 13.6 over n squared electron volts.', caption: 'Step one. The energy needed is 0 − Eₙ. Minus a negative is a plus, so it is 13.6 ÷ n² eV.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 2: Solve for n²',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{13.6}{n^2} = 0.850', 'n^2 = \\dfrac{13.6}{0.850} = 16'] }],
      lines: [
        { say: 'Step two. Set 13.6 over n squared equal to 0.850.', caption: 'Step two. Set 13.6 ÷ n² equal to 0.850.', show: 'm.0' },
        { say: 'Swap n squared and 0.850. n squared is 13.6 divided by 0.850, which is 16.', caption: 'Swap n² and 0.850. n² is 13.6 ÷ 0.850, which is 16.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Square root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n = \\sqrt{16} = \\good{4}'] }],
      lines: [
        { say: 'Step three. n is the square root of 16, which is 4. The electron is in level 4.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [four, { kind: 'math', id: 'm', size: 'md', lines: ['E_4 = -\\dfrac{13.6}{16} = -0.850\\ \\text{eV} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Level 4 is at negative 13.6 over 16, which is negative 0.850 electron volts. So the electron sits just 0.850 below zero.', caption: 'Let us check. Level 4 is at −13.6 ÷ 16, which is −0.850 eV. So the electron sits just 0.850 eV below zero.', show: ['ex', 'ex.names', 'ex.energies', 'm'], play: 'ex.a' },
        { say: 'Send in the same photon of 0.850 electron volts. This time it is just enough, and the electron is set free. It checks out.', caption: 'Send in the same photon of 0.850 eV. This time it is just enough, and the electron is set free. It checks out.', show: 'ex.photon', play: 'ex.b' },
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
            ['$n = \\dfrac{13.6}{0.850} = 16$', 'that is $n^2$: take the **square root**'],
            ['$n^2 = \\dfrac{0.850}{13.6} = 0.0625$', '**upside down**: $n^2 = \\dfrac{13.6}{0.850}$'],
            ['$-\\dfrac{13.6}{n^2} = 0.850$', 'the level is below zero: the energy to free it is **positive**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '13.6 divided by 0.850 is 16, but that is n squared, not n. Take the square root.', caption: '13.6 ÷ 0.850 is 16, but that is n², not n. Take the square root.' },
        { say: 'Dividing the other way gives 0.0625, which is no level at all. n squared is 13.6 over 0.850.', caption: 'Dividing the other way gives 0.0625, which is no level at all. n² is 13.6 ÷ 0.850.' },
        { say: 'And the level itself is negative, but the energy needed to free the electron is positive. Setting the negative level equal to 0.850 gives no answer.', caption: 'And the level itself is negative, but the energy needed to free the electron is positive. Setting the negative level equal to 0.850 eV gives no answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'How much energy, in eV, is needed to ionize a hydrogen atom whose electron is in the $n = 3$ level?',
          choices: ['$4.53$ eV', '$12.1$ eV', '$1.51$ eV', '$13.6$ eV'],
          answer: 2,
          working: '$\\dfrac{13.6}{3^2} = \\dfrac{13.6}{9} \\approx 1.51$ eV.',
        },
      ],
      lines: [
        { say: 'Your turn. How much energy, in electron volts, is needed to ionize a hydrogen atom whose electron is in the level n equals 3? Pause the video and try it.', caption: 'Your turn. How much energy, in eV, is needed to ionize a hydrogen atom whose electron is in the level n = 3? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The energy is 13.6 over 3 squared, which is 13.6 over 9, about 1.51 electron volts. That is choice "C".', caption: 'The energy is 13.6 ÷ 3², which is 13.6 ÷ 9, about 1.51 eV. That is choice C.', show: 'q2.answer' },
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
          items: ['For hydrogen, $E_n = -\\dfrac{13.6}{n^2}$ eV', 'To free the electron from level $n$: $\\dfrac{13.6}{n^2}$ eV', 'Higher levels sit closer to zero, so they are **easier** to ionize', 'Solve for $n^2$ first, then take the **square root**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. For hydrogen, the energy of level n is negative 13.6 over n squared electron volts.', caption: 'Here is what to remember. For hydrogen, the energy of level n is −13.6 ÷ n² eV.', show: 'sum.0' },
        { say: 'To free the electron from level n takes 13.6 over n squared electron volts.', caption: 'To free the electron from level n takes 13.6 ÷ n² eV.', show: 'sum.1' },
        { say: 'Higher levels sit closer to zero, so they are easier to ionize.', show: 'sum.2' },
        { say: 'And solve for n squared first, then take the square root. For more on the Bohr model, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
