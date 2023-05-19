export default class Password {
  readonly value: string;
  readonly hashed: string;

  constructor(value: string, hashed?: string) {
    this.value = value;
    this.hashed = hashed || Password.hash(value);
  }

  static hash(value: string): string {
    return value;
  }

  static create(value: string): Password {
    return new Password(value);
  }

  static validate(password: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
  }
}
