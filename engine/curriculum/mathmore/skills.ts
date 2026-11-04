import type { SkillDef } from '../../types.ts';
import { STATS_SKILLS } from './gen/stats.ts';
import { STUDY_SKILLS } from './gen/study.ts';
import { NUMBER_SKILLS } from './gen/number.ts';
import { GEOMETRY_SKILLS } from './gen/geometry.ts';
import { COMPLEX_SKILLS } from './gen/complex.ts';
import { VECTOR_SKILLS } from './gen/vectors.ts';
import { POLAR_SKILLS } from './gen/polar.ts';

export const MATHMORE_SKILLS: SkillDef[] = [
  ...STATS_SKILLS,
  ...STUDY_SKILLS,
  ...NUMBER_SKILLS,
  ...GEOMETRY_SKILLS,
  ...COMPLEX_SKILLS,
  ...VECTOR_SKILLS,
  ...POLAR_SKILLS,
];
