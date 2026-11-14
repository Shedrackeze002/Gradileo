import type { SkillDef } from '../../types.ts';
import { ELECTRICITY_SKILLS } from './gen/electricity.ts';
import { ENERGY_SKILLS } from './gen/energy.ts';
import { FORCE_SKILLS } from './gen/forces.ts';
import { MOTION_SKILLS } from './gen/motion.ts';
import { WAVE_SKILLS } from './gen/waves.ts';

export const PHYS10_SKILLS: SkillDef[] = [...MOTION_SKILLS, ...FORCE_SKILLS, ...ENERGY_SKILLS, ...WAVE_SKILLS, ...ELECTRICITY_SKILLS];
