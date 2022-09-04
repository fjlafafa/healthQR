import {TSMSPMessage} from '../TSMSPMessage'
import {Token} from "Types/UserMeta/Token";

export class UserDeleteAccountMessage extends TSMSPMessage {
    userToken : Token
    constructor(userToken : Token) {
        super()
        this.userToken = userToken
    }
}