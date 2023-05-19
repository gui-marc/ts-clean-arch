import { describe, expect, it } from '@jest/globals';

import Email from './email';

describe('email', () => {
  it('should be created', () => {
    expect(Email.create('hello@gmail.com').value).not.toBeNull();
  });

  it('should be invalid if email is empty', () => {
    expect(Email.validate('')).toBeFalsy();
  });

  it('should be invalid if email is invalid', () => {
    expect(Email.validate('hello')).toBeFalsy();
  });

  it('should be valid if email is valid', () => {
    expect(Email.validate('email@gmail.com')).toBeTruthy();
  });
});
