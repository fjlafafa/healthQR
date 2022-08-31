import {JacksonSerializable} from "../../Impl/JacksonSerializable";

export abstract class TokenClass extends JacksonSerializable {
    token: string
    constructor(token: string) {
        super()
        this.token = token
    }
}