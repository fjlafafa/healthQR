import {TSMSPMessage} from "./TSMSPMessage";

export class UserRegisterMessage extends TSMSPMessage {
    realName : string
    password : string
    identityNumber : string
    permission : string
    constructor(realName : string, password : string, identityNumber : string) {
        super();
        this.realName = realName
        this.password = password
        this.identityNumber = identityNumber
        this.permission = "Normal"
    }
}