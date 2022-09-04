import {TSMSPMessage} from '../TSMSPMessage'
import {TSMSPReply} from "Impl/TSMSPReply";
import {Permission} from "Types/UserMeta/Permission";

export class UserCheckPermissionMessage extends TSMSPMessage {
    userToken : string
    constructor(userToken : string) {
        super()
        this.userToken = userToken
    }
    override getReplyMessage(replyJson: TSMSPReply): Permission {
        return JSON.parse(replyJson.message) as Permission
    }
}