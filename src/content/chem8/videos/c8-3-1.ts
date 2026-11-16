import { ATOM, hydrogenBurning } from '@/video/reactions.ts';
import type { Explainer, ParticleBox, ParticlesEl } from '@/video/script.ts';

// The particles here are simulated (src/video/particles.ts): water boiling beside hydrogen
// burning. Boiling only moves the water molecules apart; burning joins atoms up in new molecules.

/** Liquid water: water molecules close together, until it is heated. */
const water: ParticleBox = { id: 'w', state: 'liquid', width: 10, height: 10, temp: 0.3, kinds: [{ ...ATOM.O, bond: 1, heavy: 1 }, { ...ATOM.H, bond: 1, heavy: 1 }], molecules: [{ atoms: [0, 1, 1], n: 10, bent: true }], label: 'water' };

const changes: ParticlesEl = {
  kind: 'particles',
  id: 'pc',
  boxes: [water, hydrogenBurning('h', { label: 'hydrogen and oxygen' })],
  clips: {
    boil: { phases: [{ dur: 4, heat: { w: 2.5 } }, { dur: 6 }] },
    spark: { phases: [{ dur: 1, heat: { h: 2 } }, { dur: 2 }, { dur: 1, heat: { h: 0.4 } }, { dur: 8 }] },
  },
  thermometers: true,
  seed: 7,
  height: 440,
};

const video: Explainer = {
  id: 'c8-3-1',
  lessonId: 'c8-3-1',
  title: 'Physical and Chemical Changes',
  thumbnail: 'pc',
  summary:
    'A physical change makes no new substance: changes of state, dissolving, breaking and cutting. A chemical change makes one or more new substances: burning, rusting, cooking and rotting. The key question is whether a new substance has been made. Most physical changes are easily reversed; most chemical changes are not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Physical and Chemical Changes', title: 'Physical and Chemical Changes', subtitle: 'Has a new substance been made?' }],
      lines: [
        { say: 'Melt an ice cube, and you still have water. Burn a piece of paper, and you are left with ash and smoke that will never be paper again.', show: 'title' },
        { say: 'Both are changes, but only one makes something new. In this video, you will learn to tell the two kinds apart.' },
      ],
    },
    {
      chapter: 'Two kinds of change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Physical and chemical change', md: 'A **physical change** makes **no new substance**.\n\nA **chemical change**, or reaction, makes one or more **new substances**.' },
        {
          kind: 'table',
          id: 'chg',
          head: ['Physical changes', 'Chemical changes'],
          rows: [
            ['ice melting', 'paper burning'],
            ['sugar dissolving in tea', 'an iron nail rusting'],
            ['a glass breaking', 'a cake baking'],
          ],
        },
      ],
      lines: [
        { say: 'In a physical change, no new substance is made. The substance may change its state, shape or size, or dissolve, but it is still the same substance.', show: 'def' },
        { say: 'In a chemical change, also called a chemical reaction, one or more new substances are made.' },
        { say: 'Ice melting, sugar dissolving and a glass breaking are all physical changes. Paper burning, a nail rusting and a cake baking are chemical changes.', show: 'chg' },
        { say: 'So the key question is always the same: has a new substance been made?' },
        { say: 'Think of a candle. Melted wax is still wax, so melting is physical. But the burning wax reacts with oxygen to make carbon dioxide and water, so burning is chemical.' },
      ],
    },
    {
      chapter: 'Up close',
      layout: 'center',
      main: [changes],
      lines: [
        { say: 'Let’s look at both kinds of change up close. On the left is liquid water, its molecules close together. On the right is a mix of hydrogen and oxygen gas.', show: ['pc', 'pc.labels', 'pc.thermo'] },
        { say: 'Let’s heat the water until it boils. Its molecules move faster and escape from one another into a gas. But look: every one is still a water molecule, one red oxygen atom joined to two yellow hydrogen atoms.', play: 'pc.boil', focus: 'pc.w' },
        { say: 'No new substance has been made, so boiling is a physical change. Cool the steam, and it turns back into liquid water.', focus: 'pc.w' },
        { say: 'Now a spark heats the gases. Their molecules break apart, and the atoms join up in a new way, as water molecules that were not there before.', play: 'pc.spark', show: 'pc.tally', focus: 'pc.h' },
        { say: 'A new substance has been made, so this is a chemical change. And you cannot easily turn the water back into hydrogen and oxygen.', focus: 'pc.h' },
      ],
    },
    {
      chapter: 'Can it be reversed?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rev', tone: 'key', title: 'Reversible changes', md: 'Most **physical** changes are easily **reversed**. Most **chemical** changes are **not**.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dissolving is physical', md: 'Evaporate the water from sugary tea, and the sugar is left behind.' },
      ],
      lines: [
        { say: 'A reversible change can be undone easily, for example by cooling, heating or evaporating. Most physical changes are reversible: ice melts, and the water freezes again.', show: 'rev' },
        { say: 'Most chemical changes are irreversible. A boiled egg cannot be made runny again, and ash cannot be turned back into wood, because new substances have been made.' },
        { say: 'Dissolving can look like something disappearing, but it is a physical change. Evaporate the water from sugary tea, and the sugar is left behind.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is a chemical change?',
          choices: ['butter melting', 'milk going sour', 'salt dissolving', 'water boiling'],
          answer: 1,
          working: 'Sour milk contains new substances made as it goes off, and it cannot be turned back. The others make no new substance.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a chemical change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, milk going sour. New substances are made as the milk goes off, and it cannot be turned back. Melting, dissolving and boiling make no new substance.', show: 'q.answer' },
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
            'A **physical change** makes no new substance.',
            'A **chemical change** makes new substances.',
            'Ask: has a new substance been made?',
            'Physical changes are usually reversible; chemical ones are not.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A physical change makes no new substance, like melting, dissolving or breaking.', show: 'sum.0' },
        { say: 'A chemical change makes new substances, like burning, rusting or cooking.', show: 'sum.1' },
        { say: 'To decide, ask whether a new substance has been made.', show: 'sum.2' },
        { say: 'And most physical changes are easily reversed, while most chemical changes are not. Next, you will learn the signs that a reaction has happened.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
