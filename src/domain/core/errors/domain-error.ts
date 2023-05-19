export default abstract class DomainError {
  constructor(public readonly name: string, public readonly message: string) {}
}
