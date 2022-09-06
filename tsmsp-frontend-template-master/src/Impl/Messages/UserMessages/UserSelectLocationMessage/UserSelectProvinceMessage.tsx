import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Token } from "Types/UserMeta/Token";

export class UserSelectProvinceMessage extends TSMSPMessage {
  userToken: Token;

  constructor(userToken: Token) {
    super();
    this.userToken = userToken;
  }
}
