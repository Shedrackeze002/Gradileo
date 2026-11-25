import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import period from '@/content/chemmore/videos/cx-8-1.ts';

// Exam question for More Chemistry Topics lesson 8.1 (periodicity across Period 3): why atoms get
// smaller, why aluminium's first ionisation energy dips below magnesium's, and why silicon melts
// far higher than sulfur. Written by Gradileo in the style of an A level chemistry exam.
//
// The picture is the lesson's four Period 3 elements warmed side by side (src/video/particles.ts).

const QUESTION = 'This question is about the elements of Period 3, from sodium to argon. (a) Explain why the atomic radius decreases from sodium to chlorine. (b) Explain why the first ionisation energy of aluminium is lower than that of magnesium. (c) Explain why silicon has a much higher melting point than sulfur.';

const video: Explainer = {
  id: 'xq-cx-8-1',
  lessonId: '',
  exam: {
    lesson: 'cx-8-1',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Shrinking Atoms, Aluminium\'s Dip and Silicon\'s Melting Point. Periodicity',
  thumbnailTitle: 'Across Period 3',
  thumbnail: 'mt',
  summary:
    'A test-style question, solved one small step at a time: why do atoms shrink across Period 3, why does aluminium have a lower first ionisation energy than magnesium, and why does silicon melt so much higher than sulfur? The nuclear charge rises with the same shielding, aluminium\'s outer electron is in a higher-energy 3p sub-shell, and silicon is giant covalent while sulfur is made of small molecules held by weak forces.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Across Period 3', subtitle: 'Radius, ionisation energy and melting point' }],
      lines: [
        { say: 'In this video, we solve a test-style question about the trends across Period 3. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: 'More protons, same shielding; Al electron in 3p; giant covalent against weak van der Waals' }],
      lines: [
        { say: 'Here is the question. This question is about the elements of Period 3, from sodium to argon. Part a: explain why the atomic radius decreases from sodium to chlorine. Part b: explain why the first ionisation energy of aluminium is lower than that of magnesium. Part c: explain why silicon has a much higher melting point than sulfur.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Explain each trend from the **nucleus**, the **sub-shells** and the **structure**' }],
      lines: [
        { say: 'Each part needs a different idea: the pull of the nucleus, the sub-shell the outer electron sits in, and the structure of the element.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(period, 'mt')],
      lines: [
        { say: 'Here is what we need, for part c. These are four Period three elements, warmed side by side.', show: ['mt', 'mt.labels', 'mt.thermo'] },
        { say: 'Sodium melts first, then sulfur, then aluminium, with its stronger metallic bonding. Silicon, held by strong covalent bonds all through, is still solid at the end.', play: 'mt.warm' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Across the period: **more protons**, **same shielding**', '3p electrons are **higher in energy** than 3s', 'Melting point depends on **structure**'] }],
      lines: [
        { say: 'Here is the plan. Across the period, the number of protons rises, while the shielding stays about the same.', show: 'plan.0' },
        { say: 'Electrons in 3p are higher in energy than those in 3s.', show: 'plan.1' },
        { say: 'And the melting point depends on what must be broken: bonds, or only forces between molecules.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Shrinking atoms',
      layout: 'center',
      main: [{ kind: 'bullets', id: 's', items: ['Nuclear charge rises from **11+** to **17+**', 'Outer electrons all in the **third shell**: similar shielding', 'Stronger pull draws them **closer**'] }],
      lines: [
        { say: 'Step one. From sodium to chlorine, the nuclear charge rises from eleven plus to seventeen plus.', show: 's.0' },
        { say: 'The outer electrons are all in the third shell, so the shielding by inner electrons stays about the same.', show: 's.1' },
        { say: 'So the outer electrons feel a stronger pull and are drawn closer to the nucleus, and the atoms get smaller. That is part a.', show: 's.2', focus: 's.2' },
      ],
    },
    {
      chapter: 'Step 2: Aluminium\'s dip',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Magnesium', 'Aluminium'],
          rows: [
            ['outer electron', '**3s²**', '**3p¹**'],
            ['energy', 'lower', '**higher**, slightly further out'],
            ['shielding', '', 'also shielded by the **3s** electrons'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. Magnesium\'s outer electron is in 3s, but aluminium\'s is alone in 3p.', show: ['t', 't.0'], focus: 't.0' },
        { say: 'The 3p sub-shell is higher in energy, and slightly further from the nucleus.', show: 't.1', focus: 't.1' },
        { say: 'The 3p electron is also partly shielded by the 3s electrons. So it is easier to remove, even though aluminium has one more proton. That is part b.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Step 3: Silicon and sulfur',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'm',
          head: ['', 'Silicon', 'Sulfur'],
          rows: [
            ['structure', '**giant covalent**', 'simple **S₈ molecules**'],
            ['to melt, break', 'many **strong covalent bonds**', 'weak **van der Waals** forces'],
            ['melting point', '**very high**', 'low'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. Silicon has a giant covalent structure, while sulfur is made of small S eight molecules.', caption: 'Step three. Silicon has a giant covalent structure, while sulfur is made of small S₈ molecules.', show: ['m', 'm.0'], focus: 'm.0' },
        { say: 'To melt silicon, many strong covalent bonds must be broken. To melt sulfur, only the weak van der Waals forces between molecules must be overcome.', show: 'm.1', focus: 'm.1' },
        { say: 'That takes far less energy, so silicon\'s melting point is much higher. That is part c.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **Nuclear charge rises**, shielding stays **similar**, so outer electrons are pulled **closer**. (b) Al\'s outer electron is in **3p**, higher in energy and **shielded by 3s**. (c) Silicon is **giant covalent**; sulfur is **simple molecular** with weak van der Waals forces.' },
      ],
      lines: [
        { say: 'Does it make sense? In the animation, sulfur melted early and silicon never did, matching weak forces against strong bonds.', show: 'ans' },
        { say: 'So atoms shrink because of the rising nuclear charge, aluminium dips because of its 3p electron, and silicon melts high because of its giant structure.' },
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
            ['More **shells** across the period', 'It is the **same** shell'],
            ['Al is **further down** the group', 'It is the **same** period'],
            ['Sulfur\'s **covalent bonds** break', 'Only the **forces between molecules**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Across a period, electrons go into the same shell. It is down a group that shells are added.', focus: 'traps.0' },
        { say: 'Aluminium is in the same period as magnesium. Its dip comes from the sub-shell, not a new shell.', focus: 'traps.1' },
        { say: 'And melting sulfur leaves the S eight molecules whole. Only the weak forces between them are overcome.', caption: 'And melting sulfur leaves the S₈ molecules whole. Only the weak forces between them are overcome.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Why is the first ionisation energy of sulfur lower than that of phosphorus?',
          choices: ['Two electrons share a 3p orbital and repel', 'Sulfur has fewer protons', 'Sulfur\'s outer electron is in 3d', 'Sulfur has an extra shell'],
          answer: 0,
          working: 'In sulfur, two electrons pair up in one 3p orbital, and their repulsion makes one easier to remove.',
        },
      ],
      lines: [
        { say: 'Your turn. Why is the first ionisation energy of sulfur lower than that of phosphorus? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'In sulfur, two electrons share one 3p orbital, and they repel each other, so one is easier to remove: choice A.', show: 'q2.answer' },
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
          items: ['Across Period 3: **more protons**, same shielding, **smaller** atoms', 'Dips at **Al** (3p) and **S** (paired 3p)', 'Silicon: **giant covalent**, highest melting point'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Across Period 3, more protons and the same shielding make atoms smaller.', show: 'sum.0' },
        { say: 'Ionisation energy dips at aluminium and at sulfur.', show: 'sum.1' },
        { say: 'And silicon\'s giant covalent structure gives it the highest melting point. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
