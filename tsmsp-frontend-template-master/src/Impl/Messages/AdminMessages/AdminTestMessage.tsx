import {TSMSPMessage} from '../TSMSPMessage'
import {TSMSPReply} from "../../TSMSPReply";
import {Place} from "../../../Types/Place";

//We can test communication here
export class AdminTestMessage extends TSMSPMessage {
    userToken : string
    constructor(userToken : string) {
        super()
        this.userToken = userToken
    }
    getReplyMessage(replyJson: TSMSPReply) {
        //const message = JSON.parse(replyJson.message) as Place
        //return message
        return replyJson.message
    }
}