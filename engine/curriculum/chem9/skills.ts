import type { SkillDef } from '../../types.ts';
import { STRUCTURE_SKILLS } from './gen/structure.ts';
import { FORMULA_SKILLS } from './gen/formulas.ts';
import { REACTION_SKILLS } from './gen/reactions.ts';
import { ACID_SKILLS } from './gen/acids.ts';

export const CHEM9_SKILLS: SkillDef[] = [...STRUCTURE_SKILLS, ...FORMULA_SKILLS, ...REACTION_SKILLS, ...ACID_SKILLS];
