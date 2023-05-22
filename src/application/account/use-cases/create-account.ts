import { badRequest, created, type HttpRequest } from '@/application/core/http';
import UseCase from '@/application/core/use-case';
import Account, { type IAccountProps } from '@/domain/account/account';

import type AccountRepository from '../account-repository';

export default class CreateAccount extends UseCase {
  constructor(private readonly accountRepository: AccountRepository) {
    super('Create Account');
  }

  async run(request: HttpRequest<IAccountProps>) {
    const { name, email, password } = request.body;

    const [account, error] = Account.create({ name, email, password });

    if (error) {
      return badRequest(error.message);
    }

    if (await this.accountRepository.exists(email)) {
      return badRequest('Email already in use');
    }

    await this.accountRepository.create(account);

    return created(account.toJson());
  }
}
