import type AccountRepository from '@/application/account/account-repository';
import NotFoundError from '@/application/core/errors/not-found-error';
import type Account from '@/domain/account/account';
import Email from '@/domain/account/email';
import InvalidEmailError from '@/domain/account/errors/invalid-email-error';
import InvalidUuidError from '@/domain/account/errors/invalid-id-error';
import UUID from '@/domain/account/id';
import { type Optional } from '@/domain/core/optional';
import type PostgresAccountAdapter from '@/infra/database/postgres/adapters/pg-account-adapter';
import pgClient from '@/infra/database/postgres/postgres';

export default class PgAccountRepository implements AccountRepository {
  constructor(private readonly adapter: PostgresAccountAdapter) {}

  async create(acc: Account): Promise<void> {
    const account = await this.adapter.fromDomain(acc);

    await pgClient.query(
      `
            insert into account (id, name, email, password, created_at, updated_at)
            values ($1, $2, $3, $4, $5, $6);
    `,
      [
        account.id,
        account.name,
        account.email,
        account.password,
        account.created_at,
        account.updated_at,
      ]
    );
  }

  async findById(id: string): Promise<Optional<Account, NotFoundError>> {
    if (!UUID.validate(id)) {
      return [null, new InvalidUuidError(id)];
    }

    const query = `select * from account where id = $1;`;
    const found = await pgClient.query(query, [id]);

    if (found.rows.length === 0) {
      return [null, new NotFoundError('Account not found')];
    }

    const acc = found.rows[0];
    return [this.adapter.fromPersistence(acc), null];
  }

  async findByEmail(email: string): Promise<Optional<Account, NotFoundError>> {
    if (!Email.validate(email)) {
      return [null, new InvalidEmailError(email)];
    }

    const query = `select * from account where email = $1;`;

    const found = await pgClient.query(query, [email]);
    if (found.rows.length === 0) {
      return [null, new NotFoundError('Account not found')];
    }

    const acc = found.rows[0];
    return [this.adapter.fromPersistence(acc), null];
  }

  async exists(email: string): Promise<boolean> {
    if (!Email.validate(email)) return false;

    const query = `select email from account where email = $1;`;
    const found = await pgClient.query(query, [email]);
    return found.rows.length > 0;
  }
}
