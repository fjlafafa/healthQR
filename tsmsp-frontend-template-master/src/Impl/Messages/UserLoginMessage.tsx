import {TSMSPMessage} from "./TSMSPMessage";

export class UserLoginMessage extends TSMSPMessage {
    realName : string
    password : string
    constructor(userName : string, password : string) {
        super();
        this.realName = userName
        this.password = password
    }
}