import { describe, it } from '@jest/globals';

import NotFoundError from '@/application/core/errors/not-found-error';
import Account from '@/domain/account/account';
import InvalidEmailError from '@/domain/account/errors/invalid-email-error';
import InvalidUuidError from '@/domain/account/errors/invalid-id-error';
import PostgresAccountAdapter from '@/infra/database/postgres/adapters/pg-account-adapter';
import PgAccountRepository from '@/infra/database/postgres/repositories/pg-account-repository';

import pgClient from '../postgres';

describe('postgres account repository', () => {
  const adapter = new PostgresAccountAdapter();
  const repo = new PgAccountRepository(adapter);

  const [acc, err] = Account.create({
    email: 'john@doe.com',
    name: 'John Doe',
    password: 'john123!"#JSa',
  });

  if (err) throw new Error('account not created');

  it('should create an account', async () => {
    await expect(repo.create(acc)).resolves.not.toThrow();
  });

  it('should find an account by id', async () => {
    const [account, err] = await repo.findById(acc.id.value);
    expect(account).toEqual(await adapter.fromDomain(acc));
    expect(err).toBeNull();
  });

  it('should find an account by email', async () => {
    const [account, err] = await repo.findByEmail(acc.email.value);
    expect(account).toEqual(await adapter.fromDomain(acc));
    expect(err).toBeNull();
  });

  it('should check if an account exists', async () => {
    await expect(repo.exists(acc.email.value)).resolves.toBeTruthy();
  });

  it('should not find an account with invalid id', async () => {
    const [account, err] = await repo.findById('invalid-id');
    expect(account).toBeNull();
    expect(err).toBeInstanceOf(InvalidUuidError);
  });

  it('should not find an account with invalid email', async () => {
    const [account, err] = await repo.findByEmail('invalid-email');
    expect(account).toBeNull();
    expect(err).toBeInstanceOf(InvalidEmailError);
  });

  it('should not find an account that does not exist', async () => {
    const [account, err] = await repo.findById(
      '00000000-0000-0000-0000-000000000000'
    );
    expect(account).toBeNull();
    expect(err).toBeInstanceOf(NotFoundError);
  });

  it('should not find an account that does not exist', async () => {
    const [account, err] = await repo.findByEmail('invalid@gmail.com');
    expect(account).toBeNull();
    expect(err).toBeInstanceOf(NotFoundError);
  });

  it('should check if an account does not exist', async () => {
    await expect(repo.exists('invalid-email')).resolves.toBeFalsy();
  });

  it('should clean up', async () => {
    await expect(pgClient.query(`delete from account;`)).resolves.not.toThrow();
  });
});
