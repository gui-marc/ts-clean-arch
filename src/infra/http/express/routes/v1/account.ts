import { Router } from 'express';

import CreateAccount from '@/application/account/use-cases/create-account';
import PostgresAccountAdapter from '@/infra/database/postgres/adapters/pg-account-adapter';
import PgAccountRepository from '@/infra/database/postgres/repositories/pg-account-repository';

import adaptController from '../../adapters/adaptController';

const accountRouter = Router();

const accountRepository = new PgAccountRepository(new PostgresAccountAdapter());

const createAccountUseCase = new CreateAccount(accountRepository);

accountRouter.post('/create', adaptController(createAccountUseCase));

export default accountRouter;
