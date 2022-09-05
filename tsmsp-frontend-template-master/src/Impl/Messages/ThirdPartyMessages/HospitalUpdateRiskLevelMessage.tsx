import {TSMSPMessage} from 'Messages/TSMSPMessage'
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {UserRiskLevel} from "Types/UserMeta/UserRiskLevel";
import {Token} from "Types/UserMeta/Token";

export class HospitalUpdateRiskLevelMessage extends TSMSPMessage {
    userToken: Token
    identityNumber: IdentityNumber
    riskLevel: UserRiskLevel

    constructor(userToken: Token, identityNumber: IdentityNumber, riskLevel: UserRiskLevel) {
        super()
        this.userToken = userToken
        this.identityNumber = identityNumber
        this.riskLevel = riskLevel
    }
}