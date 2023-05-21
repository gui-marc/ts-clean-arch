import { describe, expect, it } from '@jest/globals';

import Account from './account';

describe('account', () => {
  const [account, error] = Account.create({
    email: 'johndoe@gmail.com',
    name: 'John Doe',
    password: '123!"#!"#Assd',
  });

  it('should be created', () => {
    expect(account).not.toBeNull();
  });

  it('should not have errors', () => {
    expect(error).toBeNull();
  });
});
