import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Token } from "Types/UserMeta/Token";
import { SecurityAnswer } from "Types/UserMeta/SecurityAnswer";

export class UserUpdateSecurityAnswerMessage extends TSMSPMessage {
  userToken: Token;
  securityAnswer: SecurityAnswer;

  constructor(userToken: Token, securityAnswer: SecurityAnswer) {
    super();
    this.userToken = userToken;
    this.securityAnswer = securityAnswer;
  }
}
