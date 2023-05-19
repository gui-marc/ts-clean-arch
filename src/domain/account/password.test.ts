import { describe, expect, it } from '@jest/globals';

import Password from './password';

describe('password', () => {
  it('should be created', () => {
    expect(Password.create('123123asdasd#"!')).not.toBeNull();
  });

  it('should be invalid if password is empty', () => {
    expect(Password.validate('')).toBeFalsy();
  });

  it('should be invalid if password has less than 8 characters', () => {
    expect(Password.validate('123')).toBeFalsy();
  });

  it('should be invalid if password has no uppercase characters', () => {
    expect(Password.validate('123123asdasd#"!')).toBeFalsy();
  });

  it('should be invalid if password has no lowercase characters', () => {
    expect(Password.validate('123123ASDASD#"!')).toBeFalsy();
  });

  it('should be invalid if password has no special characters', () => {
    expect(Password.validate('123123ASDASDasd')).toBeFalsy();
  });

  it('should be valid if password has at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character', () => {
    expect(Password.validate('123!asdASD1#')).toBeTruthy();
  });
});
