import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Token } from "Types/UserMeta/Token";

export class HospitalUpdatePatientRecoveryByTokenMessage extends TSMSPMessage {
  userToken: Token;
  clientToken: Token;

  constructor(userToken: Token, clientToken: Token) {
    super();
    this.userToken = userToken;
    this.clientToken = clientToken;
  }
}
