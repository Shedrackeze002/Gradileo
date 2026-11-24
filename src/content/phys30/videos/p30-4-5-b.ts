import type { Explainer, RadiationEl } from '@/video/script.ts';

// Lesson 4.5, second part: the three radiations. src/video/radiation.ts sends alpha particles,
// beta particles and gamma rays from a source: each leaves its trail of ions and is stopped by
// paper, aluminium or lead, a field bends the charged ones opposite ways, and a counter clicks
// for the ones that reach it, and for the background.

const rays = (id: string, height: number, clips: RadiationEl['clips'], more: Partial<RadiationEl> = {}): RadiationEl => ({ kind: 'radiation', id, height, clips, ...more });

/** The three radiations and the ions they leave. */
const trails = rays('io', 400, { a: { phases: [{ dur: 19.8 }] }, b: { phases: [{ dur: 16.2 }] }, c: { phases: [{ dur: 20.6 }] } }, { background: 0 });

/** Paper, aluminium and lead slide into the way. */
const shields = rays(
  'st',
  380,
  { a: { phases: [{ dur: 2.5 }, { dur: 5.1, paper: true }] }, b: { phases: [{ dur: 3 }, { dur: 4.4, aluminium: true }] }, c: { phases: [{ dur: 3 }, { dur: 5.3, lead: true }] }, d: { phases: [{ dur: 9.7 }] } },
  { background: 0, poster: 'c', posterAt: 1, thumb: ['names', 'ions'] },
);

/** The three in one beam: between charged plates, and then in a magnetic field. */
const fields = rays(
  'fd',
  420,
  { a: { phases: [{ dur: 2.5 }, { dur: 15.1, field: 'electric' }] }, b: { phases: [{ dur: 1.6, field: 'off' }, { dur: 7.1, field: 'magnetic' }] }, c: { phases: [{ dur: 10 }] } },
  { picture: 'fields' },
);

/** A counter: it clicks for beta particles and gamma rays, and still clicks with the source closed. */
const counter = rays('gc', 380, { a: { phases: [{ dur: 20.2 }] }, b: { phases: [{ dur: 1.2 }, { dur: 8.7, open: false }] }, c: { phases: [{ dur: 2 }, { dur: 14.6, open: true }] } }, {});

const video: Explainer = {
  id: 'p30-4-5-b',
  lessonId: 'p30-4-5',
  title: 'Alpha, Beta and Gamma',
  thumbnailTitle: 'Alpha, Beta, Gamma',
  thumbnail: 'st',
  summary:
    'Alpha particles, beta particles and gamma rays all ionize the matter they pass through, but very differently. See the trail of ions that each leaves, what stops each one (paper, aluminium, thick lead), how electric and magnetic fields bend them, and how a Geiger counter and the background count are used.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'Alpha, Beta and Gamma', subtitle: 'Three radiations, and what stops them' }],
      lines: [
        { say: 'A radioactive source can give out three kinds of radiation: alpha, beta and gamma.', show: 'title' },
        { say: 'They behave very differently. Let us send all three out of a source, and watch.' },
      ],
    },
    {
      chapter: 'Three radiations',
      layout: 'center',
      main: [trails],
      lines: [
        { say: 'An alpha particle is a helium nucleus, with a charge of plus 2 e. A beta particle is a fast electron, with a charge of minus e. And a gamma ray is a photon of very high energy, with no charge at all.', caption: 'An alpha particle is a helium nucleus, with a charge of +2e. A beta particle is a fast electron, with a charge of −e. And a gamma ray is a photon of very high energy, with no charge at all.', show: ['io', 'io.names'], play: 'io.a' },
        { say: 'All three ionize the matter they pass through. They knock electrons out of atoms, and leave a trail of ions. That is how they are detected, and it is also how they harm living cells.', show: 'io.ions', play: 'io.b' },
        { say: 'But look at the trails. An alpha particle ionizes so strongly that it soon loses all of its energy. A few centimetres of air stop it. A gamma ray rarely meets an atom, so it leaves hardly any ions, and it travels a long way.', show: 'io.air', play: 'io.c' },
      ],
    },
    {
      chapter: 'What stops them',
      layout: 'center',
      main: [shields, { kind: 'callout', id: 'key', tone: 'key', title: 'The two go together', md: 'The **most ionizing** radiation is the **least penetrating**. Alpha ionizes most and is stopped first. Gamma ionizes least and gets furthest.' }],
      lines: [
        { say: 'Now put things in the way. A single sheet of paper stops the alpha particles.', show: ['st', 'st.names', 'st.ions'], play: 'st.a' },
        { say: 'The beta particles go straight through the paper. But a few millimetres of aluminium stop them.', play: 'st.b' },
        { say: 'Gamma rays pass through both. Thick lead, or concrete, only reduces them. Some gamma rays still get through.', play: 'st.c' },
        { say: 'The two properties go together. The most ionizing radiation is the least penetrating, because it loses its energy so quickly.', show: 'key', play: 'st.d' },
      ],
    },
    {
      chapter: 'In a field',
      layout: 'center',
      main: [fields],
      lines: [
        { say: 'Send all three between two charged plates. Alpha particles are positive, so they bend towards the negative plate. Beta particles are negative, so they bend towards the positive plate. Gamma rays have no charge, and go straight on.', show: ['fd', 'fd.names', 'fd.screen'], play: 'fd.a' },
        { say: 'A magnetic field also bends alpha and beta particles in opposite directions, and it does not bend gamma rays.', play: 'fd.b' },
        { say: 'The same field deflects a beta particle much more than an alpha particle, because a beta particle has a far smaller mass.', play: 'fd.c' },
      ],
    },
    {
      chapter: 'Detecting radiation',
      layout: 'center',
      main: [counter, { kind: 'math', id: 'bg', size: 'md', lines: ['\\text{source alone} = 300 - 25 = \\good{275}\\ \\text{counts per minute}'] }],
      lines: [
        { say: 'A Geiger counter has a tube of gas. Radiation that enters the tube makes ions in the gas, and each burst of ions is counted as a click. Notice that the alpha particles never reach this tube. They cannot travel that far in air.', show: ['gc', 'gc.names', 'gc.counter', 'gc.air'], play: 'gc.a' },
        { say: 'Now close the source. The counter still clicks now and then. This is background radiation, from rocks, the air, food and space.', play: 'gc.b' },
        { say: 'So to find the count rate of a source alone, measure the background first, and subtract it. If the counter reads 300 counts a minute with the source, and 25 without it, the source gives 275.', show: 'bg', play: 'gc.c' },
      ],
    },
    {
      chapter: 'Uses and safety',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'use',
          items: [
            'A **smoke detector** uses an alpha source: it ionizes the air strongly, and cannot reach the people in the room',
            'A factory checks the **thickness of foil** with beta radiation: how much gets through depends on the thickness',
            'A **medical tracer** gives out gamma rays: only they can pass out of the body',
            'To lower a dose: less **time**, more **distance**, and **shielding** in between',
          ],
        },
      ],
      lines: [
        { say: 'These properties decide what each radiation is used for. A smoke detector uses an alpha source. It ionizes the air strongly, so a small current flows, and smoke interrupts it. The alpha particles cannot reach the people in the room.', show: 'use.0' },
        { say: 'A factory checks the thickness of aluminium foil with beta radiation, because the amount that gets through depends on the thickness.', show: 'use.1' },
        { say: 'A medical tracer, followed from outside the body, must give out gamma rays. Only they can pass out of the body.', show: 'use.2' },
        { say: 'And three things lower the dose that a person receives: less time near the source, more distance from it, and shielding in between.', show: 'use.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which radiation is the most ionizing, and what is enough to stop it?',
          choices: ['Gamma rays, stopped by a sheet of paper', 'Beta particles, stopped by a few millimetres of aluminium', 'Alpha particles, stopped by a sheet of paper', 'Alpha particles, stopped only by thick lead'],
          answer: 2,
          working: 'Alpha particles ionize the most strongly, so they lose their energy the most quickly: a sheet of paper, or a few centimetres of air, stops them. Gamma rays are the least ionizing and the most penetrating.',
        },
      ],
      lines: [
        { say: 'Your turn. Which radiation is the most ionizing, and what is enough to stop it? Pause the video and decide.', show: 'q', wait: 6 },
        { say: 'Alpha particles ionize the most strongly, so they lose their energy the most quickly. A sheet of paper stops them. That is choice "C".', caption: 'Alpha particles ionize the most strongly, so they lose their energy the most quickly. A sheet of paper stops them. That is choice C.', show: 'q.answer' },
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
            'Alpha, beta and gamma radiation all **ionize** the matter they pass through',
            '**Alpha**: the most ionizing, stopped by paper or a few centimetres of air',
            '**Beta**: stopped by a few millimetres of aluminium',
            '**Gamma**: the least ionizing and the most penetrating, reduced by thick lead',
            'Fields bend alpha and beta particles **opposite ways**, and do not bend gamma rays',
            'Subtract the **background** count to find the count rate of a source',
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Alpha, beta and gamma radiation all ionize the matter they pass through.', show: 'sum.0' },
        { say: 'Alpha is the most ionizing. It is stopped by paper, or a few centimetres of air.', show: 'sum.1' },
        { say: 'Beta is stopped by a few millimetres of aluminium.', show: 'sum.2' },
        { say: 'Gamma is the least ionizing and the most penetrating. Thick lead only reduces it.', show: 'sum.3' },
        { say: 'Fields bend alpha and beta particles opposite ways, and do not bend gamma rays.', show: 'sum.4' },
        { say: 'And subtract the background count to find the count rate of a source.', show: 'sum.5' },
      ],
    },
  ],
};

export default video;
