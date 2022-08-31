import {JacksonSerializable} from '../JacksonSerializable'
import {TSMSPReply} from "../Replies/TSMSPReply";


export abstract class TSMSPMessage extends JacksonSerializable {
    getReplyMessage(replyJson: TSMSPReply):any {
        return replyJson.message
    }
}