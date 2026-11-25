import type { AtomsEl, Explainer } from '@/video/script.ts';

// Exam question for Chemistry 9 lesson 1.4 (ions): the ions that aluminium (2,8,3) and oxygen (2,6)
// form, and the protons and electrons in a sulfide ion. Written by Gradileo in the style of a
// Grade 9 science unit test.
//
// The picture is an aluminium atom losing three electrons and an oxygen atom gaining two, drawn
// the same way as the lesson's sodium and chlorine (src/video/atoms.ts).

const QUESTION = 'Answer these questions about ions. (a) Aluminium has the electron arrangement 2,8,3. Write the symbol of the ion it forms, with its charge, and explain how it forms. (b) Oxygen has the arrangement 2,6. Write the symbol of the ion it forms, and give the ion its name. (c) Sulfur has atomic number 16. How many protons and how many electrons are in a sulfide ion, S²⁻?';

/** An aluminium atom that loses its three outer electrons, and an oxygen atom that gains two. */
const ions: AtomsEl = {
  kind: 'atoms',
  id: 'io',
  span: [13, 6.4],
  atoms: [
    { id: 'al', symbol: 'Al', protons: 13, at: [3.2, 3.2], tone: 'hyp', name: 'aluminium' },
    { id: 'o', symbol: 'O', protons: 8, at: [9.6, 3.2], tone: 'bad', name: 'oxygen' },
  ],
  clips: {
    lose: { phases: [{ dur: 1 }, { dur: 3, give: [{ from: 'al', to: null, n: 3 }] }] },
    gain: { phases: [{ dur: 1 }, { dur: 2, fill: { o: 10 } }] },
  },
  poster: 'lose',
  height: 400,
};

const video: Explainer = {
  id: 'xq-c9-1-4',
  lessonId: '',
  exam: {
    lesson: 'c9-1-4',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 9 science unit test',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Aluminium, Oxide and Sulfide Ions. Ions',
  thumbnailTitle: 'Losing and Gaining Electrons',
  thumbnail: 'io',
  summary:
    'A test-style question, solved one small step at a time: what ions do aluminium and oxygen form, and how many protons and electrons are in a sulfide ion? Aluminium loses its three outer electrons to become Al³⁺, oxygen gains two to become the oxide ion O²⁻, and a sulfide ion has 16 protons and 18 electrons.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Losing and Gaining Electrons', subtitle: 'Ions and their charges' }],
      lines: [
        { say: 'In this video, we solve a test-style question about ions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of a grade nine science unit test, and everything you need is in the question.', caption: 'It is written in the style of a Grade 9 science unit test, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'Al³⁺; O²⁻, oxide; 16 protons, 18 electrons' }],
      lines: [
        { say: 'Here is the question. Part a: aluminium has the electron arrangement two, eight, three. Write the symbol of the ion it forms, with its charge, and explain how it forms. Part b: oxygen has the arrangement two, six. Write the symbol of the ion it forms, and give the ion its name. Part c: sulfur has atomic number sixteen. How many protons and how many electrons are in a sulfide ion, S two minus?', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Each atom loses or gains electrons to reach a **full outer shell**, and the **charge** shows how many' }],
      lines: [
        { say: 'An atom becomes an ion by losing or gaining electrons until its outer shell is full. The charge tells us how many electrons moved, and which way.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [ions],
      lines: [
        { say: 'Here is what we need. On the left, an aluminium atom, two, eight, three. On the right, an oxygen atom, two, six.', show: ['io', 'io.labels', 'io.arrangement'] },
        { say: 'Watch the aluminium. It loses its three outer electrons, leaving two, eight, a full shell. Now it has thirteen protons but only ten electrons, so it carries a charge of three plus.', play: 'io.lose', show: 'io.charges', focus: 'io.al' },
        { say: 'Now the oxygen. It gains two electrons, making two, eight, also a full shell. With eight protons and ten electrons, it carries a charge of two minus.', play: 'io.gain', focus: 'io.o' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Metals **lose** outer electrons: **positive** ions', 'Non-metals **gain** electrons: **negative** ions, named **-ide**', 'Electrons = protons − **charge**'] }],
      lines: [
        { say: 'Here is the plan. Metals lose their outer electrons to make positive ions.', show: 'plan.0' },
        { say: 'Non-metals gain electrons to make negative ions, whose names end in i d e.', show: 'plan.1' },
        { say: 'And the protons never change, so the electrons are the protons take away the charge.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Aluminium',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2,8,3 \\xrightarrow{\\text{lose } 3e^-} 2,8', '13 \\text{ protons}, 10 \\text{ electrons} \\Rightarrow \\good{\\text{Al}^{3+}}'] }],
      lines: [
        { say: 'Step one. Aluminium has three outer electrons. It is far easier to lose three than to gain five, so it loses them, leaving a full shell, two, eight.', show: 'm.0' },
        { say: 'Thirteen protons and ten electrons give three more positive charges than negative ones, so the ion is A l three plus. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Oxygen',
      layout: 'center',
      main: [{ kind: 'math', id: 'o', size: 'md', lines: ['2,6 \\xrightarrow{\\text{gain } 2e^-} 2,8', '8 \\text{ protons}, 10 \\text{ electrons} \\Rightarrow \\good{\\text{O}^{2-}}, \\text{ oxide}'] }],
      lines: [
        { say: 'Step two. Oxygen has six outer electrons, so it needs two more to fill its shell. It gains two, making two, eight.', show: 'o.0' },
        { say: 'Eight protons and ten electrons give two more negative charges, so the ion is O two minus. Its name ends in i d e: the oxide ion. That is part b.', show: 'o.1', focus: 'o.1' },
      ],
    },
    {
      chapter: 'Step 3: The sulfide ion',
      layout: 'center',
      main: [{ kind: 'math', id: 's', size: 'md', lines: ['\\text{protons} = \\good{16}', '\\text{electrons} = 16 - (-2) = \\good{18}'] }],
      lines: [
        { say: 'Step three. Forming an ion never changes the protons, so the sulfide ion still has sulfur\'s sixteen protons.', show: 's.0' },
        { say: 'Electrons are protons take away the charge: sixteen take away minus two, which is sixteen plus two, eighteen electrons. That is part c.', show: 's.1', focus: 's.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Al³⁺**: aluminium **loses its 3 outer electrons** to leave a full shell. (b) **O²⁻**, the **oxide** ion. (c) **16 protons** and **18 electrons**.' },
      ],
      lines: [
        { say: 'Does it make sense? Aluminium is a metal in group thirteen, which makes three plus ions, and oxygen and sulfur are in group sixteen, which make two minus ions.', show: 'ans' },
        { say: 'So aluminium becomes A l three plus, oxygen becomes the oxide ion O two minus, and sulfide has sixteen protons and eighteen electrons.' },
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
            ['Al³⁻', 'Losing electrons makes it **positive**'],
            ['The **oxygen** ion', 'Single-element negative ions end in **-ide**'],
            ['Sulfide has **14** electrons', 'Took 2 away instead of **adding** 2'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Electrons are negative, so losing them leaves the atom positive. Aluminium\'s ion is three plus.', focus: 'traps.0' },
        { say: 'The ion is called oxide, not oxygen. Oxygen is the element.', focus: 'traps.1' },
        { say: 'And a negative ion has more electrons than protons, so the sulfide ion has eighteen, not fourteen.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Potassium has atomic number 19. How many electrons are in a K⁺ ion?',
          choices: ['19', '20', '1', '18'],
          answer: 3,
          working: 'Electrons = protons − charge = 19 − 1 = 18.',
        },
      ],
      lines: [
        { say: 'Your turn. Potassium has atomic number nineteen. How many electrons are in a K plus ion? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Electrons are protons take away the charge, nineteen take away one, which is eighteen: choice D.', show: 'q2.answer' },
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
          items: ['Metals **lose** electrons: **positive** ions', 'Non-metals **gain** electrons: negative **-ide** ions', 'Electrons = protons − **charge**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Metals lose electrons to become positive ions.', show: 'sum.0' },
        { say: 'Non-metals gain electrons to become negative ions, with names ending in i d e.', show: 'sum.1' },
        { say: 'And the electrons in an ion are the protons take away the charge. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
