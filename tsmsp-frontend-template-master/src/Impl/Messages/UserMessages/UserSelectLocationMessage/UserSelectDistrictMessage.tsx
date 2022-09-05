import {TSMSPMessage} from "Messages/TSMSPMessage";
import {Province} from "Types/PlaceMeta/Province";
import {City} from "Types/PlaceMeta/City";
import {Token} from "Types/UserMeta/Token";

export class UserSelectCityMessage extends TSMSPMessage {
    userToken: Token
    province: Province
    city: City

    constructor(userToken: Token, province: Province, city: City) {
        super()
        this.userToken = userToken
        this.province = province
        this.city = city
    }
}