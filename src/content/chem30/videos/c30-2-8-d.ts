import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { flow } from './lib/c30-2b-figures.ts';

// From a current and a time to a mass of metal: Faraday's law gives the electrons, the
// half-reaction the amount of metal, and the molar mass its mass.
const path = figure(
  'f',
  [
    flow({
      nodes: [
        { id: 'it', tex: 'I,\\ t', tone: 'adj' },
        { id: 'ne', tex: 'n_{e^-}' },
        { id: 'nm', tex: 'n_\\text{metal}' },
        { id: 'm', tex: 'm', tone: 'good' },
      ],
      arrows: [
        { id: 'a1', from: 'it', to: 'ne', tex: '\\dfrac{It}{F}' },
        { id: 'a2', from: 'ne', to: 'nm', tex: '\\text{half-reaction}' },
        { id: 'a3', from: 'nm', to: 'm', tex: '\\times M' },
      ],
      width: 2.6,
      height: 1.6,
      gap: 6,
    }),
  ],
  280,
);

const video: Explainer = {
  id: 'c30-2-8-d',
  lessonId: 'c30-2-8',
  title: "Electrolytic Cells and Faraday's Law, Part 4: Mass and Time from Faraday's Law",
  thumbnailTitle: "Mass and Time from Faraday's Law",
  thumbnail: 'f',
  summary:
    "Faraday's law gives the amount of electrons, n = It/F; the half-reaction turns it into moles of metal, and the molar mass into a mass. 3.00 A for 45.0 min deposits 2.67 g of copper, since each Cu²⁺ ion needs two electrons (skipping that ratio gives twice the right answer). Working backwards, plating 2.00 g of silver with 0.500 A takes 3578 s, about 59.6 min.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electrochemical Changes · Part 4', title: "Mass and Time from Faraday's Law", subtitle: 'From electrons to grams, and back' }],
      lines: [
        { say: 'How much copper does three quarters of an hour of plating deposit? How long does it take to coat a spoon with silver?', show: 'title' },
        { say: 'In this part, you will use Faraday’s law with a half-reaction to find a mass of metal, and then work backwards to find a time.' },
      ],
    },
    {
      chapter: 'From electrons to mass',
      layout: 'center',
      main: [path, { kind: 'text', id: 'note', size: 'md', align: 'center', md: 'The half-reaction says how many electrons each ion needs: two for $\\ce{Cu^2+}$, one for $\\ce{Ag+}$, three for $\\ce{Al^3+}$.' }],
      lines: [
        { say: 'Here is the path. Faraday’s law turns the current and the time into the amount of electrons.', show: ['f.it', 'f.a1', 'f.ne'], focus: 'f.a1' },
        { say: 'The half-reaction turns the electrons into moles of metal.', show: ['f.a2', 'f.nm'], focus: 'f.a2' },
        { say: 'And the molar mass turns moles into a mass.', show: ['f.a3', 'f.m'], focus: 'f.a3' },
        { say: 'The half-reaction says how many electrons each ion needs: two for a copper two ion, one for a silver ion, and three for an aluminium ion.', caption: 'The half-reaction says how many electrons each ion needs: two for a copper(II) ion, one for a silver ion, and three for an aluminium ion.', show: 'note', focus: 'f' },
      ],
    },
    {
      chapter: 'Mass of copper',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          align: 'center',
          md: 'Copper is plated from copper(II) sulfate solution with $3.00\\ \\text{A}$ for $45.0\\ \\text{min}$: $\\ce{Cu^2+ + 2e- -> Cu}$. What mass of copper forms? Use Cu $63.55\\ \\text{g/mol}$ and $F = 9.65 \\times 10^4\\ \\text{C/mol}$.',
        },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            't = 45.0 \\times 60 = 2700\\ \\text{s}',
            'n_{e^-} = \\dfrac{It}{F} = \\dfrac{3.00 \\times 2700}{9.65 \\times 10^4} = 0.08394\\ \\text{mol}',
            'n(\\ce{Cu}) = 0.08394 \\times \\dfrac{1}{2} = 0.04197\\ \\text{mol}',
            'm = nM = 0.04197 \\times 63.55 = 2.667\\ \\text{g} \\approx \\good{2.67\\ \\text{g}}',
          ],
        },
      ],
      lines: [
        {
          say: 'Copper is plated from copper two sulfate solution, with a current of three point zero zero amperes for forty-five point zero minutes. What mass of copper forms?',
          caption: 'Copper is plated from copper(II) sulfate solution, with a current of 3.00 amperes for 45.0 minutes. What mass of copper forms?',
          show: 'q',
        },
        { say: 'In seconds, the time is two thousand seven hundred seconds.', show: 'm.0', focus: 'm.0' },
        { say: 'Faraday’s law: three point zero zero times two thousand seven hundred, over the Faraday constant, is zero point zero eight three nine four moles of electrons.', show: 'm.1', focus: 'm.1' },
        { say: 'Each copper two ion needs two electrons, so the copper is half of that: zero point zero four one nine seven moles.', caption: 'Each copper(II) ion needs two electrons, so the copper is half of that: 0.04197 moles.', show: 'm.2', focus: 'm.2' },
        { say: 'Times the molar mass, sixty-three point five five grams per mole, that is two point six seven grams of copper.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Electrons per atom',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Forgetting the electrons per atom',
          md: 'Skipping the mole ratio from the half-reaction treats every electron as one copper atom: $0.08394 \\times 63.55 = 5.33\\ \\text{g}$, twice the right answer. A $\\ce{Cu^2+}$ ion needs two electrons, an $\\ce{Ag+}$ ion one, and an $\\ce{Al^3+}$ ion three.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{0.08394 \\times 63.55 = 5.33\\ \\text{g}} \\quad \\bad{\\times}', '\\good{0.08394 \\times \\tfrac{1}{2} \\times 63.55 = 2.67\\ \\text{g}} \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'A common mistake skips the half-reaction, and treats every electron as one copper atom. That gives five point three three grams, twice the right answer.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Always check how many electrons each ion needs. A copper two ion takes two, so the moles of copper are half the moles of electrons.', caption: 'Always check how many electrons each ion needs. A copper(II) ion takes two, so the moles of copper are half the moles of electrons.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Time to silver-plate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'How long does it take to plate $2.00\\ \\text{g}$ of silver onto a spoon with $0.500\\ \\text{A}$? $\\ce{Ag+ + e- -> Ag}$; use Ag $107.87\\ \\text{g/mol}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'n(\\ce{Ag}) = \\dfrac{2.00}{107.87} = 0.01854\\ \\text{mol} = n_{e^-}',
            't = \\dfrac{n_{e^-}F}{I} = \\dfrac{0.01854 \\times 9.65 \\times 10^4}{0.500} = 3578\\ \\text{s}',
            '3578\\ \\text{s} \\div 60 = \\good{59.6\\ \\text{min}}',
          ],
        },
      ],
      lines: [
        { say: 'Faraday’s law also works backwards, from a mass of product to the time or the current needed. How long does it take to plate two point zero zero grams of silver onto a spoon, with a current of zero point five zero zero amperes?', show: 'q' },
        {
          say: 'Start from the mass. Two point zero zero grams, over one hundred seven point eight seven grams per mole, is zero point zero one eight five four moles of silver. With one electron per atom, that is also the amount of electrons.',
          show: 'm.0',
          focus: 'm.0',
        },
        { say: 'Solve Faraday’s law for the time: the moles of electrons, times F, over the current. That is three thousand five hundred seventy-eight seconds.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by sixty: fifty-nine point six minutes, about an hour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A steel part is nickel-plated with a current of $2.00\\ \\text{A}$ for $40.0\\ \\text{min}$: $\\ce{Ni^2+ + 2e- -> Ni}$. Using Ni $58.69\\ \\text{g/mol}$ and $F = 9.65 \\times 10^4\\ \\text{C/mol}$, what mass of nickel is deposited?',
          choices: ['$2.92\\ \\text{g}$', '$0.973\\ \\text{g}$', '$1.46\\ \\text{g}$', '$0.0243\\ \\text{g}$'],
          answer: 2,
          working: '$n_{e^-} = 2.00 \\times 2400 \\div (9.65 \\times 10^4) = 0.04974$ mol, $n(\\ce{Ni}) = 0.02487$ mol, and $m = 0.02487 \\times 58.69 = 1.46$ g.',
        },
      ],
      lines: [
        { say: 'Your turn. A steel part is nickel-plated with a current of two point zero zero amperes for forty point zero minutes. Each nickel two ion takes two electrons. What mass of nickel is deposited? Pause the video and try it.', caption: 'Your turn. A steel part is nickel-plated with a current of 2.00 amperes for 40.0 minutes. Each nickel(II) ion takes two electrons. What mass of nickel is deposited? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is C, one point four six grams. Forty minutes is two thousand four hundred seconds, which gives zero point zero four nine seven four moles of electrons, and half as many moles of nickel. Choice A forgets to divide by two.',
          caption: 'The answer is C, 1.46 grams. Forty minutes is 2400 seconds, which gives 0.04974 moles of electrons, and half as many moles of nickel. Choice A forgets to divide by two.',
          show: 'q.answer',
        },
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
          items: [
            '$n_{e^-} = \\dfrac{It}{F}$, then moles of metal from the half-reaction, then $m = nM$.',
            'Electrons per ion: two for $\\ce{Cu^2+}$, one for $\\ce{Ag+}$, three for $\\ce{Al^3+}$.',
            'Backwards: mass $\\to$ moles $\\to n_{e^-}$, then $t = \\dfrac{n_{e^-}F}{I}$ or $I = \\dfrac{n_{e^-}F}{t}$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Faraday’s law gives the moles of electrons. The half-reaction gives the moles of metal, and the molar mass gives its mass.', show: 'sum.0' },
        { say: 'Use the electrons per ion: two for a copper two ion, one for a silver ion, and three for an aluminium ion.', caption: 'Use the electrons per ion: two for a copper(II) ion, one for a silver ion, and three for an aluminium ion.', show: 'sum.1' },
        { say: 'And to find a time or a current, work backwards from the mass. That completes this lesson on electrolytic cells and Faraday’s law. Well done!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
