/** Grade 12 English, Unit 3: Shakespeare, Hamlet (12-C1). */
import type { SkillDef } from '../../../types.ts';
import { HAMLET_CHARACTER_SKILLS } from './drama-characters.ts';
import { HAMLET_DEVICE_SKILLS } from './drama-devices.ts';
import { HAMLET_LANGUAGE_SKILLS } from './drama-language.ts';
import { HAMLET_THEME_SKILLS } from './drama-themes.ts';

export const DRAMA_SKILLS: SkillDef[] = [...HAMLET_LANGUAGE_SKILLS, ...HAMLET_CHARACTER_SKILLS, ...HAMLET_DEVICE_SKILLS, ...HAMLET_THEME_SKILLS];
