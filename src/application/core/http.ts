export interface HttpRequest<
  TBody = unknown,
  TParams = unknown,
  TQuery = unknown,
  THeaders = unknown
> {
  body: TBody;
  params: TParams;
  query: TQuery;
  headers: THeaders;
}

export interface HttpResponse<TBody = unknown> {
  status: number;
  body?: TBody;
}

export function ok<T>(dto?: T): HttpResponse<T> {
  return {
    status: 200,
    body: dto,
  };
}

export function created<T>(dto?: T): HttpResponse<T> {
  return {
    status: 201,
    body: dto,
  };
}

export function noContent(): HttpResponse {
  return {
    status: 204,
  };
}

export function badRequest<T>(error: T): HttpResponse<T> {
  return {
    status: 400,
    body: error,
  };
}

export function unauthorized<T>(error: T): HttpResponse<T> {
  return {
    status: 401,
    body: error,
  };
}

export function forbidden<T>(error: T): HttpResponse<T> {
  return {
    status: 403,
    body: error,
  };
}

export function notFound<T>(error: T): HttpResponse<T> {
  return {
    status: 404,
    body: error,
  };
}
