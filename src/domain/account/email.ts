export default class Email {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Email {
    return new Email(value);
  }

  static validate(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
