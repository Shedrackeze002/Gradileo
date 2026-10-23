import type { SkillDef } from '../../types.ts';
import { BONDING_SKILLS } from './gen/bonding.ts';
import { GAS_SKILLS } from './gen/gases.ts';

export const CHEM20_SKILLS: SkillDef[] = [...BONDING_SKILLS, ...GAS_SKILLS];
