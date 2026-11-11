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
import { CHEM7_SKILLS } from './chem7/skills.ts';
import { CHEM8_SKILLS } from './chem8/skills.ts';
import { CHEM9_SKILLS } from './chem9/skills.ts';
import { CHEM10_SKILLS } from './chem10/skills.ts';
import { CHEM20_SKILLS } from './chem20/skills.ts';
import { CHEM30_SKILLS } from './chem30/skills.ts';
import { ENG5_SKILLS } from './eng5/skills.ts';
import { ENG6_SKILLS } from './eng6/skills.ts';
import { ENG7_SKILLS } from './eng7/skills.ts';
import { ENG8_SKILLS } from './eng8/skills.ts';
import { ENG9_SKILLS } from './eng9/skills.ts';
import { ENG10_SKILLS } from './eng10/skills.ts';
import { ENG20_SKILLS } from './eng20/skills.ts';
import { ENG30_SKILLS } from './eng30/skills.ts';
import { MATHMORE_SKILLS } from './mathmore/skills.ts';
import { CHEMMORE_SKILLS } from './chemmore/skills.ts';
import { ENGMORE_SKILLS } from './engmore/skills.ts';

export const ALL_SKILLS = [...MATH10C_SKILLS, ...MATH10_3_SKILLS, ...MATH10_4_SKILLS, ...MATH20_1_SKILLS, ...MATH20_2_SKILLS, ...MATH20_3_SKILLS, ...MATH20_4_SKILLS, ...MATH30_1_SKILLS, ...MATH30_2_SKILLS, ...MATH30_3_SKILLS, ...MATH31_SKILLS, ...MATH5_SKILLS, ...MATH6_SKILLS, ...MATH7_SKILLS, ...MATH8_SKILLS, ...MATH9_SKILLS, ...MATHMORE_SKILLS, ...CHEM7_SKILLS, ...CHEM8_SKILLS, ...CHEM9_SKILLS, ...CHEM10_SKILLS, ...CHEM20_SKILLS, ...CHEM30_SKILLS, ...CHEMMORE_SKILLS, ...ENG5_SKILLS, ...ENG6_SKILLS, ...ENG7_SKILLS, ...ENG8_SKILLS, ...ENG9_SKILLS, ...ENG10_SKILLS, ...ENG20_SKILLS, ...ENG30_SKILLS, ...ENGMORE_SKILLS];

registerSkills(ALL_SKILLS);
