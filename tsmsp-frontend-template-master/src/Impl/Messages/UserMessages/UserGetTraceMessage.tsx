import {TSMSPMessage} from '../TSMSPMessage'
import {TSMSPReply} from "../../TSMSPReply";
import {Trace} from "Types/Trace";

export class UserGetTraceMessage extends TSMSPMessage {
    userToken : string
    startTime : number
    endTime : number
    constructor(userToken : string, startTime : number, endTime : number) {
        super()
        this.userToken = userToken
        this.startTime = startTime
        this.endTime = endTime
    }
    override getReplyMessage(replyJson: TSMSPReply): Trace[] {
        return JSON.parse(replyJson.message) as Trace[]
    }
}