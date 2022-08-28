import {JacksonSerializable} from "./JacksonSerializable";

export class TSMSPReply extends JacksonSerializable {
    status : number
    message : string
    constructor(status : number, message : string) {
        super();
        this.status = status
        this.message = message
    }
}