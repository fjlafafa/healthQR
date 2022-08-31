import {JacksonSerializable} from "Impl/JacksonSerializable";

export abstract class NameClass extends JacksonSerializable {
    name: string
    constructor(name: string) {
        super()
        this.name = name
    }
}