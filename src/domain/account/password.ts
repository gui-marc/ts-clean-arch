import { compare, hash } from 'bcrypt';

export default class Password {
  private _value: string;
  private hashed: boolean;

  constructor(value: string, hashed: boolean) {
    this._value = value;
    this.hashed = hashed;
  }

  public async getHashedValue(): Promise<string> {
    if (!this.hashed) {
      this._value = await hash(this.value, 12);
      this.hashed = true;
    }

    return this.value;
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

  public get value(): string {
    return this._value;
  }
}
