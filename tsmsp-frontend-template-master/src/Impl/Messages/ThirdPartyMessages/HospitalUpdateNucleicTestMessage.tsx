import {TSMSPMessage} from '../TSMSPMessage'

export class HospitalUpdateNucleicTestMessage extends TSMSPMessage {
    identityNumber : string
    token : string


    constructor(identityNumber: string, token: string) {
        super()
        this.identityNumber = identityNumber
        this.token = token
    }
}