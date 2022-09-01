import {TSMSPMessage} from "../../TSMSPMessage";

export class UserSelectCityMessage extends TSMSPMessage {
    userToken : string
    province : string
    city : string
    constructor(userToken : string, province : string, city: string) {
        super()
        this.userToken = userToken
        this.province = province
        this.city = city
    }
}