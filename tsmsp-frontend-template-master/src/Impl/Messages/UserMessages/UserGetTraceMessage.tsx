import {TSMSPMessage} from '../TSMSPMessage'

export class UserGetTraceMessage extends TSMSPMessage {
    userToken : string
    startTime : number
    endTime : number
    constructor(userToken : string, startTime : number, endTime : number) {
        super()
        this.userToken = userToken
        this.startTime = startTime
        this.endTime = endTime
    }
}