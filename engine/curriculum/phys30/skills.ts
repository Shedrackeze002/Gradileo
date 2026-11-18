import type { SkillDef } from '../../types.ts';
import { ATOM_SKILLS } from './gen/atom.ts';
import { COLLISION_SKILLS } from './gen/collisions.ts';
import { ELECTROSTATICS_SKILLS } from './gen/electrostatics.ts';
import { LIGHT_SKILLS } from './gen/light.ts';
import { MAGNETISM_SKILLS } from './gen/magnetism.ts';
import { MOMENTUM_SKILLS } from './gen/momentum.ts';
import { NUCLEUS_SKILLS } from './gen/nucleus.ts';
import { PHOTON_SKILLS } from './gen/photons.ts';
import { POTENTIAL_SKILLS } from './gen/potential.ts';

export const PHYS30_SKILLS: SkillDef[] = [...MOMENTUM_SKILLS, ...COLLISION_SKILLS, ...ELECTROSTATICS_SKILLS, ...POTENTIAL_SKILLS, ...MAGNETISM_SKILLS, ...LIGHT_SKILLS, ...PHOTON_SKILLS, ...ATOM_SKILLS, ...NUCLEUS_SKILLS];
