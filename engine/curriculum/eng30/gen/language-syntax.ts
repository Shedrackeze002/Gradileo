/**
 * Grade 12 English, lesson 7.1: Syntax for Effect (12-G1). Periodic and loose sentences, inversion,
 * asyndeton, polysyndeton, parallelism and antithesis: naming each in sentences written for Gradileo
 * and in public-domain quotations, and explaining its effect. Many examples show more than one device
 * (antithesis is nearly always parallel; a list without conjunctions is often parallel too), so each
 * example lists the devices it also shows, and those are never offered as wrong answers.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, people } from '../../eng10/gen/common.ts';
import { ALMIGHTY, CAESAR_ROME, HEAL, MALICE, MEEK, RAIN, SEASON, TWO_CITIES, quoteBlock, type Quote } from './language-quotes.ts';

const LESSON = 'e12-7-1';
const OUTCOMES = ['12-G1'];

type Device = 'periodic' | 'loose' | 'inversion' | 'asyndeton' | 'polysyndeton' | 'parallelism' | 'antithesis';
const DEVICES: Device[] = ['periodic', 'loose', 'inversion', 'asyndeton', 'polysyndeton', 'parallelism', 'antithesis'];

const NAME: Record<Device, string> = {
  periodic: 'Periodic sentence',
  loose: 'Loose sentence',
  inversion: 'Inversion',
  asyndeton: 'Asyndeton',
  polysyndeton: 'Polysyndeton',
  parallelism: 'Parallelism',
  antithesis: 'Antithesis',
};
const DEF: Record<Device, string> = {
  periodic: 'a sentence that holds its main clause back until the end',
  loose: 'a sentence that states its main clause first and then adds detail',
  inversion: 'a reversal of the usual word order, such as a verb placed before its subject',
  asyndeton: 'a series with the joining conjunctions left out',
  polysyndeton: 'a series that repeats a conjunction, usually “and”, between every item',
  parallelism: 'a series of words, phrases or clauses written in the same grammatical form',
  antithesis: 'opposite ideas set side by side in a balanced, parallel form',
};
/** The usual effect of each device, written to similar lengths so that no choice stands out. */
const EFFECT: Record<Device, string> = {
  periodic: 'It builds suspense by holding back the main point until the very end of the sentence.',
  loose: 'It gives the main point at once, then adds details the way a speaker naturally would.',
  inversion: 'It moves a key word out of its usual place, giving it weight and a formal, elevated sound.',
  asyndeton: 'It drops the joining words, so the items rush past quickly, urgently, one after another.',
  polysyndeton: 'It repeats “and” between the items, slowing the list so that each one feels heavy.',
  parallelism: 'It puts the items in the same form, giving them balance and making them easy to remember.',
  antithesis: 'It sets opposites side by side in balanced form, so the contrast between them is sharpened.',
};

interface Example {
  device: Device;
  text: string;
  /** Devices the example also shows: never offered as wrong answers. */
  also?: Device[];
}
const E = (device: Device, text: string, also: Device[] = []): Example => ({ device, text, also });

/** Sentences written for Gradileo; NAME is filled in with a name. Periodic and loose versions come in pairs. */
const EXAMPLES: Example[] = [
  E('periodic', 'Although the storm had torn off the roof and the river had swallowed the road, the old school opened on Monday.', ['parallelism']),
  E('periodic', 'Through the snow, past the frozen lake and over the last ridge, NAME finally reached the cabin.', ['parallelism']),
  E('periodic', 'If the bridge holds, if the rain stops and if the driver knows the way, we will reach the city by dawn.', ['parallelism']),
  E('periodic', 'After weeks of rehearsal, three missed buses and one broken violin string, NAME walked onto the stage.', ['parallelism']),
  E('loose', 'The old school opened on Monday, although the storm had torn off the roof and the river had swallowed the road.', ['parallelism']),
  E('loose', 'NAME finally reached the cabin, cold and hungry, after a long day of climbing through the snow.', ['parallelism']),
  E('loose', 'We will reach the city by dawn if the bridge holds, if the rain stops and if the driver knows the way.', ['parallelism']),
  E('loose', 'NAME walked onto the stage after weeks of rehearsal, three missed buses and one broken violin string.', ['parallelism']),
  E('inversion', 'Never had the village seen such a flood.'),
  E('inversion', 'Down the hill rolled the empty cart.'),
  E('inversion', 'Gone were the long, easy summers of NAME’s childhood.'),
  E('inversion', 'Only after the results arrived did NAME begin to relax.'),
  E('inversion', 'Rarely does the river freeze so early in the year.'),
  E('asyndeton', 'Bread, cheese, olives, figs covered the long wooden table.', ['parallelism']),
  E('asyndeton', 'NAME read the letter, folded it, burned it.', ['parallelism']),
  E('asyndeton', 'The crowd pushed, shouted, surged toward the gate.', ['parallelism']),
  E('asyndeton', 'They came from cities, villages, farms, islands.', ['parallelism']),
  E('polysyndeton', 'We ran and we laughed and we shouted and we wished the summer would never end.', ['parallelism']),
  E('polysyndeton', 'The kitchen was full of flour and eggs and butter and sugar and noise.', ['parallelism']),
  E('polysyndeton', 'The rain fell on the roofs and the roads and the fields and the river.', ['parallelism']),
  E('parallelism', 'NAME likes reading poems, writing stories and acting in plays.'),
  E('parallelism', 'The coach asked the players to train harder, to eat better and to sleep longer.'),
  E('parallelism', 'The plan was simple to explain, cheap to build and easy to repair.'),
  E('parallelism', 'The new library is bright, quiet and open until midnight.'),
  E('antithesis', 'Speech is silver, but silence is golden.', ['parallelism']),
  E('antithesis', 'The rich grow richer while the poor grow poorer.', ['parallelism']),
  E('antithesis', 'NAME praises the plan in public and attacks it in private.', ['parallelism']),
  E('antithesis', 'It is easy to make a promise and hard to keep one.', ['parallelism']),
];

/** Public-domain quotations, each with the device it shows most clearly. */
const QUOTED: Array<{ quote: Quote; device: Device; also: Device[]; why: string }> = [
  { quote: TWO_CITIES, device: 'antithesis', also: ['parallelism', 'asyndeton'], why: 'Dickens pairs opposites, best and worst, wisdom and foolishness, in matching clauses, so the contradictions of the age stand out.' },
  { quote: CAESAR_ROME, device: 'antithesis', also: ['parallelism'], why: 'Brutus balances “loved Caesar less” against “loved Rome more”: the opposites make his choice sound reasoned rather than cruel.' },
  { quote: SEASON, device: 'antithesis', also: ['parallelism', 'polysyndeton'], why: 'Each pair sets opposites side by side, born and die, plant and pluck up, to show that life holds both.' },
  { quote: RAIN, device: 'polysyndeton', also: ['parallelism'], why: 'The repeated “and” piles one blow on another, so the storm feels long and relentless before the house stands firm.' },
  { quote: MEEK, device: 'inversion', also: [], why: 'The usual order would be “the meek are blessed”; putting “Blessed” first gives the surprising blessing all the weight.' },
  { quote: ALMIGHTY, device: 'inversion', also: [], why: 'The object, “Him”, comes before the subject and verb, so Satan is named first and the fall seems to happen to him.' },
  { quote: HEAL, device: 'asyndeton', also: ['parallelism'], why: 'With no “and” between the commands, they come one after another like an urgent list of tasks.' },
  { quote: MALICE, device: 'parallelism', also: ['asyndeton', 'antithesis'], why: 'Three phrases in the same form, “with … toward none; with … for all; with …”, give the speech a calm, balanced weight.' },
];

const choicesFor = (key: Device, also: Device[], rng: Rng, n = 3): Device[] => rng.shuffle(DEVICES.filter((d) => d !== key && !also.includes(d))).slice(0, n);
/** A long quoted sentence can always be argued to be loose or periodic, so those labels are never offered for quotations. */
const SHAPES: Device[] = ['loose', 'periodic'];

function syntaxDevices(rng: Rng, d: Difficulty): GenOutput {
  const cast = people(rng, 1);
  const f = (s: string) => fill(s, cast);
  if (d === 1) {
    if (rng.chance(0.35)) {
      const dev = rng.pick(DEVICES);
      const others = choicesFor(dev, [], rng);
      return {
        prompt: `Which device is ${DEF[dev]}?`,
        parts: [part(mc(rng, NAME[dev], others.map((o) => NAME[o])))],
        hints: ['A periodic sentence saves its main clause for the end; a loose one starts with it. Asyndeton drops “and”; polysyndeton repeats it.'],
        solution: [`${NAME[dev]}: ${DEF[dev]}.`],
      };
    }
    const ex = rng.pick(EXAMPLES);
    const others = choicesFor(ex.device, ex.also ?? [], rng);
    return {
      prompt: `Which device does this sentence use?\n\n${block(f(ex.text))}`,
      parts: [part(mc(rng, NAME[ex.device], others.map((o) => NAME[o])))],
      hints: ['Look at the order of the clauses, at the joining words between items, and at whether ideas are set against each other.'],
      solution: [`${NAME[ex.device]}: ${DEF[ex.device]}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.6)) {
      const it = rng.pick(QUOTED);
      const others = choicesFor(it.device, [...it.also, ...SHAPES], rng);
      return {
        prompt: `From ${it.quote.source}:\n\n${quoteBlock(it.quote)}\n\nWhich device does this passage use most clearly?`,
        parts: [part(mc(rng, NAME[it.device], others.map((o) => NAME[o])))],
        hints: ['Ask what is unusual about the sentence’s shape: its word order, its joining words, or the ideas it sets side by side.'],
        solution: [`${NAME[it.device]}: ${DEF[it.device]}.`, it.why],
      };
    }
    const ex = rng.pick(EXAMPLES.filter((e) => e.device !== 'loose'));
    const others = choicesFor(ex.device, ex.also ?? [], rng);
    return {
      prompt: `${block(f(ex.text))}\n\nThis sentence uses **${NAME[ex.device].toLowerCase()}**. What is its main effect?`,
      parts: [part(mc(rng, EFFECT[ex.device], others.map((o) => EFFECT[o])))],
      hints: [`Remember what ${NAME[ex.device].toLowerCase()} is: ${DEF[ex.device]}. Then ask how that changes the way the sentence reads.`],
      solution: [EFFECT[ex.device]],
    };
  }
  // Difficulty 3.
  const mode = rng.pick(['periodic', 'quoteEffect', 'which'] as const);
  if (mode === 'periodic') {
    const k = rng.int(0, 3);
    const periodic = EXAMPLES.filter((e) => e.device === 'periodic')[k];
    const loose = EXAMPLES.filter((e) => e.device === 'loose')[k];
    const want = rng.pick(['periodic', 'loose'] as const);
    const right = want === 'periodic' ? periodic : loose;
    const wrong = want === 'periodic' ? loose : periodic;
    return {
      prompt: `Which version is a **${want} sentence**, ${want === 'periodic' ? 'holding the main clause back until the end' : 'stating the main clause first and then adding detail'}?`,
      parts: [part(mc(rng, f(right.text), [f(wrong.text)]))],
      hints: ['Find the main clause, the part that could stand alone as a sentence, and see where it falls.'],
      solution: [`“${f(right.text)}” is ${want}: its main clause comes ${want === 'periodic' ? 'last, after the details that lead up to it' : 'first, before the details that follow'}.`],
    };
  }
  if (mode === 'quoteEffect') {
    const it = rng.pick(QUOTED);
    const others = choicesFor(it.device, [...it.also, ...SHAPES], rng);
    return {
      prompt: `From ${it.quote.source}:\n\n${quoteBlock(it.quote)}\n\nThe passage uses **${NAME[it.device].toLowerCase()}**. What is its main effect?`,
      parts: [part(mc(rng, EFFECT[it.device], others.map((o) => EFFECT[o])))],
      hints: [`${NAME[it.device]} is ${DEF[it.device]}. How does that shape the way the passage reads?`],
      solution: [EFFECT[it.device], it.why],
    };
  }
  // Nearly any list is parallel, so parallelism is never the one to find among other sentences.
  const want = rng.pick(['inversion', 'asyndeton', 'polysyndeton', 'antithesis'] as const);
  const right = rng.pick(EXAMPLES.filter((e) => e.device === want));
  const others = rng
    .shuffle(EXAMPLES.filter((e) => e.device !== want && e.device !== 'periodic' && e.device !== 'loose' && !(right.also ?? []).includes(e.device) && !(e.also ?? []).includes(want)))
    .filter((e, i, arr) => arr.findIndex((x) => x.device === e.device) === i)
    .slice(0, 3);
  return {
    prompt: `Which sentence uses **${NAME[want].toLowerCase()}**, ${DEF[want]}?`,
    parts: [part(mc(rng, f(right.text), others.map((o) => f(o.text))))],
    hints: ['Test each sentence against the definition: look at its word order, its joining words and whether it sets opposites side by side.'],
    solution: [`“${f(right.text)}” uses ${NAME[want].toLowerCase()}.`, `The others show ${others.map((o) => NAME[o.device].toLowerCase()).join(', ')}.`],
  };
}

export const SYNTAX_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-syntax-devices',
    name: 'Syntax for effect',
    description: 'Recognize periodic and loose sentences, inversion, asyndeton, polysyndeton, parallelism and antithesis, and explain the effect of each.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: syntaxDevices,
  }),
];
