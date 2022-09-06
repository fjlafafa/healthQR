import {TSMSPMessage} from '../TSMSPMessage'
import {RealName} from "Types/UserMeta/RealName";
import {Password} from "Types/UserMeta/Password";
import {IdentityNumber} from "Types/UserMeta/IdentityNumber";
import {Roles} from "Types/UserMeta/Roles";

export class UserRegisterMessage extends TSMSPMessage {
    realName: RealName
    password: Password
    identityNumber: IdentityNumber
    role: Roles

    constructor(realName: RealName, password: Password, identityNumber: IdentityNumber) {
        super()
        this.realName = realName
        this.password = password
        this.identityNumber = identityNumber
        this.role = Roles.normal
    }
}