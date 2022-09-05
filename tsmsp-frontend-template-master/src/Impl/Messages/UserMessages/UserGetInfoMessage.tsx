import {TSMSPMessage} from "Messages/TSMSPMessage";
import {TSMSPReply} from "Impl/TSMSPReply";
import {Token} from "Types/UserMeta/Token";
import {UserInformation} from "Types/UserInformation";

export class UserGetInfoMessage extends TSMSPMessage {
    userToken: Token

    constructor(userToken: Token) {
        super()
        this.userToken = userToken
    }

    override getReplyMessage(replyJson: TSMSPReply): UserInformation {
        return JSON.parse(replyJson.message) as UserInformation
    }
}