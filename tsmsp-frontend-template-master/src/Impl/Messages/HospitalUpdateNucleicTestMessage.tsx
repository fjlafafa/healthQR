import {TSMSPMessage} from './TSMSPMessage'

export class HospitalUpdateNucleicTestMessage extends TSMSPMessage {
    identityNumber : string
    constructor(identityNumber : string) {
        super()
        this.identityNumber = identityNumber
    }
}