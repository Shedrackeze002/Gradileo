import type { Explainer, InductionEl, MagnetsEl } from '@/video/script.ts';

// Lesson 2.10, first part: electromagnetic induction and Faraday's law. A bar magnet is pushed into
// a coil that is joined to a meter: the flux of the magnet through the turns is worked out from its
// poles, and the needle swings with the rate at which that flux changes (src/video/magnets.ts).
// Then a coil is seen face on in a field that changes steadily, and the meter reads N ΔΦ ÷ Δt
// (src/video/induction.ts).

const CM = { metres: 0.01, symbol: 'cm' };

/** A bar magnet and a coil joined to a meter. The magnet goes in, comes out, goes in slowly and goes in quickly. */
const kick: MagnetsEl = {
  kind: 'magnets',
  id: 'kick',
  view: [-7, 7, -2.6, 2.6],
  height: 422,
  bars: [{ id: 'bar', at: [-4.6, 0.6], long: 4, thick: 1 }],
  pickup: { id: 'coil', at: [2.6, 0.6], long: 3.6, radius: 1.15 },
  // The thumbnail catches the magnet as its pole goes into the coil, with the needle swung over.
  poster: 'in',
  posterAt: 0.66,
  thumb: ['lines'],
  clips: {
    in: { phases: [{ dur: 1.6, to: { bar: [1.2, 0.6] } }] },
    out: { phases: [{ dur: 1.6, to: { bar: [-4.6, 0.6] } }] },
    slow: { phases: [{ dur: 5, to: { bar: [1.2, 0.6] } }] },
    quick: { phases: [{ dur: 1.6, to: { bar: [-4.6, 0.6] } }, { dur: 0.8 }, { dur: 0.7, to: { bar: [1.2, 0.6] } }] },
  },
};

/** A loop of 10 cm by 5.0 cm (0.0050 m²) seen face on, in a field of 0.10 T into the page. */
const area: InductionEl = {
  kind: 'induction',
  id: 'area',
  view: [-14, 14, -4.68, 4.68],
  height: 380,
  length: CM,
  tesla: -0.1,
  milli: true,
  loop: { id: 'loop', rect: [-8, 2, -2.5, 2.5] },
  // One second of video is 0.05 s for the field.
  rate: 0.05,
  clips: { more: { phases: [{ dur: 2.5, tesla: -0.3 }, { dur: 1 }, { dur: 2.5, tesla: -0.1 }] } },
};

/** The lesson's coil: 200 turns of that area. The field rises steadily from 0.10 T to 0.60 T in 0.25 s, and later falls back. */
const far: InductionEl = {
  ...area,
  id: 'far',
  view: [-14, 14, -3.7, 3.7],
  height: 300,
  loop: { id: 'loop', rect: [-8, 2, -2.5, 2.5], turns: 200 },
  clips: { rise: { phases: [{ dur: 5, tesla: -0.6 }] }, fall: { phases: [{ dur: 5, tesla: -0.1 }] } },
};

const video: Explainer = {
  id: 'p30-2-10',
  lessonId: 'p30-2-10',
  title: 'Electromagnetic Induction',
  thumbnailTitle: 'Induction',
  thumbnail: 'kick',
  summary:
    'A magnetic field makes a current only while it is changing. Push a magnet into a coil and watch the needle of a meter swing, meet magnetic flux (Φ = BA, in webers), and use Faraday\'s law, ε = NΔΦ ÷ Δt, to find the emf induced in a coil.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Forces and Fields', title: 'Electromagnetic Induction', subtitle: 'How a changing field makes a current' }],
      lines: [
        { say: 'A current makes a magnetic field. Michael Faraday was sure that the reverse must be possible too, and that a magnetic field could make a current. It took him years to find out how.', show: 'title' },
        { say: 'His answer now makes almost all of the electrical energy you use. A magnetic field makes a current only while it is changing.' },
      ],
    },
    {
      chapter: 'A magnet and a coil',
      layout: 'center',
      main: [kick],
      lines: [
        { say: 'Here is a coil of wire, joined to a sensitive meter. There is no battery in this circuit, so the needle rests at zero.', show: ['kick', 'kick.lines'] },
        { say: 'Push the north pole of a bar magnet into the coil. The needle swings. A current flows, with no battery at all.', play: 'kick.in', playDelay: 2.5 },
        { say: 'Now hold the magnet still, inside the coil. The needle falls back to zero. A strong field through the coil is not enough to make a current.' },
        { say: 'Pull the magnet out, and the needle swings the other way.', show: 'kick.current', play: 'kick.out', playDelay: 1 },
        { say: 'Push it in slowly, and the needle hardly moves.', play: 'kick.slow' },
        { say: 'Pull it out, and push it in again quickly. This time the needle swings right across. The faster the change, the larger the current.', play: 'kick.quick', playDelay: 0.5 },
        { say: 'The moving magnet induces an emf in the coil, and the emf drives the current. This is electromagnetic induction.' },
      ],
    },
    {
      chapter: 'Magnetic flux',
      layout: 'center',
      main: [area, { kind: 'math', id: 'f', size: 'md', lines: ['\\Phi = BA', '\\Phi = 0.10 \\times 0.0050 = \\brand{0.00050\\ \\text{Wb}}'] }],
      lines: [
        { say: 'What exactly has to change? To answer that, we need the idea of magnetic flux. It measures how much magnetic field passes through a loop.', show: ['area', 'area.field'] },
        { say: 'Here is a loop of wire seen face on, with a magnetic field through it, into the page. The flux through the loop is the field strength, times the area of the loop. Phi equals B "A".', caption: 'Here is a loop of wire seen face on, with a magnetic field through it, into the page. The flux through the loop is the field strength, times the area of the loop. Φ = BA.', show: ['area.flux', 'f.0'] },
        { say: 'This loop is 10 centimetres by 5.0 centimetres, so its area is 0.0050 square metres. In a field of 0.10 teslas, the flux is 0.10 times 0.0050, which is 0.00050 webers. That is 0.50 milliwebers.', show: 'f.1' },
        { say: 'Flux is measured in webers. One weber is one tesla, times one square metre. Make the field stronger, and more flux passes through the same loop.', play: 'area.more', playDelay: 5 },
      ],
    },
    {
      chapter: 'Faraday\'s law',
      layout: 'center',
      main: [
        far,
        { kind: 'math', id: 'e', size: 'md', lines: ['\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t}', '\\varepsilon = 200 \\times \\dfrac{0.0025}{0.25} = \\thc{2.0\\ \\text{V}}'] },
      ],
      lines: [
        { say: 'Faraday\'s law says how large the emf is. It is the number of turns, times the change in the flux through each turn, divided by the time the change takes.', show: ['far', 'far.field', 'far.flux', 'e.0'] },
        { say: 'This coil has 200 turns, and it is joined to a voltmeter. Watch the meter as the field rises steadily, from 0.10 teslas to 0.60 teslas, in a quarter of a second. The picture is slowed down.', show: 'far.emf', play: 'far.rise', playDelay: 8.5 },
        { say: 'While the flux was changing, the meter read 2.0 volts. Now the field is strong, but steady, and the meter reads zero.' },
        { say: 'Check that with the law. The flux through each turn rose from 0.50 to 3.0 milliwebers, a change of 0.0025 webers. So the emf is 200, times 0.0025, divided by 0.25, which is 2.0 volts.', show: 'e.1' },
        { say: 'Let the field fall back, and the same emf appears the other way round. A flux can also change because the area changes, or because the coil turns.', play: 'far.fall', playDelay: 0.5 },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The magnetic flux through each turn of a 500-turn coil falls steadily from 8.0 mWb to 2.0 mWb in 0.60 s. What is the size of the induced emf?',
          choices: ['0.010 V', '5.0 V', '6.7 V', '5000 V'],
          answer: 1,
          working: '$\\Delta\\Phi = 6.0$ mWb $= 0.0060$ Wb, so $\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t} = 500 \\times \\dfrac{0.0060}{0.60} = 5.0$ V.',
        },
      ],
      lines: [
        { say: 'Your turn. The magnetic flux through each turn of a 500-turn coil falls steadily, from 8.0 milliwebers to 2.0 milliwebers, in 0.60 seconds. What is the size of the induced emf? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The flux changes by 6.0 milliwebers, which is 0.0060 webers. So the emf is 500, times 0.0060, divided by 0.60, which is 5.0 volts. That is choice B.', show: 'q.answer' },
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
            'A magnetic field induces an emf in a coil only while the flux through it is **changing**',
            'Magnetic flux: $\\Phi = BA$, in webers (Wb)',
            'Faraday\'s law: $\\varepsilon = N\\dfrac{\\Delta\\Phi}{\\Delta t}$',
            'A faster change, or more turns, gives a larger emf',
            'A steady flux, however large, induces nothing',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A magnetic field induces an emf in a coil only while the flux through the coil is changing.', show: 'sum.0' },
        { say: 'Magnetic flux is the field strength times the area, and it is measured in webers.', show: 'sum.1' },
        { say: 'Faraday\'s law gives the emf: the number of turns, times the change in flux, divided by the time.', show: 'sum.2' },
        { say: 'A faster change, or more turns, gives a larger emf.', show: 'sum.3' },
        { say: 'And a steady flux, however large, induces nothing.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
