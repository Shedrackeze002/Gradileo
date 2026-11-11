import type { SkillDef } from '../../types.ts';
import { ATOM_SKILLS } from './gen/atoms.ts';
import { TABLE_SKILLS } from './gen/table.ts';
import { CHANGE_SKILLS } from './gen/changes.ts';
import { MATERIAL_SKILLS } from './gen/materials.ts';

export const CHEM8_SKILLS: SkillDef[] = [...ATOM_SKILLS, ...TABLE_SKILLS, ...CHANGE_SKILLS, ...MATERIAL_SKILLS];
