import type AccountRepository from '@/application/account/account-repository';
import NotFoundError from '@/application/core/errors/not-found-error';
import type Account from '@/domain/account/account';
import { type Optional } from '@/domain/core/optional';

import type PostgresAccountAdapter from './adapters/pg-account-adapter';
import pgClient from './postgres';

export default class PgAccountRepository implements AccountRepository {
  constructor(private readonly adapter: PostgresAccountAdapter) {}

  async create(acc: Account): Promise<void> {
    await pgClient.query(
      `
            insert into account (id, name, email, password, created_at, updated_at)
            values ($1, $2, $3, $4, $5, $6);
    `,
      [
        acc.id,
        acc.name.value,
        acc.email.value,
        await acc.password.getHashedValue(),
        acc.createdAt,
        acc.updatedAt,
      ]
    );
  }

  async findById(id: string): Promise<Optional<Account, NotFoundError>> {
    const query = `select * from account where id = $1;`;
    const found = await pgClient.query(query, [id]);

    if (found.rows.length === 0) {
      return [null, new NotFoundError('Account not found')];
    }

    const acc = found.rows[0];
    return [this.adapter.fromPersistence(acc), null];
  }

  async findByEmail(email: string): Promise<Optional<Account, NotFoundError>> {
    const query = `select * from account where email = $1;`;

    const found = await pgClient.query(query, [email]);
    if (found.rows.length === 0) {
      return [null, new NotFoundError('Account not found')];
    }

    const acc = found.rows[0];
    return [this.adapter.fromPersistence(acc), null];
  }

  async exists(email: string): Promise<boolean> {
    const query = `select email from account where email = $1;`;
    const found = await pgClient.query(query, [email]);
    return found.rows.length > 0;
  }
}
