import type { SkillDef } from '../../types.ts';
import { MATTER_SKILLS } from './gen/matter.ts';
import { PARTICLE_SKILLS } from './gen/particles.ts';
import { MIXTURE_SKILLS } from './gen/mixtures.ts';
import { SEPARATING_SKILLS } from './gen/separating.ts';

export const CHEM7_SKILLS: SkillDef[] = [...MATTER_SKILLS, ...PARTICLE_SKILLS, ...MIXTURE_SKILLS, ...SEPARATING_SKILLS];
