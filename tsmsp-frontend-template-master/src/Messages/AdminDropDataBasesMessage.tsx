import {TSMSPMessage} from "Messages/TSMSPMessage";

export class AdminDropDataBasesMessage extends TSMSPMessage {
    userToken : string
    constructor(userToken : string) {
        super();
        this.userToken = userToken
    }
}