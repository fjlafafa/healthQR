import { TSMSPMessage } from "../TSMSPMessage";
import { RealName } from "Types/UserMeta/RealName";
import { Password } from "Types/UserMeta/Password";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { Roles } from "Types/UserMeta/Roles";
import { SecurityQuestion } from "Types/UserMeta/SecurityQuestion";
import { SecurityAnswer } from "Types/UserMeta/SecurityAnswer";
import { TSMSPReply } from "Impl/TSMSPReply";
import { Token } from "Types/UserMeta/Token";

export class UserRegisterMessage extends TSMSPMessage {
  realName: RealName;
  password: Password;
  identityNumber: IdentityNumber;
  role: Roles;
  securityQuestion: SecurityQuestion;
  securityAnswer: SecurityAnswer;

  constructor(
    realName: RealName,
    password: Password,
    identityNumber: IdentityNumber,
    securityQuestion: SecurityQuestion,
    securityAnswer: SecurityAnswer
  ) {
    super();
    this.realName = realName;
    this.password = password;
    this.identityNumber = identityNumber;
    this.role = Roles.normal;
    this.securityQuestion = securityQuestion;
    this.securityAnswer = securityAnswer;
  }
  override getReplyMessage(replyJson: TSMSPReply): Token {
    return JSON.parse(replyJson.message) as Token;
  }
}
