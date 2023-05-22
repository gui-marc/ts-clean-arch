import { Router } from 'express';

import accountRouter from './account';

const v1Router = Router();

v1Router.all('/account', accountRouter);

export default v1Router;
