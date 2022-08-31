import {UserId} from "./UserMeta/UserId";
import {IdentityNumber} from "./UserMeta/IdentityNumber";
import {RealName} from "./UserMeta/RealName";
import {Permission} from "./UserMeta/Permission";
import {Password} from "./UserMeta/Password";

export class UserIdentity {
    id: UserId
    realName: RealName
    password: Password
    identityNumber: IdentityNumber
    permission: Permission

    constructor(
        id: UserId,
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