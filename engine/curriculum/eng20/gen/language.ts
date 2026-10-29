/** Grade 11 English, Unit 7: Language (11-G1, 11-G2, 11-G3). */
import type { SkillDef } from '../../../types.ts';
import { CLAUSE_SKILLS } from './language-clauses.ts';
import { PUNCTUATION_SKILLS } from './language-punctuation.ts';
import { USAGE_SKILLS } from './language-usage.ts';
import { VOICE_SKILLS } from './language-voice.ts';
import { WORD_SKILLS } from './language-words.ts';

export const LANGUAGE_SKILLS: SkillDef[] = [...CLAUSE_SKILLS, ...PUNCTUATION_SKILLS, ...VOICE_SKILLS, ...USAGE_SKILLS, ...WORD_SKILLS];
