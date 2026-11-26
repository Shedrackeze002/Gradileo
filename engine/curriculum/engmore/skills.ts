import type { SkillDef } from '../../types.ts';
import { READING_SKILLS } from './gen/reading.ts';
import { WRITING_SKILLS } from './gen/writing.ts';
import { UNIT3_SKILLS, UNIT4_SKILLS } from './gen/skills34.ts';
import { LITERATURE_SKILLS, MODERN_SKILLS } from './gen/litskills.ts';
import { POEM_SKILLS } from './gen/poemskills.ts';
import { UNIT11_SKILLS } from './gen/usgrammar.ts';
import { UNIT12_SKILLS } from './gen/uswords.ts';
import { UNIT13_SKILLS } from './gen/usspeaking.ts';
import { UNIT14_SKILLS } from './gen/uscompare.ts';
import { UNIT15_SKILLS, UNIT16_SKILLS } from './gen/ushigh.ts';

export const ENGMORE_SKILLS: SkillDef[] = [...READING_SKILLS, ...WRITING_SKILLS, ...UNIT3_SKILLS, ...UNIT4_SKILLS, ...LITERATURE_SKILLS, ...POEM_SKILLS, ...MODERN_SKILLS, ...UNIT11_SKILLS, ...UNIT12_SKILLS, ...UNIT13_SKILLS, ...UNIT14_SKILLS, ...UNIT15_SKILLS, ...UNIT16_SKILLS];
