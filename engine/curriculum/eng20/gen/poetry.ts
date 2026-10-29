/**
 * Grade 11 English, Unit 2: Poetry (11-B1). Extended metaphor, conceit and allusion (2.1), the
 * sonnet and variations in metre (2.2), the dramatic monologue and irony (2.3), and comparing poems
 * (2.4), with public-domain poems from ./poems.ts.
 */
import type { SkillDef } from '../../../types.ts';
import { COMPARE_SKILLS } from './poetry-compare.ts';
import { CONCEIT_SKILLS } from './poetry-conceit.ts';
import { SONNET_SKILLS } from './poetry-sonnet.ts';
import { VOICE_SKILLS } from './poetry-voice.ts';

export const POETRY_SKILLS: SkillDef[] = [...CONCEIT_SKILLS, ...SONNET_SKILLS, ...VOICE_SKILLS, ...COMPARE_SKILLS];
