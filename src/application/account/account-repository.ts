import type Account from '@/domain/account/account';
import type InvalidEmailError from '@/domain/account/errors/invalid-email-error';
import { type Optional } from '@/domain/core/optional';

import type NotFoundError from '../core/errors/not-found-error';

export default interface AccountRepository {
  create: (account: Account) => Promise<void>;
  exists: (email: string) => Promise<boolean>;
  findById: (id: string) => Promise<Optional<Account, NotFoundError>>;
  findByEmail: (
    email: string
  ) => Promise<Optional<Account, NotFoundError | InvalidEmailError>>;
}
