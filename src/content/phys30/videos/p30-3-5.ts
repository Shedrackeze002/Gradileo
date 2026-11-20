import type { Explainer, RipplesEl } from '@/video/script.ts';
import { fringeAt } from '@/video/ripples.ts';

// Lesson 3.5, first part: diffraction, and Young's double slit. The waves are worked out from
// their sources (src/video/ripples.ts): each slit sends out circular crests in step with the
// straight waves that arrive at the wall, and a point on the screen is bright where the two
// paths differ by a whole number of wavelengths. Lengths are in wavelengths: the slits are six
// wavelengths apart and the screen is 24 wavelengths away, which is far closer than in a real
// experiment, so that the crests can be seen.

/** Water waves that meet a wall with a gap in it: first six wavelengths wide, then narrower. */
const gap: RipplesEl = {
  kind: 'ripples',
  id: 'gap',
  view: [-8, -7, 16, 7],
  speed: 2.5,
  height: 560,
  barrier: { x: 0, gap: 6 },
  sources: [{ id: 'o', at: [0, 0], frequency: 2.5 }],
  poster: 'a',
  clips: {
    a: { phases: [{ dur: 15.4 }] },
    b: { phases: [{ dur: 8.6 }] },
    narrow: { phases: [{ dur: 5, gap: 2.5 }, { dur: 1.2 }, { dur: 4.5, gap: 0.8 }, { dur: 2.6 }] },
    on: { phases: [{ dur: 15.5 }] },
  },
};

/** Two slits, six wavelengths apart, lit by light of 600 nm, and a screen 24 wavelengths away. */
const slits = (id: string, view: RipplesEl['view'], height: number, more: Partial<RipplesEl>): RipplesEl => ({
  kind: 'ripples',
  id,
  view,
  height,
  speed: 2.5,
  light: 600,
  barrier: { x: 0 },
  screen: 24,
  sources: [
    { id: 's1', at: [0, 3], frequency: 2.5 },
    { id: 's2', at: [0, -3], frequency: 2.5 },
  ],
  clips: {},
  ...more,
});

/** Young's experiment: the light spreads from each slit, the two sets of waves overlap, and the screen shows fringes. */
const young = slits('y', [-5, -10, 28, 10], 560, {
  poster: 'c',
  thumb: ['pattern', 'fringes'],
  clips: { a: { phases: [{ dur: 14.4 }] }, b: { phases: [{ dur: 15.6 }] }, c: { phases: [{ dur: 9.4 }] }, d: { phases: [{ dur: 12.5 }] } },
});

/** Where the waves on the screen are `n` wavelengths apart. */
const fringe = (n: number): [number, number] => [24, fringeAt(young, n) ?? 0];

/** One point on the screen, P, and the two paths that reach it. */
const point = slits('p', [-3, -10, 26, 10], 560, {
  full: true,
  sources: [
    { id: 's1', label: 'Slit 1', at: [0, 3], frequency: 2.5, tone: 'good' },
    { id: 's2', label: 'Slit 2', at: [0, -3], frequency: 2.5, tone: 'hyp' },
  ],
  listeners: [{ id: 'pt', label: 'P', at: [24, 0], side: 'left' }],
  clips: {
    a: { phases: [{ dur: 18.6 }] },
    dark: { phases: [{ dur: 4, move: { pt: fringe(0.5) } }, { dur: 12.6 }] },
    bright: { phases: [{ dur: 3.5, move: { pt: fringe(1) } }, { dur: 6.6 }] },
    more: { phases: [{ dur: 2.5, move: { pt: fringe(1.5) } }, { dur: 2.2 }, { dur: 2.5, move: { pt: fringe(2) } }, { dur: 2.2 }] },
  },
});

/** The fringes numbered from the centre, beside the rule for each. */
const rule = slits('r', [-3, -10, 29, 10], 470, { full: true, clips: { a: { phases: [{ dur: 11.4 }] }, b: { phases: [{ dur: 13 }] }, c: { phases: [{ dur: 12 }] } } });

/** The three lengths that set the pattern, and what happens when each one changes. */
const spacing = slits('sp', [-4, -10, 33, 10], 440, {
  full: true,
  screen: 22,
  clips: {
    a: { phases: [{ dur: 15.6 }] },
    b: { phases: [{ dur: 7.4 }] },
    closer: { phases: [{ dur: 4, apart: 3.6 }, { dur: 3.9 }] },
    colour: { phases: [{ dur: 2.5, apart: 6 }, { dur: 3, wavelength: 1.16 }, { dur: 1.5 }, { dur: 3.5, wavelength: 0.75 }, { dur: 1.4 }] },
    far: { phases: [{ dur: 2.5, wavelength: 1 }, { dur: 4, screen: 28 }, { dur: 2.4 }] },
  },
});

/** The same picture beside a worked example. */
const example = slits('ex', [-4, -10, 30, 10], 410, { full: true, clips: { a: { phases: [{ dur: 13.4 }] }, b: { phases: [{ dur: 7 }] }, c: { phases: [{ dur: 15 }] }, d: { phases: [{ dur: 10.6 }] } } });

const video: Explainer = {
  id: 'p30-3-5',
  lessonId: 'p30-3-5',
  title: "Young's Double-Slit Experiment",
  thumbnailTitle: 'The Double Slit',
  thumbnail: 'y',
  summary:
    "Is light a wave or a stream of particles? Watch waves spread out through a gap, see the light from two slits overlap to make bright and dark fringes, follow the two paths to a point on the screen to find out why, and use the fringe spacing to measure the wavelength of light.",
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: "Young's Double-Slit Experiment", subtitle: 'Light added to light can make darkness' }],
      lines: [
        { say: 'For more than a century, physicists argued about what light is. Isaac Newton pictured a stream of tiny particles. Christiaan Huygens pictured a wave.', show: 'title' },
        { say: 'Mirrors and lenses could not settle it, since both pictures explain reflection and refraction. In eighteen oh one, Thomas Young settled it, with two narrow slits.', caption: 'Mirrors and lenses could not settle it, since both pictures explain reflection and refraction. In 1801, Thomas Young settled it, with two narrow slits.' },
      ],
    },
    {
      chapter: 'Diffraction',
      layout: 'center',
      main: [gap],
      lines: [
        { say: 'Start with water waves, seen from above. They arrive at a wall with a gap in it. Beyond the gap, the waves spread out a little, into the region behind the wall. This spreading is called diffraction.', show: 'gap', play: 'gap.a' },
        { say: 'This gap is much wider than the wavelength. So the waves carry almost straight on, and only their edges bend.', play: 'gap.b' },
        { say: 'Now make the gap narrower. The narrower the gap, the more the waves spread. When the gap is about as wide as the wavelength, they spread in every direction.', play: 'gap.narrow' },
        { say: 'The wavelength of light is less than a thousandth of a millimetre. So light spreads like this only through a very narrow slit. That is why we do not see light bend round corners, and why shadows look sharp.', play: 'gap.on' },
      ],
    },
    {
      chapter: 'Two slits',
      layout: 'center',
      main: [young],
      lines: [
        { say: 'Young sent light of one colour through two narrow slits, close together. The light diffracts at each slit. So two sets of waves spread out, in step, and overlap.', show: 'y', play: 'y.a' },
        { say: 'Where two waves meet, they add. Where crest meets crest, they make a larger wave. That is constructive interference. Where crest meets trough, they cancel. That is destructive interference.', show: 'y.pattern', play: 'y.b' },
        { say: 'So the screen does not show two bright lines. It shows a row of bright and dark bands, called fringes.', show: 'y.fringes', play: 'y.c' },
        { say: 'Particles cannot cancel one another. A stream of particles would make just two bright lines. The dark fringes were the evidence that light is a wave.', play: 'y.d' },
      ],
    },
    {
      chapter: 'Bright or dark?',
      layout: 'center',
      main: [point],
      lines: [
        { say: 'To see why, follow the light to one point on the screen, P. Light reaches P from both slits. At the centre of the screen, the two paths are the same length. So the waves arrive in step, crest with crest, and the centre is bright.', show: ['p', 'p.fringes', 'p.paths', 'p.difference', 'p.traces', 'p.loudness'], play: 'p.a' },
        { say: 'Move P up the screen. Now the light from slit two has farther to go. Here, its path is longer by half a wavelength. So a crest from one slit arrives with a trough from the other. They cancel, and this point is dark.', play: 'p.dark' },
        { say: 'Move on. Now the path difference is one whole wavelength. Crests arrive together again, and this is the next bright fringe.', play: 'p.bright' },
        { say: 'And the pattern repeats. One and a half wavelengths: dark. Two wavelengths: bright.', play: 'p.more' },
      ],
    },
    {
      layout: 'split',
      leftWidth: 600,
      left: [rule],
      right: [
        { kind: 'math', id: 'k', size: 'md', lines: ['\\text{At a bright fringe:}', '\\text{path difference} = \\good{n\\lambda}', '\\text{At a dark fringe:}', '\\text{path difference} = \\opp{\\left(n - \\tfrac{1}{2}\\right)\\lambda}'] },
        { kind: 'callout', id: 'co', tone: 'key', title: 'The path difference decides', md: 'Light from the two slits travels different distances to each point on the screen.' },
      ],
      lines: [
        { say: 'So here is the rule. Number the bright fringes from zero, at the centre. At bright fringe number n, the path difference is n whole wavelengths.', caption: 'So here is the rule. Number the bright fringes from 0, at the centre. At bright fringe number n, the path difference is n whole wavelengths.', show: ['r', 'r.fringes', 'r.orders', 'k.0', 'k.1'], play: 'r.a' },
        { say: 'At a dark fringe, the path difference is an odd number of half wavelengths. For the first dark fringe that is half a wavelength, and for the second it is one and a half.', show: ['k.2', 'k.3'], play: 'r.b' },
        { say: 'The light from the two slits travels different distances, and the path difference decides whether a point is bright or dark.', show: 'co', play: 'r.c' },
      ],
    },
    {
      chapter: 'The fringe spacing',
      layout: 'center',
      main: [spacing, { kind: 'math', id: 'dx', size: 'md', lines: ['\\Delta x = \\dfrac{\\lambda L}{d}'] }],
      lines: [
        { say: 'Three lengths set the pattern. The distance d between the slits. The distance L from the slits to the screen. And the wavelength of the light. Near the centre, the bright fringes are evenly spaced, a distance delta x apart.', caption: 'Three lengths set the pattern. The distance d between the slits. The distance L from the slits to the screen. And the wavelength of the light. Near the centre, the bright fringes are evenly spaced, a distance Δx apart.', show: ['sp', 'sp.fringes', 'sp.lengths'], play: 'sp.a' },
        { say: 'The fringe spacing is the wavelength, times L, divided by d.', caption: 'The fringe spacing is the wavelength, times L, divided by d.', show: 'dx.0', play: 'sp.b' },
        { say: 'Bring the slits closer together, and the fringes move apart. A smaller d gives a larger spacing.', play: 'sp.closer' },
        { say: 'Light of a longer wavelength gives wider fringes too. So red light makes wider fringes than blue light.', play: 'sp.colour' },
        { say: 'And a screen that is farther away gives wider fringes, since the light has farther to spread.', play: 'sp.far' },
      ],
    },
    {
      chapter: 'Measuring a wavelength',
      layout: 'split',
      leftWidth: 540,
      left: [example],
      right: [
        { kind: 'math', id: 'g', size: 'md', lines: ['d = 0.25\\text{ mm} \\qquad L = 2.0\\text{ m}', '\\Delta x = 4.8\\text{ mm}'] },
        { kind: 'math', id: 'w', size: 'md', lines: ['\\lambda = \\dfrac{\\Delta x \\, d}{L}', '\\lambda = \\dfrac{4.8 \\times 10^{-3} \\times 0.25 \\times 10^{-3}}{2.0}', '\\lambda = \\brand{6.0 \\times 10^{-7}\\text{ m}} = 600\\text{ nm}'] },
      ],
      lines: [
        { say: 'This is how Young measured the wavelength of light. Two slits are 0.25 millimetres apart. The screen is 2 metres away, and the bright fringes are 4.8 millimetres apart.', show: ['ex', 'ex.fringes', 'ex.lengths', 'g.0', 'g.1'], play: 'ex.a' },
        { say: 'Rearrange the equation. The wavelength is delta x, times d, divided by L.', caption: 'Rearrange the equation. The wavelength is Δx, times d, divided by L.', show: 'w.0', play: 'ex.b' },
        { say: 'Change every length to metres first. 4.8 millimetres is 4.8 times ten to the negative three metres, and 0.25 millimetres is 0.25 times ten to the negative three metres.', caption: 'Change every length to metres first. 4.8 mm is 4.8 × 10⁻³ m, and 0.25 mm is 0.25 × 10⁻³ m.', show: 'w.1', play: 'ex.c' },
        { say: 'The wavelength is 6.0 times ten to the negative seven metres. That is 600 nanometres, which is orange light.', caption: 'The wavelength is 6.0 × 10⁻⁷ m. That is 600 nm, which is orange light.', show: 'w.2', play: 'ex.d' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Light of wavelength 480 nm passes through two slits that are 0.40 mm apart. The screen is 3.0 m away. How far apart are the bright fringes?',
          choices: ['1.8 mm', '3.6 mm', '6.4 mm', '36 mm'],
          answer: 1,
          working: '$\\Delta x = \\dfrac{\\lambda L}{d} = \\dfrac{480 \\times 10^{-9} \\times 3.0}{0.40 \\times 10^{-3}} = 3.6 \\times 10^{-3}$ m, which is 3.6 mm.',
        },
      ],
      lines: [
        { say: 'Your turn. Light of wavelength 480 nanometres passes through two slits that are 0.40 millimetres apart. The screen is 3 metres away. How far apart are the bright fringes? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'In metres, the wavelength is 480 times ten to the negative nine, and d is 0.40 times ten to the negative three. The wavelength times L, divided by d, is 3.6 times ten to the negative three metres. That is 3.6 millimetres, choice B.', caption: 'In metres, the wavelength is 480 × 10⁻⁹ and d is 0.40 × 10⁻³. The wavelength times L, divided by d, is 3.6 × 10⁻³ m. That is 3.6 mm, choice B.', show: 'q.answer' },
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
            '**Diffraction**: a wave spreads out after it passes through a gap, most when the gap is about one wavelength wide',
            'Light from two slits overlaps and makes bright and dark **fringes**',
            'Bright: path difference $= n\\lambda$. Dark: path difference $= \\left(n - \\tfrac{1}{2}\\right)\\lambda$',
            'The dark fringes show that light is a **wave**',
            'Fringe spacing: $\\Delta x = \\dfrac{\\lambda L}{d}$, with every length in metres',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Diffraction is the spreading of a wave after it passes through a gap. It is greatest when the gap is about one wavelength wide.', show: 'sum.0' },
        { say: 'Light from two slits overlaps, and makes bright and dark fringes.', show: 'sum.1' },
        { say: 'A point is bright where the path difference is a whole number of wavelengths, and dark where it is an odd number of half wavelengths.', show: 'sum.2' },
        { say: 'Particles cannot cancel, so the dark fringes show that light is a wave.', show: 'sum.3' },
        { say: 'And the fringe spacing is the wavelength, times L, divided by d, with every length in metres.', caption: 'And the fringe spacing is the wavelength, times L, divided by d, with every length in metres.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
