/** Grade 10 English, Unit 2: Poetry (10-B1). */
import type { SkillDef } from '../../../types.ts';
import { FIGURATIVE_SKILLS } from './poetry-figurative.ts';
import { FORM_SKILLS } from './poetry-form.ts';
import { READING_SKILLS } from './poetry-reading.ts';
import { SOUND_SKILLS } from './poetry-sound.ts';

export const POETRY_SKILLS: SkillDef[] = [...FIGURATIVE_SKILLS, ...SOUND_SKILLS, ...FORM_SKILLS, ...READING_SKILLS];
