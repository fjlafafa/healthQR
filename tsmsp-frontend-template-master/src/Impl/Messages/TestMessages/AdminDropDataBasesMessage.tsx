import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Token } from "Types/UserMeta/Token";

export class AdminDropDataBasesMessage extends TSMSPMessage {
  userToken: Token;

  constructor(userToken: Token) {
    super();
    this.userToken = userToken;
  }
}
