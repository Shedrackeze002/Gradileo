import type { SkillDef } from '../../types.ts';
import { ENERGY_SKILLS } from './gen/energy.ts';
import { FORCE_SKILLS } from './gen/forces.ts';
import { MOTION_SKILLS } from './gen/motion.ts';

export const PHYS10_SKILLS: SkillDef[] = [...MOTION_SKILLS, ...FORCE_SKILLS, ...ENERGY_SKILLS];
