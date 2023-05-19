import DomainError from '@/domain/core/errors/domain-error';

export default class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super('invalid-email', `The email "${email}" is invalid.`);
  }
}
