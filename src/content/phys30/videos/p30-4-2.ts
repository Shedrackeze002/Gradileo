import type { AlphasEl, Explainer } from '@/video/script.ts';

// Lesson 4.2, first part: the gold foil experiment. Every picture is worked out from the force
// between an alpha particle (+2e) and a nucleus (+Ze), k(2e)(Ze) ÷ r² (src/video/alphas.ts):
// alpha particles cross Thomson's atom in straight lines, the foil of the experiment sends a few
// of them back to a screen that flashes, and each path past a gold nucleus is drawn to scale.

const picture = (id: string, kind: AlphasEl['picture'], height: number, clips: AlphasEl['clips'], more: Partial<AlphasEl> = {}): AlphasEl => ({ kind: 'alphas', id, picture: kind, height, clips, ...more });

/** Thomson's atom, which alpha particles should cross with hardly any deflection. */
const pudding = picture('pd', 'pudding', 460, { a: { phases: [{ dur: 3 }, { dur: 3, rate: 5 }, { dur: 9.9 }] }, b: { phases: [{ dur: 9.1 }] }, c: { phases: [{ dur: 15.8 }] }, d: { phases: [{ dur: 7.1 }] } }, { rate: 0 });

/** The experiment from above: a source, a gold foil and a screen all round. */
const ring = picture(
  'rg',
  'ring',
  470,
  { a: { phases: [{ dur: 4 }, { dur: 3, rate: 3 }, { dur: 4.9 }] }, b: { phases: [{ dur: 7, rate: 14 }, { dur: 9.5 }] }, c: { phases: [{ dur: 5.4 }] }, d: { phases: [{ dur: 3 }] }, e: { phases: [{ dur: 9.1 }] }, f: { phases: [{ dur: 10.8 }] } },
  { rate: 0, back: 0.015, poster: 'e', posterAt: 1, thumb: ['names', 'count'] },
);

/** One gold nucleus, to scale, and alpha particles that pass it at chosen distances. */
const past = picture(
  'ps',
  'past',
  460,
  { a: { phases: [{ dur: 10 }, { dur: 8, fire: [-175] }] }, b: { phases: [{ dur: 7, fire: [130, -95] }, { dur: 3.2 }] }, c: { phases: [{ dur: 3, fire: [55, -22] }, { dur: 1.7 }] }, d: { phases: [{ dur: 3, fire: [2] }, { dur: 11.8 }] } },
  { span: 1200 },
);

/** Rutherford's atom: a tiny nucleus, with electrons that circle it far away. */
const atom = picture('at', 'orbit', 360, { a: { phases: [{ dur: 19.3 }] }, b: { phases: [{ dur: 12.4 }] } }, { electrons: 3 });

/** The fault of the model: an electron that circles should radiate, and spiral into the nucleus. */
const fault = picture('fl', 'orbit', 470, { a: { phases: [{ dur: 10.2 }] }, b: { phases: [{ dur: 5.8 }] }, c: { phases: [{ dur: 1 }, { dur: 8, fall: true }, { dur: 2.3 }] }, d: { phases: [{ dur: 12.1 }] } });

const video: Explainer = {
  id: 'p30-4-2',
  lessonId: 'p30-4-2',
  title: 'The Gold Foil Experiment',
  thumbnailTitle: 'Gold Foil Experiment',
  thumbnail: 'rg',
  summary:
    'Alpha particles are fired at a thin gold foil. Most go straight through, but a few come back. See why that cannot happen in Thomson\'s atom, how a tiny, dense nucleus turns each alpha particle by electric repulsion, and the fault that Rutherford\'s model still had.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Atomic and Nuclear Physics', title: 'The Gold Foil Experiment', subtitle: "Rutherford's nucleus" }],
      lines: [
        { say: 'In nineteen oh nine, the atom was pictured as a soft ball of positive charge, with electrons dotted through it.', caption: 'In 1909, the atom was pictured as a soft ball of positive charge, with electrons dotted through it.', show: 'title' },
        { say: 'Ernest Rutherford set two of his team, Hans Geiger and Ernest Marsden, to test that picture. What they found changed it for good.' },
      ],
    },
    {
      chapter: "Thomson's prediction",
      layout: 'center',
      main: [pudding],
      lines: [
        { say: 'The test used alpha particles, which some radioactive elements give out. An alpha particle is positive, with a charge of plus two e, and it is about seven thousand times heavier than an electron.', caption: 'The test used alpha particles, which some radioactive elements give out. An alpha particle is positive, with a charge of +2e, and it is about 7000 times heavier than an electron.', show: ['pd', 'pd.names'], play: 'pd.a' },
        { say: 'It leaves its source at about one twentieth of the speed of light. So it is a fast, heavy bullet.', play: 'pd.b' },
        { say: "In Thomson's atom, the positive charge is spread through the whole atom, so nowhere is the electric field strong enough to turn such a bullet. And the electrons are far too light to matter.", show: 'pd.paths', play: 'pd.c' },
        { say: 'So the model predicts that every alpha particle goes through, with hardly any deflection.', show: 'pd.count', play: 'pd.d' },
      ],
    },
    {
      chapter: 'The experiment',
      layout: 'center',
      main: [ring],
      lines: [
        { say: 'Here is the experiment, seen from above. A narrow beam of alpha particles is aimed at a gold foil, only a few hundred atoms thick.', show: ['rg', 'rg.names'], play: 'rg.a' },
        { say: 'All round the foil is a screen coated with zinc sulfide, which gives a tiny flash each time an alpha particle hits it. Geiger and Marsden sat in the dark, and counted the flashes at each angle.', play: 'rg.b' },
        { say: 'Most of the alpha particles passed straight through, as expected.', show: 'rg.count', play: 'rg.c' },
        { say: 'Some were turned through small angles.', play: 'rg.d' },
        { say: 'But a few, about one in eight thousand, were turned through more than ninety degrees. Some came almost straight back.', caption: 'But a few, about 1 in 8000, were turned through more than 90°. Some came almost straight back.', play: 'rg.e' },
        { say: 'Rutherford said later that it was as if a shell fired at a sheet of tissue paper had come back and hit the gunner.', play: 'rg.f' },
      ],
    },
    {
      chapter: 'A tiny nucleus',
      layout: 'center',
      main: [past],
      lines: [
        { say: 'Only a very strong force can turn back a fast alpha particle, and only a very concentrated charge can give such a force. So Rutherford packed all of the positive charge of the atom into a tiny, dense nucleus.', show: ['ps', 'ps.names', 'ps.scale'], play: 'ps.a' },
        { say: 'The positive nucleus repels the positive alpha particle. One that passes far from the nucleus is turned through a small angle.', show: 'ps.angle', play: 'ps.b' },
        { say: 'One that passes closer is turned through a larger angle.', play: 'ps.c' },
        { say: 'And one that heads almost straight for the nucleus is stopped, and thrown back. Notice that it never touches the nucleus. The electric repulsion turns it round while the two are still apart.', play: 'ps.d' },
      ],
    },
    {
      chapter: "Rutherford's atom",
      layout: 'center',
      main: [atom, { kind: 'callout', id: 'size', tone: 'key', title: 'How small is the nucleus?', md: 'A nucleus is between **one ten-thousandth** and **one hundred-thousandth** of the width of its atom. If the atom were a football stadium, the nucleus would be a pea at the centre.' }],
      lines: [
        { say: "This is Rutherford's model. All of the positive charge, and nearly all of the mass, is in the nucleus at the centre. The electrons move around it at a distance, held by its electric attraction. Most of the atom is empty space.", show: ['at', 'at.names'], play: 'at.a' },
        { say: 'The nucleus is far smaller than any picture can show. If the atom were a football stadium, the nucleus would be a pea at the centre.', show: 'size', play: 'at.b' },
      ],
    },
    {
      chapter: 'What each result shows',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['What was seen', 'What it shows'],
          rows: [
            ['Most alpha particles pass straight through', 'Most of an atom is empty space'],
            ['A few are turned through large angles', 'The positive charge is in a small, massive nucleus'],
            ['Only about 1 in 8000 is turned back', 'The nucleus is very small compared with the atom'],
          ],
        },
      ],
      lines: [
        { say: 'Each result has its place in the model. Most alpha particles pass straight through, so most of an atom is empty space.', show: ['t', 't.0'] },
        { say: 'A few are turned through large angles, so the positive charge is concentrated in a small, massive nucleus, which repels them strongly.', show: 't.1' },
        { say: 'And only about one in eight thousand is turned back, so the nucleus is very small compared with the atom.', caption: 'And only about 1 in 8000 is turned back, so the nucleus is very small compared with the atom.', show: 't.2' },
      ],
    },
    {
      chapter: 'A fault in the model',
      layout: 'center',
      main: [fault],
      lines: [
        { say: "Rutherford's atom has a serious fault. An electron that moves in a circle is always changing direction, so it is accelerating.", show: ['fl', 'fl.names'], play: 'fl.a' },
        { say: 'And an accelerating charge radiates electromagnetic waves, which carry energy away.', show: 'fl.waves', play: 'fl.b' },
        { say: 'So the electron should lose energy, and spiral into the nucleus in a tiny fraction of a second. Atoms should not be stable at all.', play: 'fl.c' },
        { say: 'The model also cannot explain why a hot element gives out light of only certain colours. The next lesson shows how Niels Bohr dealt with both problems.', hide: 'fl.waves', play: 'fl.d' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Most alpha particles passed straight through the gold foil. What does this show?',
          choices: ['Alpha particles have no charge', 'Gold atoms have no electrons', 'The nucleus has a negative charge', 'Most of an atom is empty space'],
          answer: 3,
          working: 'An alpha particle is turned only when it passes close to a nucleus. Most pass straight through, so **most of an atom is empty space**.',
        },
      ],
      lines: [
        { say: 'Your turn. Most alpha particles passed straight through the gold foil. What does this show? Pause the video and think about it.', show: 'q', wait: 6 },
        { say: 'An alpha particle is turned only when it passes close to a nucleus. Most pass straight through, so most of an atom is empty space. That is choice "D".', caption: 'An alpha particle is turned only when it passes close to a nucleus. Most pass straight through, so most of an atom is empty space. That is choice D.', show: 'q.answer' },
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
            'Alpha particles were fired at a thin **gold foil**, and a screen flashed where each one landed',
            'Most passed straight through, so most of an atom is **empty space**',
            'A few were turned back, so the positive charge and nearly all of the mass are in a tiny **nucleus**',
            'An alpha particle never touches the nucleus: **electric repulsion** turns it',
            "Rutherford's model cannot explain why atoms are stable, or why elements give out only certain colours",
          ],
        },
      ],
      lines: [
        { say: 'Here is what to remember. Alpha particles were fired at a thin gold foil, and a screen flashed where each one landed.', show: 'sum.0' },
        { say: 'Most passed straight through, so most of an atom is empty space.', show: 'sum.1' },
        { say: 'A few were turned back, so the positive charge, and nearly all of the mass, are in a tiny nucleus.', show: 'sum.2' },
        { say: 'An alpha particle never touches the nucleus. Electric repulsion turns it.', show: 'sum.3' },
        { say: "And Rutherford's model cannot explain why atoms are stable, or why elements give out light of only certain colours.", show: 'sum.4' },
      ],
    },
  ],
};

export default video;
