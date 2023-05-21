import { describe } from '@jest/globals';

import NotFoundError from '@/application/core/errors/not-found-error';
import Account from '@/domain/account/account';

import MemoAccountRepository from './memo-account-repository';

describe('memory account repository', () => {
  const repo = new MemoAccountRepository();

  const [acc, err] = Account.create({
    email: 'john@doe.email',
    name: 'John Doe',
    password: 'john123!"#AAS',
  });

  if (err) {
    throw new Error('account not created');
  }

  it('should create an account', async () => {
    await expect(repo.create(acc)).resolves.not.toThrow();
  });

  it('should find an account by id', async () => {
    const [account, err] = await repo.findById(acc.id.value);
    expect(account).toEqual(acc);
    expect(err).toBeNull();
  });

  it('should find an account by email', async () => {
    const [account, err] = await repo.findByEmail(acc.email.value);
    expect(account).toEqual(acc);
    expect(err).toBeNull();
  });

  it('should check if an account exists', async () => {
    await expect(repo.exists(acc.email.value)).resolves.toBeTruthy();
  });

  it('should not find an account by id', async () => {
    const [account, err] = await repo.findById('invalid-id');
    expect(account).toBeNull();
    expect(err).toBeInstanceOf(NotFoundError);
  });

  it('should not find an account by email', async () => {
    const [account, err] = await repo.findByEmail('invalid-email');
    expect(account).toBeNull();
    expect(err).toBeInstanceOf(NotFoundError);
  });

  it('should check if an account does not exist', async () => {
    await expect(repo.exists('invalid-email')).resolves.toBeFalsy();
  });
});
