import {Permission} from "./UserMeta/Permission";
import {IdentityNumber} from "./UserMeta/IdentityNumber";
import {Password} from "./UserMeta/Password";
import {RealName} from "./UserMeta/RealName";
import {UserId} from "./UserMeta/UserId";

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
        permission: Permission
    ) {
            this.id=id
            this.realName=realName
            this.password=password
            this.identityNumber=identityNumber
            this.permission=permission
        
    }
}