import DomainError from '@/domain/core/errors/domain-error';

export default class InvalidUuidError extends DomainError {
  constructor(uuid: string) {
    super('invalid-uuid', `The uuid ${uuid} is invalid.`);
  }
}
