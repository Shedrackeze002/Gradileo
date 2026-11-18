import type { SkillDef } from '../../types.ts';
import { COLLISION_SKILLS } from './gen/collisions.ts';
import { ELECTROSTATICS_SKILLS } from './gen/electrostatics.ts';
import { MAGNETISM_SKILLS } from './gen/magnetism.ts';
import { MOMENTUM_SKILLS } from './gen/momentum.ts';
import { POTENTIAL_SKILLS } from './gen/potential.ts';

export const PHYS30_SKILLS: SkillDef[] = [...MOMENTUM_SKILLS, ...COLLISION_SKILLS, ...ELECTROSTATICS_SKILLS, ...POTENTIAL_SKILLS, ...MAGNETISM_SKILLS];
