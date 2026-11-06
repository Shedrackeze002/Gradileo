import { describe, expect, it } from 'vitest';
import { beaconSettings } from './analytics';

describe('beaconSettings', () => {
  it('counts the live site, with or without www', () => {
    expect(JSON.parse(beaconSettings('abc123', 'gradileo.com', true)!)).toEqual({ token: 'abc123', spa: true });
    expect(beaconSettings(' abc123 ', 'www.gradileo.com', true)).toBe('{"token":"abc123","spa":true}');
  });

  it('counts nothing without a token, off the live domain or outside a production build', () => {
    expect(beaconSettings(undefined, 'gradileo.com', true)).toBeNull();
    expect(beaconSettings('  ', 'gradileo.com', true)).toBeNull();
    expect(beaconSettings('abc123', 'localhost', true)).toBeNull();
    expect(beaconSettings('abc123', 'shedrackeze002.github.io', true)).toBeNull();
    expect(beaconSettings('abc123', 'gradileo.com', false)).toBeNull();
  });
});
