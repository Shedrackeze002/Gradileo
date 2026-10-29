/** Joining short phrases for the solutions of the Grade 12 writing skills, without a serial comma. */

/** "A, B or C". */
export function orList(xs: string[]): string {
  return xs.length <= 2 ? xs.join(' or ') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`;
}

/** "A, B and C". */
export function andList(xs: string[]): string {
  return xs.length <= 2 ? xs.join(' and ') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
}
