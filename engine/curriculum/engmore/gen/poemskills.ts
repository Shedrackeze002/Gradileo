/**
 * More English Topics, Units 8 and 9: the AQA GCSE poetry anthology, Power and Conflict and Love and
 * Relationships. Each cluster has three lessons: two on its poems in the public domain (three poems
 * each, quoted from the editions their files name), and one on its poems still in copyright, which
 * are described in our own words and never quoted.
 */
import type { SkillDef } from '../../../types.ts';
import { compare, formOf, poemContext, poemReading, poemSkill, poemTheme, poetOf, quoteFrom, whichPoem, type PoemSet } from './poetry.ts';
import { EXPOSURE, LAST_DUCHESS, LIGHT_BRIGADE, LONDON, OZYMANDIAS, POWER_MODERN, POWER_POEMS, PRELUDE } from './poems/power.ts';
import { FARMERS_BRIDE, LOVE_MODERN, LOVE_POEMS, LOVES_PHILOSOPHY, NEUTRAL_TONES, PORPHYRIA, SONNET_29, WE_TWO_PARTED } from './poems/love.ts';

const power = (poems: PoemSet['poems']): PoemSet => ({ poems, cluster: POWER_POEMS, name: 'Power and Conflict' });
const love = (poems: PoemSet['poems']): PoemSet => ({ poems, cluster: LOVE_POEMS, name: 'Love and Relationships' });

/** Each lesson's poems, the key for its skill ids, and whether its poems are quoted. */
export const POEM_LESSONS: Array<{ key: string; lessonId: string; set: PoemSet; quoted: boolean; outcomes: [string, string] }> = [
  { key: 'power-1', lessonId: 'ex-8-1', set: power([OZYMANDIAS, LONDON, PRELUDE]), quoted: true, outcomes: ['LP1', 'LP2'] },
  { key: 'power-2', lessonId: 'ex-8-2', set: power([LAST_DUCHESS, LIGHT_BRIGADE, EXPOSURE]), quoted: true, outcomes: ['LP1', 'LP2'] },
  { key: 'power-3', lessonId: 'ex-8-3', set: power(POWER_MODERN), quoted: false, outcomes: ['LP1', 'LP2'] },
  { key: 'love-1', lessonId: 'ex-9-1', set: love([WE_TWO_PARTED, LOVES_PHILOSOPHY, PORPHYRIA]), quoted: true, outcomes: ['LP1', 'LP2'] },
  { key: 'love-2', lessonId: 'ex-9-2', set: love([SONNET_29, NEUTRAL_TONES, FARMERS_BRIDE]), quoted: true, outcomes: ['LP1', 'LP2'] },
  { key: 'love-3', lessonId: 'ex-9-3', set: love(LOVE_MODERN), quoted: false, outcomes: ['LP1', 'LP2'] },
];

/** “Ozymandias, London and Extract from The Prelude”, or “the modern Power and Conflict poems”. */
const named = (set: PoemSet, quoted: boolean) => {
  if (!quoted) return `the more recent ${set.name} poems`;
  const t = set.poems.map((p) => p.title);
  return `${t.slice(0, -1).join(', ')} and ${t[t.length - 1]}`;
};

export const POEM_SKILLS: SkillDef[] = POEM_LESSONS.flatMap(({ key, lessonId, set, quoted, outcomes: [o1, o2] }) => {
  const n = named(set, quoted);
  return quoted
    ? [
        poemSkill(set, `ex-${key}-poems`, `${set.name}: ${n}`,
          `What ${n} are about, which poem key lines come from, and the best reading of them.`, [o1], lessonId, [whichPoem, quoteFrom, poemReading]),
        poemSkill(set, `ex-${key}-themes`, `${set.name}: themes and context of ${n}`,
          `The themes key lines from ${n} show, the other ${set.name} poems that share them, and the poems’ context and the poets’ methods.`, [o2], lessonId, [poemTheme, compare, poemContext]),
      ]
    : [
        poemSkill(set, `ex-${key}-poems`, `${set.name}: the poets and poems`,
          `Who wrote each of ${n}, what each is about, and which poems share a theme.`, [o1], lessonId, [poetOf, whichPoem, compare]),
        poemSkill(set, `ex-${key}-methods`, `${set.name}: form, meaning and context`,
          `The form of each of ${n}, the best reading of its key moments, and its context and the poet’s methods.`, [o2], lessonId, [formOf, poemReading, poemContext]),
      ];
});
