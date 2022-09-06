import {TSMSPMessage} from 'Messages/TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Password} from "Types/UserMeta/Password";

export class UserLoginMessage extends TSMSPMessage {
    identityNumber: IdentityNumber
    password: Password

    constructor(identityNumber: IdentityNumber, password: Password) {
        super()
        this.identityNumber = identityNumber
        this.password = password
    }
}