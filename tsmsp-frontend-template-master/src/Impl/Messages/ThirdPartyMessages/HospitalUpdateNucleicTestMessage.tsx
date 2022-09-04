import {TSMSPMessage} from '../TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Token} from "Types/UserMeta/Token";

export class HospitalUpdateNucleicTestMessage extends TSMSPMessage {
    userToken : Token
    identityNumber : IdentityNumber


    constructor(userToken : Token, identityNumber: IdentityNumber) {
        super()
        this.userToken = userToken
        this.identityNumber = identityNumber
    }
}