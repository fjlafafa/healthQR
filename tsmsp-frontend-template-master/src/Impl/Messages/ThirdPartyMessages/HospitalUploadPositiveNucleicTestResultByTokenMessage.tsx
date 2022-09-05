import {TSMSPMessage} from '../TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {UserRiskLevel} from "Types/UserMeta/UserRiskLevel";
import {Token} from "Types/UserMeta/Token";

export class HospitalUploadPositiveNucleicTestResultByTokenMessage extends TSMSPMessage {
    userToken : Token
    clientToken : Token
    constructor(userToken: Token, clientToken : Token) {
        super()
        this.userToken = userToken
        this.clientToken = clientToken
    }
}