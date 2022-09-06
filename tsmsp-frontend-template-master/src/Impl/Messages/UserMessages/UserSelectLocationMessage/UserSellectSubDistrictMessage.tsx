import { TSMSPMessage } from "Messages/TSMSPMessage";
import { Province } from "Types/PlaceMeta/Province";
import { City } from "Types/PlaceMeta/City";
import { District } from "Types/PlaceMeta/District";
import { Token } from "Types/UserMeta/Token";

export class UserSelectCityMessage extends TSMSPMessage {
  userToken: Token;
  province: Province;
  city: City;
  district: District;

  constructor(
    userToken: Token,
    province: Province,
    city: City,
    district: District
  ) {
    super();
    this.userToken = userToken;
    this.province = province;
    this.city = city;
    this.district = district;
  }
}
