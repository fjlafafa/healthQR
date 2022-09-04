import {TSMSPMessage} from '../TSMSPMessage'
import {TSMSPReply} from "../../TSMSPReply";
import {RealName} from "Types/UserMeta/RealName";
import {Password} from "Types/UserMeta/Password";

export class UserLoginMessage extends TSMSPMessage {
    realName : RealName
    password : Password
    constructor(userName : RealName, password : Password) {
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