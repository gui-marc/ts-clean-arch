import type DomainError from './errors/domain-error';

export type Optional<S = unknown, E = DomainError> = [S, null] | [null, E];

// export default class Optional<S = unknown, E = DomainError> {
//   private constructor(
//     private readonly value: S | null,
//     private readonly error: E | null
//   ) {}

//   getError(): null | E {
//     return this.error;
//   }

//   getValue(): S | null {
//     return this.value;
//   }

//   static success<T>(value: T) {
//     return new Optional<T, never>(value, null);
//   }

//   static error<T>(error: T) {
//     return new Optional<never, T>(null, error);
//   }
// }
