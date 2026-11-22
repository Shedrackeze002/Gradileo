import type { Explainer, PhotonsEl } from '@/video/script.ts';

// Lesson 3.7, first part: the momentum of a photon. The pictures are true to their numbers
// (src/video/photons.ts): the arrow on each photon is its momentum, h ÷ λ, and each surface on
// wheels gains the same speed from every photon that it takes in, and twice as much from every
// photon that it sends back. (The kick of one photon is drawn far larger than a real one, and the
// narration says so.)

const beam = (id: string, height: number, nm: number, rate: number, clips: PhotonsEl['clips'], more: Partial<PhotonsEl> = {}): PhotonsEl => ({ kind: 'photons', id, nm, rate, height, clips, ...more });

/** Light that slides from red to violet: the momentum of each photon grows. */
const momentum = beam('mo', 340, 700, 4, { a: { phases: [{ dur: 18.7 }] }, b: { phases: [{ dur: 12.2 }] }, violet: { phases: [{ dur: 1.5 }, { dur: 7.2, nm: 400 }, { dur: 2.6 }] }, c: { phases: [{ dur: 6.9 }] } });

/** The lesson's photon of green light, 500 nm. */
const green = beam('gr', 330, 500, 4, { a: { phases: [{ dur: 7.3 }] }, b: { phases: [{ dur: 11.3 }] }, c: { phases: [{ dur: 13.1 }] } });

/** The lesson's X-ray photon, 71.0 pm. */
const xray = beam('xr', 330, 0.071, 4, { a: { phases: [{ dur: 9.1 }] }, b: { phases: [{ dur: 7.3 }] }, c: { phases: [{ dur: 12.1 }] } });

/** Two beams alike: one lands on a black card, the other on a mirror. */
const push = beam('pu', 470, 550, 3, { a: { phases: [{ dur: 10.4 }] }, b: { phases: [{ dur: 9.9 }] }, c: { phases: [{ dur: 12.6 }] }, d: { phases: [{ dur: 10.4 }] } }, { push: { watts: 100, surfaces: ['black', 'mirror'] }, poster: 'c', thumb: ['names', 'momentum'] });

/** The same two beams, with the force of each. */
const force = beam('fo', 360, 550, 2, { a: { phases: [{ dur: 16.1 }] }, b: { phases: [{ dur: 14.7 }] }, c: { phases: [{ dur: 8.2 }] }, d: { phases: [{ dur: 14.3 }] } }, { push: { watts: 100, surfaces: ['black', 'mirror'] } });

/** A mirror that sunlight pushes for a long time. */
const sail = beam('sa', 330, 580, 4, { a: { phases: [{ dur: 14.8 }] }, b: { phases: [{ dur: 8.2 }] } }, { push: { watts: 100, surfaces: ['mirror'] } });

const video: Explainer = {
  id: 'p30-3-7',
  lessonId: 'p30-3-7',
  title: 'The Momentum of a Photon',
  thumbnailTitle: 'Photon Momentum',
  thumbnail: 'pu',
  summary:
    'A photon has no mass, but it has momentum. See how the momentum of a photon depends on its wavelength, find the momentum of a photon of green light and of an X-ray photon, and watch light push a black card and a mirror on wheels to see why the mirror feels twice the force.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Electromagnetic Radiation', title: 'The Momentum of a Photon', subtitle: 'Light pushes on what it strikes' }],
      lines: [
        { say: 'The photoelectric effect showed that light delivers its energy in packets called photons. But a real particle has more than energy. A moving ball has momentum, and it can push on whatever it hits.', show: 'title' },
        { say: 'So does a photon have momentum too? It does, and that means light pushes on everything it lands on.' },
      ],
    },
    {
      chapter: 'The momentum of a photon',
      layout: 'center',
      main: [momentum, { kind: 'math', id: 'm', size: 'md', lines: ['p = \\dfrac{E}{c}', 'p = \\dfrac{h}{\\lambda}'] }],
      lines: [
        { say: 'A photon has no mass, so p equals m v cannot give its momentum. But Maxwell\'s theory had already shown that light carries momentum as well as energy. The momentum of light is its energy divided by c, the speed of light.', caption: 'A photon has no mass, so p = mv cannot give its momentum. But Maxwell\'s theory had already shown that light carries momentum as well as energy. The momentum of light is its energy divided by c, the speed of light.', show: ['mo', 'mo.values', 'm.0'], play: 'mo.a' },
        { say: 'For one photon, the energy is h c divided by lambda. Divide that by c, and the momentum of a photon is h divided by its wavelength.', caption: 'For one photon, the energy is hc ÷ λ. Divide that by c, and the momentum of a photon is h ÷ λ.', show: 'm.1', play: 'mo.b' },
        { say: 'The arrow on each photon shows its momentum. Watch the arrows as the light changes from red to violet. A shorter wavelength means more momentum.', show: 'mo.momentum', play: 'mo.violet' },
        { say: 'If the wavelength halves, the momentum doubles. And if the wavelength doubles, the momentum halves.', play: 'mo.c' },
      ],
    },
    {
      chapter: 'A photon of green light',
      layout: 'center',
      main: [green, { kind: 'math', id: 'g', size: 'md', lines: ['p = \\dfrac{h}{\\lambda} = \\dfrac{6.63 \\times 10^{-34}}{500 \\times 10^{-9}} = \\brand{1.33 \\times 10^{-27}\\text{ kg·m/s}}'] }],
      lines: [
        { say: 'Let\'s find the momentum of a photon of green light with a wavelength of 500 nanometres.', caption: 'Let\'s find the momentum of a photon of green light with a wavelength of 500 nm.', show: ['gr', 'gr.values'], play: 'gr.a' },
        { say: 'p equals h divided by lambda. That is 6.63 times ten to the negative 34, divided by 500 times ten to the negative nine metres.', caption: 'p = h ÷ λ. That is 6.63 × 10⁻³⁴, divided by 500 × 10⁻⁹ m.', show: 'g.0', play: 'gr.b' },
        { say: 'The momentum is 1.33 times ten to the negative 27 kilogram metres per second. That is far too small to notice from one photon, but it is not zero.', caption: 'The momentum is 1.33 × 10⁻²⁷ kg·m/s. That is far too small to notice from one photon, but it is not zero.', show: 'gr.momentum', play: 'gr.c' },
      ],
    },
    {
      chapter: 'An X-ray photon',
      layout: 'center',
      main: [xray, { kind: 'math', id: 'x', size: 'md', lines: ['p = \\dfrac{h}{\\lambda} = \\dfrac{6.63 \\times 10^{-34}}{71.0 \\times 10^{-12}} = \\brand{9.34 \\times 10^{-24}\\text{ kg·m/s}}'] }],
      lines: [
        { say: 'Now a photon of X-rays, with a wavelength of 71.0 picometres. One picometre is ten to the negative twelve metres.', caption: 'Now a photon of X-rays, with a wavelength of 71.0 pm. One picometre is 10⁻¹² m.', show: ['xr', 'xr.values'], play: 'xr.a' },
        { say: 'h divided by lambda gives 9.34 times ten to the negative 24 kilogram metres per second.', caption: 'h ÷ λ gives 9.34 × 10⁻²⁴ kg·m/s.', show: ['x.0', 'xr.momentum'], play: 'xr.b' },
        { say: 'That is about seven thousand times the momentum of the photon of green light. A photon of X-rays hits hard, and that matters in the next video.', caption: 'That is about 7000 times the momentum of the photon of green light. A photon of X-rays hits hard, and that matters in the next video.', play: 'xr.c' },
      ],
    },
    {
      chapter: 'The push of light',
      layout: 'center',
      main: [push],
      lines: [
        { say: 'Since photons carry momentum, light pushes on whatever it strikes. Here, two beams that are exactly alike land on two surfaces on wheels.', show: ['pu', 'pu.names'], play: 'pu.a' },
        { say: 'The black card absorbs each photon, and takes all of its momentum. Photon by photon, the card gains speed and rolls away.', show: 'pu.momentum', play: 'pu.b' },
        { say: 'The mirror reflects each photon straight back. The momentum of the photon is reversed, so its change is twice as large, and the mirror gains twice as much.', play: 'pu.c' },
        { say: 'It is the same reason that a ball that bounces gives a wall a larger push than a lump of clay that sticks.', play: 'pu.d' },
      ],
    },
    {
      chapter: 'The force of a beam',
      layout: 'center',
      main: [
        force,
        {
          kind: 'math',
          id: 'f',
          size: 'md',
          lines: ['\\text{Absorbed: } F = \\dfrac{P}{c} = \\dfrac{100}{3.00 \\times 10^{8}} = \\brand{3.33 \\times 10^{-7}\\text{ N}}', '\\text{Reflected: } F = \\dfrac{2P}{c} = \\brand{6.67 \\times 10^{-7}\\text{ N}}'],
        },
      ],
      lines: [
        { say: 'How large is the push? Force is the rate of change of momentum. A beam with a power P delivers an energy P each second, and so a momentum of P divided by c each second.', caption: 'How large is the push? Force is the rate of change of momentum. A beam with a power P delivers an energy P each second, and so a momentum of P ÷ c each second.', show: ['fo', 'fo.names', 'fo.values'], play: 'fo.a' },
        { say: 'So for a beam of 100 watts on a black card, the force is 100 divided by 3.00 times ten to the eight. That is 3.33 times ten to the negative seven newtons.', caption: 'So for a beam of 100 W on a black card, the force is 100 ÷ (3.00 × 10⁸). That is 3.33 × 10⁻⁷ N.', show: 'f.0', play: 'fo.b' },
        { say: 'On a perfect mirror the force is twice as much: 6.67 times ten to the negative seven newtons.', caption: 'On a perfect mirror the force is twice as much: 6.67 × 10⁻⁷ N.', show: ['f.1', 'fo.force'], play: 'fo.c' },
        { say: 'Both forces are far too small to feel, because c is so large. In this picture the push is drawn much bigger than it really is, so that you can see it.', play: 'fo.d' },
      ],
    },
    {
      chapter: 'Solar sails',
      layout: 'center',
      main: [sail, { kind: 'callout', id: 'tip', tone: 'tip', title: 'In space', md: 'A **solar sail** is a huge, light mirror. Sunlight pushes it gently for months on end, and nothing slows it down.' }],
      lines: [
        { say: 'In space that tiny force adds up. A solar sail is a huge, light mirror that sunlight pushes for months on end, with no friction to slow it, so it keeps gaining speed.', show: ['sa', 'sa.names', 'sa.momentum', 'tip'], play: 'sa.a' },
        { say: 'The push of sunlight is also why the dust tail of a comet points away from the Sun.', play: 'sa.b' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A laser beam with a power of 60 W is reflected straight back by a mirror. What force does the light put on the mirror?',
          choices: ['$2.0 \\times 10^{-7}$ N', '$4.0 \\times 10^{-7}$ N', '$1.8 \\times 10^{10}$ N', '$3.6 \\times 10^{10}$ N'],
          answer: 1,
          working: 'The light is reflected, so $F = \\dfrac{2P}{c} = \\dfrac{2 \\times 60}{3.00 \\times 10^{8}} = 4.0 \\times 10^{-7}$ N.',
        },
      ],
      lines: [
        { say: 'Your turn. A laser beam with a power of 60 watts is reflected straight back by a mirror. What force does the light put on the mirror? Pause the video and work it out.', caption: 'Your turn. A laser beam with a power of 60 W is reflected straight back by a mirror. What force does the light put on the mirror? Pause the video and work it out.', show: 'q', wait: 6 },
        { say: 'The light is reflected, so the force is two P divided by c. Two times 60, divided by 3.00 times ten to the eight, is 4.0 times ten to the negative seven newtons. That is choice B.', caption: 'The light is reflected, so the force is 2P ÷ c. 2 × 60, divided by 3.00 × 10⁸, is 4.0 × 10⁻⁷ N. That is choice B.', show: 'q.answer' },
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
            'A photon has **no mass**, but it has momentum: $p = \\dfrac{h}{\\lambda} = \\dfrac{E}{c}$',
            'A shorter wavelength means **more momentum**',
            'Light pushes on a surface that it strikes',
            'Absorbed light: $F = \\dfrac{P}{c}$. Light reflected straight back: $F = \\dfrac{2P}{c}$',
            'Never use $p = mv$ for a photon',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. A photon has no mass, but it has momentum: h divided by its wavelength, which is the same as its energy divided by c.', caption: 'Here is what to remember. A photon has no mass, but it has momentum: h ÷ λ, which is the same as E ÷ c.', show: 'sum.0' },
        { say: 'A shorter wavelength means more momentum.', show: 'sum.1' },
        { say: 'Light pushes on a surface that it strikes.', show: 'sum.2' },
        { say: 'The force is P divided by c when the light is absorbed, and two P divided by c when it is reflected straight back.', caption: 'The force is P ÷ c when the light is absorbed, and 2P ÷ c when it is reflected straight back.', show: 'sum.3' },
        { say: 'And never use p equals m v for a photon, because it has no mass.', caption: 'And never use p = mv for a photon, because it has no mass.', show: 'sum.4' },
      ],
    },
  ],
};

export default video;
