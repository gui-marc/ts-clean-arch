import type AccountRepository from '@/application/account/account-repository';
import type NotFoundError from '@/application/core/errors/not-found-error';
import type Account from '@/domain/account/account';
import { type Optional } from '@/domain/core/optional';

export default class PgAccountRepository implements AccountRepository {
  async create(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(): Promise<Optional<Account, NotFoundError>> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(): Promise<Optional<Account, NotFoundError>> {
    throw new Error('Method not implemented.');
  }

  async exists(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
