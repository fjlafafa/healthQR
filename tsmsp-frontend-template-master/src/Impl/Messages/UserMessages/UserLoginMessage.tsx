import {TSMSPMessage} from 'Messages/TSMSPMessage'
import {RealName} from "Types/UserMeta/RealName";
import {Password} from "Types/UserMeta/Password";

export class UserLoginMessage extends TSMSPMessage {
    realName: RealName
    password: Password

    constructor(userName: RealName, password: Password) {
        super()
        this.realName = userName
        this.password = password
    }
}