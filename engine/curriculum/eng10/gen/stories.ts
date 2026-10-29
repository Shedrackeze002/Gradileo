/** Grade 10 English, Unit 1: Short Stories (10-A1, 10-A2). */
import type { SkillDef } from '../../../types.ts';
import { CHARACTER_SKILLS } from './stories-character.ts';
import { PLOT_SKILLS } from './stories-plot.ts';
import { THEME_SKILLS } from './stories-theme.ts';
import { VOICE_SKILLS } from './stories-voice.ts';

export const STORY_SKILLS: SkillDef[] = [...PLOT_SKILLS, ...CHARACTER_SKILLS, ...VOICE_SKILLS, ...THEME_SKILLS];
