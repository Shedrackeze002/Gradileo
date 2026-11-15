import type { SkillDef } from '../../types.ts';
import { DYNAMICS_SKILLS } from './gen/dynamics.ts';
import { KINEMATICS_SKILLS } from './gen/kinematics.ts';

export const PHYS20_SKILLS: SkillDef[] = [...KINEMATICS_SKILLS, ...DYNAMICS_SKILLS];
