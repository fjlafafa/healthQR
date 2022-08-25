import {TSMSPMessage} from "Messages/TSMSPMessage";

export class UserUpdatePasswordMessage extends TSMSPMessage {
    userToken : string
    password : string
    constructor(userToken : string, password : string) {
        super();
        this.userToken = userToken
        this.password = password
    }
}