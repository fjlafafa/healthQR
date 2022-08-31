import {TSMSPMessage} from './TSMSPMessage'

//We can test communication here
export class AdminTestMessage extends TSMSPMessage {
    userToken : string
    constructor(userToken : string) {
        super()
        this.userToken = userToken
    }
    static getReply(replyJSON)
}