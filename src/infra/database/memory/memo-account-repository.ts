import type AccountRepository from '@/application/account/account-repository';
import NotFoundError from '@/application/core/errors/not-found-error';
import type Account from '@/domain/account/account';
import { type Optional } from '@/domain/core/optional';

export default class MemoAccountRepository implements AccountRepository {
  items = new Map<string, Account>();

  async create(account: Account) {
    this.items.set(account.id.value, account);
  }

  async exists(email: string) {
    return Array.from(this.items.values()).some(
      (account) => account.email.value === email
    );
  }

  async findById(id: string): Promise<Optional<Account, NotFoundError>> {
    const account = this.items.get(id);
    if (!account) {
      return [null, new NotFoundError('account')];
    }
    return [account, null];
  }

  async findByEmail(email: string): Promise<Optional<Account, NotFoundError>> {
    const account = Array.from(this.items.values()).find(
      (account) => account.email.value === email
    );
    if (!account) {
      return [null, new NotFoundError('account')];
    }
    return [account, null];
  }
}
