/**
 * Grade 12 Chemistry, Unit 3: chemical changes of organic compounds. Structures, names and isomers
 * (organic-structure.ts), and reactions, polymers and fuels (organic-reactions.ts), all drawn from
 * the carbon-skeleton model in engine/chem/organic.ts.
 */
import type { SkillDef } from '../../../types.ts';
import { ORGANIC_REACTION_SKILLS } from './organic-reactions.ts';
import { ORGANIC_STRUCTURE_SKILLS } from './organic-structure.ts';

export const ORGANIC_SKILLS: SkillDef[] = [...ORGANIC_STRUCTURE_SKILLS, ...ORGANIC_REACTION_SKILLS];
