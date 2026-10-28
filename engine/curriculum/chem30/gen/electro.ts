/**
 * Grade 12 Chemistry, Unit 2: electrochemical changes. Oxidation and reduction, oxidation numbers,
 * predicting and balancing redox reactions, redox titrations (gen/electro-redox.ts), and voltaic
 * and electrolytic cells, cell potentials and Faraday's law (gen/electro-cells.ts).
 */
import type { SkillDef } from '../../../types.ts';
import { CELL_SKILLS } from './electro-cells.ts';
import { REDOX_SKILLS } from './electro-redox.ts';

export const ELECTRO_SKILLS: SkillDef[] = [...REDOX_SKILLS, ...CELL_SKILLS];
