import ApplicationError from './application-error';

export default class AlreadyExistsError extends ApplicationError {
  constructor(subject: string) {
    super('already-exists', `${subject} already exists`);
  }
}
