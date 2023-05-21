import type Account from '@/domain/account/account';

export default interface AccountAdapter<T> {
  fromDomain: (account: Account) => Promise<T>;
  fromPersistence: (account: T) => Account;
}
