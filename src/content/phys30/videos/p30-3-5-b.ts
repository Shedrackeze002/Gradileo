import type { Explainer, LightEl, LightGrating } from '@/video/script.ts';

// Lesson 3.5, second part: diffraction gratings. The picture is true to its numbers
// (src/video/light.ts): a grating with 500 lines in each millimetre sends light of 600 nm out at
// 17.5°, 36.9° and 64.2°, where d sin θ = n λ, and with only a few slits lit each line is as broad
// as the sum of their waves makes it. White light is drawn colour by colour, so each order is a
// spectrum with red turned the most.

const grating = (id: string, height: number, set: LightGrating, clips: LightEl['clips'], more: Partial<LightEl> = {}): LightEl => ({ kind: 'light', id, grating: set, height, clips, ...more });

/** Light on two slits, and then on more and more of them: the broad fringes become sharp lines. */
const few = grating('few', 470, { lines: 500, nm: 600, slits: 2 }, { a: { phases: [{ dur: 13 }] }, more: { phases: [{ dur: 9, slits: 20 }, { dur: 3.1 }] }, c: { phases: [{ dur: 17.9 }] } });

/** Two neighbouring slits close up, beside the lines they give. */
const why = grating('why', 400, { lines: 500, nm: 600 }, { a: { phases: [{ dur: 16.5 }] }, b: { phases: [{ dur: 13 }] }, c: { phases: [{ dur: 18.7 }] } }, { poster: 'a', thumb: ['orders', 'angles'] });

/** The lesson's grating: 500 lines in each millimetre, and light of 600 nm. */
const spacing = grating('sp', 330, { lines: 500, nm: 600 }, { a: { phases: [{ dur: 13.9 }] }, b: { phases: [{ dur: 9.1 }] }, c: { phases: [{ dur: 10 }] } });
const angles = grating('an', 330, { lines: 500, nm: 600 }, { a: { phases: [{ dur: 10.9 }] }, b: { phases: [{ dur: 7.4 }] }, c: { phases: [{ dur: 6.1 }] } });
const count = grating('ct', 400, { lines: 500, nm: 600 }, { a: { phases: [{ dur: 13.5 }] }, b: { phases: [{ dur: 10.9 }] } });

/** The same grating as the colour of the light changes. */
const colour = grating('col', 470, { lines: 500, nm: 600 }, { a: { phases: [{ dur: 3 }, { dur: 5, nm: 700 }, { dur: 4.1 }] }, b: { phases: [{ dur: 5, nm: 420 }, { dur: 1.1 }] } });

/** White light on a grating with 600 lines in each millimetre: a white line at the centre, and two spectra on each side. */
const white = grating('wh', 470, { lines: 600, nm: 550, white: true, most: 2 }, { a: { phases: [{ dur: 17.4 }] }, b: { phases: [{ dur: 12.6 }] }, c: { phases: [{ dur: 17.4 }] } });

const video: Explainer = {
  id: 'p30-3-5-b',
  lessonId: 'p30-3-5',
  title: 'Diffraction Gratings',
  thumbnail: 'why',
  summary:
    'A diffraction grating has thousands of slits, and turns the broad fringes of a double slit into sharp lines. See why the lines sharpen as more slits are lit, where the grating equation comes from, how to find the angle of each order and the number of lines, and why a grating spreads white light into spectra.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'Diffraction Gratings', subtitle: 'Thousands of slits, and lines sharp enough to measure' }],
      lines: [
        { say: 'The fringes of a double slit are faint and broad, so their positions are hard to measure.', show: 'title' },
        { say: 'A diffraction grating does the same job far better. It is a sheet with thousands of parallel slits, evenly spaced, often several hundred in each millimetre.' },
      ],
    },
    {
      chapter: 'From two slits to many',
      layout: 'center',
      main: [few],
      lines: [
        { say: 'Here is light of one colour, falling on just two slits. Beyond them, the light fans out in broad bands, and lands on a curved screen as broad fringes.', show: 'few', play: 'few.a' },
        { say: 'Now let the light fall on more slits, with the same spacing. The bright lines stay at the same angles. But each one becomes narrower and sharper.', play: 'few.more' },
        { say: 'With many slits, the light from all of them arrives in step only at a few exact angles. At every other angle, the light from the many slits cancels. So a grating gives sharp, bright lines, with darkness between them.', show: 'few.orders', play: 'few.c' },
      ],
    },
    {
      chapter: 'The grating equation',
      layout: 'center',
      main: [why, { kind: 'math', id: 'm', size: 'lg', lines: ['d \\sin\\theta = n\\lambda'] }],
      lines: [
        { say: 'Why those angles? Look closely at two neighbouring slits, a distance d apart. To travel away at an angle theta, the light from the lower slit has farther to go. The extra path is d sine theta.', caption: 'Why those angles? Look closely at two neighbouring slits, a distance d apart. To travel away at an angle θ, the light from the lower slit has farther to go. The extra path is d sin θ.', show: ['why', 'why.path'], play: 'why.a' },
        { say: 'The two waves are in step when that extra path is a whole number of wavelengths. And then every slit of the grating is in step with its neighbour.', play: 'why.b' },
        { say: 'So the bright lines are at the angles where d sine theta equals n lambda. The whole number n is the order of the line: zero for the central line, one for the first line on each side, two for the second.', caption: 'So the bright lines are at the angles where d sin θ = nλ. The whole number n is the order of the line: 0 for the central line, 1 for the first line on each side, 2 for the second.', show: ['m.0', 'why.orders'], play: 'why.c' },
      ],
    },
    {
      chapter: 'Finding the angles',
      layout: 'center',
      main: [spacing, { kind: 'math', id: 'd', size: 'md', lines: ['d = \\dfrac{1}{N}', 'd = \\dfrac{1}{5.00 \\times 10^{5}} = \\brand{2.00 \\times 10^{-6}\\text{ m}}'] }],
      lines: [
        { say: 'A grating is described by its number of lines in each millimetre. This one has 500, and light of 600 nanometres passes through it. At what angles are the bright lines?', show: 'sp', play: 'sp.a' },
        { say: 'First find d, the distance between neighbouring slits. It is one, divided by the number of lines in each metre.', caption: 'First find d, the distance between neighbouring slits. It is 1, divided by the number of lines in each metre.', show: 'd.0', play: 'sp.b' },
        { say: '500 lines in each millimetre is 500,000 lines in each metre. So d is 2.00 times ten to the negative six metres.', caption: '500 lines in each millimetre is 5.00 × 10⁵ lines in each metre. So d is 2.00 × 10⁻⁶ m.', show: ['d.1', 'sp.values'], play: 'sp.c' },
      ],
    },
    {
      layout: 'center',
      main: [
        angles,
        {
          kind: 'math',
          id: 'a',
          size: 'md',
          lines: ['n = 1:\\quad \\sin\\theta = \\dfrac{\\lambda}{d} = \\dfrac{600 \\times 10^{-9}}{2.00 \\times 10^{-6}} = 0.300 \\quad\\Rightarrow\\quad \\theta = \\brand{17.5^\\circ}', 'n = 2:\\quad \\sin\\theta = \\dfrac{2\\lambda}{d} = 0.600 \\quad\\Rightarrow\\quad \\theta = \\brand{36.9^\\circ}'],
        },
      ],
      lines: [
        { say: 'For the first order, n is one. So sine theta is the wavelength divided by d, which is 0.300. That makes theta 17.5 degrees.', caption: 'For the first order, n is 1. So sin θ is the wavelength divided by d, which is 0.300. That makes θ 17.5°.', show: ['an', 'an.values', 'a.0'], play: 'an.a' },
        { say: 'For the second order, sine theta is twice as large: 0.600. That makes theta 36.9 degrees.', caption: 'For the second order, sin θ is twice as large: 0.600. That makes θ 36.9°.', show: 'a.1', play: 'an.b' },
        { say: 'And the picture agrees, with these lines on each side of the centre.', show: ['an.orders', 'an.angles'], play: 'an.c' },
      ],
    },
    {
      chapter: 'How many lines?',
      layout: 'center',
      main: [count, { kind: 'math', id: 'h', size: 'md', lines: ['n \\le \\dfrac{d}{\\lambda} = \\dfrac{2.00 \\times 10^{-6}}{600 \\times 10^{-9}} = 3.33 \\quad\\Rightarrow\\quad \\text{highest order: } \\brand{3}'] }],
      lines: [
        { say: 'How many bright lines are there? Sine theta can never be more than one. So n can be no more than d divided by the wavelength, which is 3.33 here.', caption: 'How many bright lines are there? sin θ can never be more than 1. So n can be no more than d divided by the wavelength, which is 3.33 here.', show: ['ct', 'ct.values', 'h.0'], play: 'ct.a' },
        { say: 'The highest whole number is three. So there are three lines on each side and one at the centre: seven bright lines in all.', caption: 'The highest whole number is 3. So there are 3 lines on each side and 1 at the centre: 7 bright lines in all.', show: ['ct.orders', 'ct.angles'], play: 'ct.b' },
      ],
    },
    {
      chapter: 'Gratings and colour',
      layout: 'center',
      main: [colour],
      lines: [
        { say: 'The angle of each line depends on the wavelength. Slide the light towards red, with its longer wavelength, and every line moves out, to a larger angle.', show: ['col', 'col.orders', 'col.angles', 'col.values'], play: 'col.a' },
        { say: 'Slide it towards violet, with its shorter wavelength, and the lines move in.', play: 'col.b' },
      ],
    },
    {
      layout: 'center',
      main: [white],
      lines: [
        { say: 'So when white light passes through a grating, each colour goes its own way. The central line is white, since every colour has a path difference of zero there. On each side of it, each order is a spectrum.', show: ['wh', 'wh.orders'], play: 'wh.a' },
        { say: 'Red light has the longest wavelength, so it is turned the most, and violet the least. That is the opposite of a prism, which bends violet the most.', show: 'wh.names', play: 'wh.b' },
        { say: 'A spectroscope uses a grating to measure the wavelengths in the light from a hot gas, or from a star. Each element gives out its own set of wavelengths, so the spectrum shows what the source is made of.', play: 'wh.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A grating has 400 lines in each millimetre. Light of wavelength 500 nm passes through it. At what angle is the first-order bright line?',
          choices: ['5.7°', '8.0°', '11.5°', '23.6°'],
          answer: 2,
          working: '$d = \\dfrac{1}{4.00 \\times 10^{5}} = 2.50 \\times 10^{-6}$ m, so $\\sin\\theta = \\dfrac{\\lambda}{d} = \\dfrac{500 \\times 10^{-9}}{2.50 \\times 10^{-6}} = 0.200$ and $\\theta = 11.5°$.',
        },
      ],
      lines: [
        { say: 'Your turn. A grating has 400 lines in each millimetre. Light of wavelength 500 nanometres passes through it. At what angle is the first-order bright line? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'There are 400,000 lines in each metre, so d is 2.50 times ten to the negative six metres. Sine theta is the wavelength divided by d, which is 0.200. So theta is 11.5 degrees. That is choice C.', caption: 'There are 4.00 × 10⁵ lines in each metre, so d is 2.50 × 10⁻⁶ m. sin θ is the wavelength divided by d, which is 0.200. So θ is 11.5°. That is choice C.', show: 'q.answer' },
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
            'A **diffraction grating** has thousands of evenly spaced slits, and gives sharp bright lines',
            'The bright lines are where $d \\sin\\theta = n\\lambda$; $n$ is the **order** of the line',
            'A grating with $N$ lines in each metre has $d = \\dfrac{1}{N}$',
            '$\\sin\\theta$ cannot be more than 1, so the highest order is the whole number below $\\dfrac{d}{\\lambda}$',
            'A grating turns **red** light through a larger angle than violet, and spreads white light into spectra',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A diffraction grating has thousands of evenly spaced slits, and gives sharp bright lines.', show: 'sum.0' },
        { say: 'The bright lines are at the angles where d sine theta equals n lambda, and n is the order of the line.', caption: 'The bright lines are at the angles where d sin θ = nλ, and n is the order of the line.', show: 'sum.1' },
        { say: 'The slit spacing d is one divided by the number of lines in each metre.', caption: 'The slit spacing d is 1 divided by the number of lines in each metre.', show: 'sum.2' },
        { say: 'Sine theta cannot be more than one, so the highest order is the whole number below d divided by the wavelength.', caption: 'sin θ cannot be more than 1, so the highest order is the whole number below d divided by the wavelength.', show: 'sum.3' },
        { say: 'And a grating turns red light through a larger angle than violet, so it spreads white light into spectra.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
