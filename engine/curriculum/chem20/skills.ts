import type { SkillDef } from '../../types.ts';
import { BONDING_SKILLS } from './gen/bonding.ts';
import { GAS_SKILLS } from './gen/gases.ts';
import { SOLUTION_SKILLS } from './gen/solutions.ts';
import { STOICHIOMETRY_SKILLS } from './gen/stoichiometry.ts';

export const CHEM20_SKILLS: SkillDef[] = [...BONDING_SKILLS, ...GAS_SKILLS, ...SOLUTION_SKILLS, ...STOICHIOMETRY_SKILLS];
