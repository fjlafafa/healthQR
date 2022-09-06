import { TSMSPMessage } from "Messages/TSMSPMessage";
import { TSMSPReply } from "Impl/TSMSPReply";
import { Token } from "Types/UserMeta/Token";
import { UserInformation } from "Types/UserInformation";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";

export class UserGetOthersInfoMessage extends TSMSPMessage {
  userToken: Token;
  identityNumber: IdentityNumber;

  constructor(userToken: Token, identityNumber: IdentityNumber) {
    super();
    this.userToken = userToken;
    this.identityNumber = identityNumber;
  }

  override getReplyMessage(replyJson: TSMSPReply): UserInformation {
    return JSON.parse(replyJson.message) as UserInformation;
  }
}
