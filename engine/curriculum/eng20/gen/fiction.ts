/** Grade 11 English, Unit 1: Fiction (11-A1, 11-A2). */
import type { SkillDef } from '../../../types.ts';
import { CHARACTER_SKILLS } from './fiction-character.ts';
import { MEANING_SKILLS } from './fiction-meaning.ts';
import { STRUCTURE_SKILLS } from './fiction-structure.ts';
import { STYLE_SKILLS } from './fiction-style.ts';
import { VOICE_SKILLS } from './fiction-voice.ts';

export const FICTION_SKILLS: SkillDef[] = [...STRUCTURE_SKILLS, ...CHARACTER_SKILLS, ...VOICE_SKILLS, ...MEANING_SKILLS, ...STYLE_SKILLS];
