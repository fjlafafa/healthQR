import {TSMSPMessage} from '../TSMSPMessage'
import {TSMSPReply} from "../../TSMSPReply";
import {Place} from "../../../Types/Place";
import {Token} from "Types/UserMeta/Token";

//We can test communication here
export class AdminTestMessage extends TSMSPMessage {
    userToken : Token
    constructor(userToken : Token) {
        super()
        this.userToken = userToken
    }
    override getReplyMessage(replyJson: TSMSPReply) {
        //const message = JSON.parse(replyJson.message) as Place
        //return message
        return replyJson.message
    }
}