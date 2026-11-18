import type { SkillDef } from '../../types.ts';
import { COLLISION_SKILLS } from './gen/collisions.ts';
import { MOMENTUM_SKILLS } from './gen/momentum.ts';

export const PHYS30_SKILLS: SkillDef[] = [...MOMENTUM_SKILLS, ...COLLISION_SKILLS];
