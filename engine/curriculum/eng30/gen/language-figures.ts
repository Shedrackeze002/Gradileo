/**
 * Grade 12 English, lesson 7.4: Rhetorical Figures (12-G1). Chiasmus, zeugma, litotes, synecdoche,
 * metonymy, apostrophe, paradox, oxymoron and hyperbaton, in sentences written for Gradileo and in
 * public-domain quotations, and the effect of each. Some figures shade into one another (synecdoche
 * and metonymy, paradox and oxymoron), and some examples show two at once, so each example lists the
 * figures it also shows and those are never offered as wrong answers. Personification, which an
 * apostrophe so often brings with it, is never offered at all.
 */
import { mc, part, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { block, fill, pair } from '../../eng10/gen/common.ts';
import {
  ALMIGHTY, BREAD, CRUEL, DONNE, DOUGLASS, FAIR_FOUL, HEAVY_LIGHTNESS, MEAN_CITY, PICKWICK, POPE_STAIN, POPE_TEA, SABBATH, SILVER_GOLD, STING, SWEET_SORROW, SWORD, URN,
  quoteBlock, type Quote,
} from './language-quotes.ts';

const LESSON = 'e12-7-4';
const OUTCOMES = ['12-G1'];

type Figure = 'chiasmus' | 'zeugma' | 'litotes' | 'synecdoche' | 'metonymy' | 'apostrophe' | 'paradox' | 'oxymoron' | 'hyperbaton';
const FIGURES: Figure[] = ['chiasmus', 'zeugma', 'litotes', 'synecdoche', 'metonymy', 'apostrophe', 'paradox', 'oxymoron', 'hyperbaton'];
/** Figures that shade into each other: never offered against each other. */
const NEAR: Partial<Record<Figure, Figure[]>> = {
  synecdoche: ['metonymy'],
  metonymy: ['synecdoche'],
  paradox: ['oxymoron'],
  oxymoron: ['paradox'],
};

const NAME: Record<Figure, string> = {
  chiasmus: 'Chiasmus',
  zeugma: 'Zeugma',
  litotes: 'Litotes',
  synecdoche: 'Synecdoche',
  metonymy: 'Metonymy',
  apostrophe: 'Apostrophe',
  paradox: 'Paradox',
  oxymoron: 'Oxymoron',
  hyperbaton: 'Hyperbaton',
};
const DEF: Record<Figure, string> = {
  chiasmus: 'two phrases in which the key words of the first come back in reverse order in the second',
  zeugma: 'one word, usually a verb, governing two others in two different senses at once',
  litotes: 'understatement that affirms something by denying its opposite',
  synecdoche: 'a part used to stand for the whole, or the whole for a part',
  metonymy: 'a thing named by something closely associated with it',
  apostrophe: 'a direct address to someone absent or dead, or to a thing or an idea',
  paradox: 'a statement that seems to contradict itself yet expresses a truth',
  oxymoron: 'two contradictory words placed side by side',
  hyperbaton: 'words placed out of their usual order for emphasis',
};
/** The usual effect of each figure, written to similar lengths so that no choice stands out. */
const EFFECT: Record<Figure, string> = {
  chiasmus: 'Reversing the words makes the idea turn back on itself, so it feels complete and memorable.',
  zeugma: 'Yoking two senses to one word surprises the reader and often deflates the grander of the two.',
  litotes: 'Denying the opposite makes the point quietly, with modesty, irony or a restrained force.',
  synecdoche: 'Naming one vivid part fixes attention on what matters most about the whole it stands for.',
  metonymy: 'Naming a closely linked thing turns a large or abstract idea into something concrete.',
  apostrophe: 'Speaking straight to something that cannot answer makes the speaker’s feeling urgent and intense.',
  paradox: 'The apparent contradiction makes the reader pause and work out the deeper truth inside it.',
  oxymoron: 'Pressing two opposite words together captures a mixed or conflicted feeling in a few words.',
  hyperbaton: 'Moving words out of their usual order throws weight on them and gives the line a lofty sound.',
};

interface Example {
  figure: Figure;
  text: string;
  also?: Figure[];
}
const E = (figure: Figure, text: string, also: Figure[] = []): Example => ({ figure, text, also });

/** Sentences written for Gradileo; NAME and {his} are filled in. */
const EXAMPLES: Example[] = [
  E('chiasmus', 'We should eat to live, not live to eat.'),
  E('chiasmus', 'Do not let your phone control your day; let your day control your phone.'),
  E('chiasmus', 'Some people live to work; others work to live.'),
  E('chiasmus', 'It is not the size of the dog in the fight; it is the size of the fight in the dog.'),
  E('zeugma', 'NAME lost {his} keys and {his} temper on the same morning.'),
  E('zeugma', 'NAME broke the vase and {his} grandmother’s heart.'),
  E('zeugma', 'The burglar took the silver and his leave before dawn.'),
  E('zeugma', 'NAME caught the last train home and a terrible cold.'),
  E('litotes', 'The final exam was not exactly easy.'),
  E('litotes', 'NAME is no stranger to hard work.'),
  E('litotes', 'Climbing the mountain in winter was no small achievement.'),
  E('litotes', 'The view from the summit was not unpleasant.'),
  E('synecdoche', 'The captain called for all hands on deck.'),
  E('synecdoche', 'NAME finally saved enough for {his} own set of wheels.'),
  E('synecdoche', 'There are fifty head of cattle grazing in the far field.'),
  E('synecdoche', 'The farm hired twenty new hands for the harvest.'),
  E('metonymy', 'The Crown has given its approval to the new law.'),
  E('metonymy', 'NAME has read all of Dickens over the summer.'),
  E('metonymy', 'The palace refused to comment on the rumours.'),
  E('metonymy', 'The whole stadium rose to its feet when the goal went in.', ['synecdoche']),
  E('apostrophe', 'O stubborn printer, why do you jam only when I am late?'),
  E('apostrophe', 'Moon, you have watched this valley for a million years: what have you seen?'),
  E('apostrophe', 'Grandfather, if you could see this garden now, you would be proud of it.'),
  E('apostrophe', 'Sleep, where have you gone on the night before my exam?'),
  E('paradox', 'The more I learn, the less I seem to know.'),
  E('paradox', 'Sometimes you have to lose a battle to win the war.'),
  E('paradox', 'NAME’s greatest strength turned out to be admitting {his} weaknesses.'),
  E('paradox', 'Less is more.'),
  E('oxymoron', 'The library fell into a deafening silence.'),
  E('oxymoron', 'NAME’s retirement was an open secret in the staff room.'),
  E('oxymoron', 'Winning the final was a bittersweet victory for the injured captain.'),
  E('oxymoron', 'NAME felt a cold fire of anger rising in {his} chest.'),
  E('hyperbaton', 'Of courage NAME had plenty, but of patience, none.'),
  E('hyperbaton', 'Strange it seemed, that silence after the storm.'),
  E('hyperbaton', 'Gone forever is the old bridge we crossed as children.'),
  E('hyperbaton', 'Into the dark water plunged NAME without a word.'),
];

const QUOTED: Array<{ quote: Quote; figure: Figure; also: Figure[]; why: string }> = [
  { quote: FAIR_FOUL, figure: 'chiasmus', also: ['paradox', 'oxymoron'], why: '“Fair … foul” returns as “foul … fair”: the reversal mirrors the witches’ world, where every value is turned upside down.' },
  { quote: DOUGLASS, figure: 'chiasmus', also: [], why: '“A man was made a slave” is reversed as “a slave was made a man”: the turn of the words marks the turn of Douglass’s life.' },
  { quote: SABBATH, figure: 'chiasmus', also: [], why: '“The sabbath … for man” is reversed as “not man for the sabbath”, so the rule is shown to serve people, not rule them.' },
  { quote: POPE_TEA, figure: 'zeugma', also: [], why: '“Take” governs both “counsel” and “tea”, so a queen’s grave business of state sits beside a teatime habit, and the grandeur deflates.' },
  { quote: POPE_STAIN, figure: 'zeugma', also: [], why: '“Stain” governs both her honour and her dress, so a moral disaster and a ruined gown are treated as equal: a joke at the expense of fashionable society.' },
  { quote: PICKWICK, figure: 'zeugma', also: [], why: '“In” covers both a flood of tears and a sedan-chair, an emotion and a vehicle, so the comedy undercuts Miss Bolo’s distress.' },
  { quote: MEAN_CITY, figure: 'litotes', also: [], why: '“No mean city” denies the opposite to say that Tarsus was an important, distinguished city, which modestly raises Paul’s standing.' },
  { quote: BREAD, figure: 'synecdoche', also: ['metonymy'], why: '“Bread”, one kind of food, stands for all the food and everything a person needs to live each day.' },
  { quote: SWORD, figure: 'metonymy', also: ['synecdoche'], why: '“The sword”, a weapon, stands for the violence and killing that will follow the family.' },
  { quote: STING, figure: 'apostrophe', also: [], why: 'The speaker addresses death and the grave directly, as if they could answer, and mocks their lost power.' },
  { quote: URN, figure: 'apostrophe', also: [], why: 'Keats speaks directly to the urn, as “thou”, though it cannot hear him, which makes his wonder at it personal and intense.' },
  { quote: DONNE, figure: 'paradox', also: ['apostrophe', 'oxymoron'], why: '“Death, thou shalt die” seems impossible, but in the poem’s faith, death ends when the soul wakes to eternal life.' },
  { quote: CRUEL, figure: 'paradox', also: ['oxymoron'], why: 'Cruelty and kindness seem opposed, but Hamlet means that his harsh words to his mother are meant to save her.' },
  { quote: HEAVY_LIGHTNESS, figure: 'oxymoron', also: ['paradox', 'apostrophe'], why: '“Heavy lightness” and “serious vanity” press opposites together, which shows how confused and torn Romeo feels.' },
  { quote: SWEET_SORROW, figure: 'oxymoron', also: ['paradox'], why: '“Sweet sorrow” joins opposites: parting hurts, yet it is sweet because it means they will long to meet again.' },
  { quote: ALMIGHTY, figure: 'hyperbaton', also: [], why: 'The object “Him” comes first, before the subject and verb, so Satan is named first and the fall seems to happen to him.' },
  { quote: SILVER_GOLD, figure: 'hyperbaton', also: [], why: 'The usual order would be “I have no silver and gold”; putting the riches first makes their absence striking.' },
];

const othersFor = (key: Figure, also: Figure[], rng: Rng, n = 3): Figure[] =>
  rng.shuffle(FIGURES.filter((x) => x !== key && !also.includes(x) && !(NEAR[key] ?? []).includes(x))).slice(0, n);

function figures(rng: Rng, d: Difficulty): GenOutput {
  const cast = pair(rng);
  const f = (s: string) => fill(s, cast);
  if (d === 1) {
    if (rng.chance(0.35)) {
      const fig = rng.pick(FIGURES);
      return {
        prompt: `Which figure of speech is ${DEF[fig]}?`,
        parts: [part(mc(rng, NAME[fig], othersFor(fig, [], rng).map((o) => NAME[o])))],
        hints: ['Chiasmus reverses; zeugma yokes; litotes denies the opposite; synecdoche uses a part; metonymy uses something associated; apostrophe speaks to the absent; paradox and oxymoron join opposites.'],
        solution: [`${NAME[fig]}: ${DEF[fig]}.`],
      };
    }
    const ex = rng.pick(EXAMPLES);
    return {
      prompt: `Which figure of speech does this sentence use?\n\n${block(f(ex.text))}`,
      parts: [part(mc(rng, NAME[ex.figure], othersFor(ex.figure, ex.also ?? [], rng).map((o) => NAME[o])))],
      hints: ['Look for words repeated in reverse, one word doing two jobs, a denied opposite, a part or a related thing standing in for something, a direct address, or opposites joined together.'],
      solution: [`${NAME[ex.figure]}: ${DEF[ex.figure]}.`],
    };
  }
  if (d === 2) {
    const it = rng.pick(QUOTED);
    return {
      prompt: `From ${it.quote.source}:\n\n${quoteBlock(it.quote)}\n\nWhich figure of speech does this passage use most clearly?`,
      parts: [part(mc(rng, NAME[it.figure], othersFor(it.figure, it.also, rng).map((o) => NAME[o])))],
      hints: ['Ask what is unusual about the words: their order, their meaning, or who is being spoken to.'],
      solution: [`${NAME[it.figure]}: ${DEF[it.figure]}.`, it.why],
    };
  }
  const mode = rng.pick(['effect', 'which', 'effect'] as const);
  if (mode === 'effect') {
    const it = rng.pick(QUOTED);
    return {
      prompt: `From ${it.quote.source}:\n\n${quoteBlock(it.quote)}\n\nThe passage uses **${NAME[it.figure].toLowerCase()}**. What is its main effect?`,
      parts: [part(mc(rng, EFFECT[it.figure], othersFor(it.figure, it.also, rng).map((o) => EFFECT[o])))],
      hints: [`${NAME[it.figure]} is ${DEF[it.figure]}. How does that shape what the passage makes the reader feel or notice?`],
      solution: [EFFECT[it.figure], it.why],
    };
  }
  const want = rng.pick(FIGURES);
  const right = rng.pick(EXAMPLES.filter((e) => e.figure === want));
  const pool = EXAMPLES.filter((e) => e.figure !== want && !(right.also ?? []).includes(e.figure) && !(NEAR[want] ?? []).includes(e.figure) && !(e.also ?? []).includes(want));
  const others = rng.shuffle(pool).filter((e, i, arr) => arr.findIndex((x) => x.figure === e.figure) === i).slice(0, 3);
  return {
    prompt: `Which sentence uses **${NAME[want].toLowerCase()}**, ${DEF[want]}?`,
    parts: [part(mc(rng, f(right.text), others.map((o) => f(o.text))))],
    hints: ['Test each sentence against the definition, one at a time.'],
    solution: [`“${f(right.text)}” uses ${NAME[want].toLowerCase()}.`, `The others use ${others.map((o) => NAME[o.figure].toLowerCase()).join(', ')}.`],
  };
}

export const FIGURE_SKILLS: SkillDef[] = [
  skill({
    id: 'e12-figures',
    name: 'Rhetorical figures',
    description: 'Recognize chiasmus, zeugma, litotes, synecdoche, metonymy, apostrophe, paradox, oxymoron and hyperbaton, and explain the effect of each.',
    outcomes: OUTCOMES,
    lessonId: LESSON,
    format: 'mc',
    gen: figures,
  }),
];
