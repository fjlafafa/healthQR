import {TSMSPMessage} from "./TSMSPMessage";

export class UserDeleteAccountMessage extends TSMSPMessage {
    userToken : string
    constructor(userToken : string) {
        super();
        this.userToken = userToken
    }
}