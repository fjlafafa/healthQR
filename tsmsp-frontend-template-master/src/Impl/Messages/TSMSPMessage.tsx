import {JacksonSerializable} from '../JacksonSerializable'
import {TSMSPReply} from "../TSMSPReply";


export abstract class TSMSPMessage extends JacksonSerializable {
    getReplyMessage(replyJson: TSMSPReply): any {
        return replyJson.message
    }
}