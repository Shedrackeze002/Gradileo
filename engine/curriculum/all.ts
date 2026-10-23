/**
 * Registers every course's question generators at once. The server, tests and tools import this;
 * the browser loads each course's generators on demand instead (see ./index.ts).
 */
import { registerSkills } from './index.ts';
import { MATH10C_SKILLS } from './math10c/skills.ts';
import { MATH10_3_SKILLS } from './math10-3/skills.ts';
import { MATH10_4_SKILLS } from './math10-4/skills.ts';
import { MATH20_1_SKILLS } from './math20-1/skills.ts';
import { MATH20_2_SKILLS } from './math20-2/skills.ts';
import { MATH20_3_SKILLS } from './math20-3/skills.ts';
import { MATH20_4_SKILLS } from './math20-4/skills.ts';
import { MATH30_1_SKILLS } from './math30-1/skills.ts';
import { MATH30_2_SKILLS } from './math30-2/skills.ts';
import { MATH30_3_SKILLS } from './math30-3/skills.ts';
import { MATH31_SKILLS } from './math31/skills.ts';
import { MATH5_SKILLS } from './math5/skills.ts';
import { MATH6_SKILLS } from './math6/skills.ts';
import { MATH7_SKILLS } from './math7/skills.ts';
import { MATH8_SKILLS } from './math8/skills.ts';
import { MATH9_SKILLS } from './math9/skills.ts';
import { CHEM20_SKILLS } from './chem20/skills.ts';

export const ALL_SKILLS = [...MATH10C_SKILLS, ...MATH10_3_SKILLS, ...MATH10_4_SKILLS, ...MATH20_1_SKILLS, ...MATH20_2_SKILLS, ...MATH20_3_SKILLS, ...MATH20_4_SKILLS, ...MATH30_1_SKILLS, ...MATH30_2_SKILLS, ...MATH30_3_SKILLS, ...MATH31_SKILLS, ...MATH5_SKILLS, ...MATH6_SKILLS, ...MATH7_SKILLS, ...MATH8_SKILLS, ...MATH9_SKILLS, ...CHEM20_SKILLS];

registerSkills(ALL_SKILLS);
