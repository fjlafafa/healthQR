import {TSMSPMessage} from "Messages/TSMSPMessage";
import {Token} from "Types/UserMeta/Token";
import {TSMSPReply} from "Impl/TSMSPReply";
import {Permission} from "Types/UserMeta/Permission";
import {RealName} from "Types/UserMeta/RealName";

export class UserGetRealNameMessage extends TSMSPMessage {
    userToken : Token
    constructor(userToken : Token) {
        super()
        this.userToken = userToken
    }
    override getReplyMessage(replyJson: TSMSPReply): RealName {
        return JSON.parse(replyJson.message) as RealName
    }
}