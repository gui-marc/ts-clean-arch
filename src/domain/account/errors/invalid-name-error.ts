import DomainError from '@/domain/core/errors/domain-error';

export default class InvalidNameError extends DomainError {
  constructor(name: string) {
    super('invalid-name', `The name "${name}" is invalid.`);
  }
}
