import { describe, expect, it } from '@jest/globals';

import Account from './account';

describe('account', () => {
  it('should be created', () => {
    expect(
      Account.create({
        email: 'johndoe@gmail.com',
        id: '1',
        name: 'John Doe',
        password: '123456',
      })
    ).not.toBeNull();
  });
});
