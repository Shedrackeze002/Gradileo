/** Grade 10 English, Unit 3: Shakespeare, Romeo and Juliet (10-C1). */
import type { SkillDef } from '../../../types.ts';
import { PLAY_CHARACTER_SKILLS } from './drama-characters.ts';
import { PLAY_IRONY_SKILLS } from './drama-irony.ts';
import { PLAY_LANGUAGE_SKILLS } from './drama-language.ts';
import { PLAY_THEME_SKILLS } from './drama-themes.ts';

export const DRAMA_SKILLS: SkillDef[] = [...PLAY_LANGUAGE_SKILLS, ...PLAY_CHARACTER_SKILLS, ...PLAY_IRONY_SKILLS, ...PLAY_THEME_SKILLS];
