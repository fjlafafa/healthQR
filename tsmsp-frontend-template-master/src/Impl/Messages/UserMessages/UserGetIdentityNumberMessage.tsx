import {TSMSPMessage} from "Messages/TSMSPMessage";
import {Token} from "Types/UserMeta/Token";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {TSMSPReply} from "Impl/TSMSPReply";

export class UserGetIdentityNumberMessage extends TSMSPMessage {
    userToken: Token
    constructor(userToken: Token) {
        super()
        this.userToken=userToken
    }
    override getReplyMessage(replyJson: TSMSPReply): any {
        return JSON.parse(replyJson.message) as IdentityNumber
    }
}