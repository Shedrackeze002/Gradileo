/** Grade 12 English, Unit 2: Poetry (12-B1): the ode and the Romantic lyric, war and witness, modern forms and sound, the unseen poem. */
import type { SkillDef } from '../../../types.ts';
import { ODE_SKILLS } from './poetry-ode.ts';
import { WAR_SKILLS } from './poetry-war.ts';
import { FORM_SKILLS } from './poetry-form.ts';
import { UNSEEN_SKILLS } from './poetry-unseen.ts';

export const POETRY_SKILLS: SkillDef[] = [...ODE_SKILLS, ...WAR_SKILLS, ...FORM_SKILLS, ...UNSEEN_SKILLS];
