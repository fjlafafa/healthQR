import {TSMSPMessage} from 'Messages/TSMSPMessage'
import {Password} from "Types/UserMeta/Password";
import {Token} from "Types/UserMeta/Token";

export class UserUpdatePasswordMessage extends TSMSPMessage {
    userToken: Token
    password: Password

    constructor(userToken: Token, password: Password) {
        super()
        this.userToken = userToken
        this.password = password
    }
}