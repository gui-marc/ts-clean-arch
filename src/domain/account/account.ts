import Email from '@/domain/account/email';
import Name from '@/domain/account/name';
import Optional from '@/domain/core/optional';

import InvalidEmailError from './errors/invalid-email-error';
import InvalidNameError from './errors/invalid-name-error';
import InvalidPasswordError from './errors/invalid-password-error';
import Password from './password';

interface IAccountProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default class Account {
  readonly id: string;
  readonly name: Name;
  readonly email: Email;
  readonly password: Password;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: IAccountProps) {
    this.id = props.id;
    this.name = new Name(props.name);
    this.email = new Email(props.email);
    this.password = new Password(props.password);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(
    props: IAccountProps
  ): Optional<Account, InvalidEmailError | InvalidNameError> {
    if (!Name.validate(props.name)) {
      return Optional.error(new InvalidNameError(props.name));
    }

    if (!Email.validate(props.email)) {
      return Optional.error(new InvalidEmailError(props.email));
    }

    if (!Password.validate(props.password)) {
      return Optional.error(new InvalidPasswordError());
    }

    return Optional.success(new Account(props));
  }
}
