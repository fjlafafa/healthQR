import {TSMSPMessage} from '../TSMSPMessage'

export class HospitalUpdateVaccinationMessage extends TSMSPMessage {
    identityNumber : string
    token : string
    constructor(token: string, identityNumber : string) {
        super()
        this.identityNumber = identityNumber
        this.token = token
    }
}