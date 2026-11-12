/**
 * More English Topics, Units 5 to 7 and 10: the GCSE English Literature set texts. Each text has one
 * lesson with two skills: its characters and plot (who is who, the order of events, who says what),
 * and its quotations, themes and context (the theme a quotation shows, the best reading of it, and
 * the text's context and the writer's methods). The modern texts of Unit 10 are still in copyright,
 * so their skills ask about key moments told in our own words, and never quote them.
 */
import type { SkillDef } from '../../../types.ts';
import { contextQ, litSkill, momentReading, momentTheme, order, readingOf, themeOf, whereIs, whoIs, whoSays, type LitText } from './literature.ts';
import { CAROL } from './lit/carol.ts';
import { JEKYLL } from './lit/jekyll.ts';
import { EXPECTATIONS } from './lit/expectations.ts';
import { FRANKENSTEIN } from './lit/frankenstein.ts';
import { JANE_EYRE } from './lit/janeeyre.ts';
import { PRIDE } from './lit/pride.ts';
import { SIGN_OF_FOUR } from './lit/signoffour.ts';
import { MUCH_ADO } from './lit/muchado.ts';
import { MERCHANT } from './lit/merchant.ts';
import { CAESAR } from './lit/caesar.ts';
import { ANIMAL_FARM, BLOOD_BROTHERS, INSPECTOR, LORD_FLIES } from './lit/modern.ts';

/** Each set text with its key (for skill ids), its lesson, and whether it is a play. */
export const SET_TEXTS: Array<{ key: string; lessonId: string; text: LitText; play: boolean }> = [
  { key: 'carol', lessonId: 'ex-5-1', text: CAROL, play: false },
  { key: 'jekyll', lessonId: 'ex-5-2', text: JEKYLL, play: false },
  { key: 'expectations', lessonId: 'ex-5-3', text: EXPECTATIONS, play: false },
  { key: 'frankenstein', lessonId: 'ex-6-1', text: FRANKENSTEIN, play: false },
  { key: 'jane-eyre', lessonId: 'ex-6-2', text: JANE_EYRE, play: false },
  { key: 'pride', lessonId: 'ex-6-3', text: PRIDE, play: false },
  { key: 'sign-of-four', lessonId: 'ex-6-4', text: SIGN_OF_FOUR, play: false },
  { key: 'much-ado', lessonId: 'ex-7-1', text: MUCH_ADO, play: true },
  { key: 'merchant', lessonId: 'ex-7-2', text: MERCHANT, play: true },
  { key: 'caesar', lessonId: 'ex-7-3', text: CAESAR, play: true },
];

const plain = (title: string) => title.replace(/^The Strange Case of /, '');

export const LITERATURE_SKILLS: SkillDef[] = SET_TEXTS.flatMap(({ key, lessonId, text, play }) => {
  const [o1, o2] = play ? ['LS1', 'LS2'] : ['LN1', 'LN2'];
  const t = plain(text.title);
  return [
    litSkill(text, `ex-${key}-plot`, `${t}: characters and plot`,
      `Who the characters of ${t} are, the order of its main events, and who says its key lines.`, [o1], lessonId, [whoIs, order, whoSays]),
    litSkill(text, `ex-${key}-themes`, `${t}: quotations, themes and context`,
      `The themes key quotations from ${t} show, the best reading of each, and the text’s context and the writer’s methods.`, [o2], lessonId, [themeOf, readingOf, contextQ]),
  ];
});

/** The modern texts, each with its key (for skill ids), its lesson, and whether it is a play. */
export const MODERN_SET: Array<{ key: string; lessonId: string; text: LitText; play: boolean }> = [
  { key: 'inspector', lessonId: 'ex-10-1', text: INSPECTOR, play: true },
  { key: 'blood-brothers', lessonId: 'ex-10-2', text: BLOOD_BROTHERS, play: true },
  { key: 'lord-of-the-flies', lessonId: 'ex-10-3', text: LORD_FLIES, play: false },
  { key: 'animal-farm', lessonId: 'ex-10-4', text: ANIMAL_FARM, play: false },
];

export const MODERN_SKILLS: SkillDef[] = MODERN_SET.flatMap(({ key, lessonId, text, play }) => [
  // A play has too few acts for a question on where an event happens.
  litSkill(text, `ex-${key}-plot`, `${text.title}: characters and plot`,
    `Who the characters of ${text.title} are, the order of its main events${play ? '' : ', and the chapter each happens in'}.`, ['LM1'], lessonId, [whoIs, order, play ? order : whereIs]),
  litSkill(text, `ex-${key}-themes`, `${text.title}: key moments, themes and context`,
    `The themes key moments of ${text.title} show, the best reading of each, and the text’s context and the writer’s methods.`, ['LM2'], lessonId, [momentTheme, momentReading, contextQ]),
]);
