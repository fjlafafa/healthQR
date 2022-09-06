import {TSMSPMessage} from 'Messages/TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Password} from "Types/UserMeta/Password";
import {TSMSPReply} from "Impl/TSMSPReply";
import {Token} from "Types/UserMeta/Token";

export class UserLoginMessage extends TSMSPMessage {
    identityNumber: IdentityNumber
    password: Password

    constructor(identityNumber: IdentityNumber, password: Password) {
        super()
        this.identityNumber = identityNumber
        this.password = password
    }
    override getReplyMessage(replyJson: TSMSPReply): Token {
        return JSON.parse(replyJson.message) as Token
    }
}