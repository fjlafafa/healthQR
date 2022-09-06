import { JacksonSerializable } from "Impl/JacksonSerializable";
import { TSMSPReply } from "Impl/TSMSPReply";

export abstract class TSMSPMessage extends JacksonSerializable {
  getReplyMessage(replyJson: TSMSPReply): any {
    return replyJson.message;
  }
}
