import type { SkillDef } from '../../types.ts';
import { DRAMA_SKILLS } from './gen/drama.ts';
import { FICTION_SKILLS } from './gen/fiction.ts';
import { LANGUAGE_SKILLS } from './gen/language.ts';
import { MEDIA_SKILLS } from './gen/media.ts';
import { POETRY_SKILLS } from './gen/poetry.ts';
import { RHETORIC_SKILLS } from './gen/rhetoric.ts';
import { WRITING_SKILLS } from './gen/writing.ts';

export const ENG30_SKILLS: SkillDef[] = [...FICTION_SKILLS, ...POETRY_SKILLS, ...DRAMA_SKILLS, ...RHETORIC_SKILLS, ...MEDIA_SKILLS, ...WRITING_SKILLS, ...LANGUAGE_SKILLS];
