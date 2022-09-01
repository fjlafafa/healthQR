import {TSMSPMessage} from "../../TSMSPMessage";

export class UserSelectProvinceMessage extends TSMSPMessage {
    userToken : string
    constructor(userToken : string,) {
        super()
        this.userToken = userToken
    }
}