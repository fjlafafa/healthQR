import {TSMSPMessage} from '../TSMSPMessage'
import {Token} from "Types/UserMeta/Token";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";

export class HospitalUpdateVaccinationMessage extends TSMSPMessage {
    userToken : Token
    identityNumber : IdentityNumber
    constructor(userToken: Token, identityNumber : IdentityNumber) {
        super()
        this.userToken = userToken
        this.identityNumber = identityNumber
    }
}