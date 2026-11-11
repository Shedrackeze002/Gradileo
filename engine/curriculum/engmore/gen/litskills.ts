/**
 * More English Topics, Units 5 to 7: the GCSE English Literature set texts. Each text has one lesson
 * with two skills: its characters and plot (who is who, the order of events, who says what), and its
 * quotations, themes and context (the theme a quotation shows, the best reading of it, and the
 * text's context and the writer's methods).
 */
import type { SkillDef } from '../../../types.ts';
import { contextQ, litSkill, order, readingOf, themeOf, whoIs, whoSays, type LitText } from './literature.ts';
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
