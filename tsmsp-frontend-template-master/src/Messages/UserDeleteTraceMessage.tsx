import {TSMSPMessage} from "Messages/TSMSPMessage";

export class UserUpdateTraceMessage extends TSMSPMessage {
    userToken : string
    trace : string
    constructor(userToken : string, trace : string) {
        super();
        this.userToken = userToken
        this.trace = trace
    }
}