import {TSMSPMessage} from '../TSMSPMessage'
import {TSMSPReply} from "Impl/TSMSPReply";
import {Permission} from "Types/UserMeta/Permission";
import {Token} from "Types/UserMeta/Token";

export class UserCheckPermissionMessage extends TSMSPMessage {
    userToken : Token
    constructor(userToken : Token) {
        super()
        this.userToken = userToken
    }
    override getReplyMessage(replyJson: TSMSPReply): Permission {
        return JSON.parse(replyJson.message) as Permission
    }
}