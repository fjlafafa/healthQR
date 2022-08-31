import {TSMSPMessage} from './TSMSPMessage'

export class HospitalUpdateVaccinationMessage extends TSMSPMessage {
    identityNumber : string
    constructor(identityNumber : string) {
        super()
        this.identityNumber = identityNumber
    }
}