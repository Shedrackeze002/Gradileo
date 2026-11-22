import type { AtomsEl, Explainer } from '@/video/script.ts';
import { alkaliInWater } from '@/content/chem10/videos/lib/c10-particles.ts';

// Exam question for Chemistry 10 lesson 2.5 (families of elements): why potassium reacts with water
// more vigorously than sodium. OpenStax Chemistry 2e explains group trends with ionization energy,
// beyond this course, so Gradileo wrote this one in the style of a high-school chemistry unit test
// (our own wording). Answer: both have one outer electron, lost when they react; potassium's is in
// the fourth shell, further from the nucleus and shielded by more inner shells, so it is held less
// strongly and lost more easily.
//
// The pictures: lithium, sodium and potassium dropped into water side by side (the lesson's
// simulation: hydrogen bubbles off fastest from potassium, and its water warms most), and sodium
// and potassium atoms losing their outer electrons, potassium first.

const QUESTION =
  'Sodium and potassium are both in group 1. When a small piece of each metal is added to water, potassium reacts much more vigorously than sodium. Explain this difference in terms of the electron arrangements of the two atoms.';

const twoAtoms: AtomsEl = {
  kind: 'atoms',
  id: 'at',
  span: [12, 7],
  atoms: [
    { id: 'na', symbol: 'Na', protons: 11, at: [3, 3.5], tone: 'opp', name: 'sodium' },
    { id: 'k', symbol: 'K', protons: 19, at: [8.6, 3.5], tone: 'brand', name: 'potassium' },
  ],
  clips: { lose: { phases: [{ dur: 0.4 }, { dur: 1.4, give: [{ from: 'k', to: null, n: 1 }] }, { dur: 1.6 }, { dur: 1.4, give: [{ from: 'na', to: null, n: 1 }] }, { dur: 0.6 }] } },
  poster: 'lose',
  height: 460,
};

const video: Explainer = {
  id: 'xq-c10-2-5',
  lessonId: '',
  exam: {
    lesson: 'c10-2-5',
    source: 'Exam-style question written by Gradileo, in the style of a high-school chemistry unit test',
    licence: 'Gradileo\'s own question',
    question: QUESTION,
  },
  title: 'Exam Question: Why Is Potassium More Reactive than Sodium? The Alkali Metals',
  thumbnailTitle: 'Why Potassium Wins',
  thumbnail: 'aw',
  summary:
    'An exam-style question, solved one small step at a time: sodium and potassium are both in group 1, so why does potassium react with water so much more vigorously? We watch the metals fizz in water, compare their electron arrangements, and see that potassium\'s single outer electron is further from the nucleus, so it is lost more easily.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Why Potassium Wins', subtitle: 'Reactivity down group 1, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about two metals that belong to the same family but react very differently. We will take it one small step at a time.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a high-school chemistry test. You will see that at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: 'Both lose **one outer electron**. Potassium\'s is in the **fourth shell**, further from the nucleus with more shells between, so it is held **less strongly** and lost **more easily**.',
          working: 'Na 2,8,1; K 2,8,8,1.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Sodium and potassium are both in group 1. When a small piece of each metal is added to water, potassium reacts much more vigorously than sodium. Explain this difference in terms of the electron arrangements of the two atoms.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [alkaliInWater('aw', 420)],
      lines: [
        { say: 'Let us watch what the question describes. Here are lithium, sodium and potassium, each about to drop into water.', show: ['aw', 'aw.labels', 'aw.thermo'] },
        { say: 'All three fizz as hydrogen gas bubbles off. Lithium is steady, sodium is faster, and potassium is fastest of all, and its water gets hottest.', play: 'aw.drop', playDelay: 0.3 },
        { say: 'The question asks why, and it tells us where to look: at the electron arrangements.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['A group 1 metal reacts by **losing its one outer electron**', 'The nucleus (positive) **pulls** on the electrons (negative)', 'The pull is **weaker** further away, and when more inner shells sit in between', 'The **easier** the electron is lost, the **more reactive** the metal'] },
      ],
      lines: [
        { say: 'Here is what we need. A group 1 metal reacts by losing its single outer electron, to become an ion with a full outer shell.', show: 'b.0' },
        { say: 'The positive nucleus pulls on the negative electrons.', show: 'b.1' },
        { say: 'That pull is weaker the further away the electron is, and weaker still when more shells of electrons sit in between and shield it.', show: 'b.2' },
        { say: 'So the more easily the outer electron is lost, the more reactive the metal.', show: 'b.3' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write both **electron arrangements**', 'Say what is the **same**: one outer electron', 'Say what is **different**, and link it to reactivity'] }],
      lines: [
        { say: 'Here is the plan. First, write both electron arrangements.', show: 'plan.0' },
        { say: 'Second, say what they have in common.', show: 'plan.1' },
        { say: 'Third, say what is different, and link that difference to how vigorously they react.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The arrangements',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Na (11): } 2,8,\\opp{1}', '\\text{K (19): } 2,8,8,\\opp{1}'] }],
      lines: [
        { say: 'Step one. Sodium has 11 electrons: two, eight, one.', show: 'm.0' },
        { say: 'Potassium has 19 electrons: two, eight, eight, one.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The same',
      layout: 'center',
      main: [twoAtoms, { kind: 'text', id: 't', size: 'md', md: 'Both have **one** outer electron, lost when they react' }],
      lines: [
        { say: 'Step two. Here are the two atoms. Each has a single electron in its outer shell, which is why they are both in group 1 and react in the same way.', show: ['at', 'at.labels', 'at.arrangement', 't'] },
      ],
    },
    {
      chapter: 'Step 3: The difference',
      layout: 'center',
      main: [twoAtoms, { kind: 'text', id: 't', size: 'md', md: 'Potassium\'s outer electron: **further out**, more **shielded**, **lost first**' }],
      lines: [
        { say: 'Step three. Look at where the outer electron is. Sodium\'s is in the third shell. Potassium\'s is in the fourth, further from the nucleus, with three full shells in between instead of two.', show: ['at', 'at.labels', 'at.arrangement'] },
        { say: 'So the nucleus holds potassium\'s outer electron less strongly. Watch: potassium loses its electron first and most easily. Sodium hangs on to its electron a little longer.', show: ['t', 'at.charges'], play: 'at.lose', playDelay: 0.3 },
        { say: 'An electron that is lost more easily means a faster, more vigorous reaction. That is why potassium reacts more vigorously.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ans',
          check: true,
          items: [
            'Na is **2,8,1** and K is **2,8,8,1**: both have **one outer electron**, which they lose when they react.',
            'Potassium\'s outer electron is in the **fourth shell**, further from the nucleus, with more inner shells shielding it.',
            'So it is **held less strongly** and **lost more easily**, and potassium reacts more vigorously.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a full-mark answer, in three linked points. Sodium is two, eight, one, and potassium is two, eight, eight, one. Both have one outer electron, which they lose when they react.', show: 'ans.0' },
        { say: 'Potassium\'s outer electron is in the fourth shell, further from the nucleus, with more inner shells shielding it.', show: 'ans.1' },
        { say: 'So it is held less strongly and lost more easily, and potassium reacts more vigorously. Each point leads to the next, which is what examiners look for.', show: 'ans.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Tempting answer', 'Why it loses marks'],
          rows: [
            ['"Potassium has more electrons"', 'True, but not the **reason**'],
            ['"Potassium has more outer electrons"', 'Both have **one**'],
            ['"Its electron is gained more easily"', 'Metals **lose** electrons'],
            ['"Potassium is bigger" (and stop)', 'Say **why** that loosens the outer electron'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'Saying potassium has more electrons. That is true, but it does not explain anything on its own.' },
        { say: 'Saying potassium has more outer electrons. Both have exactly one. And saying it gains electrons: metals react by losing them.' },
        { say: 'And stopping at "potassium is bigger". Finish the chain: further from the nucleus, held less strongly, lost more easily.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Rubidium is below potassium in group 1. Compared with potassium, rubidium reacts with water…',
          choices: ['less vigorously, because it has more shells', 'in exactly the same way', 'more vigorously, because its outer electron is lost more easily', 'not at all, because its outer shell is full'],
          answer: 2,
          working: 'Rubidium\'s one outer electron is in the fifth shell, even further from the nucleus, so it is lost even more easily.',
        },
      ],
      lines: [
        { say: 'Your turn. Rubidium is below potassium in group 1. Compared with potassium, how does rubidium react with water? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'More vigorously, choice C. Its one outer electron is in the fifth shell, even further out, so it is lost even more easily. Reactivity increases down group 1.', show: 'q2.answer' },
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
          items: ['Group 1 metals react by **losing one** outer electron', 'Down the group, it is **further out** and more **shielded**', 'So it is lost **more easily**: reactivity **increases** down group 1', 'Answer in a chain: arrangement → distance → pull → reactivity'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Group 1 metals react by losing their one outer electron.', show: 'sum.0' },
        { say: 'Down the group, that electron is further from the nucleus and more shielded.', show: 'sum.1' },
        { say: 'So it is lost more easily, and reactivity increases down the group.', show: 'sum.2' },
        { say: 'And write your answer as a chain of reasons. For more on families of elements, watch this lesson\'s explainer videos on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
