import { JacksonSerializable } from "Impl/JacksonSerializable";

export abstract class IDClass extends JacksonSerializable {
  id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }
}
