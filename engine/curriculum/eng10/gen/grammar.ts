/** Grade 10 English, Unit 7: Grammar and Language (10-G1, 10-G2, 10-G3). */
import type { SkillDef } from '../../../types.ts';
import { AGREEMENT_SKILLS } from './grammar-agreement.ts';
import { MODIFIER_SKILLS } from './grammar-modifiers.ts';
import { PUNCTUATION_SKILLS } from './grammar-punctuation.ts';
import { SENTENCE_SKILLS } from './grammar-sentences.ts';
import { WORD_SKILLS } from './grammar-words.ts';

export const GRAMMAR_SKILLS: SkillDef[] = [...SENTENCE_SKILLS, ...PUNCTUATION_SKILLS, ...AGREEMENT_SKILLS, ...MODIFIER_SKILLS, ...WORD_SKILLS];
