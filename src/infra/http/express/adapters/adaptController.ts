import { type Request, type Response } from 'express';

import type UseCase from '@/application/core/use-case';

export default function adaptController(
  useCase: UseCase
): (request: Request, response: Response) => void {
  return function (request: Request, response: Response) {
    useCase
      .run(request)
      .then((result) => response.status(result.status).json(result.body))
      .catch((e) => {
        console.error(e);
        response.status(500).json({ error: 'Internal Server Error' });
      })
      .finally(() => response.end());
  };
}
