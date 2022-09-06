import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Province } from "Types/PlaceMeta/Province";
import { Token } from "Types/UserMeta/Token";

export class UserSelectCityMessage extends TSMSPMessage {
  userToken: Token;
  province: Province;

  constructor(userToken: Token, province: Province) {
    super();
    this.userToken = userToken;
    this.province = province;
  }
}
