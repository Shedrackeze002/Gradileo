/** Grade 12 English, Unit 7: Language (12-G1, 12-G2). */
import type { SkillDef } from '../../../types.ts';
import { FIGURE_SKILLS } from './language-figures.ts';
import { GRAMMAR_SKILLS } from './language-grammar.ts';
import { REGISTER_SKILLS } from './language-register.ts';
import { SYNTAX_SKILLS } from './language-syntax.ts';
import { WORD_SKILLS } from './language-words.ts';

export const LANGUAGE_SKILLS: SkillDef[] = [...SYNTAX_SKILLS, ...GRAMMAR_SKILLS, ...REGISTER_SKILLS, ...FIGURE_SKILLS, ...WORD_SKILLS];
