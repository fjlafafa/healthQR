import {JacksonSerializable} from '../JacksonSerializable'
import {TSMSPReply} from "../TSMSPReply";


export abstract class TSMSPMessage extends JacksonSerializable {
    getReplyMessage(replyJson: TSMSPReply): string {
        return replyJson.message
    }
}