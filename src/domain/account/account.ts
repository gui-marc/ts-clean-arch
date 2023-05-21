import { randomUUID } from 'crypto';

import Email from '@/domain/account/email';
import Name from '@/domain/account/name';
import { type Optional } from '@/domain/core/optional';

import InvalidEmailError from './errors/invalid-email-error';
import InvalidUuidError from './errors/invalid-id-error';
import InvalidNameError from './errors/invalid-name-error';
import InvalidPasswordError from './errors/invalid-password-error';
import UUID from './id';
import Password from './password';

export interface IAccountProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  hashed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Account {
  readonly id: UUID;
  readonly name: Name;
  readonly email: Email;
  readonly password: Password;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: IAccountProps) {
    this.id = props.id ? new UUID(props.id) : UUID.random();
    this.name = new Name(props.name);
    this.email = new Email(props.email);
    this.password = new Password(props.password, !!props.hashed);
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(
    props: IAccountProps
  ): Optional<Account, InvalidEmailError | InvalidNameError> {
    if (!Name.validate(props.name)) {
      return [null, new InvalidNameError(props.name)];
    }

    if (!Email.validate(props.email)) {
      return [null, new InvalidEmailError(props.email)];
    }

    if (!props.hashed && !Password.validate(props.password)) {
      return [null, new InvalidPasswordError()];
    }

    if (props.id && !UUID.validate(props.id)) {
      return [null, new InvalidUuidError(props.id)];
    }

    return [new Account(props), null];
  }

  toJson() {
    return {
      id: this.id,
      name: this.name.value,
      email: this.email.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
