export abstract class JacksonSerializable {
  public type = this.getName();

  public getName() {
    return this.constructor.name;
  }
}
