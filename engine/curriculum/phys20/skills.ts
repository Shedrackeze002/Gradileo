import type { SkillDef } from '../../types.ts';
import { CIRCULAR_SKILLS } from './gen/circular.ts';
import { DYNAMICS_SKILLS } from './gen/dynamics.ts';
import { ENERGY_SKILLS } from './gen/energy.ts';
import { KINEMATICS_SKILLS } from './gen/kinematics.ts';
import { OSCILLATION_SKILLS } from './gen/oscillations.ts';
import { WAVE_SKILLS } from './gen/waves.ts';

export const PHYS20_SKILLS: SkillDef[] = [...KINEMATICS_SKILLS, ...DYNAMICS_SKILLS, ...CIRCULAR_SKILLS, ...ENERGY_SKILLS, ...OSCILLATION_SKILLS, ...WAVE_SKILLS];
