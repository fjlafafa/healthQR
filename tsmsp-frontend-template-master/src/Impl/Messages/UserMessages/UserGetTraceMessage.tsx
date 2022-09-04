import {TSMSPMessage} from '../TSMSPMessage'
import {TSMSPReply} from "../../TSMSPReply";
import {Trace} from "Types/Trace";
import {Token} from "Types/UserMeta/Token";

export class UserGetTraceMessage extends TSMSPMessage {
    userToken : Token
    startTime : number
    endTime : number
    constructor(userToken : Token, startTime : number, endTime : number) {
        super()
        this.userToken = userToken
        this.startTime = startTime
        this.endTime = endTime
    }
    override getReplyMessage(replyJson: TSMSPReply): Trace[] {
        return JSON.parse(replyJson.message) as Trace[]
    }
}