import DomainError from '@/domain/core/errors/domain-error';

export default class InvalidPasswordError extends DomainError {
  constructor() {
    super('invalid-password', `The password is invalid.`);
  }
}
