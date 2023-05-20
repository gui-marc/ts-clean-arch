import ApplicationError from './application-error';

export default class NotFoundError extends ApplicationError {
  constructor(subject: string) {
    super('not-found', `Could not find ${subject}`);
  }
}
