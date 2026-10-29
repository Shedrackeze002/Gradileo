/** Grade 10 English, Unit 4: Non-fiction and Persuasion (10-D1, 10-D2). */
import type { SkillDef } from '../../../types.ts';
import { READING_SKILLS } from './nonfiction-reading.ts';
import { RHETORIC_SKILLS } from './nonfiction-rhetoric.ts';

export const NONFICTION_SKILLS: SkillDef[] = [...READING_SKILLS, ...RHETORIC_SKILLS];
