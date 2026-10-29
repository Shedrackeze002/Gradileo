/** Grade 12 English, Unit 1: Fiction (12-A1, 12-A2). */
import type { SkillDef } from '../../../types.ts';
import { CONTEXT_SKILLS } from './fiction-context.ts';
import { MEANING_SKILLS } from './fiction-meaning.ts';
import { STYLE_SKILLS } from './fiction-style.ts';
import { TECHNIQUE_SKILLS } from './fiction-technique.ts';

export const FICTION_SKILLS: SkillDef[] = [...TECHNIQUE_SKILLS, ...CONTEXT_SKILLS, ...MEANING_SKILLS, ...STYLE_SKILLS];
