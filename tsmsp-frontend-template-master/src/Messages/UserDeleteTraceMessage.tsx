import {TSMSPMessage} from "Messages/TSMSPMessage";

export class UserDeleteTraceMessage extends TSMSPMessage {
    userToken : string
    trace : number
    constructor(userToken : string, trace : number) {
        super();
        this.userToken = userToken
        this.trace = trace
    }
}