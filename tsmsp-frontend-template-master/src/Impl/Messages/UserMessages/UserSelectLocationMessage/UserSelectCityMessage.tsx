import {TSMSPMessage} from "../../TSMSPMessage";

export class UserSelectCityMessage extends TSMSPMessage {
    userToken : string
    province : string
    constructor(userToken : string, province : string) {
        super()
        this.userToken = userToken
        this.province = province
    }
}