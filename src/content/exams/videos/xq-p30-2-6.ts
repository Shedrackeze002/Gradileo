import type { CircuitEl, Explainer } from '@/video/script.ts';

// Exam question for Grade 12 lesson 2.6 (emf and internal resistance): a battery with a 12.0 V emf
// and an internal resistance of 0.100 Ω is connected to a 10.0 Ω load. What is its terminal
// voltage? The question is part (a) of OpenStax College Physics 2e's worked example "Calculating
// Terminal Voltage, Power Dissipation, Current, and Resistance: Terminal Voltage and Load", word
// for word (section 21.2, CC BY-NC-SA 4.0; Gradileo is non-commercial). I = emf ÷ (R + r) =
// 12.0 ÷ 10.1 = 1.188 A, and V = emf − Ir = 12.0 − 0.119 = 11.9 V.
//
// The picture (src/video/circuit.ts) is the battery with its internal resistance and the 10.0 Ω
// load: the meters read 1.19 A and 11.88 V at the terminals, with 0.12 V lost inside. A second clip
// swaps in the 0.500 Ω load of part (b), and the terminals drop to 10.0 V.

const cell: CircuitEl = {
  kind: 'circuit',
  id: 'c',
  volts: 12,
  internal: 0.1,
  layout: 'series',
  open: true,
  parts: [{ id: 'load', kind: 'resistor', ohms: 10, label: 'Load' }],
  height: 430,
  poster: 'on',
  clips: {
    on: { phases: [{ dur: 0.6 }, { dur: 6, set: { closed: true } }] },
    small: { phases: [{ dur: 2, set: { closed: true } }, { dur: 6, set: { ohms: { load: 0.5 } }, note: 'A 0.500 Ω load' }] },
  },
};

const QUESTION = 'A certain battery has a 12.0-V emf and an internal resistance of 0.100 Ω. (a) Calculate its terminal voltage when connected to a 10.0-Ω load.';

const video: Explainer = {
  id: 'xq-p30-2-6',
  lessonId: '',
  exam: {
    lesson: 'p30-2-6',
    source: 'OpenStax, College Physics 2e, Worked Example on terminal voltage and load, part (a), section 21.2',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-physics-2e/pages/21-2-electromotive-force-terminal-voltage',
    question: QUESTION,
  },
  title: 'Exam Question: The Terminal Voltage of a Real Battery. Emf and Internal Resistance',
  thumbnailTitle: 'A Battery’s Terminal Voltage',
  thumbnail: 'c',
  summary:
    'A real test question, solved one small step at a time: a battery with a 12.0 V emf and 0.100 Ω of internal resistance drives a 10.0 Ω load, and we find the voltage at its terminals. We find the current through the whole circuit, the voltage lost inside the battery, and take it from the emf. Then we check the answer on the meters and see what happens with a much smaller load.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Battery’s Terminal Voltage', subtitle: 'Emf and internal resistance, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a real battery, one that has some resistance inside it. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: QUESTION,
          answer: '$11.9$ V',
          working: '$I = \\dfrac{\\text{emf}}{R + r} = \\dfrac{12.0}{10.1} = 1.188$ A, so $V = \\text{emf} - Ir = 12.0 - (1.188)(0.100) = 11.9$ V.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed. It is the first part of a longer example.', show: 'q' },
        { say: 'A certain battery has a 12.0 volt emf and an internal resistance of 0.100 ohms. Part A: calculate its terminal voltage when connected to a 10.0 ohm load. If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [cell, { kind: 'text', id: 'plain', size: 'md', md: 'What voltage is left at the battery’s **terminals**?' }],
      lines: [
        { say: 'Let us picture it. The battery is drawn with its small internal resistance, r, inside it. Outside, it is joined to a 10.0 ohm load. Close the switch.', show: ['c', 'c.charges'], play: 'c.on', playDelay: 0.5 },
        { say: 'The current has to pass through the inside of the battery too, and it loses a little voltage there. The question asks for the voltage that is left at the terminals, where the load is joined on.', show: 'plain' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Emf and internal resistance',
          md: 'The **emf** is the energy a battery gives each coulomb. A real battery has an **internal resistance** $r$, so the current is $I = \\dfrac{\\text{emf}}{R + r}$, and the **terminal voltage** is what is left after the loss inside: $V = \\text{emf} - Ir$.',
        },
        { kind: 'text', id: 'ex', size: 'md', md: 'emf $6.0$ V, $r = 1.0\\ \\Omega$, $I = 0.50$ A: $V = 6.0 - 0.50 = 5.5$ V.' },
      ],
      lines: [
        { say: 'Here is what we need. The emf of a battery is the energy it gives each coulomb of charge.', show: 'def' },
        { say: 'A real battery has some resistance inside it. The current goes through the load and the internal resistance, one after the other, so the current is the emf divided by their total. Some voltage is lost inside, so the terminal voltage is the emf minus the current times the internal resistance.' },
        { say: 'For example, a six volt emf with one ohm inside, giving half an amp, loses half a volt inside. Its terminals are at 5.5 volts.', show: 'ex' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'plan',
          items: ['Find the current: $I = \\dfrac{\\text{emf}}{R + r}$', 'Find the voltage lost **inside**: $Ir$', 'Take it from the emf: $V = \\text{emf} - Ir$'],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, find the current.', show: 'plan.0' },
        { say: 'Second, find the voltage lost inside the battery.', show: 'plan.1' },
        { say: 'Third, take that from the emf.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The current',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['I = \\dfrac{\\text{emf}}{R + r} = \\dfrac{12.0\\ \\text{V}}{10.0\\ \\Omega + 0.100\\ \\Omega}', '= \\dfrac{12.0}{10.1} = \\adj{1.188\\ \\text{A}}'] }],
      lines: [
        { say: 'Step one. The load and the internal resistance are in series, so they add: 10.0 plus 0.100 is 10.1 ohms.', show: 'm.0' },
        { say: 'Twelve volts divided by 10.1 ohms is 1.188 amps.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The voltage lost inside',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['Ir = (1.188\\ \\text{A})(0.100\\ \\Omega) = \\opp{0.119\\ \\text{V}}'] }],
      lines: [
        { say: 'Step two. The voltage lost inside the battery is the current times the internal resistance: 1.188 times 0.100. That is 0.119 volts.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Terminal voltage',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = \\text{emf} - Ir = 12.0 - 0.119', '= 11.88\\ \\text{V} \\approx \\good{11.9\\ \\text{V}}'] }],
      lines: [
        { say: 'Step three. Take the loss from the emf: twelve minus 0.119.', show: 'm.0' },
        { say: '11.88 volts, or 11.9 volts to three significant figures. With a large load, the battery keeps almost all of its emf.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [cell, { kind: 'math', id: 'm', size: 'md', lines: ['IR = (1.188)(10.0) = 11.9\\ \\text{V}\\ \\checkmark'] }],
      lines: [
        { say: 'Let us check it on the meters. The ammeter reads 1.19 amps. The voltmeter across the terminals reads 11.88 volts, and 0.12 volts is lost inside.', show: ['c', 'c.charges', 'c.current', 'c.terminal', 'c.lost'], play: 'c.on', playDelay: 0.3 },
        { say: 'The terminal voltage is also the voltage across the load: 1.188 amps times ten ohms is 11.9 volts. Both ways agree.', show: 'm.0' },
        { say: 'Now watch what part B of the example does: swap in a load of only 0.500 ohms. The current is much bigger, much more is lost inside, and the terminals drop to ten volts.', play: 'c.small', playDelay: 0.3, hide: 'm' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Mistake', 'What you get'],
          rows: [
            ['Ignored the internal resistance', '$12.0$ V: the emf, not the terminal voltage'],
            ['$I = \\dfrac{12.0}{10.0}$, leaving out $r$', '$1.20$ A, then $V = 11.88$ V: close, by luck'],
            ['**Added** $Ir$ to the emf', '$12.1$ V: more than the battery gives'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps in this question.', show: 'traps' },
        { say: 'Giving the emf, twelve volts, ignores the internal resistance, which is the whole point of the question.' },
        { say: 'Leaving r out of the current gives 1.20 amps. Here the answer comes out almost the same, because r is so small, but with a small load it would be badly wrong.' },
        { say: 'And the loss inside is taken away, never added. A battery cannot give more than its emf.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A battery with an emf of 9.0 V and an internal resistance of 0.50 Ω drives a current of 2.0 A. What is its terminal voltage?',
          choices: ['9.0 V', '8.0 V', '10.0 V', '1.0 V'],
          answer: 1,
          working: '$V = \\text{emf} - Ir = 9.0 - (2.0)(0.50) = 8.0$ V.',
        },
      ],
      lines: [
        { say: 'Your turn. A battery with an emf of 9.0 volts and an internal resistance of 0.50 ohms drives a current of 2.0 amps. What is its terminal voltage? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The loss inside is two times 0.50: one volt. Nine minus one is eight volts. That is choice B. Ten volts added the loss, and one volt is only the loss.', show: 'q2.answer' },
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
          items: ['Current: $I = \\dfrac{\\text{emf}}{R + r}$', 'Voltage lost inside: $Ir$', 'Terminal voltage: $V = \\text{emf} - Ir$', 'Small load, big current: the terminals **drop**'],
        },
      ],
      lines: [
        { say: 'Here is what to remember. The current is the emf divided by the load plus the internal resistance.', show: 'sum.0' },
        { say: 'The voltage lost inside the battery is the current times the internal resistance.', show: 'sum.1' },
        { say: 'The terminal voltage is the emf minus that loss.', show: 'sum.2' },
        { say: 'And the bigger the current, the more the terminal voltage drops. For more on emf and internal resistance, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
