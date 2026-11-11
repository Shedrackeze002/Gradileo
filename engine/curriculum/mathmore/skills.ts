import type { SkillDef } from '../../types.ts';
import { STATS_SKILLS } from './gen/stats.ts';
import { STUDY_SKILLS } from './gen/study.ts';
import { NUMBER_SKILLS } from './gen/number.ts';
import { GEOMETRY_SKILLS } from './gen/geometry.ts';
import { COMPLEX_SKILLS } from './gen/complex.ts';
import { VECTOR_SKILLS } from './gen/vectors.ts';
import { POLAR_SKILLS } from './gen/polar.ts';
import { ACCURACY_SKILLS } from './gen/accuracy.ts';
import { SEQUENCE_SKILLS } from './gen/sequences.ts';
import { GRAPH_SKILLS } from './gen/graphs.ts';
import { PROPORTION_SKILLS } from './gen/proportion.ts';
import { MEASURE_SKILLS } from './gen/measures.ts';
import { FREQUENCY_SKILLS } from './gen/frequency.ts';
import { MECHANICS_SKILLS } from './gen/mechanics.ts';
import { FORCES_SKILLS } from './gen/forces.ts';
import { SAMPLING_SKILLS } from './gen/sampling.ts';
import { NORMAL_SKILLS } from './gen/normal.ts';

export const MATHMORE_SKILLS: SkillDef[] = [
  ...STATS_SKILLS,
  ...STUDY_SKILLS,
  ...NUMBER_SKILLS,
  ...GEOMETRY_SKILLS,
  ...COMPLEX_SKILLS,
  ...VECTOR_SKILLS,
  ...POLAR_SKILLS,
  ...ACCURACY_SKILLS,
  ...SEQUENCE_SKILLS,
  ...GRAPH_SKILLS,
  ...PROPORTION_SKILLS,
  ...MEASURE_SKILLS,
  ...FREQUENCY_SKILLS,
  ...MECHANICS_SKILLS,
  ...FORCES_SKILLS,
  ...SAMPLING_SKILLS,
  ...NORMAL_SKILLS,
];
