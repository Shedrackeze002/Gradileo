import type { Explainer, PhotonsEl } from '@/video/script.ts';

// Lesson 3.7, second part: the Compton effect. The pictures are true to their numbers
// (src/video/photons.ts): each collision conserves energy and momentum, the photon leaves with the
// wavelength that Δλ = (h ÷ mc)(1 − cos θ) gives it, with h ÷ mc = 2.43 pm, and the electron
// recoils in the direction and at the speed that the photon's lost momentum and energy give it.

const collision = (id: string, height: number, pm: number, angle: number, clips: PhotonsEl['clips'], more: Partial<PhotonsEl> = {}): PhotonsEl => ({ kind: 'photons', id, nm: pm / 1000, rate: 1, height, compton: { angle }, clips, ...more });

/** Compton's experiment: X-rays scattered to the side come out with a longer wavelength. */
const experiment = collision('ex', 440, 5, 60, { a: { phases: [{ dur: 11.7 }] }, b: { phases: [{ dur: 11.7 }] }, c: { phases: [{ dur: 12.6 }] } }, { poster: 'a', posterAt: 0.63, thumb: ['names', 'angle', 'values'] });

/** One collision, with the energy and the momentum that it shares out. */
const billiards = collision('co', 470, 5, 90, { a: { phases: [{ dur: 9.1 }] }, b: { phases: [{ dur: 11.3 }] }, c: { phases: [{ dur: 11.7 }] }, d: { phases: [{ dur: 16.5 }] } });

/** The angle of scattering slides from 0° to 180°, and the change in wavelength follows. */
const equation = collision('eq', 350, 5, 45, { a: { phases: [{ dur: 10.5 }] }, b: { phases: [{ dur: 11.8 }] }, quarter: { phases: [{ dur: 2.6, angle: 0 }, { dur: 3.2 }, { dur: 3.7, angle: 90 }, { dur: 1.8 }] }, back: { phases: [{ dur: 0.8 }, { dur: 4.5, angle: 180 }, { dur: 3.3 }] }, e: { phases: [{ dur: 8.2 }] }, f: { phases: [{ dur: 20 }] } });

/** Compton's own X-rays: 71.00 pm, scattered through 90°. */
const compton = collision('cx', 350, 71, 90, { a: { phases: [{ dur: 10.9 }] }, b: { phases: [{ dur: 6.9 }] }, c: { phases: [{ dur: 9.5 }] } });

/** A change of 3.645 pm: the angle is 120°. */
const backwards = collision('an', 350, 5, 120, { a: { phases: [{ dur: 9.1 }] }, b: { phases: [{ dur: 5.6 }] }, c: { phases: [{ dur: 11.7 }] } }, { figures: 3 });

const video: Explainer = {
  id: 'p30-3-7-b',
  lessonId: 'p30-3-7',
  title: 'The Compton Effect',
  thumbnail: 'ex',
  summary:
    'In 1923 Arthur Compton found that an X-ray photon bounces off an electron like one billiard ball off another. See the collision, why the scattered photon has a longer wavelength, how energy and momentum are both conserved, and how to use the Compton equation to find the change in wavelength and the angle of scattering.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'The Compton Effect', subtitle: 'A photon collides with an electron' }],
      lines: [
        { say: 'A photon has energy, and it has momentum. So can a photon collide with something, the way one ball collides with another?', show: 'title' },
        { say: 'In nineteen twenty-three, Arthur Compton fired X-rays at electrons, and found that it can.', caption: 'In 1923, Arthur Compton fired X-rays at electrons, and found that it can.' },
      ],
    },
    {
      chapter: 'What Compton saw',
      layout: 'center',
      main: [experiment],
      lines: [
        { say: 'Compton sent X-rays of a single wavelength into a block of graphite, and measured the wavelength of the X-rays that were scattered off to the side.', show: ['ex', 'ex.names'], play: 'ex.a' },
        { say: 'Some of the scattered X-rays had a longer wavelength than the beam that went in. Look at the photon that leaves: its waves are farther apart.', show: ['ex.angle', 'ex.values'], play: 'ex.b' },
        { say: 'A wave cannot explain this. A wave that shakes an electron makes it send out waves of the same frequency, so the wavelength should not change at all.', play: 'ex.c' },
      ],
    },
    {
      chapter: 'A collision of particles',
      layout: 'center',
      main: [billiards],
      lines: [
        { say: 'Compton treated the X-rays as photons. Each photon collides with one electron, which is almost free and almost at rest.', show: ['co', 'co.names', 'co.angle'], play: 'co.a' },
        { say: 'The electron is knocked away, and takes some of the photon\'s energy with it. Energy is conserved, so what the photon loses, the electron gains.', show: 'co.energy', play: 'co.b' },
        { say: 'The photon is left with less energy. And since the energy of a photon is h c divided by lambda, less energy means a longer wavelength.', caption: 'The photon is left with less energy. And since the energy of a photon is hc ÷ λ, less energy means a longer wavelength.', show: 'co.values', play: 'co.c' },
        { say: 'Momentum is conserved too, with h divided by lambda as the momentum of each photon. The momentum of the scattered photon and the momentum of the electron add up to the momentum that the photon arrived with.', caption: 'Momentum is conserved too, with h ÷ λ as the momentum of each photon. The momentum of the scattered photon and the momentum of the electron add up to the momentum that the photon arrived with.', show: 'co.momentum', play: 'co.d' },
      ],
    },
    {
      chapter: 'The Compton equation',
      layout: 'center',
      main: [equation, { kind: 'math', id: 'm', size: 'md', lines: ['\\Delta\\lambda = \\lambda\' - \\lambda = \\dfrac{h}{mc}\\left(1 - \\cos\\theta\\right)', '\\text{for an electron, } h \\div mc = 2.43 \\times 10^{-12}\\text{ m} = \\brand{2.43\\text{ pm}}'] }],
      lines: [
        { say: 'From those two laws, Compton worked out the change in wavelength. Delta lambda equals h over m c, times one minus cos theta.', caption: 'From those two laws, Compton worked out the change in wavelength. Δλ = (h ÷ mc)(1 − cos θ).', show: ['eq', 'eq.names', 'm.0'], play: 'eq.a' },
        { say: 'Theta is the angle through which the photon is scattered, and m is the mass of the electron, so h over m c is 2.43 picometres.', caption: 'θ is the angle through which the photon is scattered, and m is the mass of the electron, so h ÷ mc is 2.43 pm.', show: ['m.1', 'eq.angle', 'eq.values', 'eq.shift'], play: 'eq.b' },
        { say: 'Watch the change as the angle grows. Straight on, at zero degrees, the wavelength does not change. At 90 degrees, the change is 2.43 picometres.', caption: 'Watch the change as the angle grows. Straight on, at 0°, the wavelength does not change. At 90°, the change is 2.43 pm.', play: 'eq.quarter' },
        { say: 'And for a photon that is sent straight back, at 180 degrees, the change is the greatest: 4.86 picometres.', caption: 'And for a photon that is sent straight back, at 180°, the change is the greatest: 4.86 pm.', play: 'eq.back' },
        { say: 'The change depends only on the angle, and not on the wavelength of the X-rays that are used.', play: 'eq.e' },
        { say: 'It is never more than about 5 picometres. That is a large part of the wavelength of an X-ray, but far too small to notice in visible light, whose wavelength is a hundred thousand times longer. This is why the effect was found with X-rays.', caption: 'It is never more than about 5 pm. That is a large part of the wavelength of an X-ray, but far too small to notice in visible light, whose wavelength is a hundred thousand times longer. This is why the effect was found with X-rays.', play: 'eq.f' },
      ],
    },
    {
      chapter: 'The wavelength afterwards',
      layout: 'center',
      main: [compton, { kind: 'math', id: 'c', size: 'md', lines: ['\\Delta\\lambda = 2.43 \\times (1 - \\cos 90°) = 2.43\\text{ pm}', '\\lambda\' = \\lambda + \\Delta\\lambda = 71.00 + 2.43 = \\brand{73.43\\text{ pm}}'] }],
      lines: [
        { say: 'Here are the X-rays that Compton used, with a wavelength of 71.00 picometres. They are scattered through 90 degrees. What is their wavelength afterwards?', caption: 'Here are the X-rays that Compton used, with a wavelength of 71.00 pm. They are scattered through 90°. What is their wavelength afterwards?', show: ['cx', 'cx.names', 'cx.angle'], play: 'cx.a' },
        { say: 'The cos of 90 degrees is zero, so the change in wavelength is 2.43 picometres.', caption: 'The cos of 90° is zero, so the change in wavelength is 2.43 pm.', show: ['c.0', 'cx.shift'], play: 'cx.b' },
        { say: 'The scattered photon has less energy, so its wavelength is longer. Always add the change: 71.00 plus 2.43 is 73.43 picometres.', caption: 'The scattered photon has less energy, so its wavelength is longer. Always add the change: 71.00 + 2.43 is 73.43 pm.', show: ['c.1', 'cx.values'], play: 'cx.c' },
      ],
    },
    {
      chapter: 'Finding the angle',
      layout: 'center',
      main: [backwards, { kind: 'math', id: 'a', size: 'md', lines: ['1 - \\cos\\theta = \\dfrac{\\Delta\\lambda}{h \\div mc} = \\dfrac{3.645}{2.43} = 1.500', '\\cos\\theta = 1 - 1.500 = -0.500 \\quad\\Rightarrow\\quad \\theta = \\brand{120°}'] }],
      lines: [
        { say: 'The equation works backwards too. The wavelength of this photon increases by 3.645 picometres. Through what angle was it scattered?', caption: 'The equation works backwards too. The wavelength of this photon increases by 3.645 pm. Through what angle was it scattered?', show: ['an', 'an.names', 'an.values', 'an.shift'], play: 'an.a' },
        { say: 'Divide the change by 2.43 picometres. One minus cos theta is 1.500.', caption: 'Divide the change by 2.43 pm. 1 − cos θ is 1.500.', show: 'a.0', play: 'an.b' },
        { say: 'So cos theta is negative 0.500, and theta is 120 degrees. A negative cosine means that the photon was scattered backwards, through more than 90 degrees.', caption: 'So cos θ is −0.500, and θ is 120°. A negative cosine means that the photon was scattered backwards, through more than 90°.', show: ['a.1', 'an.angle'], play: 'an.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An X-ray photon is scattered through 60° by an electron that was at rest. What is the change in its wavelength? Use $\\dfrac{h}{mc} = 2.43$ pm.',
          choices: ['0.50 pm', '0.61 pm', '1.22 pm', '2.43 pm'],
          answer: 2,
          working: '$\\Delta\\lambda = \\dfrac{h}{mc}(1 - \\cos\\theta) = 2.43 \\times (1 - \\cos 60°) = 2.43 \\times 0.500 = 1.22$ pm.',
        },
      ],
      lines: [
        { say: 'Your turn. An X-ray photon is scattered through 60 degrees by an electron that was at rest. What is the change in its wavelength? Pause the video and work it out.', caption: 'Your turn. An X-ray photon is scattered through 60° by an electron that was at rest. What is the change in its wavelength? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The cos of 60 degrees is 0.500, so one minus cos theta is 0.500. Multiply by 2.43 picometres, and the change is 1.22 picometres. That is choice C.', caption: 'The cos of 60° is 0.500, so 1 − cos θ is 0.500. Multiply by 2.43 pm, and the change is 1.22 pm. That is choice C.', show: 'q.answer' },
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
            'An X-ray photon **collides** with an electron, and leaves with less energy and a **longer wavelength**',
            '$\\Delta\\lambda = \\dfrac{h}{mc}\\left(1 - \\cos\\theta\\right)$, with $\\dfrac{h}{mc} = 2.43$ pm for an electron',
            'The change is zero at 0° and greatest at 180°, and it does not depend on the wavelength',
            '**Energy** and **momentum** are both conserved in the collision',
            'This showed that light behaves as particles that carry momentum',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. In the Compton effect, an X-ray photon collides with an electron, and leaves with less energy and a longer wavelength.', show: 'sum.0' },
        { say: 'The change in wavelength is h over m c, times one minus cos theta, and h over m c is 2.43 picometres for an electron.', caption: 'The change in wavelength is (h ÷ mc)(1 − cos θ), and h ÷ mc is 2.43 pm for an electron.', show: 'sum.1' },
        { say: 'The change is zero at zero degrees and greatest at 180 degrees, and it does not depend on the wavelength of the X-rays.', caption: 'The change is zero at 0° and greatest at 180°, and it does not depend on the wavelength of the X-rays.', show: 'sum.2' },
        { say: 'Energy and momentum are both conserved in the collision.', show: 'sum.3' },
        { say: 'After the photoelectric effect, this was the second piece of evidence that light behaves as particles, and it showed that those particles carry momentum.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
