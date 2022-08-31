import {UserId} from "./UserMeta/UserId";
import {Password} from "./UserMeta/Password";
import {RealName} from "./UserMeta/RealName";
import {IdentityNumber} from "./UserMeta/IdentityNumber";
import {Permission} from "./UserMeta/Permission";

export class UserIdentity {
    id : UserId
    realName: RealName
    password: Password
    identityNumber: IdentityNumber
    permission: Permission
    constructor(
        id : UserId,
        realName: RealName,
        password: Password,
        identityNumber: IdentityNumber,
        permission: Permission) {

            this.id=id
            this.realName=realName
            this.password=password
            this.identityNumber=identityNumber
            this.permission=permission
    }
}