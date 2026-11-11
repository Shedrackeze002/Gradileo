import type { SkillDef } from '../../types.ts';
import { METALS_SKILLS } from './gen/metals.ts';
import { ANALYSIS_SKILLS } from './gen/analysis.ts';
import { QUANTITY_SKILLS } from './gen/quantities.ts';

export const CHEMMORE_SKILLS: SkillDef[] = [...METALS_SKILLS, ...ANALYSIS_SKILLS, ...QUANTITY_SKILLS];
