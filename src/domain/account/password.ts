import { compare, hash } from 'bcrypt';

export default class Password {
  readonly value: string;
  readonly hashed: boolean;

  constructor(value: string, hashed: boolean) {
    this.value = value;
    this.hashed = hashed;
  }

  public async getHashedValue(): Promise<string> {
    return this.hashed ? this.value : await hash(this.value, 12);
  }

  public async compare(value: string): Promise<boolean> {
    if (this.hashed) {
      return await compare(value, this.value);
    }

    return value === this.value;
  }

  static fromValue(value: string): Password {
    return new Password(value, false);
  }

  static fromHash(value: string): Password {
    return new Password(value, true);
  }

  static validate(password: string): boolean {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    return regex.test(password);
  }
}
