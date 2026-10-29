/**
 * Shared helpers for the English question generators: people with their pronouns, capitals,
 * articles, lists and quotations. Displayed text uses typographic quotes and apostrophes (’ “ ”);
 * typed answers are graded with straight and curly ones treated alike (engine/grade.ts).
 */
import type { Rng } from '../../../rng.ts';

export interface Person {
  name: string;
  /** Subject, object and possessive pronouns. */
  he: 'he' | 'she';
  him: 'him' | 'her';
  his: 'his' | 'her';
}

const P = (name: string, g: 'm' | 'f'): Person => (g === 'm' ? { name, he: 'he', him: 'him', his: 'his' } : { name, he: 'she', him: 'her', his: 'her' });

/** Names from many English-speaking countries, with the pronouns the questions use. */
export const PEOPLE: Person[] = [
  P('Amara', 'f'), P('Kenji', 'm'), P('Priya', 'f'), P('Mateo', 'm'), P('Fatima', 'f'), P('Liam', 'm'),
  P('Wei', 'm'), P('Chidi', 'm'), P('Sofia', 'f'), P('Arjun', 'm'), P('Aisha', 'f'), P('Tomás', 'm'),
  P('Yuki', 'f'), P('Kwame', 'm'), P('Leila', 'f'), P('Noah', 'm'), P('Mei', 'f'), P('Ines', 'f'),
  P('Ravi', 'm'), P('Zainab', 'f'), P('Oliver', 'm'), P('Hana', 'f'), P('Diego', 'm'), P('Nia', 'f'),
  P('Samuel', 'm'), P('Grace', 'f'), P('Omar', 'm'), P('Ruth', 'f'), P('Daniel', 'm'), P('Esi', 'f'),
];

export const person = (rng: Rng): Person => rng.pick(PEOPLE);
/** `n` different people. */
export const people = (rng: Rng, n: number): Person[] => rng.sample(PEOPLE, n);

/** Two people of different genders, so "he" and "she" are never ambiguous. */
export function pair(rng: Rng): Person[] {
  const a = people(rng, 1)[0];
  const b = retryPick(rng, (p) => p.he !== a.he);
  return [a, b, retryPick(rng, (p) => p.name !== a.name && p.name !== b.name)];
}
function retryPick(rng: Rng, ok: (p: Person) => boolean): Person {
  for (let i = 0; i < 100; i++) {
    const p = people(rng, 1)[0];
    if (ok(p)) return p;
  }
  throw new Error('no person found');
}

export const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
/** Lower-case the first letter, unless the first word is "I" or a name (a capitalized word in `keep`). */
export function lowerFirst(s: string, keep: readonly string[] = []): string {
  const first = s.split(/[\s,’']/)[0];
  if (first === 'I' || keep.includes(first) || PEOPLE.some((p) => p.name === first)) return s;
  return s[0].toLowerCase() + s.slice(1);
}
/** "a" or "an" before a word. */
export const an = (w: string) => `${/^[aeiou]/i.test(w) ? 'an' : 'a'} ${w}`;
/** "A, B and C" (no comma before "and", the house style; both styles are correct). */
export function list(items: readonly string[], conj = 'and'): string {
  if (items.length <= 1) return items.join('');
  if (items.length === 2) return `${items[0]} ${conj} ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} ${conj} ${items[items.length - 1]}`;
}
/** “text” with typographic double quotes. */
export const dq = (s: string) => `“${s}”`;
/** A sentence or passage set off as a quotation block in Markdown. */
export const block = (s: string) => s.split('\n').map((l) => `> ${l}`).join('\n');
/** Fill NAME, NAME2, … placeholders and their pronouns ({he}, {him}, {his}, {He}, {His}, {he2} …). */
export function fill(template: string, cast: readonly Person[]): string {
  return template.replace(/\{(He|he|Him|him|His|his)(\d?)\}|NAME(\d?)/g, (_m, pro: string | undefined, pn: string, nn: string) => {
    if (pro) {
      const p = cast[(Number(pn) || 1) - 1];
      const word = p[pro.toLowerCase() as 'he' | 'him' | 'his'];
      return pro[0] === pro[0].toUpperCase() ? cap(word) : word;
    }
    return cast[(Number(nn) || 1) - 1].name;
  });
}
