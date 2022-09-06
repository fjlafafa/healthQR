import {TSMSPMessage} from '../TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {SecurityAnswer} from "Types/UserMeta/SecurityAnswer";

export class UserSendSecurityAnswerMessage extends TSMSPMessage {
    identityNumber: IdentityNumber
    securityAnswer: SecurityAnswer

    constructor(identityNumber: IdentityNumber, securityAnswer: SecurityAnswer) {
        super()
        this.identityNumber = identityNumber
        this.securityAnswer = securityAnswer
    }
}