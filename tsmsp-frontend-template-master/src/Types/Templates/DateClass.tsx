import { JacksonSerializable } from "Impl/JacksonSerializable";

export class DateClass extends JacksonSerializable {
  millis: number;

  constructor(millis: number) {
    super();
    this.millis = millis;
  }
}
