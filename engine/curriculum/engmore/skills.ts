import type { SkillDef } from '../../types.ts';
import { READING_SKILLS } from './gen/reading.ts';
import { WRITING_SKILLS } from './gen/writing.ts';

export const ENGMORE_SKILLS: SkillDef[] = [...READING_SKILLS, ...WRITING_SKILLS];
