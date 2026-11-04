import type { SkillDef } from '../../types.ts';
import { STATS_SKILLS } from './gen/stats.ts';
import { NUMBER_SKILLS } from './gen/number.ts';
import { GEOMETRY_SKILLS } from './gen/geometry.ts';

export const MATHMORE_SKILLS: SkillDef[] = [...STATS_SKILLS, ...NUMBER_SKILLS, ...GEOMETRY_SKILLS];
