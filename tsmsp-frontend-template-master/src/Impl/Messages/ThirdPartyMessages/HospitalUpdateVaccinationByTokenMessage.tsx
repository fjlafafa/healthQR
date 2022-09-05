import {TSMSPMessage} from '../TSMSPMessage'
import {Token} from "Types/UserMeta/Token";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";

export class HospitalUpdateVaccinationByTokenMessage extends TSMSPMessage {
    userToken : Token
    clientToken : Token
    constructor(userToken: Token, clientToken : Token) {
        super()
        this.userToken = userToken
        this.clientToken = clientToken
    }
}