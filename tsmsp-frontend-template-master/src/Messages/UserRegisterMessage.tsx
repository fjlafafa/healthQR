import {TSMSPMessage} from "Messages/TSMSPMessage";

export class UserRegisterMessage extends TSMSPMessage {
    userName : string
    password : string
    realName : string
    constructor(userName : string, password : string, realName : string) {
        super();
        this.userName = userName
        this.password = password
        this.realName = realName
    }
}