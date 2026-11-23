import type { Explainer } from '@/video/script.ts';
import { pick } from './lib/pick.ts';
import tof from '@/content/chemmore/videos/cx-7-1.ts';

// Exam question for More Chemistry Topics lesson 7.1 (time of flight mass spectrometry): the
// relative atomic mass of magnesium from three isotope peaks, why lighter ions arrive first, and
// the equation for electron impact ionisation. Written by Gradileo in the style of an A level
// chemistry exam.
//
// The picture is the lesson's two ions racing down the flight tube (src/video/motion.ts).

const QUESTION = 'A sample of magnesium is analysed in a time of flight mass spectrometer. The spectrum has peaks at m/z = 24 (79.0%), 25 (10.0%) and 26 (11.0%). (a) Calculate the relative atomic mass of magnesium, to one decimal place. (b) Explain why ²⁴Mg⁺ ions reach the detector before ²⁶Mg⁺ ions. (c) The sample is ionised by electron impact. Write an equation, with state symbols, for the ionisation of a magnesium atom.';

const video: Explainer = {
  id: 'xq-cx-7-1',
  lessonId: '',
  exam: {
    lesson: 'cx-7-1',
    source: 'Exam-style question written by Gradileo, in the style of an A level chemistry exam',
    licence: "Gradileo's own question",
    question: QUESTION,
  },
  title: 'Exam Question: Three Magnesium Isotopes in a Mass Spectrometer. Time of Flight Mass Spectrometry',
  thumbnailTitle: 'Racing the Isotopes',
  thumbnail: 'tof',
  summary:
    'A test-style question, solved one small step at a time: what is the relative atomic mass of magnesium from its three peaks, why do lighter ions arrive first, and what is the equation for electron impact? The relative atomic mass is 24.3, every ion has the same kinetic energy so the lighter ones move faster, and Mg(g) + e⁻ → Mg⁺(g) + 2e⁻.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Racing the Isotopes', subtitle: 'Time of flight mass spectrometry' }],
      lines: [
        { say: 'In this video, we solve a test-style question about time of flight mass spectrometry. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'It is written in the style of an A level chemistry exam question, and everything you need is in the question.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: QUESTION, answer: '24.3; same kinetic energy, lighter ions faster; Mg(g) + e⁻ → Mg⁺(g) + 2e⁻' }],
      lines: [
        { say: 'Here is the question. A sample of magnesium is analysed in a time of flight mass spectrometer. The spectrum has peaks at m over z of 24, 79 percent, 25, 10 percent, and 26, 11 percent. Part a: calculate the relative atomic mass of magnesium, to one decimal place. Part b: explain why magnesium 24 ions reach the detector before magnesium 26 ions. Part c: the sample is ionised by electron impact. Write an equation, with state symbols, for the ionisation of a magnesium atom.', caption: 'Here is the question. A sample of magnesium is analysed in a time of flight mass spectrometer. The spectrum has peaks at m/z = 24 (79.0%), 25 (10.0%) and 26 (11.0%). Part a: calculate the relative atomic mass of magnesium, to one decimal place. Part b: explain why ²⁴Mg⁺ ions reach the detector before ²⁶Mg⁺ ions. Part c: the sample is ionised by electron impact. Write an equation, with state symbols, for the ionisation of a magnesium atom.', show: 'q' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 'plain', size: 'lg', md: 'Average the isotopes by **abundance**, then explain the **race** down the tube' }],
      lines: [
        { say: 'The relative atomic mass is an average of the isotopes, weighted by how common each is. Then we explain why the ions reach the detector at different times.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [pick(tof, 'tof')],
      lines: [
        { say: 'Here is what we need. These are two ions with the same charge, racing down the tube: one of mass twenty five, and one of mass one hundred.', show: ['tof', 'tof.clock'] },
        { say: 'The electric field gives both the same kinetic energy. The light one leaves at two metres per second, the heavy one at only one.', play: 'tof.push' },
        { say: 'Then they drift to the detector. The lighter ion arrives first: four times the mass takes twice the time.', play: 'tof.drift' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Aᵣ = Σ(mass × abundance) ÷ Σ abundance', 'Same **kinetic energy**, so lighter ions are **faster**', 'Electron impact knocks **one electron** off'] }],
      lines: [
        { say: 'Here is the plan. The relative atomic mass is the sum of each mass times its abundance, divided by the total abundance.', show: 'plan.0' },
        { say: 'All ions get the same kinetic energy, so lighter ions move faster.', show: 'plan.1' },
        { say: 'And in electron impact, a fast electron knocks one electron off each atom.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The relative atomic mass',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['24(79.0) + 25(10.0) + 26(11.0) = 2432', 'A_r = \\dfrac{2432}{100} = \\good{24.3}'] }],
      lines: [
        { say: 'Step one. Multiply each mass by its abundance and add: 24 times 79, plus 25 times 10, plus 26 times 11, which is 2,432.', caption: 'Step one. Multiply each mass by its abundance and add: 24 × 79.0 + 25 × 10.0 + 26 × 11.0 = 2432.', show: 'm.0' },
        { say: 'Divide by the total abundance, 100, to get 24.32, which is 24.3 to one decimal place. That is part a.', caption: 'Divide by the total abundance, 100, to get 24.32, which is 24.3 to one decimal place. That is part a.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The race',
      layout: 'center',
      main: [{ kind: 'math', id: 'k', size: 'md', lines: ['KE = \\tfrac{1}{2}mv^2 \\text{ is the same for every ion}', '\\text{smaller } m \\Rightarrow \\text{larger } v', '\\Rightarrow \\good{\\text{shorter time of flight}}'] }],
      lines: [
        { say: 'Step two. The electric field gives every ion the same kinetic energy, a half m v squared.', show: 'k.0' },
        { say: 'If the mass is smaller, the speed must be larger to give the same energy.', show: 'k.1' },
        { say: 'So magnesium 24 ions move faster through the drift region and take less time to reach the detector. That is part b.', caption: 'So ²⁴Mg⁺ ions move faster through the drift region and take less time to reach the detector. That is part b.', show: 'k.2', focus: 'k.2' },
      ],
    },
    {
      chapter: 'Step 3: Electron impact',
      layout: 'center',
      main: [{ kind: 'math', id: 'e', size: 'md', lines: ['\\good{\\ce{Mg(g) + e- -> Mg+(g) + 2e-}}'] }],
      lines: [
        { say: 'Step three. A high-energy electron hits a gaseous magnesium atom and knocks one electron off. The fired electron carries on, so two electrons leave. M g gas plus an electron gives M g plus gas and two electrons. That is part c.', caption: 'Step three. A high-energy electron hits a gaseous magnesium atom and knocks one electron off. The fired electron carries on, so two electrons leave: Mg(g) + e⁻ → Mg⁺(g) + 2e⁻. That is part c.', show: 'e.0', focus: 'e.0' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The answer', md: '(a) **24.3**. (b) All ions have the **same kinetic energy**, so the lighter ²⁴Mg⁺ ions **move faster** and arrive first. (c) **Mg(g) + e⁻ → Mg⁺(g) + 2e⁻**' },
      ],
      lines: [
        { say: 'Does it make sense? Most magnesium is magnesium 24, so the average should sit just above 24, and 24.3 does.', show: 'ans' },
        { say: 'So the relative atomic mass is 24.3, lighter ions arrive first because they move faster, and electron impact knocks off one electron.' },
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
            ['**25.0**', 'Took the **middle** mass, ignoring abundance'],
            ['Lighter ions get **more energy**', 'Every ion gets the **same** energy'],
            ['Mg + e⁻ → Mg⁺', 'Forgot the **two** electrons leaving'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps that catch people on this one.', show: 'traps' },
        { say: 'A plain average of 24, 25 and 26 is 25, but most atoms are magnesium 24, so we must weight by abundance.', focus: 'traps.0' },
        { say: 'The field gives every ion the same kinetic energy. The lighter ones are faster because they are lighter.', focus: 'traps.1' },
        { say: 'And the electron we fire is not absorbed. It leaves along with the one it knocks off.', focus: 'traps.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Two ions with the same charge and the same kinetic energy have masses 16 and 64. How many times longer does the heavier ion take to reach the detector?',
          choices: ['2', '4', '16', '0.5'],
          answer: 0,
          working: 'Time of flight is proportional to √m, and √(64/16) = √4 = 2.',
        },
      ],
      lines: [
        { say: 'Your turn. Two ions with the same charge and the same kinetic energy have masses 16 and 64. How many times longer does the heavier ion take to reach the detector? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The time of flight goes as the square root of the mass. The heavier ion is four times the mass, and the square root of 4 is 2: choice A.', show: 'q2.answer' },
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
          items: ['Aᵣ is the **abundance-weighted** mean of the isotopes', 'Same KE, so **lighter ions arrive first**', 'Electron impact: X(g) + e⁻ → X⁺(g) + **2e⁻**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The relative atomic mass is the mean of the isotope masses, weighted by abundance.', show: 'sum.0' },
        { say: 'Every ion gets the same kinetic energy, so lighter ions arrive first.', show: 'sum.1' },
        { say: 'And electron impact knocks one electron off, so two electrons leave. For more, watch this lesson\'s explainer video on Gradileo.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
