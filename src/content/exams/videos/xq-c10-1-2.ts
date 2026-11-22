import type { Explainer } from '@/video/script.ts';
import { ironSulfur, substances, twoMixtures } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 1.2 (pure substances and mixtures): classify eight things
// as an element, a compound or a mixture. The question is OpenStax Chemistry 2e's own, word for word
// (end-of-chapter exercise 17, section 1.2, CC BY-NC-SA 4.0). The book's answers: (a) element,
// (b) element, (c) compound, (d) mixture, (e) compound, (f) compound, (g) compound, (h) mixture.
//
// The pictures are the lesson's simulated particles: an element of atoms, an element of molecules
// and a compound moving as gases; iron and sulfur as a mixture beside iron sulfide, where a magnet
// lifts only the free iron; and salt water beside sand and water.

const QUESTION =
  'Classify each of the following as an element, a compound, or a mixture: (a) iron (b) oxygen (c) mercury oxide (d) pancake syrup (e) carbon dioxide (f) a substance composed of molecules each of which contains one hydrogen atom and one chlorine atom (g) baking soda (h) baking powder';

const video: Explainer = {
  id: 'xq-c10-1-2',
  lessonId: '',
  exam: {
    lesson: 'c10-1-2',
    source: 'OpenStax, Chemistry 2e, end-of-chapter exercise 17, section 1.2, Phases and Classification of Matter',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/chemistry-2e/pages/1-exercises',
    question: QUESTION,
  },
  title: 'Exam Question: Element, Compound or Mixture? Eight Everyday Substances',
  thumbnailTitle: 'Element, Compound or Mixture?',
  thumbnail: 'sb',
  summary:
    'A real test question, solved one small step at a time: we sort iron, oxygen, mercury oxide, pancake syrup, carbon dioxide, hydrogen chloride, baking soda and baking powder into elements, compounds and mixtures. Three questions about the particles decide each one, and we watch a magnet pull iron out of a mixture but not out of a compound.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Element, Compound or Mixture?', subtitle: 'Classifying matter, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question that asks us to sort eight substances into elements, compounds and mixtures. We will take it one small step at a time.', show: 'title' },
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
            'Classify each of the following as an element, a compound, or a mixture:<br>(a) iron (b) oxygen (c) mercury oxide (d) pancake syrup (e) carbon dioxide<br>(f) a substance composed of molecules each of which contains one hydrogen atom and one chlorine atom<br>(g) baking soda (h) baking powder',
          answer: 'Elements: (a), (b). Compounds: (c), (e), (f), (g). Mixtures: (d), (h).',
          working: 'One kind of atom: element. One kind of particle with two or more elements joined: compound. More than one kind of particle: mixture.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Classify each of the following as an element, a compound, or a mixture. Iron, oxygen, mercury oxide, pancake syrup, carbon dioxide, a substance made of molecules that each contain one hydrogen atom and one chlorine atom, baking soda, and baking powder.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [substances('sb', 360), { kind: 'text', id: 'plain', size: 'lg', md: 'Put each one in **one of three boxes**' }],
      lines: [
        { say: 'Here are three gases, drawn as their particles. Helium is single atoms. Oxygen is pairs of oxygen atoms. Water is one oxygen atom joined to two hydrogen atoms.', show: ['sb', 'sb.labels'] },
        { say: 'The question asks us to look at what each substance is made of, and put it in one of three boxes: element, compound or mixture.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Type', 'What it is made of', 'Examples'],
          rows: [
            ['**Element**', 'Only **one kind of atom**', 'Iron, Fe; oxygen, O₂'],
            ['**Compound**', 'One kind of particle, **two or more elements** chemically joined', 'Water, H₂O'],
            ['**Mixture**', '**Two or more** substances, not joined, in any amounts', 'Air, salt water'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. An element is made of only one kind of atom. Its particles can be single atoms, like iron, or molecules of the same atoms, like oxygen.', show: ['tab', 'tab.0'] },
        { say: 'A compound has one kind of particle, made of two or more different elements chemically joined in a fixed ratio. Water is always two hydrogens to one oxygen.', show: 'tab.1' },
        { say: 'A mixture is two or more substances mingled together but not joined, in any amounts. Air and salt water are mixtures.', show: 'tab.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Is there **more than one substance**? Then it is a **mixture**', 'If not: is there **more than one element**? Then it is a **compound**', 'If not: it is an **element**'],
        },
      ],
      lines: [
        { say: 'Here is the plan: three questions, in order. First, is there more than one substance in it? If so, it is a mixture.', show: 'plan.0' },
        { say: 'If not, it is a pure substance. Second, is it made of more than one element? If so, it is a compound.', show: 'plan.1' },
        { say: 'If not, it is an element.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The elements',
      layout: 'center',
      main: [substances('sb', 340), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) iron, }\\ce{Fe}\\qquad \\text{(b) oxygen, }\\ce{O2}\\qquad \\good{\\text{elements}}'] }],
      lines: [
        { say: 'Step one: the elements. Iron is on the periodic table, with the symbol F e. Every atom in a piece of iron is an iron atom, so iron is an element.', show: ['sb', 'sb.labels', 'm.0'], focus: 'sb.he', caption: 'Iron is on the periodic table, with the symbol Fe. Every atom in a piece of iron is an iron atom, so iron is an element.' },
        { say: 'Oxygen is on the periodic table too. Its particles are molecules, O two, but both atoms in each one are oxygen. One kind of atom, so oxygen is an element as well.', focus: 'sb.ox', caption: 'Oxygen is on the periodic table too. Its particles are molecules, O₂, but both atoms in each one are oxygen. One kind of atom, so oxygen is an element as well.' },
      ],
    },
    {
      chapter: 'Step 2: The compounds',
      layout: 'center',
      main: [
        substances('sb', 320),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{(c) mercury oxide, }\\ce{HgO}\\qquad \\text{(e) carbon dioxide, }\\ce{CO2}', '\\text{(f) one H joined to one Cl: }\\ce{HCl}\\qquad \\text{(g) baking soda, }\\ce{NaHCO3}'],
        },
      ],
      lines: [
        { say: 'Step two: the compounds. Look at the water box: every particle is the same, but each one has two different elements joined. That is what a compound looks like.', show: ['sb', 'sb.labels'], focus: 'sb.cp' },
        { say: 'Mercury oxide is mercury and oxygen joined, H g O. Carbon dioxide is carbon and oxygen joined, C O two. Both names tell us two elements are combined.', show: 'm.0', caption: 'Mercury oxide is mercury and oxygen joined, HgO. Carbon dioxide is carbon and oxygen joined, CO₂. Both names tell us two elements are combined.' },
        { say: 'Part f describes one kind of molecule, each with a hydrogen atom joined to a chlorine atom: hydrogen chloride, H C l. Baking soda is one pure substance, sodium hydrogen carbonate. All four are compounds.', show: 'm.1', caption: 'Part (f) describes one kind of molecule, each with a hydrogen atom joined to a chlorine atom: hydrogen chloride, HCl. Baking soda is one pure substance, sodium hydrogen carbonate. All four are compounds.' },
      ],
    },
    {
      chapter: 'Step 3: The mixtures',
      layout: 'center',
      main: [twoMixtures('mx', 340), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{(d) pancake syrup}\\qquad \\text{(h) baking powder}\\qquad \\good{\\text{mixtures}}'] }],
      lines: [
        { say: 'Step three: the mixtures. Here are two mixtures in water: salt spread evenly all through it, and sand that sinks. Each has more than one kind of particle, not joined together.', show: ['mx', 'mx.labels'] },
        { say: 'Pancake syrup is sugar dissolved in water, with flavours and colours added. Baking powder is baking soda mixed with a powdered acid and starch. Each contains several substances, in amounts a factory can change, so both are mixtures.', show: 'm.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [ironSulfur('fe', 340), { kind: 'text', id: 't', size: 'md', md: '**Elements**: (a), (b). **Compounds**: (c), (e), (f), (g). **Mixtures**: (d), (h).' }],
      lines: [
        { say: 'Here is our answer. Elements: iron and oxygen. Compounds: mercury oxide, carbon dioxide, hydrogen chloride and baking soda. Mixtures: pancake syrup and baking powder. That matches the book.', show: 't' },
        { say: 'One way to check a mixture: its parts keep their own properties. Hold a magnet over iron and sulfur stirred together, and it lifts out the iron. Over iron sulfide, a compound, it lifts nothing, because the iron is chemically joined.', show: ['fe', 'fe.labels'], play: 'fe.magnet', playDelay: 0.3 },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Tempting answer', 'Why it is wrong'],
          rows: [
            ['Oxygen, O₂, is a compound', 'Two atoms, but **one element**'],
            ['Baking soda is a mixture', 'It is **one** substance, NaHCO₃'],
            ['Syrup is a compound', 'Its parts are **not joined** and can vary'],
            ['Baking soda and powder are the same', 'Powder is soda **plus** an acid and starch'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Calling oxygen a compound because its molecule has two atoms. A compound needs two different elements, and both atoms here are oxygen.' },
        { say: 'Calling baking soda a mixture because it is a powder you buy in a box. It is one pure substance with one formula.' },
        { say: 'And mixing up baking soda with baking powder. The powder is the soda with an acid and starch added, which is what makes it a mixture.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which of these is a **compound**?',
          choices: ['Nitrogen gas, N₂', 'Table salt, NaCl', 'Sea water', 'Brass, a blend of copper and zinc'],
          answer: 1,
          working: 'Table salt is sodium and chlorine chemically joined in a fixed ratio. N₂ has only one element; sea water and brass are mixtures.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a compound: nitrogen gas, table salt, sea water, or brass? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is B, table salt: sodium and chlorine chemically joined. Nitrogen gas is an element, and sea water and brass are mixtures.', show: 'q2.answer' },
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
          items: ['**Element**: one kind of atom, even as molecules like O₂', '**Compound**: two or more elements chemically joined, one formula', '**Mixture**: two or more substances, not joined, in any amounts', 'Ask in order: more than one substance? more than one element?'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. An element has only one kind of atom, even when its atoms pair up into molecules.', show: 'sum.0' },
        { say: 'A compound has two or more elements chemically joined, and one formula.', show: 'sum.1' },
        { say: 'A mixture has two or more substances, not joined, in any amounts.', show: 'sum.2' },
        { say: 'And ask the questions in order. For more on pure substances and mixtures, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
