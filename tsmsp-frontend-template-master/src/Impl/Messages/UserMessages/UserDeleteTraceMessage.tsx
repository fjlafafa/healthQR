import {TSMSPMessage} from '../TSMSPMessage'
import {Token} from "Types/UserMeta/Token";
import {TraceId} from "Types/TraceMeta/TraceId";

export class UserDeleteTraceMessage extends TSMSPMessage {
    userToken : Token
    trace : TraceId
    constructor(userToken : Token, trace : TraceId) {
        super()
        this.userToken = userToken
        this.trace = trace
    }
}