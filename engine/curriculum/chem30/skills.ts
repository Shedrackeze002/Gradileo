import type { SkillDef } from '../../types.ts';
import { ELECTRO_SKILLS } from './gen/electro.ts';
import { EQUILIBRIUM_SKILLS } from './gen/equilibrium.ts';
import { ORGANIC_SKILLS } from './gen/organic.ts';
import { THERMO_SKILLS } from './gen/thermo.ts';

export const CHEM30_SKILLS: SkillDef[] = [...THERMO_SKILLS, ...ELECTRO_SKILLS, ...ORGANIC_SKILLS, ...EQUILIBRIUM_SKILLS];
