import type { Explainer, NucleusEl } from '@/video/script.ts';

// Exam question for Grade 12 lesson 4.4 (the nucleus and isotopes): the radius of an alpha
// particle. The question is OpenStax College Physics 2e's own, word for word (a Problem for section
// 31.3, CC BY-NC-SA 4.0; Gradileo is non-commercial). An alpha particle is a helium-4 nucleus, so
// A = 4, and r = 1.2 fm × ∛4 = 1.2 × 1.587 = 1.90 fm, as in the book's answer of 1.9 fm.
// Check: (1.90 ÷ 1.2)³ = 1.587³ = 4.00.
//
// The pictures are the nucleus of src/video/nucleus.ts, drawn to scale with radius 1.2 fm × ∛A:
// two protons and two neutrons come together into helium-4, and its radius is marked.

const nucleus = (id: string, clips: NucleusEl['clips'], more: Partial<NucleusEl> = {}): NucleusEl => ({ kind: 'nucleus', id, height: 380, scale: 60, clips, ...more });

/** An alpha particle put together: a proton, then a second, then two neutrons. */
const built = nucleus('ab', { a: { phases: [{ dur: 1.5 }, { dur: 2.5, z: 2, symbol: 'He', name: 'Helium' }, { dur: 1 }, { dur: 2.5, n: 2 }, { dur: 1 }] } }, { z: 1, n: 0, symbol: 'H', name: 'Hydrogen' });

/** Helium-4, with its counts and its radius. */
const alpha = nucleus('al', { a: { phases: [{ dur: 4 }] } }, { z: 2, n: 2, symbol: 'He', name: 'Helium', thumb: ['names', 'symbol', 'radius'] });

const QUESTION = 'What is the radius of an α particle?';

const video: Explainer = {
  id: 'xq-p30-4-4',
  lessonId: '',
  exam: {
    lesson: 'p30-4-4',
    source: 'OpenStax, College Physics 2e, Problem for section 31.3, Substructure of the Nucleus',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/31-3-substructure-of-the-nucleus',
    question: QUESTION,
  },
  title: 'Exam Question: The Radius of an Alpha Particle (The Nucleus)',
  thumbnailTitle: 'The Radius of an Alpha Particle',
  thumbnail: 'al',
  summary:
    'A real test question, solved one small step at a time: what is the radius of an α particle? An alpha particle is a helium-4 nucleus, two protons and two neutrons, so its mass number is A = 4. The radius of a nucleus is 1.2 fm times the cube root of A, and ∛4 = 1.587, so the radius is 1.2 × 1.587 = 1.90 fm. Then we check by cubing back and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Radius of an Alpha Particle', subtitle: 'The nucleus, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the size of a nucleus. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'What is the radius of an $\\alpha$ particle?',
          answer: '$1.9$ fm',
          working: '$r = 1.2 \\times \\sqrt[3]{4} = 1.90$ fm',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'What is the radius of an alpha particle?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [built, { kind: 'text', id: 't', size: 'md', md: 'An $\\alpha$ particle is a **helium-4 nucleus**: $2$ protons and $2$ neutrons.' }],
      lines: [
        { say: 'The question does not tell us what an alpha particle is, so we must know it. Watch one being put together.', show: ['ab', 'ab.names'] },
        { say: 'Two protons and two neutrons, packed tightly together. That is the nucleus of helium-4.', show: ['ab.symbol', 'ab.counts'], play: 'ab.a' },
        { say: 'So an alpha particle is a helium-4 nucleus, and we want its radius.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['r = r_0 \\sqrt[3]{A}, \\qquad r_0 = 1.2 \\text{ fm}', '1 \\text{ fm} = 10^{-15} \\text{ m}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'A counts every nucleon', md: 'The **mass number** $A$ is the number of protons **plus** neutrons. The radius grows with the **cube root** of $A$, because nucleons pack equally closely in every nucleus.' },
      ],
      lines: [
        { say: 'Here is what we need. The radius of a nucleus is 1.2 femtometres times the cube root of its mass number, "A". A femtometre is ten to the negative 15 metres.', caption: 'Here is what we need. The radius of a nucleus is 1.2 fm × ∛A. A femtometre is 10⁻¹⁵ m.', show: 'f' },
        { say: 'The mass number counts every nucleon: protons plus neutrons. And the radius grows with the cube root of "A", because the nucleons are packed equally closely in every nucleus.', caption: 'The mass number counts every nucleon: protons plus neutrons. And the radius grows with ∛A, because the nucleons are packed equally closely in every nucleus.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the mass number $A$', 'Take the **cube root**', '**Multiply** by $1.2$ fm'] }],
      lines: [
        { say: 'Here is the plan. Find the mass number, "A".', caption: 'Here is the plan. Find the mass number, A.', show: 'plan.0' },
        { say: 'Take its cube root.', show: 'plan.1' },
        { say: 'Then multiply by 1.2 femtometres.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The mass number',
      layout: 'center',
      main: [alpha, { kind: 'math', id: 'm', size: 'md', lines: ['A = 2 + 2 = 4'] }],
      lines: [
        { say: 'Step one. Helium-4 has 2 protons and 2 neutrons. So its mass number is 2 plus 2, which is 4.', show: ['al', 'al.names', 'al.symbol', 'al.counts', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Step 2: The cube root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt[3]{4} = 1.587', '1.587^3 = 1.587 \\times 1.587 \\times 1.587 = 4.00'] }],
      lines: [
        { say: 'Step two. The cube root of 4 is the number that, multiplied by itself three times, gives 4. It is 1.587.', caption: 'Step two. ∛4 is the number that, multiplied by itself three times, gives 4. It is 1.587.', show: 'm.0' },
        { say: 'Indeed, 1.587 times 1.587 times 1.587 is 4.00.', caption: 'Indeed, 1.587 × 1.587 × 1.587 = 4.00.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The radius',
      layout: 'center',
      main: [alpha, { kind: 'math', id: 'm', size: 'md', lines: ['r = 1.2 \\times 1.587 = \\good{1.90 \\text{ fm}}'] }],
      lines: [
        { say: 'Step three. Multiply by 1.2 femtometres. 1.2 times 1.587 is 1.90. The radius of an alpha particle is 1.9 femtometres, or 1.9 times ten to the negative 15 metres.', caption: 'Step three. Multiply by 1.2 fm. 1.2 × 1.587 = 1.90. The radius of an alpha particle is 1.9 fm, or 1.9 × 10⁻¹⁵ m.', show: ['al', 'al.names', 'al.symbol', 'al.radius', 'm'], focus: 'm' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\left(\\dfrac{1.90}{1.2}\\right)^3 = 1.587^3 = 4.00 = A \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by working backwards. 1.90 divided by 1.2 is 1.587, and 1.587 cubed is 4.00. That is the mass number of helium-4. It checks out.', caption: 'Let us check by working backwards. 1.90 ÷ 1.2 = 1.587, and 1.587³ = 4.00. That is the mass number of helium-4. It checks out.', show: 'm.0', focus: 'm.0' },
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
            ['$1.51$ fm', 'used $A = 2$: count the **neutrons** too'],
            ['$2.40$ fm', 'took the **square** root: it is the **cube** root'],
            ['$4.80$ fm', 'multiplied by $A$: no root at all'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1.51 femtometres uses a mass number of 2, counting only the protons. The mass number counts the neutrons too.' },
        { say: '2.40 takes the square root of 4, which is 2. The radius needs the cube root, 1.587.' },
        { say: 'And 4.80 multiplies by 4 itself. The radius grows much more slowly than the number of nucleons.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the radius of a carbon-12 nucleus? Use $r = 1.2 \\text{ fm} \\times \\sqrt[3]{A}$.',
          choices: ['$14.4$ fm', '$2.75$ fm', '$4.16$ fm', '$1.2$ fm'],
          answer: 1,
          working: '$\\sqrt[3]{12} = 2.289$, and $1.2 \\times 2.289 = 2.75$ fm.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the radius of a carbon-12 nucleus? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The mass number is 12, and the cube root of 12 is 2.289. 1.2 times 2.289 is 2.75 femtometres. Choice "B".', caption: 'The mass number is 12, and ∛12 = 2.289. 1.2 × 2.289 = 2.75 fm. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An $\\alpha$ particle is a **helium-4** nucleus', '$A$ = protons $+$ neutrons', '$r = 1.2 \\text{ fm} \\times \\sqrt[3]{A}$', 'Use the **cube** root, not the square root'] }],
      lines: [
        { say: 'Here is what to remember. An alpha particle is a helium-4 nucleus.', show: 'sum.0' },
        { say: 'The mass number, "A", counts protons and neutrons.', caption: 'The mass number, A, counts protons and neutrons.', show: 'sum.1' },
        { say: 'The radius of a nucleus is 1.2 femtometres times the cube root of "A".', caption: 'The radius of a nucleus is 1.2 fm × ∛A.', show: 'sum.2' },
        { say: 'And use the cube root, not the square root. For more on the nucleus and isotopes, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
