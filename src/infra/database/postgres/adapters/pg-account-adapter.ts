import type AccountAdapter from '@/application/account/account-adapter';
import Account from '@/domain/account/account';

export interface AccountPersistence {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export default class PostgresAccountAdapter
  implements AccountAdapter<AccountPersistence>
{
  async fromDomain(account: Account): Promise<AccountPersistence> {
    return {
      id: account.id,
      name: account.name.value,
      email: account.email.value,
      password: await account.password.getHashedValue(),
      created_at: account.createdAt,
      updated_at: account.updatedAt,
    };
  }

  fromPersistence(account: AccountPersistence): Account {
    const [acc, err] = Account.create({
      name: account.name,
      email: account.email,
      password: account.password,
      id: account.id,
      createdAt: account.created_at,
      updatedAt: account.updated_at,
      hashed: true,
    });

    if (err) {
      throw new Error(`${err.name}: ${err.message}`);
    }

    return acc;
  }
}
