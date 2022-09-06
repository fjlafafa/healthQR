import {TSMSPMessage} from '../TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";

export class UserGetSecurityQuestionMessage extends TSMSPMessage {
    identityNumber: IdentityNumber

    constructor(identityNumber: IdentityNumber) {
        super()
        this.identityNumber = identityNumber
    }
}