import {JacksonSerializable} from "Impl/JacksonSerializable";

export abstract class DoubleClass extends JacksonSerializable {
    value: number

    constructor(value: number) {
        super()
        this.value = value
    }
}