import {TSMSPMessage} from '../TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {SecurityAnswer} from "Types/UserMeta/SecurityAnswer";
import {TSMSPReply} from "Impl/TSMSPReply";
import {Token} from "Types/UserMeta/Token";

export class UserSendSecurityAnswerMessage extends TSMSPMessage {
    identityNumber: IdentityNumber
    securityAnswer: SecurityAnswer

    constructor(identityNumber: IdentityNumber, securityAnswer: SecurityAnswer) {
        super()
        this.identityNumber = identityNumber
        this.securityAnswer = securityAnswer
    }
    override getReplyMessage(replyJson: TSMSPReply): Token {
        return JSON.parse(replyJson.message) as Token
    }
}