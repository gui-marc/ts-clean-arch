import { describe, it, expect } from '@jest/globals';

import Name from './name';

describe('name', () => {
  it('should be created', () => {
    expect(Name.create('John Doe').value).not.toBeNull();
  });

  it('should be invalid if name is empty', () => {
    expect(Name.validate('')).toBeFalsy();
  });

  it('should be invalid if name has less than 2 characters', () => {
    expect(Name.validate('a')).toBeFalsy();
  });

  it('should be valid if name has at least 2 characters', () => {
    expect(Name.validate('ab')).toBeTruthy();
  });

  it('should be invalid if name has more than 255 characters', () => {
    expect(Name.validate('a'.repeat(256))).toBeFalsy();
  });

  it('should be valid if name has at most 255 characters', () => {
    expect(Name.validate('a'.repeat(255))).toBeTruthy();
  });
});
