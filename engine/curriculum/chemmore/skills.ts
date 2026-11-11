import type { SkillDef } from '../../types.ts';
import { METALS_SKILLS } from './gen/metals.ts';
import { ANALYSIS_SKILLS } from './gen/analysis.ts';
import { QUANTITY_SKILLS } from './gen/quantities.ts';
import { EARTH_SKILLS } from './gen/earth.ts';
import { INDUSTRY_SKILLS, STRUCTURE_SKILLS } from './gen/materials.ts';

export const CHEMMORE_SKILLS: SkillDef[] = [...METALS_SKILLS, ...ANALYSIS_SKILLS, ...QUANTITY_SKILLS, ...EARTH_SKILLS, ...STRUCTURE_SKILLS, ...INDUSTRY_SKILLS];
