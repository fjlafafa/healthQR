import { TSMSPMessage } from "Messages/TSMSPMessage";
import { TSMSPReply } from "Impl/TSMSPReply";
import { Token } from "Types/UserMeta/Token";

//We can test communication here
export class AdminTestMessage extends TSMSPMessage {
  userToken: Token;

  constructor(userToken: Token) {
    super();
    this.userToken = userToken;
  }

  override getReplyMessage(replyJson: TSMSPReply) {
    return replyJson.message;
  }
}
