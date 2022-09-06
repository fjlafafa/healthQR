import { TSMSPMessage } from "Messages/TSMSPMessage";
import { TSMSPReply } from "Impl/TSMSPReply";
import { Roles } from "Types/UserMeta/Roles";
import { Token } from "Types/UserMeta/Token";

export class UserCheckRoleMessage extends TSMSPMessage {
  userToken: Token;

  constructor(userToken: Token) {
    super();
    this.userToken = userToken;
  }

  override getReplyMessage(replyJson: TSMSPReply): Roles {
    return JSON.parse(replyJson.message) as Roles;
  }
}
