export default class Name {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Name {
    return new Name(value);
  }

  // name should have at least 2 characters
  static validate(name: string): boolean {
    return name.length >= 2;
  }
}
