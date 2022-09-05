import {TSMSPMessage} from '../TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {UserRiskLevel} from "Types/UserMeta/UserRiskLevel";
import {Token} from "Types/UserMeta/Token";

export class HospitalUpdateRiskLevelByTokenMessage extends TSMSPMessage {
    userToken : Token
    clientToken : Token
    riskLevel : UserRiskLevel
    constructor(userToken: Token, clientToken : Token, riskLevel : UserRiskLevel) {
        super()
        this.userToken = userToken
        this.clientToken = clientToken
        this.riskLevel = riskLevel
    }
}