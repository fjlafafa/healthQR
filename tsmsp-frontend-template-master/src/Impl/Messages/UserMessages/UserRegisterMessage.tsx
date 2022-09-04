import {TSMSPMessage} from '../TSMSPMessage'
import {RealName} from "Types/UserMeta/RealName";
import {Password} from "Types/UserMeta/Password";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Permission} from "Types/UserMeta/Permission";

export class UserRegisterMessage extends TSMSPMessage {
    realName : RealName
    password : Password
    identityNumber : IdentityNumber
    permission : Permission
    constructor(realName : RealName, password : Password, identityNumber : IdentityNumber) {
        super()
        this.realName = realName
        this.password = password
        this.identityNumber = identityNumber
        this.permission = Permission.normal
    }
}