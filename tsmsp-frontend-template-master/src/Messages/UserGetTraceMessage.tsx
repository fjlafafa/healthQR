import {TSMSPMessage} from "Messages/TSMSPMessage";

export class UserGetTraceMessage extends TSMSPMessage {
    userToken : string
    startTime : number
    endTime : number
    constructor(userToken : string, startTime : number, endTime : number) {
        super();
        this.userToken = userToken
        this.startTime = startTime
        this.endTime = endTime
    }
}