import { type HttpRequest, type HttpResponse } from './http';

export default abstract class UseCase {
  constructor(readonly name: string) {}

  abstract run(
    request: HttpRequest,
    response: HttpResponse
  ): Promise<HttpResponse>;
}
