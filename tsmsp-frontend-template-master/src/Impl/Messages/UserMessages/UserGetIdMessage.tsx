import {TSMSPMessage} from "Messages/TSMSPMessage";
import {Token} from "Types/UserMeta/Token";
import {TSMSPReply} from "Impl/TSMSPReply";
import {RealName} from "Types/UserMeta/RealName";
import {UserId} from "Types/UserMeta/UserId";

export class UserGetIdMessage extends TSMSPMessage {
    userToken: Token

    constructor(userToken: Token) {
        super()
        this.userToken = userToken
    }

    override getReplyMessage(replyJson: TSMSPReply): UserId {
        return JSON.parse(replyJson.message) as UserId
    }
}