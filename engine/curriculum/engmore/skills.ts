import type { SkillDef } from '../../types.ts';
import { READING_SKILLS } from './gen/reading.ts';
import { WRITING_SKILLS } from './gen/writing.ts';
import { UNIT3_SKILLS, UNIT4_SKILLS } from './gen/skills34.ts';
import { LITERATURE_SKILLS } from './gen/litskills.ts';

export const ENGMORE_SKILLS: SkillDef[] = [...READING_SKILLS, ...WRITING_SKILLS, ...UNIT3_SKILLS, ...UNIT4_SKILLS, ...LITERATURE_SKILLS];
