import type { SkillDef } from '../../types.ts';
import { METALS_SKILLS } from './gen/metals.ts';
import { ANALYSIS_SKILLS } from './gen/analysis.ts';
import { QUANTITY_SKILLS } from './gen/quantities.ts';
import { EARTH_SKILLS } from './gen/earth.ts';
import { INDUSTRY_SKILLS, STRUCTURE_SKILLS } from './gen/materials.ts';
import { ATOMS12_SKILLS } from './gen/atoms12.ts';
import { INORGANIC12_SKILLS } from './gen/inorganic12.ts';
import { ORGANIC12_SKILLS } from './gen/organic12.ts';
import { PHYSICAL13_SKILLS } from './gen/physical13.ts';
import { INORGANIC13_SKILLS } from './gen/inorganic13.ts';
import { ORGANIC13_SKILLS } from './gen/organic13.ts';

export const CHEMMORE_SKILLS: SkillDef[] = [...METALS_SKILLS, ...ANALYSIS_SKILLS, ...QUANTITY_SKILLS, ...EARTH_SKILLS, ...STRUCTURE_SKILLS, ...INDUSTRY_SKILLS, ...ATOMS12_SKILLS, ...INORGANIC12_SKILLS, ...ORGANIC12_SKILLS, ...PHYSICAL13_SKILLS, ...INORGANIC13_SKILLS, ...ORGANIC13_SKILLS];
