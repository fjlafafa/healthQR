import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Token } from "Types/UserMeta/Token";
import { IdentityNumber } from "Types/UserMeta/IdentityNumber";
import { UserRiskLevel } from "Types/UserMeta/UserRiskLevel";

export class GovernorUpdateRiskOfUserMessage extends TSMSPMessage {
  userToken: Token;
  identityNumber: IdentityNumber;
  userRiskLevel: UserRiskLevel;

  constructor(
    userToken: Token,
    identityNumber: IdentityNumber,
    userRiskLevel: UserRiskLevel
  ) {
    super();
    this.userToken = userToken;
    this.identityNumber = identityNumber;
    this.userRiskLevel = userRiskLevel;
  }
}
