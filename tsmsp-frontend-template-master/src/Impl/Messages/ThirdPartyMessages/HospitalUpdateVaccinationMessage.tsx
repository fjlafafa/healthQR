import {TSMSPMessage} from '../TSMSPMessage'

export class HospitalUpdateVaccinationMessage extends TSMSPMessage {
    identityNumber : string
    token : string
    vaccine : string
    constructor(token: string, identityNumber : string, vaccine: string) {
        super()
        this.identityNumber = identityNumber
        this.token = token
        this.vaccine = vaccine
    }
}