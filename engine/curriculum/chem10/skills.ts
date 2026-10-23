import type { SkillDef } from '../../types.ts';
import { ATOM_SKILLS } from './gen/atoms.ts';
import { BONDING_SKILLS } from './gen/bonding.ts';
import { MATTER_SKILLS } from './gen/matter.ts';
import { MOLE_SKILLS } from './gen/moles.ts';
import { REACTION_SKILLS } from './gen/reactions.ts';

export const CHEM10_SKILLS: SkillDef[] = [...MATTER_SKILLS, ...ATOM_SKILLS, ...BONDING_SKILLS, ...REACTION_SKILLS, ...MOLE_SKILLS];
