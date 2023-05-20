import { describe } from '@jest/globals';

import Account from '@/domain/account/account';

import MemoAccountRepository from './memo-account-repository';

describe('memory account repository', () => {
  const repo = new MemoAccountRepository();

  const [acc, err] = Account.create({
    email: 'john@doe.email',
    name: 'John Doe',
    password: 'john123!"#',
  });

  if (err) {
    throw new Error('account not created');
  }

  it('should create an account', async () => {
    await expect(repo.create(acc)).resolves.not.toThrow();
  });

  it('should find an account by id', async () => {
    await expect(repo.findById(acc.id)).resolves.toEqual(acc);
  });

  it('should find an account by email', async () => {
    await expect(repo.findByEmail(acc.email.value)).resolves.toEqual(acc);
  });

  it('should check if an account exists', async () => {
    await expect(repo.exists(acc.email.value)).resolves.toBeTruthy();
  });

  it('should not find an account by id', async () => {
    await expect(repo.findById('invalid-id')).resolves.toBeNull();
  });

  it('should not find an account by email', async () => {
    await expect(repo.findByEmail('invalid-email')).resolves.toBeNull();
  });

  it('should check if an account does not exist', async () => {
    await expect(repo.exists('invalid-email')).resolves.toBeFalsy();
  });
});
