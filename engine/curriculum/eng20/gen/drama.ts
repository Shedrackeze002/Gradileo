/** Grade 11 English, Unit 3: Shakespeare, Macbeth (11-C1). */
import type { SkillDef } from '../../../types.ts';
import { MACBETH_CHARACTER_SKILLS } from './drama-characters.ts';
import { MACBETH_IRONY_SKILLS } from './drama-irony.ts';
import { MACBETH_LANGUAGE_SKILLS } from './drama-language.ts';
import { MACBETH_THEME_SKILLS } from './drama-themes.ts';

export const DRAMA_SKILLS: SkillDef[] = [...MACBETH_LANGUAGE_SKILLS, ...MACBETH_CHARACTER_SKILLS, ...MACBETH_IRONY_SKILLS, ...MACBETH_THEME_SKILLS];
