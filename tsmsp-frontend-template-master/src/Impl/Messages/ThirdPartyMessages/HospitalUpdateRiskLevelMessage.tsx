import {TSMSPMessage} from '../TSMSPMessage'

export class HospitalUpdateRiskLevelMessage extends TSMSPMessage {
    identityNumber : string
    riskLevel : string
    constructor(identityNumber : string, riskLevel : string) {
        super()
        this.identityNumber = identityNumber
        this.riskLevel = riskLevel
    }
}