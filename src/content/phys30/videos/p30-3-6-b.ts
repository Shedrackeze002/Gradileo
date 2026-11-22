import type { Explainer, PhotonsEl } from '@/video/script.ts';

// Lesson 3.6, second part: the photoelectric effect. The pictures are true to their numbers
// (src/video/photons.ts): sodium has a work function of 2.36 eV, so red light (650 nm, 1.91 eV)
// frees no electrons however bright it is, and violet light (400 nm, 3.11 eV) frees electrons
// with up to 0.75 eV, at once. In the tube, each electron slows steadily on its way to the
// negative plate and crosses only if its kinetic energy is more than eV, so the current falls
// to zero at the stopping voltage, 0.75 V.

const SODIUM = { name: 'Sodium', work: 2.36 };
const metal = (id: string, height: number, nm: number, rate: number, clips: PhotonsEl['clips'], more: Partial<PhotonsEl> = {}): PhotonsEl => ({ kind: 'photons', id, nm, rate, metal: SODIUM, height, clips, ...more });

/** What the experiments showed: red light, dim and bright, then violet light, dim and bright, then ultraviolet. */
const observe = metal('ob', 470, 650, 3, {
  a: { phases: [{ dur: 9.5 }] },
  bright: { phases: [{ dur: 4, rate: 9 }, { dur: 7.3 }] },
  violet: { phases: [{ dur: 3, rate: 2, nm: 400 }, { dur: 5.7 }] },
  more: { phases: [{ dur: 4, rate: 7 }, { dur: 4.7 }] },
  uv: { phases: [{ dur: 3, nm: 300 }, { dur: 4.5 }] },
});

/** Einstein's explanation: the energy of one photon, beside the work function and what is left over. */
const einstein = metal('ei', 400, 400, 4, { a: { phases: [{ dur: 10.9 }] }, b: { phases: [{ dur: 11.3 }] }, c: { phases: [{ dur: 9.5 }] }, d: { phases: [{ dur: 11.3 }] } }, { poster: 'b', thumb: ['names', 'bars'] });

/** The light slides towards red: less energy is left over, and below the threshold no electrons leave. */
const threshold = metal('th', 400, 400, 4, {
  a: { phases: [{ dur: 6, nm: 500 }, { dur: 4 }] },
  b: { phases: [{ dur: 4, nm: 600 }, { dur: 3, rate: 9 }, { dur: 6.9 }] },
  c: { phases: [{ dur: 5, nm: 450, rate: 4 }, { dur: 3.7 }] },
});

/** The threshold of sodium, 527 nm: the light slides from violet through green to orange, and the electrons stop. */
const limit = metal('lm', 300, 400, 5, { a: { phases: [{ dur: 13.9 }] }, b: { phases: [{ dur: 7.8 }] }, c: { phases: [{ dur: 2 }, { dur: 7, nm: 560 }, { dur: 2.8 }] }, d: { phases: [{ dur: 3, nm: 600 }, { dur: 4.8 }] } });

/** The lesson's example: violet light of 400 nm on sodium. */
const kinetic = metal('ke', 330, 400, 4, { a: { phases: [{ dur: 9.1 }] }, b: { phases: [{ dur: 14.8 }] }, c: { phases: [{ dur: 7.3 }] }, d: { phases: [{ dur: 11.7 }] } });

/** The tube: a collecting plate that is made more and more negative, up to the stopping voltage. */
const tube = metal(
  'tb',
  470,
  400,
  5,
  {
    a: { phases: [{ dur: 13.9 }] },
    b: { phases: [{ dur: 2 }, { dur: 5, volts: 0.4 }, { dur: 5.2 }] },
    c: { phases: [{ dur: 1.5 }, { dur: 5, volts: 0.75 }, { dur: 3.5 }] },
    d: { phases: [{ dur: 17 }] },
  },
  { tube: { volts: 0 } },
);

/** A metal to identify: ultraviolet light of 250 nm, and a stopping voltage of 1.30 V. */
const unknown: PhotonsEl = { kind: 'photons', id: 'wf', nm: 250, rate: 5, metal: { name: 'Metal', work: 3.67 }, tube: { volts: 1.3 }, height: 360, clips: { a: { phases: [{ dur: 10.9 }] }, b: { phases: [{ dur: 8.2 }] }, c: { phases: [{ dur: 10 }] } } };

/** The graph of the greatest kinetic energy against the frequency, with a dot that follows the light. */
const graph = metal('gr', 470, 650, 5, {
  a: { phases: [{ dur: 1.5 }, { dur: 6, nm: 540 }, { dur: 2 }] },
  b: { phases: [{ dur: 7, nm: 300 }, { dur: 1.7 }] },
  c: { phases: [{ dur: 6, nm: 400 }, { dur: 11 }] },
  d: { phases: [{ dur: 5, nm: 340 }, { dur: 5.4 }] },
});

const video: Explainer = {
  id: 'p30-3-6-b',
  lessonId: 'p30-3-6',
  title: 'The Photoelectric Effect',
  thumbnailTitle: 'Photoelectric Effect',
  thumbnail: 'ei',
  summary:
    'Light can knock electrons out of a metal, but only above a threshold frequency. Watch red and violet light land on sodium, see how Einstein explained every result with one photon freeing one electron, find a threshold frequency and a kinetic energy, measure the kinetic energy with a stopping voltage, and read the graph that gives Planck\'s constant.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'The Photoelectric Effect', subtitle: 'One photon frees one electron' }],
      lines: [
        { say: 'Shine light on a clean metal surface, and it can knock electrons right out of the metal. This is the photoelectric effect.', show: 'title' },
        { say: 'The way it happens could not be explained by waves. Einstein explained it with photons, and it won him the Nobel Prize.' },
      ],
    },
    {
      chapter: 'What the experiments showed',
      layout: 'center',
      main: [observe],
      lines: [
        { say: 'Here is a plate of sodium, with red light shining on it. Photons land on the metal, but no electrons leave.', show: ['ob', 'ob.names', 'ob.values'], play: 'ob.a' },
        { say: 'Make the red light much brighter. Still nothing. Below a certain frequency, called the threshold frequency, no electrons are freed, however bright the light is.', show: 'ob.count', play: 'ob.bright' },
        { say: 'Now change the light to violet, and make it dim. Electrons leave at once, with no delay at all.', play: 'ob.violet' },
        { say: 'Make the violet light brighter. More electrons leave each second, but the fastest ones are no faster than before.', show: 'ob.fastest', play: 'ob.more' },
        { say: 'Raise the frequency into the ultraviolet, and the electrons leave with more kinetic energy.', play: 'ob.uv' },
      ],
    },
    {
      chapter: 'Why waves fail',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['A wave would predict', 'What really happens'],
          rows: [
            ['Bright light of any colour frees electrons', 'Below the threshold frequency, none are freed'],
            ['In dim light, electrons need time to soak up energy', 'Electrons leave at once'],
            ['Brighter light gives faster electrons', 'Brighter light gives more electrons, no faster'],
          ],
        },
      ],
      lines: [
        { say: 'A brighter wave carries more energy. So a wave should free electrons at any colour, if it is bright enough. It does not.', show: 't.0' },
        { say: 'In dim light, a wave would need time to build up enough energy in an electron. But the electrons leave at once.', show: 't.1' },
        { say: 'And a brighter wave should throw the electrons out faster. Instead there are more of them, at the same speeds. Every prediction of the wave theory is wrong.', show: 't.2' },
      ],
    },
    {
      chapter: 'Einstein\'s explanation',
      layout: 'center',
      main: [einstein, { kind: 'math', id: 'm', size: 'lg', lines: ['E_{k\\,\\text{max}} = hf - W'] }],
      lines: [
        { say: 'Einstein\'s explanation was simple. Each electron is freed by a single photon, which gives all of its energy, h f, to that one electron.', caption: 'Einstein\'s explanation was simple. Each electron is freed by a single photon, which gives all of its energy, hf, to that one electron.', show: ['ei', 'ei.names', 'ei.values'], play: 'ei.a' },
        { say: 'The electron needs a certain least energy to break away from the metal. This is the work function, W. For sodium, it is 2.36 electronvolts.', caption: 'The electron needs a certain least energy to break away from the metal. This is the work function, W. For sodium, it is 2.36 eV.', show: 'ei.bars', play: 'ei.b' },
        { say: 'Whatever is left over becomes the kinetic energy of the electron. So the greatest kinetic energy is h f minus W.', caption: 'Whatever is left over becomes the kinetic energy of the electron. So the greatest kinetic energy is hf − W.', show: ['m.0', 'ei.fastest'], play: 'ei.c' },
        { say: 'Some electrons lose a little energy on their way out of the metal. So this is the greatest kinetic energy, and the others have less.', play: 'ei.d' },
      ],
    },
    {
      chapter: 'The threshold',
      layout: 'center',
      main: [threshold, { kind: 'math', id: 'w', size: 'lg', lines: ['W = hf_0'] }],
      lines: [
        { say: 'Now slide the light towards red. Each photon brings less energy, so less is left over, and the electrons leave more slowly.', show: ['th', 'th.names', 'th.values', 'th.bars'], play: 'th.a' },
        { say: 'When the energy of a photon falls below the work function, no photon can free an electron. More photons do not help, since each electron is freed by one photon alone.', play: 'th.b' },
        { say: 'So the threshold frequency, f zero, is where the photon has just enough energy: W equals h f zero.', caption: 'So the threshold frequency, f₀, is where the photon has just enough energy: W = hf₀.', show: 'w.0', play: 'th.c' },
      ],
    },
    {
      layout: 'center',
      main: [
        limit,
        {
          kind: 'math',
          id: 'f',
          size: 'md',
          lines: [
            'W = 2.36 \\times 1.60 \\times 10^{-19} = 3.776 \\times 10^{-19}\\text{ J}',
            'f_0 = \\dfrac{W}{h} = \\dfrac{3.776 \\times 10^{-19}}{6.63 \\times 10^{-34}} = \\brand{5.70 \\times 10^{14}\\text{ Hz}}',
            '\\lambda_0 = \\dfrac{hc}{W} = \\dfrac{6.63 \\times 10^{-34} \\times 3.00 \\times 10^{8}}{3.776 \\times 10^{-19}} = \\brand{527\\text{ nm}}',
          ],
        },
      ],
      lines: [
        { say: 'Let\'s find the threshold of sodium. First change the work function to joules: 2.36 times 1.60 times ten to the negative 19 is 3.776 times ten to the negative 19 joules.', caption: 'Let\'s find the threshold of sodium. First change the work function to joules: 2.36 × 1.60 × 10⁻¹⁹ is 3.776 × 10⁻¹⁹ J.', show: ['lm', 'lm.names', 'lm.bars', 'f.0'], play: 'lm.a' },
        { say: 'The threshold frequency is W divided by h, which is 5.70 times ten to the fourteen hertz.', caption: 'The threshold frequency is W ÷ h, which is 5.70 × 10¹⁴ Hz.', show: 'f.1', play: 'lm.b' },
        { say: 'The longest wavelength that frees electrons goes with this lowest frequency. It is h c divided by W, which is 527 nanometres. That is green light.', caption: 'The longest wavelength that frees electrons goes with this lowest frequency. It is hc ÷ W, which is 527 nm. That is green light.', show: 'f.2', play: 'lm.c' },
        { say: 'So green, blue and violet light free electrons from sodium, but orange and red light do not.', play: 'lm.d' },
      ],
    },
    {
      chapter: 'The kinetic energy',
      layout: 'center',
      main: [
        kinetic,
        {
          kind: 'math',
          id: 'k',
          size: 'md',
          lines: ['hf = \\dfrac{hc}{\\lambda} = \\dfrac{6.63 \\times 10^{-34} \\times 3.00 \\times 10^{8}}{400 \\times 10^{-9}} = 4.97 \\times 10^{-19}\\text{ J} = 3.11\\text{ eV}', 'E_{k\\,\\text{max}} = hf - W = 3.11 - 2.36 = \\brand{0.75\\text{ eV}}'],
        },
      ],
      lines: [
        { say: 'Violet light with a wavelength of 400 nanometres shines on sodium. What is the greatest kinetic energy of the electrons?', caption: 'Violet light with a wavelength of 400 nm shines on sodium. What is the greatest kinetic energy of the electrons?', show: ['ke', 'ke.names', 'ke.values'], play: 'ke.a' },
        { say: 'One photon has an energy of h c divided by lambda: 4.97 times ten to the negative 19 joules. Divide by 1.60 times ten to the negative 19, and that is 3.11 electronvolts.', caption: 'One photon has an energy of hc ÷ λ: 4.97 × 10⁻¹⁹ J. Divide by 1.60 × 10⁻¹⁹, and that is 3.11 eV.', show: 'k.0', play: 'ke.b' },
        { say: 'Now both energies are in electronvolts, so we can subtract. 3.11 minus 2.36 leaves 0.75 electronvolts.', caption: 'Now both energies are in electronvolts, so we can subtract. 3.11 − 2.36 leaves 0.75 eV.', show: ['k.1', 'ke.bars'], play: 'ke.c' },
        { say: 'Always check the units before you subtract. A photon energy from h f comes out in joules, and a work function is usually given in electronvolts.', caption: 'Always check the units before you subtract. A photon energy from hf comes out in joules, and a work function is usually given in electronvolts.', play: 'ke.d' },
      ],
    },
    {
      chapter: 'The stopping voltage',
      layout: 'center',
      main: [tube, { kind: 'math', id: 'v', size: 'md', lines: ['E_{k\\,\\text{max}} = eV_{\\text{stop}}'] }],
      lines: [
        { say: 'How is that kinetic energy measured? Put the metal in a vacuum tube, facing a collecting plate. The electrons that cross the gap are counted by a meter, as a current.', show: ['tb', 'tb.names', 'tb.values', 'tb.bars', 'tb.meter'], play: 'tb.a' },
        { say: 'Now make the collecting plate negative, so that it repels the electrons. They slow down as they cross, and the slowest ones turn back. The current falls.', play: 'tb.b' },
        { say: 'Raise the voltage until even the fastest electrons are turned back, and the current falls to zero. This is the stopping voltage.', show: 'tb.fastest', play: 'tb.c' },
        { say: 'The fastest electrons use up all of their kinetic energy in climbing through that voltage. So E k max equals e times V stop. In electronvolts it is simple: electrons with 0.75 electronvolts are stopped by 0.75 volts.', caption: 'The fastest electrons use up all of their kinetic energy in climbing through that voltage. So Ek max = eV stop. In electronvolts it is simple: electrons with 0.75 eV are stopped by 0.75 V.', show: 'v.0', play: 'tb.d' },
      ],
    },
    {
      layout: 'center',
      main: [
        unknown,
        {
          kind: 'math',
          id: 'u',
          size: 'md',
          lines: ['hf = \\dfrac{6.63 \\times 10^{-34} \\times 3.00 \\times 10^{8}}{250 \\times 10^{-9}} = 7.96 \\times 10^{-19}\\text{ J} = 4.97\\text{ eV}', 'W = hf - E_{k\\,\\text{max}} = 4.97 - 1.30 = \\brand{3.67\\text{ eV}}'],
        },
      ],
      lines: [
        { say: 'A stopping voltage can identify a metal. Ultraviolet light of 250 nanometres shines on this one, and 1.30 volts just stops the fastest electrons.', caption: 'A stopping voltage can identify a metal. Ultraviolet light of 250 nm shines on this one, and 1.30 V just stops the fastest electrons.', show: ['wf', 'wf.names', 'wf.values', 'wf.meter'], play: 'wf.a' },
        { say: 'One photon has an energy of 7.96 times ten to the negative 19 joules, which is 4.97 electronvolts.', caption: 'One photon has an energy of 7.96 × 10⁻¹⁹ J, which is 4.97 eV.', show: 'u.0', play: 'wf.b' },
        { say: 'The stopping voltage is 1.30 volts, so the greatest kinetic energy is 1.30 electronvolts. The work function is the difference: 3.67 electronvolts.', caption: 'The stopping voltage is 1.30 V, so the greatest kinetic energy is 1.30 eV. The work function is the difference: 3.67 eV.', show: ['u.1', 'wf.bars'], play: 'wf.c' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'center',
      main: [graph],
      lines: [
        { say: 'Plot the greatest kinetic energy against the frequency of the light. Below the threshold frequency, there are no electrons at all.', show: ['gr', 'gr.names', 'gr.values', 'gr.graph'], play: 'gr.a' },
        { say: 'Above it, the kinetic energy rises in a straight line, since E k max equals h f minus W.', caption: 'Above it, the kinetic energy rises in a straight line, since Ek max = hf − W.', play: 'gr.b' },
        { say: 'The slope of the line is Planck\'s constant, h, and it is the same for every metal. The line meets the frequency axis at the threshold frequency. And extended back, it meets the energy axis at negative W.', caption: 'The slope of the line is Planck\'s constant, h, and it is the same for every metal. The line meets the frequency axis at the threshold frequency. And extended back, it meets the energy axis at −W.', show: 'gr.slope', play: 'gr.c' },
        { say: 'Robert Millikan spent ten years testing Einstein\'s equation in this way. He expected to prove it wrong, and his measurements matched it exactly.', play: 'gr.d' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Light whose photons each have an energy of 5.00 eV shines on zinc, which has a work function of 4.33 eV. What stopping voltage just stops the fastest electrons?',
          choices: ['0.67 V', '1.15 V', '4.33 V', '9.33 V'],
          answer: 0,
          working: '$E_{k\\,\\text{max}} = hf - W = 5.00 - 4.33 = 0.67$ eV, and electrons with 0.67 eV are stopped by 0.67 V.',
        },
      ],
      lines: [
        { say: 'Your turn. Light whose photons each have an energy of 5.00 electronvolts shines on zinc, which has a work function of 4.33 electronvolts. What stopping voltage just stops the fastest electrons? Pause the video and work it out.', caption: 'Your turn. Light whose photons each have an energy of 5.00 eV shines on zinc, which has a work function of 4.33 eV. What stopping voltage just stops the fastest electrons? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The greatest kinetic energy is h f minus W: 5.00 minus 4.33, which is 0.67 electronvolts. Electrons with 0.67 electronvolts are stopped by 0.67 volts. That is choice "A".', caption: 'The greatest kinetic energy is hf − W: 5.00 − 4.33, which is 0.67 eV. Electrons with 0.67 eV are stopped by 0.67 V. That is choice A.', show: 'q.answer' },
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
            'Light frees electrons from a metal only above the **threshold frequency** $f_0$',
            'One photon frees one electron: $E_{k\\,\\text{max}} = hf - W$, and $W = hf_0$',
            '**Brighter** light frees more electrons; a **higher frequency** frees faster ones',
            'The stopping voltage measures the kinetic energy: $E_{k\\,\\text{max}} = eV_{\\text{stop}}$',
            'A graph of $E_{k\\,\\text{max}}$ against $f$ is a straight line with slope $h$',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Light frees electrons from a metal only above the threshold frequency.', show: 'sum.0' },
        { say: 'One photon frees one electron, so the greatest kinetic energy is h f minus W, and W equals h f zero.', caption: 'One photon frees one electron, so the greatest kinetic energy is hf − W, and W = hf₀.', show: 'sum.1' },
        { say: 'Brighter light frees more electrons. A higher frequency frees faster ones.', show: 'sum.2' },
        { say: 'The stopping voltage measures the greatest kinetic energy.', show: 'sum.3' },
        { say: 'And a graph of the greatest kinetic energy against frequency is a straight line, with a slope of h.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
