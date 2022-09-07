import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Temperature } from "Types/UserMeta/Temperature";
import { Token } from "Types/UserMeta/Token";

export class UserUpdateTemperatureMessage extends TSMSPMessage {
  userToken: Token;
  temperature: Temperature;

  constructor(userToken: Token, temperature: Temperature) {
    super();
    this.userToken = userToken;
    this.temperature = temperature;
  }
}
