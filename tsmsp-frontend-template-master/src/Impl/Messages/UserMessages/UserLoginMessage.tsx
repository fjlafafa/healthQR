import {TSMSPMessage} from '../TSMSPMessage'
import {TSMSPReply} from "../../TSMSPReply";

export class UserLoginMessage extends TSMSPMessage {
    realName : string
    password : string
    constructor(userName : string, password : string) {
        super()
        this.realName = userName
        this.password = password
    }
    getReplyMessage(replyJson: TSMSPReply) {
        //const message = JSON.parse(replyJson.message) as Place
        //return message
        return replyJson.message
    }
}