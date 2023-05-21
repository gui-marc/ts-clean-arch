import { describe, it } from '@jest/globals';

import Account from '@/domain/account/account';
import PostgresAccountAdapter from '@/infra/database/postgres/adapters/pg-account-adapter';
import PgAccountRepository from '@/infra/database/postgres/repositories/pg-account-repository';

describe('postgres account repository', () => {
  const adapter = new PostgresAccountAdapter();
  const repo = new PgAccountRepository(adapter);

  const [account, err] = Account.create({
    email: 'john@doe.com',
    name: 'John Doe',
    password: 'john123!"#',
  });

  if (err) throw new Error('account not created');

  it('should create an account', async () => {
    await expect(repo.create(account)).resolves.not.toThrow();
  });

  it('should find an account by id', async () => {
    await expect(repo.findById(account.id)).resolves.toEqual(account);
  });

  it('should find an account by email', async () => {
    await expect(repo.findByEmail(account.email.value)).resolves.toEqual(
      account
    );
  });

  it('should check if an account exists', async () => {
    await expect(repo.exists(account.email.value)).resolves.toBeTruthy();
  });

  it('should not find an account by id', async () => {
    await expect(repo.findById('invalid-id')).resolves.toBeNull();
  });

  it('should not find an account by email', async () => {
    await expect(repo.findByEmail('invalid-email')).resolves.toBeNull();
  });
});
