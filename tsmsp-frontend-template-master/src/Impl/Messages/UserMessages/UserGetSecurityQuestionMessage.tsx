import {TSMSPMessage} from '../TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {TSMSPReply} from "Impl/TSMSPReply";
import {SecurityQuestion} from "Types/UserMeta/SecurityQuestion";

export class UserGetSecurityQuestionMessage extends TSMSPMessage {
    identityNumber: IdentityNumber

    constructor(identityNumber: IdentityNumber) {
        super()
        this.identityNumber = identityNumber
    }
    override getReplyMessage(replyJson: TSMSPReply): SecurityQuestion {
        return JSON.parse(replyJson.message) as SecurityQuestion
    }
}